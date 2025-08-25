import React from "react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { supabase } from "../../../../supabaseClient.js";
import { NavLink, useNavigate } from "react-router-dom";

export default function HomeServices() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [userLocation, setUserLocation] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  // Carrega categorias dos setores próximos
  useEffect(() => {
    const fetchCategories = async () => {
      if (!userLocation) return;
      // Busca setores próximos (instituições)
      let { data: users } = await supabase
        .from("users")
        .select("sector_id")
        .eq("role", "institution");
      const sectorIds = [
        ...new Set((users || []).map((u) => u.sector_id).filter(Boolean)),
      ];
      if (sectorIds.length === 0) return;
      // Busca categorias desses setores
      const lang = i18n.language || "pt";
      let { data: cats } = await supabase
        .from("categories")
        .select(`id, sector_id, category_translations(name, language_code)`)
        .in("sector_id", sectorIds)
        .order("id");
      // Filtra traduções pela língua
      const processed = (cats || []).map((cat) => {
        let name = "Sem nome";
        if (Array.isArray(cat.category_translations)) {
          const found = cat.category_translations.find(
            (tr) => tr.language_code === lang
          );
          name =
            found?.name || cat.category_translations[0]?.name || "Sem nome";
        }
        return { id: cat.id, name };
      });
      setCategories(processed);
    };
    fetchCategories();
  }, [userLocation, i18n.language]);

  // Função para calcular distância entre dois pontos (Haversine)
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
    const R = 6371; // km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Pega localização do usuário (se não tiver no localStorage)
  useEffect(() => {
    const stored = localStorage.getItem("user_location");
    if (stored) {
      setUserLocation(JSON.parse(stored));
    } else {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            setUserLocation(coords);
            localStorage.setItem("user_location", JSON.stringify(coords));
          },
          (err) => {
            setUserLocation(null);
          }
        );
      } else {
        setUserLocation(null);
      }
    }
  }, []);

  // Busca instituições próximas e seus serviços
  useEffect(() => {
    const fetchNearbyServices = async () => {
      if (!userLocation) {
        setLoading(false);
        return;
      }
      setLoading(true);
      // Busca users role institution
      let { data: users, error: userError } = await supabase
        .from("users")
        .select("id, name, location, whatsapp_number")
        .eq("role", "institution");
      if (userError) {
        setLoading(false);
        return;
      }
      // Filtra users com location válida e calcula distância
      const usersWithDistance = users
        .map((u) => {
          if (!u.location) return null;
          const match = u.location.match(
            /Lat:\s*(-?\d+\.\d+),\s*Lng:\s*(-?\d+\.\d+)/
          );
          if (!match) return null;
          const lat = parseFloat(match[1]);
          const lng = parseFloat(match[2]);
          const dist = getDistanceFromLatLonInKm(
            userLocation.lat,
            userLocation.lng,
            lat,
            lng
          );
          return { ...u, lat, lng, dist };
        })
        .filter((u) => u && u.dist <= 70)
        .sort((a, b) => a.dist - b.dist);

      const institutionIds = usersWithDistance.map((u) => u.id);
      if (institutionIds.length === 0) {
        setServices([]);
        setLoading(false);
        return;
      }
      // Busca serviços dessas instituições
      const lang = i18n.language || "pt";
      let { data: servicesData, error: servicesError } = await supabase
        .from("services")
        .select(
          `*, service_translations(name, language_code), categories(id, category_translations(name, language_code)), user:users!inner(name, whatsapp_number)`
        )
        .in("user_id", institutionIds)
        .eq("service_translations.language_code", lang)
        .eq("categories.category_translations.language_code", lang)
        .order("created_at", { ascending: false })
        .limit(8); // Limitar a busca para no máximo 8 serviços
      if (servicesError) {
        setServices([]);
        setLoading(false);
        return;
      }
      // Processa serviços
      let filtered = servicesData.map((service) => {
        let serviceName = "Sem nome";
        if (Array.isArray(service.service_translations)) {
          const found = service.service_translations.find(
            (tr) => tr.language_code === lang
          );
          serviceName =
            found?.name || service.service_translations[0]?.name || "Sem nome";
        }
        // Descobre a distância da instituição deste serviço
        const inst = usersWithDistance.find((u) => u.id === service.user_id);
        return {
          id: service.id,
          name: serviceName,
          description: service.description,
          price: service.price,
          imageUrl: service.image_url,
          categoryId: service.categories?.id,
          institutionName: service.user?.name || "Instituição",
          createdAt: service.created_at,
          user_id: service.user_id,
          dist: inst ? inst.dist : 9999,
          whatsapp_number: service.user?.whatsapp_number || "",
          plan_id: inst?.plan_id || null, // Corrigir para acessar o plan_id do usuário relacionado
        };
      });
      // Filtro por categoria
      if (selectedCategory !== "all") {
        filtered = filtered.filter((s) => s.categoryId === selectedCategory);
      }
      // Filtro por busca
      if (searchTerm.trim() !== "") {
        filtered = filtered.filter(
          (s) =>
            s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (s.description || "")
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
      }
      filtered = filtered.sort((a, b) => a.dist - b.dist);
      setServices(filtered);
      setLoading(false);
    };
    if (userLocation) fetchNearbyServices();
  }, [userLocation, i18n.language, selectedCategory, searchTerm]);

  function open_whatsapp(number, message = "") {
    const clean_number = number.replace(/\D/g, "");
    const url = `https://wa.me/${clean_number}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  }

  const handle_whastapp = (whatsapp_number, name, company_id) => {
    // Prefixa o company_id antes da mensagem
    const fullMessage = `${company_id} Olá, tenho interesse no serviço: ${name}`;
    open_whatsapp(whatsapp_number, fullMessage);
  };

  return (
    <section className="show-products-home">
      <div className="d-flex column g-32px w-full rs-p-16">
        <div className="d-flex items-center justify-between">
          <h3 className="size-20 extra-bold">
            {t("discover_service_categories")}
          </h3>
          <NavLink className="hover-change-color d-flex items-center g-8px hidden">
            <span>{t("see_all")}</span>
            <i className="fi fi-rr-arrow-small-right"></i>
          </NavLink>
        </div>
        <div className="d-flex w-full items-center justify-center">
          <div className="d-flex items-center wrap g-20px categories-classes">
            <button
              className={selectedCategory === "all" ? "active" : ""}
              onClick={() => setSelectedCategory("all")}
            >
              {t("all_categories")}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={selectedCategory === cat.id ? "active" : ""}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
        <div className="d-flex w-full">
          {loading ? (
            <div
              className="d-flex items-center justify-center w-full"
              style={{ minHeight: "200px" }}
            >
              <span className="loadering"></span>
            </div>
          ) : services.length === 0 ? (
            <div className="d-flex items-center justify-center w-full">
              <div className="d-flex column items-center g-16px">
                <i className="fi fi-sr-box size-48 text-secondary"></i>
                <span className="size-14 text-secondary text-center">
                  {t(
                    "no_services_found_near_you",
                    "Nenhum serviço encontrado próximo de você."
                  )}
                </span>
              </div>
            </div>
          ) : (
            <div className="services-gridden w-full">
              {services.map((service) => (
                <button
                  onClick={
                    () => navigate(`/service/${service.id}`) // Passa o ID do serviço para a rota
                  }
                  key={service.id}
                  className="service-item d-flex column g-8px relative"
                >
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
                      <b className="medium size-16">
                        {service.name.length > 16
                          ? service.name.substring(0, 16) + "..."
                          : service.name}
                      </b>
                      <span className="color-opac size-12 d-flex items-center g-4px">
                        <i className="fi fi-rr-marker color-opac"></i>
                        <span className="color-opac size-12">
                          {service.institutionName}
                        </span>
                        {service.plan_id && (
                          <span className="pro-inst">PRO</span>
                        )}
                      </span>
                      <span className="abs-inst-name">{service.price} kz</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
