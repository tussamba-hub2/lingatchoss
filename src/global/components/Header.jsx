import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import LangSelection from "./lang/LangSelection.jsx";
import { HashLink } from "react-router-hash-link";

const LINGA_TCHOSS_LOGO = "./assets/images/app-logo.png";

export default function Header({ scrolled }) {
  const { t } = useTranslation(); // Removed unused i18n
  const [showLangSelection, setShowLangSelection] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  

  const handleLangButtonClick = () => {
    setShowLangSelection(!showLangSelection);
  };

  const handleLangSelect = () => {
    setShowLangSelection(false);
  };


  return (
    <nav className={`header d-flex items-center justify-between relative ${scrolled ? "scrolled" : ""}`}>
      <div className="d-flex items-center g-50px">
        <NavLink to="/" className="d-flex items-center g-12px">
          <img
            src={LINGA_TCHOSS_LOGO}
            alt="Linga Tchoss Logo"
            className="logo-img"
          />
        </NavLink>
        
      </div>
      <div className= {`list-links d-flex items-center g-32px ${menuOpen ? "open" : ""}`}>
        <NavLink to="/">
            <span>{t('_home')}</span>
        </NavLink>
        <NavLink to="/search">
            <span>{t('_services')}</span>
        </NavLink>
        <HashLink to="/#about">
            <span>{t('_about')}</span>
        </HashLink>
        <NavLink to="/enterprises">
            <span>{t('_companies')}</span>
        </NavLink>
        <HashLink to="/#contacts">
            <span>{t('_contacts')}</span>
        </HashLink>
      </div>
      <div className="d-flex items-center justify-end g-32px l-lks-to">
        <NavLink to="/search" className="hidden">
          <i className="fi fi-rr-search"></i>
        </NavLink>
        <button className="d-flex items-center g-8px" onClick={handleLangButtonClick}>
          <i className="fi fi-rr-world size-16"></i>
          <span className="color-back size-16 medium">{t("language")}</span>
        </button>
        <button onClick={toggleMenu} className="appear">
            <i className="fi fi-rr-menu-burger"></i>
        </button>
        {showLangSelection && <LangSelection onLangSelect={handleLangSelect} />}
      </div>
    </nav>
  );
}
