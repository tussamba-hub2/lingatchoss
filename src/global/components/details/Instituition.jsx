import React, { useEffect, useState } from "react";
import { supabase } from "../../../../supabaseClient";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

const Instituition = ({ id }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();

  // Prefer id from prop, else from route param ":id"
  const institutionId = id || params.id;

  const [institution, setInstitution] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstitutionAndServices = async () => {
      console.debug("[Instituition] effect start", {
        institutionId,
        lang: i18n.language,
      });
      if (!institutionId) {
        console.warn("[Instituition] institutionId missing, aborting fetch.");
        setInstitution(null);
        setServices([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      const lang = i18n.language || "pt";

      try {
        // Fetch institution from users (role = institution)
        console.debug("[Instituition] fetching institution", { institutionId });
        const { data: user, error: userError } = await supabase
          .from("users")
          .select(
            `id, name, logo_url, whatsapp_number, location, plan_id,
             sector:sectors(
               id,
               sector_translations(name, language_code)
             )`
          )
          .eq("id", institutionId)
          .eq("role", "institution")
          .single();

        if (userError) {
          console.error("[Instituition] error fetching institution", userError);
          setInstitution(null);
          setServices([]);
          setLoading(false);
          return;
        }

        console.debug("[Instituition] institution fetched", user);

        // Normalize translated fields
        let sectorName = "N/A";
        if (Array.isArray(user?.sector?.sector_translations)) {
          const s = user.sector.sector_translations.find(
            (tr) => tr.language_code === lang
          );
          sectorName =
            s?.name || user.sector.sector_translations[0]?.name || "N/A";
        }

        setInstitution({
          ...user,
          sectorName,
        });

        // Fetch services by this institution (user_id)
        console.debug("[Instituition] fetching services", { institutionId });
        const { data: servicesData, error: svcError } = await supabase
          .from("services")
          .select(
            `id, image_url, price, created_at, user_id,
             service_translations(name, description, language_code),
             categories(id, category_translations(name, language_code))`
          )
          .eq("user_id", institutionId)
          .eq("service_translations.language_code", lang)
          .order("created_at", { ascending: false });

        if (svcError) {
          console.error("[Instituition] error fetching services", svcError);
          setServices([]);
          setLoading(false);
          return;
        }

        const normalized = (servicesData || []).map((svc) => {
          let name = "Sem nome";
          let description = "";
          if (Array.isArray(svc.service_translations)) {
            const f = svc.service_translations.find(
              (tr) => tr.language_code === lang
            );
            name = f?.name || svc.service_translations[0]?.name || name;
            description =
              f?.description || svc.service_translations[0]?.description || "";
          }
          let categoryName = null;
          if (Array.isArray(svc.categories?.category_translations)) {
            const m = svc.categories.category_translations.find(
              (tr) => tr.language_code === lang
            );
            categoryName =
              m?.name || svc.categories.category_translations[0]?.name || null;
          }
          return {
            id: svc.id,
            name,
            description,
            imageUrl: svc.image_url,
            price: svc.price,
            categoryName,
            createdAt: svc.created_at,
          };
        });

        console.debug("[Instituition] services fetched", normalized);
        setServices(normalized);
        setLoading(false);
      } catch (e) {
        console.error("[Instituition] unexpected error", e);
        setInstitution(null);
        setServices([]);
        setLoading(false);
      }
    };

    fetchInstitutionAndServices();
  }, [institutionId, i18n.language]);

  if (loading) {
    return (
      <div className="all-center">
        <span className="loadering"></span>
      </div>
    );
  }

  if (!institution) {
    return (
      <div className="all-center">
        <div className="d-flex column g-16px items-center">
          <img
            src="../assets/images/app-logo.png"
            alt="Linga"
            className="struct-size"
          />
          <h3 className="size-20 extra-bold">
            {t("instituition_not_found", "Instituição não encontrada")}
          </h3>
          <button className="huge-btn" onClick={() => window.history.back()}>
            <i className="fi fi-rr-angle-small-left"></i>
            <span>{t("go_back_home")}</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
      <section>
        <div
          style={{
            height: 160,
            background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
            borderRadius: "0 0 16px 16px",
          }}
        />
        <div
          style={{
            marginTop: -48,
            padding: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 920,
              position: "relative",
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            }}
          >
            <button
              onClick={() => window.history.back()}
              style={{
                position: "absolute",
                top: 12,
                left: 12,
                background: "#f3f4f6",
                border: 0,
                width: 36,
                height: 36,
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              <i className="fi fi-rr-angle-small-left"></i>
            </button>
            <div
              style={{
                padding: 16,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <img
                    src={
                      institution.logo_url || "../assets/images/app-logo.png"
                    }
                    alt={institution.name}
                    style={{
                      width: 200,
                      height: 200,
                      borderRadius: 12,
                      objectFit: "cover",
                    }}
                  />
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 6 }}
                  >
                    <h1 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>
                      {institution.name}
                    </h1>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        flexWrap: "wrap",
                        color: "#6b7280",
                        fontSize: 12,
                      }}
                    >
                      {institution.sectorName && (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <i className="fi fi-rr-briefcase"></i>
                          {institution.sectorName}
                        </span>
                      )}
                      {institution.plan_id && (
                        <span
                          style={{
                            background: "#111827",
                            color: "#fff",
                            borderRadius: 6,
                            padding: "2px 8px",
                            fontSize: 10,
                            letterSpacing: 0.6,
                          }}
                        >
                          PRO
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      const num = (institution.whatsapp_number || "").replace(
                        /\D/g,
                        ""
                      );
                      const msg = `${t("greetings_service", "Olá")} ${
                        institution.name
                      }`;
                      const phone =
                        num && num.length > 0 ? num : "+244935150370";
                      const url = `https://wa.me/${phone}?text=${encodeURIComponent(
                        msg
                      )}`;
                      window.open(url, "_blank");
                    }}
                    className="huge-btn huge-green d-flex items-center justify-center g-12px"
                  >
                    <i className="fi fi-brands-whatsapp"></i>
                    <span>
                      {t("contact_institution", "Contactar no WhatsApp")}
                    </span>
                  </button>
                </div>
              </div>
              <div style={{ color: "#6b7280", fontSize: 12 }}>
                <span>
                  {t("services", "Serviços")}: {services.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: 16 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <h3 style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>
            {t("services_of_institution", "Serviços da instituição")}
          </h3>
          <span style={{ color: "#6b7280", fontSize: 12 }}>
            {services.length} {t("items", "itens")}
          </span>
        </div>

        {services.length === 0 ? (
          <div
            style={{
              minHeight: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9ca3af",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              <i className="fi fi-sr-box" style={{ fontSize: 36 }}></i>
              <span style={{ fontSize: 14, textAlign: "center" }}>
                {t("no_services_found", "Nenhum serviço encontrado.")}
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
            {services.map((svc) => (
              <button
                key={svc.id}
                onClick={() => navigate(`/service/${svc.id}`)}
                style={{
                  textAlign: "left",
                  background: "#fff",
                  border: "1px solid #f3f4f6",
                  borderRadius: 12,
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                }}
              >
                {svc.imageUrl ? (
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "4 / 3",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src={svc.imageUrl}
                      alt={svc.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      height: 140,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#f9fafb",
                    }}
                  >
                    <i className="fi fi-sr-box"></i>
                  </div>
                )}
                <div
                  style={{
                    padding: 12,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <b style={{ fontWeight: 600, fontSize: 15 }}>
                    {svc.name.length > 22
                      ? svc.name.substring(0, 22) + "..."
                      : svc.name}
                  </b>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      color: "#6b7280",
                      fontSize: 12,
                    }}
                  >
                    <i className="fi fi-rr-tag"></i>
                    <span>{svc.categoryName || ""}</span>
                  </span>
                  <span
                    style={{ marginTop: 2, color: "#111827", fontWeight: 700 }}
                  >
                    {svc.price} kz
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Instituition;
