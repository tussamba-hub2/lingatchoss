import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient.js";

function InstitutionDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sectors, setSectors] = useState([]);
  const [plans, setPlans] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    whatsapp_number: "",
    sector_id: "",
    plan_id: "",
  });

  // Location data
  const [locationData, setLocationData] = useState({
    lat: null,
    lng: null,
    bairro: "",
    cidade: "",
  });

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/sign-in");
        return;
      }
      setSession(session);

      // Check if user already has data in users table
      checkUserExists(session.user.id);
    });

    // Load sectors and plans
    loadSectors();
    loadPlans();
  }, []);

  const checkUserExists = async (userId) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        // PGRST116 = no rows returned
        console.error("Error checking user:", error);
        return;
      }

      if (data) {
        // User exists, redirect to dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error checking user existence:", err);
    }
  };

  const loadSectors = async () => {
    try {
      const { data, error } = await supabase
        .from("sectors")
        .select("id, name, description");

      if (error) {
        console.error("Error loading sectors:", error);
        return;
      }

      setSectors(data || []);
    } catch (err) {
      console.error("Error loading sectors:", err);
    }
  };

  const loadPlans = async () => {
    try {
      const { data, error } = await supabase
        .from("plans")
        .select("id, name, price, message_limit, sector_limit");

      if (error) {
        console.error("Error loading plans:", error);
        return;
      }

      setPlans(data || []);
    } catch (err) {
      console.error("Error loading plans:", err);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocalização não é suportada pelo seu navegador");
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        setLocationData((prev) => ({
          ...prev,
          lat: latitude,
          lng: longitude,
        }));

        // Get address from coordinates using reverse geocoding
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );

          if (response.ok) {
            const data = await response.json();
            const address = data.address;

            setLocationData((prev) => ({
              ...prev,
              bairro:
                address.suburb ||
                address.neighbourhood ||
                address.quarter ||
                "",
              cidade:
                address.city ||
                address.town ||
                address.village ||
                address.county ||
                "",
            }));
          }
        } catch (err) {
          console.error("Error getting address:", err);
          // Still save coordinates even if address lookup fails
        }

        setLocationLoading(false);
      },
      (error) => {
        setLocationLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Permissão de localização negada");
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError("Informação de localização indisponível");
            break;
          case error.TIMEOUT:
            setLocationError("Tempo limite para obter localização");
            break;
          default:
            setLocationError("Erro desconhecido ao obter localização");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim() !== "";
      case 2:
        return formData.whatsapp_number.trim() !== "";
      case 3:
        return locationData.lat && locationData.lng;
      case 4:
        return formData.sector_id && formData.plan_id;
      default:
        return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user) {
      setError("Sessão não encontrada");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // First, save user data
      const { error: userError } = await supabase.from("users").insert({
        id: session.user.id,
        name: formData.name,
        role: "institution",
        whatsapp_number: formData.whatsapp_number,
        sector_id: formData.sector_id || null,
        plan_id: formData.plan_id || null,
      });

      if (userError) {
        setError(userError.message);
        return;
      }

      // Then, save location data if we have coordinates
      if (locationData.lat && locationData.lng) {
        const { error: locationError } = await supabase
          .from("locations")
          .insert({
            lat: locationData.lat,
            lng: locationData.lng,
            bairro: locationData.bairro,
            cidade: locationData.cidade,
          });

        if (locationError) {
          console.error("Error saving location:", locationError);
          // Don't fail the whole process if location save fails
        }
      }

      // Success! Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Erro ao salvar dados da instituição");
      console.error("Error saving institution details:", err);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content d-flex column g-20px">
            <div className="d-flex column g-4px">
              <h2 className="size-18 medium">{t("step1Title")}</h2>
              <p>{t("step1Description")}</p>
            </div>
            <div className="d-flex column g-4px">
              <label htmlFor="name">{t("institutionName")} </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="cool-input "
                placeholder={t("institutionNamePlaceholder")}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content d-flex column g-20px">
            <div className="d-flex column g-4px">
              <h2 className="size-18 medium">{t("step2Title")}</h2>
              <p>{t("step2Description")}</p>
            </div>
            <div className="d-flex column g-4px">
                <label htmlFor="whatsapp_number">{t("whatsappNumber")}</label>
                <input
                    type="tel"
                    id="whatsapp_number"
                    name="whatsapp_number"
                    value={formData.whatsapp_number}
                    onChange={handleInputChange}
                    className="cool-input"
                    placeholder="+244 123 456 789"
                />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content d-flex column g-20px">
            <div className="d-flex column g-4px">
              <h2 className="size-18 medium">{t("step3Title")}</h2>
              <p>{t("step3Description")}</p>
            </div>
            <div className="d-flex column g-4px">
              <label>{t("location")}</label>
              <div className="location-input-group">
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={locationLoading}
                  className="location-button"
                >
                  {locationLoading ? t("gettingLocation") : t("getLocation")}
                </button>
              </div>
              {locationError && (
                <div className="location-error">{locationError}</div>
              )}
              {locationData.lat && locationData.lng && (
                <div className="location-success">
                  📍 {t("locationCaptured")}: {locationData.lat.toFixed(6)},{" "}
                  {locationData.lng.toFixed(6)}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content d-flex column g-20px">
            <div className="d-flex column g-4px">
              <h2 className="size-18 medium">{t("step4Title")}</h2>
              <p>{t("step4Description")}</p>
            </div>
            <div className="d-flex column g-4px">
              <label htmlFor="sector_id">{t("sector")}</label>
              <select
                id="sector_id"
                name="sector_id"
                value={formData.sector_id}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">{t("selectSector")}</option>
                {sectors.map((sector) => (
                  <option key={sector.id} value={sector.id}>
                    {sector.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex column g-4px">
              <label htmlFor="plan_id">{t("plan")}</label>
              <select
                id="plan_id"
                name="plan_id"
                value={formData.plan_id}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="">{t("selectPlan")}</option>
                {plans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - {plan.price ? `$${plan.price}` : t("free")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!session) {
    return (
      <div className="loading-container">
        <p>{t("loading")}</p>
      </div>
    );
  }

  return (
    <div className="all-center">
      <div className="institution-details-container">
        <div className="form-container w-full d-flex column g-32px">
          <div className="d-flex column g-4px">
            <h1 className="size-24 medium">{t("institutionDetails")}</h1>
            <p className="size-12">{t("completeInstitutionProfile")}</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="institution-form">
            {renderStepContent()}

            <div className="step-navigation">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn btn-br"
                >
                  {t("previous")}
                </button>
              )}

              {currentStep < totalSteps ? (
                <div className="d-flex items-center justify-end w-full">
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!canProceedToNext()}
                    className="btn btn-br btn-primary"
                  >
                    {t("next")}
                  </button>
                </div>
              ) : (
                <div className="d-flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={loading || !canProceedToNext()}
                    className="btn btn-br btn-primary w-full"
                  >
                    {loading ? t("saving") : t("saveInstitution")}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InstitutionDetails;
