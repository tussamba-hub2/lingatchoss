import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import LangSelection from "./components/lang/LangSelection";
import Footer from "./components/Footer";
import Institutions from "./components/extras/Insituitions";


export default function Enterprises() {
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
    <div className="home-container hover-contenting back-header " ref={containerRef}>
      {showLangSelection && <LangSelection onLangSelect={handleLangSelect} />}
      <Header scrolled={scrolled} />

      <main>
        <Institutions />
        <Footer />
      </main>

    </div>
    )
}