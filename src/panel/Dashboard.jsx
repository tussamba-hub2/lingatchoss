import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../supabaseClient.js";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/comps/Sidebar.jsx";
import Navbar from "../components/comps/Navbar.jsx";
import Cards from "../components/stats/Cards.jsx";
import SearchModal from "../components/datas/SearchModal.jsx";
import Service from "../components/add/Service.jsx";
import Area from "../components/stats/Area.jsx";
import Services from "../components/datas/Services.jsx";

function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        // Redirect to login if no session
        navigate("/sign-in");
        return;
      }
      setSession(session);

      // Check if user exists in users table
      checkUserExists(session.user.id);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        // Redirect to login if session is lost
        navigate("/sign-in");
        return;
      }
      setSession(session);

      // Check if user exists in users table
      checkUserExists(session.user.id);
    });

    // Cleanup subscription
    return () => subscription.unsubscribe();
  }, []);

  const checkUserExists = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 = no rows returned
        console.error("Error checking user:", error);
        return;
      }

      if (!data) {
        // User doesn't exist in users table, redirect to details
        navigate("/details");
        return;
      }

      // User exists, set user data
      setUserData(data);
    } catch (err) {
      console.error("Error checking user existence:", err);
      // Don't redirect on error, just return
      return;
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      } else {
        // Redirect to login after successful logout
        navigate("/sign-in");
      }
    } catch (err) {
      setError(t("signOutError"));
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!session || !userData) {
    return (
      <div className="d-flex w-full h-full items-center justify-center">
        <div
            className="d-flex items-center justify-center"
            style={{ height: "280px" }}
          >
            <div className="loading-spinner"></div>
            <span className="ml-8">{t("loading")}</span>
          </div>
      </div>
    );
  }

  return (
    <div className="dashboard-grid padding-inside">
      <Sidebar />
      <div className="d-flex column">
        <Navbar />
        <div className="grid-overflow-content">
          <div className="d-flex column g-32px">
            <Cards />
            <Area />
            <Services />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
