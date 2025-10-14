import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function CoverArea() {
  const { t } = useTranslation();
  return (
    <div className="cover-ladning-page">
            
      
            <div className="d-flex items-center justify-center padding-inside w-full h-full">
                <div className="d-flex column g-32px items-center justify-benter">
                    <div className="d-flex column g-8px mw-70">
                        <h1 className="color-back size-32 extra-bold text-center">{t('welcome')}</h1>
                        <p className="color-back semi-opac size-18 text-center">{t('secondary_text')}</p>
                    </div>
                    <NavLink to="/search" className="btn huge-btn btn-bg">
                        <i className="fi fi-ss-bolt"></i>
                        <span>Explorar serviços</span>
                    </NavLink>
                </div>
            </div>

        </div>
  );
}
