import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../supabaseClient.js";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../components/comps/Sidebar.jsx";
import Navbar from "../components/comps/Navbar.jsx";

function Appointments() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  // const [, setLoading] = useState(false);
  const [, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);

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
      (async (userId) => {
        try {
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();

          if (error && error.code !== "PGRST116") {
            console.error("Error checking user:", error);
            return;
          }

          if (!data) {
            navigate("/details");
            return;
          }

          setUserData(data);
          loadAppointments(userId);
        } catch (err) {
          console.error("Error checking user existence:", err);
          return;
        }
      })(session.user.id);
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
      (async (userId) => {
        try {
          const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();

          if (error && error.code !== "PGRST116") {
            console.error("Error checking user:", error);
            return;
          }

          if (!data) {
            navigate("/details");
            return;
          }

          setUserData(data);
          loadAppointments(userId);
        } catch (err) {
          console.error("Error checking user existence:", err);
          return;
        }
      })(session.user.id);
    });

    // Cleanup subscription
    return () => subscription.unsubscribe();
  }, [navigate]);

  // removed checkUserExists to avoid dependency churn in useEffect

  const loadAppointments = async (userId) => {
    try {
      setAppointmentsLoading(true);
      const lang =
        (typeof localStorage !== "undefined" &&
          localStorage.getItem("i18nextLng")) ||
        "pt";

      const { data, error } = await supabase
        .from("appointments")
        .select(
          `id, client_phone, preferred_time, status, created_at,
           service:services(
             id, user_id, image_url, price,
             service_translations(name, language_code)
           )`
        )
        .eq("service.user_id", userId)
        .eq("service.service_translations.language_code", lang)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading appointments:", error);
        setError(error.message);
        return;
      }

      const normalized = (data || []).map((apt) => {
        let serviceName = null;
        if (Array.isArray(apt?.service?.service_translations)) {
          const match = apt.service.service_translations.find(
            (tr) => tr.language_code === lang
          );
          serviceName = match?.name || null;
        }
        return {
          ...apt,
          serviceName,
        };
      });

      // Extra safety: only keep appointments for services owned by this user
      const filtered = normalized.filter(
        (apt) => apt?.service?.user_id === userId
      );

      setAppointments(filtered);
    } catch (e) {
      console.error("Unexpected error loading appointments:", e);
      setError(e.message);
    } finally {
      setAppointmentsLoading(false);
    }
  };

  // Sign out is not used in this page UI; keeping utility commented out
  // const handleSignOut = async () => {
  //   try {
  //     setLoading(true);
  //     const { error } = await supabase.auth.signOut();
  //     if (error) {
  //       setError(error.message);
  //     } else {
  //       navigate("/sign-in");
  //     }
  //   } catch (err) {
  //     setError(t("signOutError"));
  //     console.error("Error:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
        <div className="d-flex column g-36px">
          <h2 className="size-18 bold">{t("appointments")}</h2>
          <div
            className="table-area w-full"
            style={{
              background: "#ffffff",
              borderRadius: 12,
              boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
              border: "1px solid #e2e8f0",
              overflow: "hidden",
            }}
          >
            <table
              className="w-full"
              style={{ borderCollapse: "separate", borderSpacing: 0 }}
            >
              <thead>
                <tr style={{ background: "#f8fafc" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "14px 16px",
                      color: "#475569",
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {t("service")}
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "14px 16px",
                      color: "#475569",
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {t("client_phone")}
                  </th>
                  <th
                    className="hidden"
                    style={{
                      textAlign: "left",
                      padding: "14px 16px",
                      color: "#475569",
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {t("created_at")}
                  </th>
                  <th
                    className="hidden"
                    style={{
                      textAlign: "left",
                      padding: "14px 16px",
                      color: "#475569",
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {t("preferred_time")}
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "14px 16px",
                      color: "#475569",
                      fontWeight: 600,
                      fontSize: 13,
                    }}
                  >
                    {t("status")}
                  </th>
                  <th style={{ width: 64 }}></th>
                </tr>
              </thead>
              <tbody>
                {appointmentsLoading && (
                  <tr>
                    <td colSpan={6}>
                      <div className="d-flex items-center g-8px">
                        <div className="loading-spinner"></div>
                        <span className="ml-8">{t("loading")}</span>
                      </div>
                    </td>
                  </tr>
                )}
                {!appointmentsLoading && appointments.length === 0 && (
                  <tr>
                    <td colSpan={6}>
                      <span className="size-14 color-opac">
                        {t("no_change")}
                      </span>
                    </td>
                  </tr>
                )}
                {!appointmentsLoading &&
                  appointments.map((apt) => {
                    const img = apt?.service?.image_url;
                    const name = apt?.serviceName || t("service");
                    const created = new Date(
                      apt.created_at
                    ).toLocaleDateString();
                    const placeholder = "./assets/images/app-logo.png";
                    const isConfirmed = apt.status === "confirmed";
                    const isCancelled = apt.status === "cancelled";
                    const badgeBg = isConfirmed
                      ? "rgba(34,197,94,0.12)"
                      : isCancelled
                      ? "rgba(239,68,68,0.12)"
                      : "rgba(100,116,139,0.12)";
                    const badgeColor = isConfirmed
                      ? "#16a34a"
                      : isCancelled
                      ? "#dc2626"
                      : "#475569";
                    return (
                      <tr
                        key={apt.id}
                        style={{ borderTop: "1px solid #f1f5f9" }}
                      >
                        <td style={{ padding: "12px 16px" }}>
                          <div className="d-flex items-center g-8px">
                            <div
                              className="default-image"
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: 8,
                                overflow: "hidden",
                                background: "#f1f5f9",
                              }}
                            >
                              <img
                                src={img || placeholder}
                                alt={name}
                                loading="lazy"
                                onError={(e) => {
                                  if (e.currentTarget.src !== placeholder) {
                                    e.currentTarget.src = placeholder;
                                  }
                                }}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            <NavLink
                              className="size-14 medium"
                              to={`/appointment/${apt.id}`}
                              style={{ color: "#0f172a" }}
                            >
                              <span style={{ fontWeight: 600 }}>{name}</span>
                            </NavLink>
                          </div>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span
                            className="size-14 medium"
                            style={{ color: "#0f172a" }}
                          >
                            {apt.client_phone}
                          </span>
                        </td>
                        <td className="hidden" style={{ padding: "12px 16px" }}>
                          <span
                            className="size-14 color-opac regular"
                            style={{ color: "#64748b" }}
                          >
                            {created}
                          </span>
                        </td>
                        <td className="hidden" style={{ padding: "12px 16px" }}>
                          <span
                            className="size-14 regular medium"
                            style={{ color: "#0f172a" }}
                          >
                            {apt.preferred_time || "-"}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "6px 10px",
                              borderRadius: 999,
                              background: badgeBg,
                              color: badgeColor,
                              fontSize: 12,
                              fontWeight: 600,
                              textTransform: "capitalize",
                            }}
                          >
                            {apt.status}
                          </span>
                        </td>
                        <td
                          style={{ padding: "12px 16px", textAlign: "right" }}
                        >
                          <NavLink
                            className="btn-square"
                            to={`/appointment/${apt.id}`}
                            style={{
                              width: 36,
                              height: 36,
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              borderRadius: 8,
                              background: "#f1f5f9",
                              color: "#0f172a",
                            }}
                          >
                            <i className="fi fi-rr-arrow-right"></i>
                          </NavLink>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
