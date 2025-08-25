import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer-container relative">
      <div className="footer-content">
        <div className="d-flex column g-32px">
          <div className="d-flex items-center g-4px">
            <img
              src="./assets/images/app-logo2.svg"
              alt="App Logo"
              className="logo-img"
            />
            <h3 className="footer-title">Linga Tchoss</h3>
          </div>
          <p>
            {t('footer_p')}
          </p>
        </div>
        <div className="d-flex column g-32px">
          <h4 className="medium size-16">{t("quick_links")}</h4>
          <div className="d-flex column g-12px">
            <NavLink href="/" className="footer-link">
              {t("home")}
            </NavLink>
            <NavLink href="/privacy-policy" className="footer-link">
              {t("privacy_policies")}
            </NavLink>
            <NavLink href="/terms-of-service" className="footer-link">
              {t("terms_of_use")}
            </NavLink>
            <NavLink href="/" className="footer-link">
              {t("institutions")}
            </NavLink>
            <NavLink href="/" className="footer-link">
              {t("about_us")}
            </NavLink>
          </div>
        </div>
        <div className="d-flex column g-32px">
          <h4 className="medium size-16">{t("companies")}</h4>
          <div className="d-flex column g-12px">
            <NavLink href="/sign-in" className="footer-link">
              {t("sign_up")}
            </NavLink>
            <NavLink href="/sign-in" className="footer-link">
              {t("sign_in")}
            </NavLink>
          </div>
        </div>
        <div className="d-flex column g-32px">
          <h4 className="medium size-16">{t("contacts")}</h4>
          <div className="d-flex column g-12px">
            <NavLink href="/about" className="footer-link">
              {t("blog")}
            </NavLink>
            <NavLink href="/about" className="footer-link">
              {t("resources")}
            </NavLink>
            <NavLink href="/about" className="footer-link">
              +244 900 000 000
            </NavLink>
            <NavLink href="/about" className="footer-link">
              suport@lingatchoss.com
            </NavLink>
          </div>
        </div>
      </div>

      <p className="abs-reserverd">© 2024 Linga Tchoss. {t("all_rights_reserved")}</p>
    </footer>
  );
}
