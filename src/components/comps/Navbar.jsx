import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

import Service from "../add/Service";
import Category from "../add/Category";

export default function Navbar() {
  const { t } = useTranslation();

  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);

  const handleServiceClick = () => {
    setShowServiceModal(true);
  };

  const handleCloseModal = () => {
    setShowServiceModal(false);
  };

  const handleCatClick = () => {
    setShowCatModal(true);
  };

  const handleCloseCatModal = () => {
    setShowCatModal(false);
  };

  return (
    <nav className="navbar">
      <div className="d-flex items-center justify-between">
        <span>
          {t("institution")}
          <span className="medium hidden">/{t("controlPanel")}</span>
        </span>
        <div className="d-flex items-center g-20px">
          <NavLink to="" className="d-flex items-center justify-center">
            <i className="fi fi-rr-chatbot-speech-bubble size-18"></i>
          </NavLink>
          <button onClick={handleCatClick}>{t("category")}</button>
          <button onClick={handleServiceClick}>{t("service")}</button>
        </div>
      </div>

      {showServiceModal && <Service onClose={handleCloseModal} />}
      {showCatModal && <Category onClose={handleCloseModal} />}
    </nav>
  );
}
