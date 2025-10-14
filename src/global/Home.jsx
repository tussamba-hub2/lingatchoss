import React, { useState, useEffect, useRef } from "react";
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
import About from "./components/extras/About.jsx";
import Faq from "./components/extras/Faq.jsx";

export default function Home() {
  const [showLangSelection, setShowLangSelection] = useState(false);

  const containerRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(el.scrollTop > 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    el.addEventListener("scroll", onScroll);
    // iniciar estado correto (caso já esteja scrollado)
    setScrolled(el.scrollTop > 100);

    return () => el.removeEventListener("scroll", onScroll);
  }, []);

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
    <div className="home-container hover-contenting " ref={containerRef}>
      {showLangSelection && <LangSelection onLangSelect={handleLangSelect} />}
      <Header scrolled={scrolled} />
      <main>
        <CoverArea />
        <ServicesNear />
        <HomeServices />
        <About />
        <Faq />
        <Footer />
      </main>
    </div>
  );
}
