import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient.js";
import { NavLink } from "react-router-dom";

function Authentication() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const GOOGLE_ICON_SOURCE = "./assets/images/google-logo.svg";
  const VIDEO_SOURCE = "./assets/videos/beauty.mp4";
  const LINGA_TCHOSS_LOGO_SOURCE = "./assets/images/app-logo.svg";

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Check if user exists in users table
        checkUserAndRedirect(session.user.id);
        return;
      }
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        // Check if user exists in users table after login
        checkUserAndRedirect(session.user.id);
        return;
      }
      setSession(session);
    });

    // Cleanup subscription
    return () => subscription.unsubscribe();
  }, []);

  const checkUserAndRedirect = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 = no rows returned
        console.error("Error checking user:", error);
        // Don't redirect on error, just return
        return;
      }

      if (data) {
        // User exists in users table, redirect to dashboard
        navigate("/dashboard");
      } else {
        // User doesn't exist in users table, redirect to details
        navigate("/details");
      }
    } catch (err) {
      console.error("Error checking user existence:", err);
      // Don't redirect on error, just return
      return;
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/details`,
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError(t("googleSignInError"));
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError(t("signOutError"));
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (session) {
    return (
      <div className="grid-login">
        <div className="grid-login-left"></div>
        <div className="grid-login-right">
          <h2>{t("welcome")}!</h2>
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="signout-button"
          >
            {loading ? t("signingOut") : t("signOut")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid-login relative">
      <div className="grid-login-left">
        <video autoPlay muted loop className="w-full h-full">
          <source src={VIDEO_SOURCE} type="video/mp4" />
        </video>
      </div>
      <div className="grid-login-right">
        <div className="d-flex items-center justify-center">
          <div className="d-flex column g-32px">
            <div className="d-flex column g-20px">
              <h1 className="rem-size text-center">
                {t("login")}{" "}
                <span className="hidden rem-size">{t("forInstitutions")}</span>
              </h1>
              <div className="d-flex column g-12px">
                <button
                  className="btn btn-br"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <img
                    src={GOOGLE_ICON_SOURCE}
                    alt="Google"
                    className="google-icon"
                  />
                  <span>{loading ? t("loading") : t("signInWithGoogle")}</span>
                </button>
                <button
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="btn"
                >
                  <span>{t("createNewAccount")}</span>
                </button>
              </div>
              <span className="line-sharp"></span>
              <div className="d-flex column g-20px items-center">
                <NavLink to="/" className="btn">
                  <span className="nowrap">{t("loginWithManagedAccount")}</span>
                </NavLink>
                <NavLink
                  to="/"
                  className="d-flex items-center justify-center g-8px logo-area"
                >
                  <div className="d-flex items-center justify-center">
                    <img
                      src={LINGA_TCHOSS_LOGO_SOURCE}
                      alt="Linga Tchoss Logo"
                    />
                  </div>
                  <h4>Linga Tchoss</h4>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavLink to="/" className="arrow-back d-flex items-center justify-center">
        <i className="fi fi-rr-angle-small-left"></i>
      </NavLink>
    </div>
  );
}

export default Authentication;
