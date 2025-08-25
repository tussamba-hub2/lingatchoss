import React from "react";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import Services from "./components/datas/Services";

export default function SearchServices() {
  const { t } = useTranslation();

  return (
    <div className="home-container hover-contenting pb-200-rs">
        <Header />
        <main className="mt-100">
            <Services />
        </main>
    </div>
  );
}
