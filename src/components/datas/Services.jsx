import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "../../../supabaseClient.js";

export default function Services() {
  const { t } = useTranslation();
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm /* setSearchTerm */] = useState("");
  const [selectedCategory /* setSelectedCategory */] = useState("all");
  const [filteredServices, setFilteredServices] = useState([]);

  useEffect(() => {
    loadServices();
    loadCategories();
  }, []);

  useEffect(() => {
    // inline filter to avoid extra dependency reference
    let filtered = services;
    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (service) => service.categoryId === selectedCategory
      );
    }
    setFilteredServices(filtered);
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
    <div style={{ display: "grid", gap: 16, padding: 16 }}>
      <div>
        <h5
          style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#0f172a" }}
        >
          {t("services")}
          {searchTerm && (
            <span style={{ color: "#64748b", fontSize: 14, marginLeft: 8 }}>
              - {t("searchResultsFor")} "{searchTerm}"
            </span>
          )}
          {selectedCategory !== "all" && (
            <span style={{ color: "#64748b", fontSize: 14, marginLeft: 8 }}>
              - {t("filteredBy")}{" "}
              {categories.find((cat) => cat.id === selectedCategory)?.name ||
                t("category")}
            </span>
          )}
        </h5>
      </div>

      {loading ? (
        <div
          style={{
            minHeight: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: 14, color: "#64748b" }}>
            {t("loadingServices")}
          </span>
        </div>
      ) : filteredServices.length === 0 ? (
        <div
          style={{
            minHeight: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ display: "grid", gap: 16, justifyItems: "center" }}>
            <span style={{ fontSize: 48, color: "#94a3b8" }}>⌂</span>
            <span
              style={{ fontSize: 14, color: "#64748b", textAlign: "center" }}
            >
              {searchTerm || selectedCategory !== "all"
                ? t("noServicesFoundWithFilters")
                : t("noServicesRegistered")}
            </span>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {filteredServices.map((service) => {
            const placeholder = "./assets/images/app-logo.png";
            return (
              <div
                key={service.id}
                style={{
                  background: "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                  overflow: "hidden",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{ width: "100%", height: 140, background: "#f1f5f9" }}
                >
                  <img
                    src={service.imageUrl || placeholder}
                    alt={service.name}
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <b style={{ margin: 0, fontSize: 14, color: "#0f172a" }}>
                      {service.name.length > 16
                        ? service.name.substring(0, 16) + "..."
                        : service.name}
                    </b>
                    <span style={{ fontSize: 12, color: "#64748b" }}>
                      {formatRelativeDate(service.createdAt)}
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>
                    {service.categoryName}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      marginTop: 6,
                    }}
                  >
                    <button
                      onClick={() => handleEditService(service.id)}
                      style={{
                        background: "#f1f5f9",
                        padding: "8px 10px",
                        borderRadius: 8,
                        color: "#0f172a",
                        fontWeight: 600,
                        border: 0,
                        cursor: "pointer",
                      }}
                    >
                      {t("editService")}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
