import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="language-switcher">
      <button
        onClick={() => changeLanguage("pt")}
        className={i18n.language === "pt" ? "active" : ""}
      >
        🇵🇹 PT
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={i18n.language === "en" ? "active" : ""}
      >
        🇺🇸 EN
      </button>
    </div>
  );
}

export default LanguageSwitcher;
