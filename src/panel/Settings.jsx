import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../supabaseClient.js";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/comps/Sidebar.jsx";
import Navbar from "../components/comps/Navbar.jsx";

export default function Settings() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    whatsapp_number: "",
    location: "",
    logo_url: "",
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/sign-in");
        return;
      }
      setSession(session);
      loadInstitution(session.user.id);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/sign-in");
        return;
      }
      setSession(session);
      loadInstitution(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadInstitution = async (userId) => {
    try {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("users")
        .select("name, whatsapp_number, location, logo_url")
        .eq("id", userId)
        .single();
      if (error) throw error;
      setFormData({
        name: data?.name || "",
        whatsapp_number: data?.whatsapp_number || "",
        location: data?.location || "",
        logo_url: data?.logo_url || "",
      });
      setLogoPreview(data?.logo_url || "");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!session) return;
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);
      let finalLogoUrl = formData.logo_url;

      if (logoFile) {
        const fileExt = logoFile.name.split(".").pop();
        const filePath = `${session.user.id}/${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("logos")
          .upload(filePath, logoFile, { upsert: true });
        if (uploadError) throw uploadError;
        const { data: publicData } = supabase.storage
          .from("logos")
          .getPublicUrl(filePath);
        finalLogoUrl = publicData?.publicUrl || finalLogoUrl;
      }
      const { error } = await supabase
        .from("users")
        .update({
          name: formData.name,
          whatsapp_number: formData.whatsapp_number,
          location: formData.location,
          logo_url: finalLogoUrl,
        })
        .eq("id", session.user.id);
      if (error) throw error;
      setSuccess(t("profileUpdated") || "Atualizado com sucesso");
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const onLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    const url = URL.createObjectURL(file);
    setLogoPreview(url);
  };

  const handlePickCurrentLocation = async () => {
    try {
      setLocationLoading(true);
      setError(null);
      if (!("geolocation" in navigator)) {
        setError(t("geolocationNotSupported"));
        return;
      }
      await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            const formatted = `Lat: ${latitude}, Lng: ${longitude}`;
            setFormData((prev) => ({ ...prev, location: formatted }));
            resolve();
          },
          (err) => {
            if (err.code === err.PERMISSION_DENIED)
              setError(t("locationPermissionDenied"));
            else if (err.code === err.POSITION_UNAVAILABLE)
              setError(t("locationUnavailable"));
            else if (err.code === err.TIMEOUT) setError(t("locationTimeout"));
            else setError(t("locationError"));
            reject(err);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      });
    } catch {
      // error already handled
    } finally {
      setLocationLoading(false);
    }
  };

  if (!session) {
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
          <h2 className="size-18 bold">{t("settings")}</h2>

          <form onSubmit={onSubmit} style={{ width: "100%" }}>
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
                padding: 16,
                display: "grid",
                gap: 12,
              }}
            >
              <div className="d-flex g-16px" style={{ alignItems: "center" }}>
                <input
                  id="logo-input"
                  type="file"
                  accept="image/*"
                  onChange={onLogoChange}
                  style={{ display: "none" }}
                />
                <label
                  htmlFor="logo-input"
                  style={{
                    width: 96,
                    height: 96,
                    borderRadius: 999,
                    overflow: "hidden",
                    background: "#f8fafc",
                    border: "1px dashed #cbd5e1",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                    transition: "transform .15s ease, box-shadow .2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-1px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                >
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span className="size-12" style={{ color: "#64748b" }}>
                      {t("serviceImageFile") || "Carregar imagem"}
                    </span>
                  )}
                </label>
                <div className="d-flex column g-6px">
                  <span className="size-12" style={{ color: "#475569" }}>
                    {t("logoUrl")} ({t("optional") || "opcional"})
                  </span>
                  <input
                    type="url"
                    name="logo_url"
                    value={formData.logo_url}
                    onChange={onChange}
                    placeholder="https://..."
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      padding: "10px 12px",
                      outline: "none",
                      width: 360,
                      maxWidth: "100%",
                    }}
                  />
                </div>
              </div>

              <div className="d-flex column g-6px">
                <label className="size-12" style={{ color: "#475569" }}>
                  {t("institutionName")}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  placeholder={t("institutionNamePlaceholder")}
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    padding: "10px 12px",
                    outline: "none",
                  }}
                  required
                />
              </div>

              <div className="d-flex column g-6px">
                <label className="size-12" style={{ color: "#475569" }}>
                  {t("whatsappNumber")}
                </label>
                <input
                  type="text"
                  name="whatsapp_number"
                  value={formData.whatsapp_number}
                  onChange={onChange}
                  placeholder="Ex: +244 900 000 000"
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    padding: "10px 12px",
                    outline: "none",
                  }}
                  required
                />
              </div>

              <div className="d-flex column g-6px">
                <label className="size-12" style={{ color: "#475569" }}>
                  {t("location")}
                </label>
                <div className="d-flex g-8px">
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={onChange}
                    placeholder={t("locationPlaceholder")}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: 8,
                      padding: "10px 12px",
                      outline: "none",
                      flex: 1,
                    }}
                  />
                  <button
                    type="button"
                    onClick={handlePickCurrentLocation}
                    disabled={locationLoading}
                    className="btn"
                    style={{
                      background:
                        "linear-gradient(135deg,#0ea5e9 0%, #1d4ed8 100%)",
                      color: "#fff",
                      padding: "10px 14px",
                      borderRadius: 10,
                      boxShadow: "0 6px 16px rgba(2,132,199,0.25)",
                      cursor: locationLoading ? "not-allowed" : "pointer",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {locationLoading
                      ? t("gettingLocation")
                      : t("getLocation") || "Pegar minha localização atual"}
                  </button>
                </div>
              </div>

              <div className="d-flex column g-6px">
                <label className="size-12" style={{ color: "#475569" }}>
                  {t("logoUrl")}
                </label>
                <input
                  type="url"
                  name="logo_url"
                  value={formData.logo_url}
                  onChange={onChange}
                  placeholder="https://..."
                  style={{
                    border: "1px solid #e2e8f0",
                    borderRadius: 8,
                    padding: "10px 12px",
                    outline: "none",
                  }}
                />
              </div>

              {error && (
                <div style={{ color: "#dc2626" }} className="size-12">
                  {error}
                </div>
              )}
              {success && (
                <div style={{ color: "#16a34a" }} className="size-12">
                  {success}
                </div>
              )}

              <div
                className="d-flex items-center g-8px"
                style={{ marginTop: 6 }}
              >
                <button
                  type="submit"
                  disabled={saving}
                  className="btn"
                  style={{
                    background:
                      "linear-gradient(135deg,#0ea5e9 0%, #1d4ed8 100%)",
                    color: "#fff",
                    padding: "10px 14px",
                    borderRadius: 10,
                    boxShadow: "0 6px 16px rgba(2,132,199,0.25)",
                    cursor: saving ? "not-allowed" : "pointer",
                  }}
                >
                  {saving
                    ? t("saving")
                    : t("updateProfile") || "Atualizar perfil"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
