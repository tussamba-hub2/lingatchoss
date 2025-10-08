import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../supabaseClient.js";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../components/comps/Sidebar.jsx";
import Navbar from "../components/comps/Navbar.jsx";

export default function Services() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [userData, setUserData] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/sign-in");
        return;
      }
      setSession(session);
      // ensure user exists
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
          loadServices(userId, i18n.language || "pt");
        } catch (err) {
          console.error("Error checking user existence:", err);
        }
      })(session.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/sign-in");
        return;
      }
      setSession(session);
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
          loadServices(userId, i18n.language || "pt");
        } catch (err) {
          console.error("Error checking user existence:", err);
        }
      })(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, [navigate, i18n.language]);

  const loadServices = async (userId, lang) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("services")
        .select(
          `id, image_url, price, created_at,
           service_translations(name, description, language_code),
           category:categories(id, category_translations(name, language_code))`
        )
        .eq("user_id", userId)
        .eq("service_translations.language_code", lang)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const normalized = (data || []).map((svc) => {
        let name = null;
        if (Array.isArray(svc.service_translations)) {
          const m = svc.service_translations.find(
            (tr) => tr.language_code === lang
          );
          name = m?.name || svc.service_translations[0]?.name || null;
        }
        let categoryName = null;
        if (Array.isArray(svc.category?.category_translations)) {
          const m = svc.category.category_translations.find(
            (tr) => tr.language_code === lang
          );
          categoryName =
            m?.name || svc.category.category_translations[0]?.name || null;
        }
        return {
          ...svc,
          name,
          categoryName,
        };
      });

      setServices(normalized);
    } catch (e) {
      console.error("Error loading services:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const formatMoney = (value) => {
    if (value == null) return "-";
    try {
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "AOA",
        maximumFractionDigits: 2,
      }).format(Number(value));
    } catch {
      return String(value);
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
        <div className="d-flex column g-24px">
          <div className="d-flex items-center justify-between">
            <h2 className="size-18 bold">{t("services")}</h2>
            <NavLink
              className="btn"
              to="/edit-service/new"
              style={{
                background: "linear-gradient(135deg,#0ea5e9 0%, #1d4ed8 100%)",
                color: "#fff",
                padding: "10px 14px",
                borderRadius: 10,
                boxShadow: "0 6px 16px rgba(2,132,199,0.25)",
              }}
            >
              {t("add_a")} {t("new_service")}
            </NavLink>
          </div>

          <div
            className="w-full"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
            }}
          >
            {loading && (
              <div
                className="d-flex items-center g-8px"
                style={{ padding: 16 }}
              >
                <div className="loading-spinner"></div>
                <span className="ml-8">{t("loading")}</span>
              </div>
            )}
            {!loading && services.length === 0 && (
              <div style={{ color: "#64748b", padding: 16 }}>
                {t("noServicesRegistered")}
              </div>
            )}
            {!loading &&
              services.map((svc) => {
                const placeholder = "./assets/images/app-logo.png";
                return (
                  <div
                    key={svc.id}
                    style={{
                      background: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: 12,
                      overflow: "hidden",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: 140,
                        background: "#f1f5f9",
                      }}
                    >
                      <img
                        src={svc.image_url || placeholder}
                        alt={svc.name || "Service"}
                        loading="lazy"
                        onError={(e) => {
                          if (e.currentTarget.src !== placeholder)
                            e.currentTarget.src = placeholder;
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div style={{ padding: 12, display: "grid", gap: 6 }}>
                      <div className="d-flex items-center justify-between">
                        <h3
                          className="size-14 bold"
                          style={{ margin: 0, color: "#0f172a" }}
                        >
                          {svc.name || t("service")}
                        </h3>
                        <span
                          className="size-12"
                          style={{ color: "#0f172a", fontWeight: 600 }}
                        >
                          {formatMoney(svc.price)}
                        </span>
                      </div>
                      <div className="size-12" style={{ color: "#64748b" }}>
                        {svc.categoryName || t("category")}
                      </div>
                      <div
                        className="d-flex items-center g-8px"
                        style={{ marginTop: 6 }}
                      >
                        <NavLink
                          to={`/edit-service/${svc.id}`}
                          className="size-12"
                          style={{
                            background: "#f1f5f9",
                            padding: "8px 10px",
                            borderRadius: 8,
                            color: "#0f172a",
                            fontWeight: 600,
                          }}
                        >
                          {t("editService")}
                        </NavLink>
                        <NavLink
                          to={`/service/${svc.id}`}
                          className="size-12"
                          style={{
                            background: "#0ea5e9",
                            padding: "8px 10px",
                            borderRadius: 8,
                            color: "#fff",
                            fontWeight: 600,
                          }}
                        >
                          {t("view") || "Ver"}
                        </NavLink>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
