import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function CoverArea() {
  const { t } = useTranslation();
  const bg = "/assets/images/landing.jpg";
  return (
    <div
      style={{
        position: "relative",
        minHeight: 820,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gap: 16,
          padding: 24,
          width: "100%",
          maxWidth: 1200,
          color: "#ffffff",
        }}
      >
        <div style={{ maxWidth: 960 }} className="d-flex column g-12px">
          <h1
            style={{
              margin: 0,
              fontSize: 28,
              lineHeight: 1.25,
              fontWeight: 800,
              color: "#ffffff",
              textAlign: "left",
            }}
          >
            {t("main_text")}
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 16,
              opacity: 0.95,
              color: "#ffffff",
              textAlign: "left",
            }}
          >
            {t("secondary_text")}
          </p>

          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "flex-start",
              marginTop: 8,
              flexWrap: "wrap",
            }}
          >
            <NavLink
              to="/search"
              style={{
                background: "linear-gradient(135deg,#0ea5e9 0%, #1d4ed8 100%)",
                color: "#ffffff",
                padding: "12px 18px",
                borderRadius: 12,
                boxShadow: "0 10px 26px rgba(2,132,199,0.35)",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              {t("explore_services")}
            </NavLink>
            <NavLink
              to="/sign-in"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "#ffffff",
                padding: "12px 18px",
                borderRadius: 12,
                border: "1px solid rgba(255,255,255,0.35)",
                backdropFilter: "blur(2px)",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              {t("company_account")}
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
