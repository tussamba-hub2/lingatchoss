import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../../supabaseClient.js";
import Category from "./Category.jsx";
import i18n from "../../i18n.js";

export default function Service() {
  const { t } = useTranslation();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 8; // Increased to 8 steps: 4 original + 4 translation steps
  const [showAddCategory, setShowAddCategory] = useState(false);

  // Form data for services table
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category_id: "",
    image_url: "",
  });

  // Translation data for all 4 languages
  const [translations, setTranslations] = useState({
    pt: { name: "", description: "" },
    en: { name: "", description: "" },
    fr: { name: "", description: "" },
    umb: { name: "", description: "" },
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Categories for dropdown
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        return;
      }
      setSession(session);
    });

    // Load categories
    loadCategories();
  }, []);

  // Reload categories when language changes
  useEffect(() => {
    loadCategories();
  }, [i18n.language]);

  const loadCategories = async () => {
    try {
      // Get current language from i18n
      const currentLanguage = i18n.language || "pt";

      // Get categories with their translations for current language
      const { data: categoriesData, error } = await supabase
        .from("categories")
        .select(
          `
          id,
          user_id,
          sector_id,
          created_at,
          category_translations!inner(
            id,
            language_code,
            name,
            description
          )
        `
        )
        .eq("category_translations.language_code", currentLanguage);

      if (error) {
        console.error("Error loading categories:", error);
        return;
      }

      console.log("Categories data:", categoriesData);

      // Transform data to include name from current language translation
      const transformedCategories =
        categoriesData?.map((category) => ({
          id: category.id,
          name: category.category_translations?.[0]?.name || "Sem nome",
          description: category.category_translations?.[0]?.description || "",
        })) || [];

      setCategories(transformedCategories);
    } catch (err) {
      console.error("Error loading categories:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTranslationChange = (language, field, value) => {
    setTranslations((prev) => ({
      ...prev,
      [language]: {
        ...prev[language],
        [field]: value,
      },
    }));
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Por favor, selecione apenas arquivos de imagem.");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("A imagem deve ter menos de 5MB.");
        return;
      }

      setImageFile(file);
      setFormData((prev) => ({ ...prev, image_url: "" })); // Clear URL when file is selected

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, image_url: value }));
    setImageFile(null);
    setImagePreview(null);
  };

  const uploadImageToSupabase = async (file) => {
    try {
      setUploadingImage(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${session.user.id}/${fileName}`;

      const { data, error } = await supabase.storage
        .from("service-images")
        .upload(filePath, file);

      if (error) {
        throw error;
      }

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("service-images").getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Erro ao fazer upload da imagem");
    } finally {
      setUploadingImage(false);
    }
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
      case 3:
        return formData.category_id !== "";
      case 4:
        return formData.price !== "" && parseFloat(formData.price) >= 0;
      case 5:
        // Portuguese translation
        return (
          translations.pt.name.trim() !== "" &&
          translations.pt.description.trim() !== ""
        );
      case 6:
        // English translation
        return (
          translations.en.name.trim() !== "" &&
          translations.en.description.trim() !== ""
        );
      case 7:
        // French translation
        return (
          translations.fr.name.trim() !== "" &&
          translations.fr.description.trim() !== ""
        );
      case 8:
        // Umbundu translation - not required
        return true;
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

      let finalImageUrl = formData.image_url;

      // Upload image if file is selected
      if (imageFile) {
        try {
          finalImageUrl = await uploadImageToSupabase(imageFile);
        } catch (uploadError) {
          setError(uploadError.message);
          return;
        }
      }

      console.log("Submitting service data:", {
        category_id: formData.category_id,
        user_id: session.user.id,
        price: parseFloat(formData.price) || 0,
        image_url: finalImageUrl,
      });

      // First, insert service data
      const { data: serviceData, error: serviceError } = await supabase
        .from("services")
        .insert({
          category_id: formData.category_id,
          user_id: session.user.id,
          price: parseFloat(formData.price) || 0,
          image_url: finalImageUrl || null,
        })
        .select()
        .single();

      if (serviceError) {
        console.error("Service error:", serviceError);
        setError(`Erro ao salvar serviço: ${serviceError.message}`);
        return;
      }

      // Then, insert translations for all languages
      if (serviceData) {
        const translationData = [];

        // Add translations for each language
        Object.entries(translations).forEach(([languageCode, translation]) => {
          if (
            translation.name.trim() !== "" &&
            translation.description.trim() !== ""
          ) {
            translationData.push({
              service_id: serviceData.id,
              language_code: languageCode,
              name: translation.name,
              description: translation.description,
            });
          }
        });

        if (translationData.length > 0) {
          const { error: translationError } = await supabase
            .from("service_translations")
            .insert(translationData);

          if (translationError) {
            console.error("Error saving translations:", translationError);
            // Don't fail the whole process if translation save fails
          }
        }
      }

      // Success! Reset form and show success message
      setFormData({
        name: "",
        description: "",
        price: "",
        category_id: "",
        image_url: "",
      });
      setTranslations({
        pt: { name: "", description: "" },
        en: { name: "", description: "" },
        fr: { name: "", description: "" },
        umb: { name: "", description: "" },
      });
      setImageFile(null);
      setImagePreview(null);
      setCurrentStep(1);
      setError(null);
      // You could add a success message here
    } catch (err) {
      setError("Erro ao salvar serviço");
      console.error("Error saving service:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryAdded = () => {
    setShowAddCategory(false);
    loadCategories(); // Reload categories after adding new one
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content d-flex column g-20px">
            <div className="d-flex column g-4px">
              <h2 className="size-18 medium">{t("step1ServiceTitle")}</h2>
              <p>{t("step1ServiceDescription")}</p>
            </div>
            <div className="d-flex column g-4px">
              <label htmlFor="name">{t("serviceName")}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="cool-input"
                placeholder={t("serviceNamePlaceholder")}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-content d-flex column g-20px">
            <div className="d-flex column g-4px">
              <h2 className="size-18 medium">{t("step2ServiceTitle")}</h2>
              <p>{t("step2ServiceDescription")}</p>
            </div>
            <div className="d-flex column g-4px">
              <label htmlFor="description">{t("serviceDescription")}</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="cool-input"
                rows="4"
                placeholder={t("serviceDescriptionPlaceholder")}
              />
            </div>
            <div className="d-flex column g-4px">
              <label>{t("serviceImage")}</label>

              {/* Image URL Input */}
              <div className="d-flex column g-8px">
                <label htmlFor="image_url" className="small">
                  {t("serviceImageUrl")}
                </label>
                <input
                  type="url"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleImageUrlChange}
                  className="cool-input"
                  placeholder={t("serviceImagePlaceholder")}
                  disabled={imageFile !== null}
                />
              </div>

              {/* OR separator */}
              <div className="d-flex items-center g-8px">
                <span className="line-sharp flex-1"></span>
                <span className="small text-secondary">{t("or")}</span>
                <span className="line-sharp flex-1"></span>
              </div>

              {/* File Upload */}
              <div className="d-flex column g-8px">
                <label htmlFor="image_file" className="small">
                  {t("serviceImageFile")}
                </label>
                <input
                  type="file"
                  id="image_file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="cool-input"
                  disabled={formData.image_url !== ""}
                />
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="d-flex column g-8px">
                  <label className="small">{t("serviceImagePreview")}</label>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="image-preview"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              {/* Upload Status */}
              {uploadingImage && (
                <div className="d-flex items-center g-8px">
                  <div className="loading-spinner"></div>
                  <span className="small">{t("uploadingImage")}</span>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content d-flex column g-20px">
            <div className="d-flex column g-4px">
              <h2 className="size-18 medium">{t("step3ServiceTitle")}</h2>
              <p>{t("step3ServiceDescription")}</p>
            </div>
            <div className="d-flex column g-4px">
              <label>{t("serviceCategory")}</label>
              <div className="categories-grid">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        category_id: category.id,
                      }))
                    }
                    className={`btn btn-br ${
                      formData.category_id === category.id ? "active" : ""
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <div className="d-flex items-center justify-center g-12px">
                <button
                  type="button"
                  onClick={() => setShowAddCategory(true)}
                  className="btn btn-br"
                >
                  <i className="fi fi-rr-plus"></i>
                  <span>{t("addCategory")}</span>
                </button>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content d-flex column g-20px">
            <div className="d-flex column g-4px">
              <h2 className="size-18 medium">{t("step4ServiceTitle")}</h2>
              <p>{t("step4ServiceDescription")}</p>
            </div>
            <div className="d-flex column g-4px">
              <label htmlFor="price">{t("servicePrice")}</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="cool-input"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content d-flex column g-20px">
            <div className="d-flex column g-4px">
              <h2 className="size-18 medium">{t("step5ServiceTitle")}</h2>
              <p>{t("step5ServiceDescription")}</p>
            </div>
            <div className="d-flex column g-8px">
              <label htmlFor="pt_name">Nome em Português</label>
              <input
                type="text"
                id="pt_name"
                value={translations.pt.name}
                onChange={(e) =>
                  handleTranslationChange("pt", "name", e.target.value)
                }
                className="cool-input"
                placeholder="Nome do serviço em português"
              />
            </div>
            <div className="d-flex column g-8px">
              <label htmlFor="pt_description">Descrição em Português</label>
              <textarea
                id="pt_description"
                value={translations.pt.description}
                onChange={(e) =>
                  handleTranslationChange("pt", "description", e.target.value)
                }
                className="cool-input"
                rows="3"
                placeholder="Descrição do serviço em português"
              />
            </div>
          </div>
        );

      case 6:
        return (
          <div className="step-content d-flex column g-20px">
            <div className="d-flex column g-4px">
              <h2 className="size-18 medium">{t("step6ServiceTitle")}</h2>
              <p>{t("step6ServiceDescription")}</p>
            </div>
            <div className="d-flex column g-8px">
              <label htmlFor="en_name">Name in English</label>
              <input
                type="text"
                id="en_name"
                value={translations.en.name}
                onChange={(e) =>
                  handleTranslationChange("en", "name", e.target.value)
                }
                className="cool-input"
                placeholder="Service name in English"
              />
            </div>
            <div className="d-flex column g-8px">
              <label htmlFor="en_description">Description in English</label>
              <textarea
                id="en_description"
                value={translations.en.description}
                onChange={(e) =>
                  handleTranslationChange("en", "description", e.target.value)
                }
                className="cool-input"
                rows="3"
                placeholder="Service description in English"
              />
            </div>
          </div>
        );

      case 7:
        return (
          <div className="step-content d-flex column g-20px">
            <div className="d-flex column g-4px">
              <h2 className="size-18 medium">{t("step7ServiceTitle")}</h2>
              <p>{t("step7ServiceDescription")}</p>
            </div>
            <div className="d-flex column g-8px">
              <label htmlFor="fr_name">Nom en Français</label>
              <input
                type="text"
                id="fr_name"
                value={translations.fr.name}
                onChange={(e) =>
                  handleTranslationChange("fr", "name", e.target.value)
                }
                className="cool-input"
                placeholder="Nom du service en français"
              />
            </div>
            <div className="d-flex column g-8px">
              <label htmlFor="fr_description">Description en Français</label>
              <textarea
                id="fr_description"
                value={translations.fr.description}
                onChange={(e) =>
                  handleTranslationChange("fr", "description", e.target.value)
                }
                className="cool-input"
                rows="3"
                placeholder="Description du service en français"
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className="step-content d-flex column g-20px">
            <div className="d-flex column g-4px">
              <h2 className="size-18 medium">{t("step8ServiceTitle")}</h2>
              <p>{t("step8ServiceDescription")}</p>
            </div>
            <div className="d-flex column g-8px">
              <label htmlFor="umb_name">Litunga mu Umbundu</label>
              <input
                type="text"
                id="umb_name"
                value={translations.umb.name}
                onChange={(e) =>
                  handleTranslationChange("umb", "name", e.target.value)
                }
                className="cool-input"
                placeholder="Litunga lya ovisanju mu Umbundu"
              />
            </div>
            <div className="d-flex column g-8px">
              <label htmlFor="umb_description">Eci mu Umbundu</label>
              <textarea
                id="umb_description"
                value={translations.umb.description}
                onChange={(e) =>
                  handleTranslationChange("umb", "description", e.target.value)
                }
                className="cool-input"
                rows="3"
                placeholder="Eci lya ovisanju mu Umbundu"
              />
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
            <h2 className="size-18 bold">{t("new_service")}</h2>
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
                    {loading ? t("saving") : t("saveService")}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Category Modal */}
      {showAddCategory && (
        <Category
          onClose={() => setShowAddCategory(false)}
          onCategoryAdded={handleCategoryAdded}
        />
      )}
    </div>
  );
}
