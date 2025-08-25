import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="navbar">
      <div className="d-flex items-center justify-between">
        <span>
          {t("institution")}/<span className="medium">{t("controlPanel")}</span>
        </span>
        <div className="d-flex items-center g-20px">
          <NavLink to="" className="d-flex items-center justify-center">
            <i className="fi fi-rr-chatbot-speech-bubble size-18"></i>
          </NavLink>
          <button>Categoria</button>
          <button>{t("service")}</button>
          <button className="d-flex items-center g-12px search-button">
            <i className="fi fi-rr-search "></i>
            <span className="medium hidden">{t("search")}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
