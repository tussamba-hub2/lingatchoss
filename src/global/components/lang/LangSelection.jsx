import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function LangSelection({ onLangSelect }) {
  const { i18n } = useTranslation();
  const languages = [
    { code: "en", label: "English", img: "./assets/images/english.webp" },
    { code: "pt", label: "Protuguês", img: "./assets/images/portugues.png" },
    { code: "umb", label: "Umbundo", img: "./assets/images/umbundo.png" },
    { code: "fr", label: "Français", img: "./assets/images/francais.webp" },
  ];

  const [activeLang, setActiveLang] = useState(
    i18n.language || localStorage.getItem("language") || "pt"
  );

  const handleLangChange = (code) => {
    i18n.changeLanguage(code);
    setActiveLang(code);
    localStorage.setItem("language", code);
    if (onLangSelect) onLangSelect();
  };

  return (
    <div className="abs-language-selection">
      <div className="form-language d-flex column g-36px">
        <div className="d-flex items-center justify-between">
          <h5 className="medium color-opac size-16">Select language</h5>
          <button onClick={onLangSelect}>
            <i className="fi fi-rr-cross-small size-18"></i>
          </button>
        </div>
        <div className="d-flex items-center g-12px wrap">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`btn btn-br flagger${
                activeLang === lang.code ? " active" : ""
              }`}
              onClick={() => handleLangChange(lang.code)}
            >
              <img src={lang.img} alt={lang.label} />
              <span className="size-14 light">{lang.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LangSelection;
