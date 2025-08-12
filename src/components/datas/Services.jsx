import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../../supabaseClient.js";

export default function Services() {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    loadServices();
    loadCategories();
  }, []);

  useEffect(() => {
    filterServices();
  }, [services, searchTerm, selectedCategory]);

  const loadServices = async () => {
    try {
      setLoading(true);

      // Get current session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const userId = session.user.id;

      // Fetch services with category names
      const { data, error } = await supabase
        .from("services")
        .select(
          `
          *,
          service_translations!inner(name, language_code),
          categories!inner(
            id,
            category_translations!inner(name, language_code)
          )
        `
        )
        .eq("user_id", userId)
        .eq("service_translations.language_code", "pt")
        .eq("categories.category_translations.language_code", "pt")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading services:", error);
        return;
      }

      // Process the data to flatten the structure
      const processedServices = data.map((service) => ({
        id: service.id,
        name: service.service_translations[0]?.name || "Sem nome",
        description: service.description,
        price: service.price,
        imageUrl: service.image_url,
        categoryId: service.categories?.id,
        categoryName:
          service.categories?.category_translations[0]?.name || "Sem categoria",
        createdAt: service.created_at,
        user_id: service.user_id,
      }));

      setServices(processedServices);
    } catch (error) {
      console.error("Error loading services:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      // Get current session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const userId = session.user.id;

      // Fetch categories
      const { data, error } = await supabase
        .from("categories")
        .select(
          `
          id,
          category_translations!inner(name, language_code)
        `
        )
        .eq("user_id", userId)
        .eq("category_translations.language_code", "pt");

      if (error) {
        console.error("Error loading categories:", error);
        return;
      }

      const processedCategories = data.map((category) => ({
        id: category.id,
        name: category.category_translations[0]?.name || "Sem nome",
      }));

      setCategories(processedCategories);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const filterServices = () => {
    let filtered = services;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (service) => service.categoryId === selectedCategory
      );
    }

    setFilteredServices(filtered);
  };

  const formatRelativeDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Hoje";
    if (diffDays === 2) return "Ontem";
    if (diffDays <= 7) return `${diffDays - 1} dias atrás`;
    if (diffDays <= 30) return `${Math.floor(diffDays / 7)} semanas atrás`;
    if (diffDays <= 365) return `${Math.floor(diffDays / 30)} meses atrás`;
    return `${Math.floor(diffDays / 365)} anos atrás`;
  };

  const handleEditService = (serviceId) => {
    // Navigate to edit service page
    window.location.href = `/edit-service/${serviceId}`;
  };

  return (
    <div className="overflow-services d-flex column g-32px p-24">
      <h5 className="medium size-18">
        {t("services")}
        {searchTerm && (
          <span className="text-secondary size-14 ml-8">
            - {t("searchResultsFor")} "{searchTerm}"
          </span>
        )}
        {selectedCategory !== "all" && (
          <span className="text-secondary size-14 ml-8">
            - {t("filteredBy")}{" "}
            {categories.find((cat) => cat.id === selectedCategory)?.name ||
              t("category")}
          </span>
        )}
      </h5>

      {loading ? (
        <div
          className="d-flex items-center justify-center"
          style={{ minHeight: "200px" }}
        >
          <span className="size-14 text-secondary">{t("loadingServices")}</span>
        </div>
      ) : filteredServices.length === 0 ? (
        <div
          className="d-flex items-center justify-center"
          style={{ minHeight: "200px" }}
        >
          <div className="d-flex column items-center g-16px">
            <i className="fi fi-sr-box size-48 text-secondary"></i>
            <span className="size-14 text-secondary text-center">
              {searchTerm || selectedCategory !== "all"
                ? t("noServicesFoundWithFilters")
                : t("noServicesRegistered")}
            </span>
          </div>
        </div>
      ) : (
        <div className="grid-services">
          {filteredServices.map((service) => (
            <div key={service.id} className="service-item d-flex column g-8px">
              {service.imageUrl ? (
                <div className="product-image">
                  <img src={service.imageUrl} alt={service.name} />
                </div>
              ) : (
                <div className="product-avatar">
                  <i className="fi fi-sr-box"></i>
                </div>
              )}
              <div className="d-flex items-center justify-between p-s-8">
                <div className="d-flex column g-4px">
                  <b className="medium size-14">
                    {service.name.length > 16
                      ? service.name.substring(0, 16) + "..."
                      : service.name}
                  </b>
                  <span className="size-12 text-secondary">
                    {service.categoryName}
                  </span>
                </div>
                <div className="d-flex items-center g-8px">
                  <div className="d-flex items-center g-4px opa-6">
                    <i className="fi fi-sr-clock size-12"></i>
                    <span className="size-12">
                      {formatRelativeDate(service.createdAt)}
                    </span>
                  </div>
                  <button
                    className="btn btn-sm btn-br"
                    onClick={() => handleEditService(service.id)}
                  >
                    <i className="fi fi-rr-edit size-12"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
