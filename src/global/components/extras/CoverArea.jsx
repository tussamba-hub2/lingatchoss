import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

export default function CoverArea() {

    const { t } = useTranslation();
    return (
        <div className="cover-area-content relative">
          <div className="d-flex">
            <div className="d-flex column g-32px justify-center items-center">
              <div className="d-flex column g-8px text-center items-center">
                <h1 className="main-text extra-bold text-center">
                  {t("main_text")}
                </h1>
                <p className="size-18 medium text-center mw-break">
                  {t("secondary_text")}
                </p>
              </div>
              <div className="d-flex items-center g-36px">
                <NavLink className="huge-btn">
                  <i className="fi fi-rr-search"></i>
                  <span className="nowrap">{t("explore_services")}</span>
                </NavLink>
                <NavLink className="huge-btn huge-br">
                  <span className="nowrap">{t("company_account")}</span>
                </NavLink>
              </div>
            </div>
          </div>
          <div className="abs-pointer d-flex">
            <div className="d-flex relative g-4px">
              <span className="spanner">{t('whatsapp')}</span>
              <i className="fi fi-rr-location-arrow"></i>
            </div>
          </div>
          <div className="abs-pointer two-pt d-flex">
            <div className="d-flex relative g-4px">
              <span className="spanner">{t('appointments')}</span>
              <i className="fi fi-rr-location-arrow"></i>
            </div>
          </div>
          <div className="abs-pointer three-pt d-flex">
            <div className="d-flex relative g-4px">
              <span className="spanner">{t('on_your_door')}</span>
              <i className="fi fi-rr-location-arrow"></i>
            </div>
          </div>
        </div>
    )
}