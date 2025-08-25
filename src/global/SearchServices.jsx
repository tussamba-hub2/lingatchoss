import React from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import Services from "./components/datas/Services";

export default function SearchServices() {
  const { t } = useTranslation();

  return (
    <div className="home-container hover-contenting">
        <Header />
        <div className="mt-100">
            <Services />
        </div>
    </div>
  );
}
