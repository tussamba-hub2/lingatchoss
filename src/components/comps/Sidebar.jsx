import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { supabase } from "../../../supabaseClient.js";

const LINGA_TCHOSS_LOGO_SOURCE = "./assets/images/app-logo.png";

export default function Sidebar() {
  const { t } = useTranslation();
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Get user data from session
  const getUserData = () => {
    if (!session?.user) return { name: "", email: "", avatar: "" };

    const user = session.user;
    const userMetadata = user.user_metadata || {};

    return {
      name:
        userMetadata.full_name ||
        userMetadata.name ||
        user.email?.split("@")[0] ||
        "Utilizador",
      email: user.email || "",
      avatar: userMetadata.avatar_url || userMetadata.picture || "",
    };
  };

  const { name, email, avatar } = getUserData();

  // Limit email to 26 characters

  const displayName = name.length > 8 ? name.substring(0, 8) + "..." : name;
  const displayEmail = email.length > 8 ? email.substring(0, 8) + "..." : email;

  return (
    <nav className="side-bar">
      <div className="d-flex column justify-between h-full row-res">
        <div className="d-flex column g-32px pr-16">
          <NavLink to="/" className="d-flex items-center g-12px pr-16 hidden">
            <img
              src={LINGA_TCHOSS_LOGO_SOURCE}
              alt="Linga Tchoss Logo"
              className="logo-sidebar"
            />
            <h1 className="rem-size">Linga Tchoss</h1>
          </NavLink>
          <div className="d-flex column g-8px list-navigation">
            <NavLink to="/dashboard" className="d-flex items-center g-12px">
              <i className="fi fi-rr-chart-pie-alt"></i>
              <span>{t("dashboard")}</span>
            </NavLink>
            <NavLink to="/services" className="d-flex items-center g-12px">
              <i className="fi fi-rr-gift-card"></i>
              <span>{t("services")}</span>
            </NavLink>
            <NavLink to="/appointments" className="d-flex items-center g-12px">
              <i className="fi fi-rr-calendar"></i>
              <span>{t("appointments")}</span>
            </NavLink>
            <NavLink to="/" className="d-flex items-center g-12px">
              <i className="fi fi-rr-piggy-bank"></i>
              <span>{t("invoices")}</span>
            </NavLink>
          </div>
        </div>
        <div className="d-flex column g-20px">
          <NavLink to="/settings" className="d-flex items-center g-12px hidden">
            <i className="fi fi-rr-settings"></i>
            <span>{t("settings")}</span>
          </NavLink>
          <NavLink to="/settings" className="d-flex items-center g-12px user-avatar">
            <img
              src={avatar || "/default-avatar.png"}
              alt="Avatar do utilizador"
              className="avatar"
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
            />
            <div className="d-flex column hidden">
              <b className="medium">{displayName}</b>
              <span className="small">{displayEmail}</span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
