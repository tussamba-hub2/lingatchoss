import React from "react";
import { useTranslation } from "react-i18next";

export default function ServicesNear() {
  const { t } = useTranslation();
  return (
    <div className="padding-inside mt-100">
      <div style={{ display: "grid", gap: 16 }}>
        <h1
          style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#0f172a" }}
        >
          {t("services_side")}
        </h1>
        <div className="services-grids">
          {[
            {
              icon: "🏥",
              title: t("healph_services"),
              desc: `${t(
                "healph_services_desc"
              )}`,
            },
            {
              icon: "📖",
              title: t("education_services"),
              desc: `${t(
                "education_services_desc"
              )}`,
            },
            {
              icon: "💊",
              title: t("pharmacy_services"),
              desc: `${t(
                "pharmacy_services_desc"
              )}`,
            },
            {
              icon: "🛒",
              title: t("supermarket_services"),
              desc: `${t(
                "supermarket_services_desc"
              )}`,
            },
            {
              icon: "🏍️",
              title: t("transport_services"),
              desc: `${t(
                "transport_services_desc"
              )}`,
            },
            {
              icon: "🏨",
              title: t("hotel_services"),
              desc: `${t(
                "hotel_services_desc"
              )}`,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                display: "grid",
                gridTemplateColumns: "40px 1fr",
                gap: 12,
                padding: 16,
                borderRadius: 12,
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
              }}
              className="svc"
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                {item.icon}
              </div>
              <div style={{ display: "grid", gap: 6 }}>
                <div
                  style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}
                >
                  {item.title}
                </div>
                <div
                  style={{ fontSize: 13, color: "#475569", lineHeight: 1.5 }}
                >
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
