import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../../supabaseClient.js";
import i18n from "../../i18n.js";

export default function Category({ onClose, onCategoryAdded }) {
  const { t } = useTranslation();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;

  // Form data for categories table
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_active: true,
  });

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        return;
      }
      setSession(session);
    });
  }, []);

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
        return formData.description.trim() !== "";
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

      // First, insert category data
      const { data: categoryData, error: categoryError } = await supabase
        .from("categories")
        .insert({
          user_id: session.user.id,
          sector_id: null, // You might want to add sector selection later
        })
        .select()
        .single();

      if (categoryError) {
        setError(categoryError.message);
        return;
      }

      // Then, insert translations for all 4 languages
      if (categoryData) {
        const currentLanguage = i18n.language || "pt";

        // Create translations array with current language as primary
        const translations = [
          {
            language_code: currentLanguage,
            name: formData.name,
            description: formData.description,
          },
        ];

        // Add other languages with same content (can be customized later)
        const allLanguages = ["pt", "en", "fr", "umb"];
        allLanguages.forEach((lang) => {
          if (lang !== currentLanguage) {
            translations.push({
              language_code: lang,
              name: formData.name,
              description: formData.description,
            });
          }
        });

        const { error: translationError } = await supabase
          .from("category_translations")
          .insert(
            translations.map((translation) => ({
              category_id: categoryData.id,
              language_code: translation.language_code,
              name: translation.name,
              description: translation.description,
            }))
          );

        if (translationError) {
          console.error("Error saving translations:", translationError);
          // Don't fail the whole process if translation save fails
        }
      }

      // Success! Call callback and close modal
      onCategoryAdded();
    } catch (err) {
      setError("Erro ao salvar categoria");
      console.error("Error saving category:", err);
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
              <h2 className="size-18 medium">{t("step1CategoryTitle")}</h2>
              <p>{t("step1CategoryDescription")}</p>
            </div>
            <div className="d-flex column g-4px">
              <label htmlFor="name">{t("categoryName")}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="cool-input"
                placeholder={t("categoryNamePlaceholder")}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content d-flex column g-20px">
            <div className="d-flex column g-4px">
              <h2 className="size-18 medium">{t("step2CategoryTitle")}</h2>
              <p>{t("step2CategoryDescription")}</p>
            </div>
            <div className="d-flex column g-4px">
              <label htmlFor="description">{t("categoryDescription")}</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="cool-input"
                rows="4"
                placeholder={t("categoryDescriptionPlaceholder")}
              />
            </div>
            <div className="d-flex column g-4px">
              <label className="d-flex items-center g-8px">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      is_active: e.target.checked,
                    }))
                  }
                />
                <span>{t("categoryActive")}</span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="search-modal d-flex items-center justify-center g-20px column">
      <div className="service-form d-flex items-center justify-center column g-12px p-16 relative">
        <div className="d-flex column g-32px form-inside">
          <div className="d-flex column g-4px">
            <span className="text-secondary">{t("add_a")}</span>
            <h2 className="size-18 bold">{t("new_category")}</h2>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="service-form-content">
            {renderStepContent()}

            <div className="step-navigation">
              {currentStep > 1 && (
                <button type="button" onClick={prevStep} className="btn btn-br">
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
                    {loading ? t("saving") : t("saveCategory")}
                  </button>
                </div>
              )}
            </div>
          </form>

          <button type="button" onClick={onClose} className="btn btn-br">
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
}
