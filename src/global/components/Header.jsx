import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const LINGA_TCHOSS_LOGO = "./assets/images/app-logo.svg";

export default function Header() {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("i18nextLng", lng);
  };

  return (
    <nav className="header d-flex items-center justify-between">
      <NavLink to="/" className="d-flex items-center g-20px">
        <img
          src={LINGA_TCHOSS_LOGO}
          alt="Linga Tchoss Logo"
          className="logo-img"
        />
        <h1 className="rem-size hidden">Linga Tchoss</h1>
      </NavLink>
      <div className="d-flex items-center justify-end g-20px">
        <div className="user-comp relative">
          <i className="fi fi-rr-globe size-16"></i>
          <div className="user-comp-dropdown">
            <button
              className="size-14 mdium d-flex items-center g-10px"
              onClick={() => handleChangeLanguage("pt")}
            >
              Português
            </button>
            <button
              className="size-14 mdium d-flex items-center g-10px"
              onClick={() => handleChangeLanguage("umb")}
            >
              Umbundu
            </button>
            <button
              className="size-14 mdium d-flex items-center g-10px"
              onClick={() => handleChangeLanguage("en")}
            >
              English
            </button>
            <button
              className="size-14 mdium d-flex items-center g-10px"
              onClick={() => handleChangeLanguage("fr")}
            >
              Français
            </button>
          </div>
        </div>
        <NavLink className="user-comp" to="/sign-in">
          <i className="fi fi-rr-user size-16"></i>
        </NavLink>
      </div>
    </nav>
  );
}
