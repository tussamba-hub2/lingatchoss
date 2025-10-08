import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Services from "./components/datas/Services.jsx";
import LangSelection from "./components/lang/LangSelection.jsx";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import CoverArea from "./components/extras/CoverArea.jsx";
import HomeServices from "./components/datas/HomeServices.jsx";
import Institutions from "./components/extras/Insituitions.jsx";
import Footer from "./components/Footer.jsx";
import ServicesNear from "./components/extras/ServicesNear.jsx";

export default function Home() {
  const [showLangSelection, setShowLangSelection] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (!savedLang) {
      setShowLangSelection(true);
    }
  }, []);

  const handleLangSelect = () => {
    setShowLangSelection(false);
  };

  const { t } = useTranslation();
  return (
    <div className="home-container hover-contenting">
      {showLangSelection && <LangSelection onLangSelect={handleLangSelect} />}
      <Header />

      <main>
        <CoverArea />
        <ServicesNear />
        <HomeServices />
        <Institutions />
        <Footer />
      </main>
    </div>
  );
}
