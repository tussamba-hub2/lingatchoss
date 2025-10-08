import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import LangSelection from "./lang/LangSelection.jsx";

const LINGA_TCHOSS_LOGO = "./assets/images/app-logo.png";

export default function Header() {
  const { t } = useTranslation(); // Removed unused i18n
  const [showLangSelection, setShowLangSelection] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);

  const handleLangButtonClick = () => {
    setShowLangSelection(!showLangSelection);
  };

  const handleLangSelect = () => {
    setShowLangSelection(false);
  };

  const handleMenuToggle = () => {
    setIsMenuActive((prev) => !prev);
  };

  return (
    <nav className="header d-flex items-center justify-between relative">
      <div className="d-flex items-center g-50px">
        <NavLink to="/" className="d-flex items-center g-12px">
          <img
            src={LINGA_TCHOSS_LOGO}
            alt="Linga Tchoss Logo"
            className="logo-img"
          />
        </NavLink>
        
      </div>
      <div className="d-flex items-center justify-end g-20px">
        <NavLink to="/search">
          <i className="fi fi-rr-search"></i>
        </NavLink>
        <button onClick={handleLangButtonClick}>
          <i className="fi fi-rr-world size-16"></i>
        </button>
        {showLangSelection && <LangSelection onLangSelect={handleLangSelect} />}
        <NavLink to="/sign-in">
          <span>{t("account")}</span>
        </NavLink>
        <button onClick={handleMenuToggle} className="appear-min hidden">
          <i className="fi fi-rr-menu-dots-vertical size-16"></i>
        </button>
      </div>
    </nav>
  );
}
