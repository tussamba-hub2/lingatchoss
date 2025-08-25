import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import LangSelection from "./lang/LangSelection.jsx";

const LINGA_TCHOSS_LOGO = "./assets/images/app-logo.svg";

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
        <ul
          className={`navigating d-flex items-center g-32px ${
            isMenuActive ? "active" : ""
          }`}
        >
          <NavLink className="d-flex items-center g-8px">
            <i className="fi fi-rr-chart-pie-alt appear"></i>
            <span>{t("companies")}</span>
            <i className="fi fi-rr-angle-small-down hidden"></i>
            <div className="abs-inside-navigating hidden">
              <div className="d-flex g-36px">
                <div className="d-flex column g-8px">
                  <h4 className="light size-16 color-opac medium">
                    {t("business_messaging")}
                  </h4>
                  <div className="d-flex column g-4px">
                    <NavLink>
                      <span>{t("plans_available")}</span>
                    </NavLink>
                    <NavLink>
                      <span>{t("enterprise_registration")}</span>
                    </NavLink>
                  </div>
                </div>
                <div className="d-flex column g-8px">
                  <h4 className="light size-16 color-opac medium">
                    {t("company_account")}
                  </h4>
                  <div className="d-flex column g-4px">
                    <NavLink>
                      <span>{t("sign_up")}</span>
                    </NavLink>
                    <NavLink>
                      <span>{t("sign_in")}</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
          <NavLink className="d-flex items-center g-8px">
            <i className="fi fi-rr-book-alt appear"></i>
            <span>{t("docs")}</span>
          </NavLink>
          <NavLink className="d-flex items-center g-8px">
            <i className="fi fi-rr-blog-text appear"></i>
            <span>{t("blog")}</span>
          </NavLink>
          <NavLink className="d-flex items-center g-8px">
            <i className="fi fi-rr-resources appear"></i>
            <span>{t("resources")}</span>
            <i className="fi fi-rr-angle-small-down hidden"></i>
            <div className="abs-inside-navigating hidden">
              <div className="d-flex g-36px">
                <div className="d-flex column g-8px">
                  <h4 className="light size-16 color-opac medium">
                    {t("ia_resources")}
                  </h4>
                  <div className="d-flex column g-4px">
                    <NavLink>
                      <span>{t("ia_response")}</span>
                    </NavLink>
                    <NavLink>
                      <span>{t("test_ia")}</span>
                    </NavLink>
                  </div>
                </div>
                <div className="d-flex column g-8px">
                  <h4 className="light size-16 color-opac medium">
                    {t("app_resources")}
                  </h4>
                  <div className="d-flex column g-4px">
                    <NavLink>
                      <span>{t("explore_app")}</span>
                    </NavLink>
                    <NavLink>
                      <span>{t("new_features")}</span>
                    </NavLink>
                  </div>
                </div>
                <div className="d-flex column g-8px">
                  <h4 className="light size-16 color-opac medium">
                    {t("system_policies")}
                  </h4>
                  <div className="d-flex column g-4px">
                    <NavLink>
                      <span>{t("privacy_policies")}</span>
                    </NavLink>
                    <NavLink>
                      <span>{t("terms_of_use")}</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
          <NavLink className="d-flex items-center g-8px">
            <i className="fi fi-rr-population-globe appear"></i>
            <span>{t("community")}</span>
            <i className="fi fi-rr-angle-small-down hidden"></i>
            <div className="abs-inside-navigating hidden">
              <div className="d-flex g-36px">
                <div className="d-flex column g-8px">
                  <h4 className="light size-16 color-opac medium">
                    {t("community")}
                  </h4>
                  <div className="d-flex column g-4px">
                    <NavLink>
                      <span>{t("enterprises")}</span>
                    </NavLink>
                    <NavLink>
                      <span>{t("people")}</span>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        </ul>
      </div>
      <div className="d-flex items-center justify-end g-20px">
        <NavLink>
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
