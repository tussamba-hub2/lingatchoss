import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../../../supabaseClient";
import { useTranslation } from "react-i18next";

export default function Service() {
  const { t } = useTranslation();
  const { serviceId } = useParams();
  const { i18n } = useTranslation();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      const lang = i18n.language || "pt"; // Obtém o idioma atual
      const { data, error } = await supabase
        .from("services")
        .select(
          `*, service_translations(name, description, language_code), user:users(name, whatsapp_number), categories(id, category_translations(name, language_code))`
        )
        .eq("id", serviceId)
        .eq("service_translations.language_code", lang) // Filtra pelo idioma
        .single();

      if (error) {
        console.error("Error fetching service:", error);
      } else {
        // Processa as traduções do serviço
        let serviceName = "Sem nome";
        let serviceDescription = "Sem descrição";
        if (Array.isArray(data.service_translations)) {
          const found = data.service_translations.find(
            (tr) => tr.language_code === lang
          );
          serviceName =
            found?.name || data.service_translations[0]?.name || "Sem nome";
          serviceDescription =
            found?.description ||
            data.service_translations[0]?.description ||
            "Sem descrição";
        }
        setService({
          ...data,
          name: serviceName,
          description: serviceDescription,
        });
      }
      setLoading(false);
    };

    if (serviceId) {
      fetchService();
    }
  }, [serviceId, i18n.language]);

  if (loading) {
    return (
      <div className="all-center">
        <span className="loadering"></span>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="all-center">
        <div className="d-flex column g-32px items-center">
          <div className="d-flex column g-12px items-center">
            <img
              src="../assets/images/app-logo.svg"
              alt="Linga Tchoss Logo"
              className="struct-size"
            />
            <h3 className="size-20 extra-bold">{t("service_not_found")}</h3>
          </div>
          <div className="d-flex items-center g-20px">
            <button className="huge-btn" onClick={() => window.history.back()}>
              <i className="fi fi-rr-couch"></i>
              <span>{t("go_back_home")}</span>
            </button>
            <button className="huge-btn huge-br">
              <i className="fi fi-rr-phone-flip"></i>
              <span>{t("contact_support")}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>{service.name}</h1>
      <p>{service.description}</p>
      <p>Price: {service.price} KZ</p>
      <p>Category: {service.categories?.name || "N/A"}</p>
      <p>Institution: {service.user?.name || "N/A"}</p>
      <p>WhatsApp: {service.user?.whatsapp_number || "N/A"}</p>
    </div>
  );
}
