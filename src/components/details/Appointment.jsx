import React, { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "../../../supabaseClient";

export default function Appointment() {
  const { appointmentId } = useParams();
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appointment, setAppointment] = useState(null);
  const [, setSession] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        setLoading(true);
        setError(null);

        // Require authentication
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          navigate("/sign-in");
          return;
        }
        setSession(session);

        const languageCode = i18n.language || "pt";

        // Fetch appointment with related service and translations
        const { data, error } = await supabase
          .from("appointments")
          .select(
            `id, client_phone, preferred_time, status, notes, created_at,
             service:services(
               id, user_id, price, image_url, created_at,
               category:categories(id),
               service_translations(name, description, language_code)
             )`
          )
          .eq("id", appointmentId)
          .single();

        if (error) throw error;

        // Ownership check: only the company (service.user_id) can view
        if (
          data?.service?.user_id &&
          data.service.user_id !== session.user.id
        ) {
          setError(t("not_found") || "Não encontrado");
          return;
        }

        let categoryName = null;
        if (data?.service?.category?.id) {
          const { data: catTrans } = await supabase
            .from("category_translations")
            .select("name, language_code")
            .eq("category_id", data.service.category.id)
            .eq("language_code", languageCode)
            .maybeSingle();
          categoryName = catTrans?.name || null;
        }

        // Choose translated service name in current language
        let serviceName = null;
        if (Array.isArray(data?.service?.service_translations)) {
          const matched = data.service.service_translations.find(
            (tr) => tr.language_code === languageCode
          );
          serviceName = matched?.name || null;
        }

        setAppointment({
          ...data,
          serviceName,
          categoryName,
        });
      } catch (err) {
        setError(err.message || "Failed to load appointment");
      } finally {
        setLoading(false);
      }
    };

    if (appointmentId) fetchAppointment();
  }, [appointmentId, i18n.language, navigate, t]);

  const formatDate = (iso) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return d.toLocaleString();
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!appointmentId) return;
    try {
      setSaving(true);
      const { error } = await supabase
        .from("appointments")
        .update({ status: newStatus })
        .eq("id", appointmentId);
      if (error) throw error;
      setAppointment((prev) => (prev ? { ...prev, status: newStatus } : prev));
    } catch (err) {
      setError(err.message || "Failed to update status");
    } finally {
      setSaving(false);
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

  if (loading) {
    return (
      <div style={{ padding: 16 }}>
        <p>{t("loading") || "Carregando..."}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 16 }}>
        <p style={{ color: "#b91c1c" }}>{error}</p>
        <NavLink to="/appointments" style={{ color: "#2563eb" }}>
          {t("back") || "Voltar"}
        </NavLink>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div style={{ padding: 16 }}>
        <p>{t("not_found") || "Agendamento não encontrado."}</p>
      </div>
    );
  }

  const imageUrl = appointment.service?.image_url;

  return (
    <div style={{ padding: 16, maxWidth: 840, margin: "0 auto" }}>
      <div style={{ marginBottom: 16 }}>
        <NavLink to="/appointments" style={{ color: "#2563eb" }}>
          ← {t("back_to_list") || "Voltar à lista"}
        </NavLink>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: 16,
          alignItems: "start",
          background: "#fff",
          borderRadius: 8,
          padding: 16,
          boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
        }}
      >
        <div>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={appointment.serviceName || "Service"}
              style={{
                width: "100%",
                height: 160,
                objectFit: "cover",
                borderRadius: 8,
                background: "#f1f5f9",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: 160,
                borderRadius: 8,
                background: "#f1f5f9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#64748b",
              }}
            >
              {t("no_image") || "Sem imagem"}
            </div>
          )}
        </div>

        <div>
          <h2 style={{ margin: 0, fontSize: 22 }}>
            {appointment.serviceName || t("service") || "Serviço"}
          </h2>
          <p style={{ margin: "6px 0 0", color: "#475569" }}>
            {appointment.categoryName
              ? `${appointment.categoryName}`
              : t("category") || "Categoria"}
          </p>

          <div style={{ marginTop: 12, display: "grid", gap: 8 }}>
            <div>
              <span style={{ color: "#64748b" }}>
                {t("price") || "Preço"}:{" "}
              </span>
              <strong>{formatMoney(appointment.service?.price)}</strong>
            </div>
            <div>
              <span style={{ color: "#64748b" }}>
                {t("client_phone") || "Telefone do cliente"}:{" "}
              </span>
              <strong>{appointment.client_phone}</strong>
            </div>
            <div>
              <span style={{ color: "#64748b" }}>
                {t("created_at") || "Criado em"}:{" "}
              </span>
              <strong>{formatDate(appointment.created_at)}</strong>
            </div>
            <div>
              <span style={{ color: "#64748b" }}>
                {t("preferred_time") || "Data preferencial"}:{" "}
              </span>
              <strong>{appointment.preferred_time || "-"}h</strong>
            </div>
            <div>
              <span style={{ color: "#64748b" }}>
                {t("status") || "Estado"}:{" "}
              </span>
              {(() => {
                const statusColor =
                  appointment.status === "confirmed"
                    ? "#16a34a"
                    : appointment.status === "cancelled"
                    ? "#dc2626"
                    : "#334155";
                return (
                  <strong
                    style={{
                      textTransform: "capitalize",
                      color: statusColor,
                    }}
                  >
                    {appointment.status}
                  </strong>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      {appointment.notes && (
        <div
          style={{
            marginTop: 16,
            background: "#fff",
            borderRadius: 8,
            padding: 16,
            boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
          }}
        >
          <h3 style={{ marginTop: 0 }}>{t("notes") || "Notas"}</h3>
          <p style={{ whiteSpace: "pre-wrap", marginBottom: 0 }}>
            {appointment.notes}
          </p>
        </div>
      )}

      <div
        style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}
      >
        {appointment.status !== "confirmed" && (
          <button
            onClick={() => handleUpdateStatus("confirmed")}
            disabled={saving}
            className="btn"
            style={{
              background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
              color: "#ffffff",
              border: 0,
              padding: "10px 14px",
              borderRadius: 10,
              boxShadow: "0 6px 20px rgba(34,197,94,0.25)",
              transition:
                "transform 0.15s ease, box-shadow 0.2s ease, opacity 0.2s ease",
              cursor: saving ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-1px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
            onFocus={(e) => (e.currentTarget.style.opacity = "0.95")}
            onBlur={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {saving
              ? t("saving") || "A guardar..."
              : t("confirm") || "Confirmar"}
          </button>
        )}
        {appointment.status !== "cancelled" && (
          <button
            onClick={() => handleUpdateStatus("cancelled")}
            disabled={saving}
            className="btn"
            style={{
              background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
              color: "#ffffff",
              border: 0,
              padding: "10px 14px",
              borderRadius: 10,
              boxShadow: "0 6px 20px rgba(239,68,68,0.25)",
              transition:
                "transform 0.15s ease, box-shadow 0.2s ease, opacity 0.2s ease",
              cursor: saving ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-1px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
            onFocus={(e) => (e.currentTarget.style.opacity = "0.95")}
            onBlur={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {saving ? t("saving") || "A guardar..." : t("cancel") || "Cancelar"}
          </button>
        )}
      </div>
    </div>
  );
}
