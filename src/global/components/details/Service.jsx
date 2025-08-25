import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { supabase } from "../../../../supabaseClient";
import { useTranslation } from "react-i18next";
import Header from "../Header";

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
          `*, 
           service_translations(name, description, language_code), 
           user:users(
             name, 
             whatsapp_number, 
             sector:sectors(
               id, 
               sector_translations(name, language_code)
             )
           ), 
           categories(id, category_translations(name, language_code))`
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

  function open_whatsapp(number, message = "") {
    const clean_number = number.replace(/\D/g, "");
    const url = `https://wa.me/${clean_number}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  }

  const handle_whastapp = (whatsapp_number, name, company_id) => {
    // Prefixa o company_id antes da mensagem
    const fullMessage = `${company_id} ${t("greetings_service")} ${name}`;
    open_whatsapp(whatsapp_number, fullMessage);
  };

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
    <div className="padding-inside mt-100 d-flex items-center justify-center rs-mt-0">
      <div className="service-details relative">
        <div className="img-svc-dtls relative">
          <img
            src={service.image_url || "../assets/images/app-logo.svg"}
            alt={service.name}
          />
          <span className="abs-inst-name hidden">{service.price} kz</span>
        </div>

        <button className="abs-return" onClick={() => window.history.back()}>
          <i className="fi fi-rr-angle-small-left"></i>
        </button>
        <div className="d-flex column g-32px p-16">
          <div className="d-flex column g-8px">
            <h2 className="size-24 extra-bold">{service.name}</h2>
            <p className="size-16">{service.description}</p>
          </div>
          <div className="d-flex column g-12px">
            <p className="size-16">
              <strong>{t("service")} </strong>{" "}
              {service.categories?.category_translations?.find(
                (tr) => tr.language_code === i18n.language
              )?.name || "N/A"}
            </p>
            <NavLink className="d-flex items-center g-12px">
              <img
                src={service.user?.logo_url || "../assets/images/app-logo.svg"}
                alt={service.user?.name || "N/A"}
                className="default-user"
              />
              <div className="d-flex column">
                <span>{service.user?.name || "N/A"}</span>
                <span className="size-12 color-opac">
                  {service.user?.sector?.sector_translations?.find(
                    (tr) => tr.language_code === i18n.language
                  )?.name || "N/A"}
                </span>
              </div>
            </NavLink>
          </div>
          <button
            onClick={() =>
              handle_whastapp(
                service.whatsapp_number,
                service.name,
                service.user_id
              )
            }
            className="huge-btn huge-green d-flex items-center justify-center g-12px"
          >
            <i className="fi fi-brands-whatsapp"></i>
            <span>{t("request_on_whastapp")}</span>
            <span>{service.price} kz</span>
          </button>
        </div>
      </div>
    </div>
  );
}
