import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer id="contacts" className="footer-container relative">
      <div className="footer-content">
        <div className="d-flex column g-32px">
          <div className="d-flex items-center g-4px">
            <img
              src="./assets/images/app-logo2.png"
              alt="App Logo"
              className="logo-img"
            />
            <h3 className="footer-title">KARGA MIDIA, (SU), LDA</h3>
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
            <NavLink href="/search" className="footer-link">
              {t("search")}
            </NavLink>
          </div>
        </div>
        <div className="d-flex column g-32px">
          <h4 className="medium size-16">{t("companies")}</h4>
          <div className="d-flex column g-12px">
            <NavLink to="https://wa.me/244923852407" target="_blank" className="footer-link">
              {t("sign_up")}
            </NavLink>
          </div>
        </div>
        <div className="d-flex column g-32px">
          <h4 className="medium size-16">{t("contacts")}</h4>
          <div className="d-flex column g-12px">
            <NavLink href="/about" className="footer-link">
              +244 935 150 370
            </NavLink>
            <NavLink href="/about" className="footer-link">
              geral@lingatchoss.com
            </NavLink>
          </div>
        </div>
      </div>

      <p className="abs-reserverd">© 2024 KARGA MIDIA, (SU), LDA. {t("all_rights_reserved")}</p>
    </footer>
  );
}
