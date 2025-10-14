import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function About() {
  const { t } = useTranslation();
  return (
    <div id="about" className="d-flex column g-36px padding-inside">
        <div className="d-flex items-center justify-center">
        <div className="d-flex column mw-70 items-center justify-center g-32px mt-100">
            <h3 className="size-32 extra-bold text-center">{t('about_title')}</h3>
            <p className="size-18 color-opac text-center">
            {t('secondary_text')}
            </p>
        </div>
        </div>
        <div className="mission-grid">
            <div className="mission d-flex column g-12px">
                <i className="fi fi-rr-bullseye size-32"></i>
                <h5 className="size-18 bold text-center">{t('mission_title')}</h5>
                <p className="color-opac text-center">{t('mission_text')}</p>
            </div>
            <div className="mission d-flex column g-12px">
                <i className="fi fi-rr-globe size-32"></i>
                <h5 className="size-18 bold text-center">{t('vision_title')}</h5>
                <p className="color-opac text-center">{t('vision_text')}</p>
            </div>
            <div className="mission d-flex column g-12px">
                <i className="fi fi-rr-heart size-32"></i>
                <h5 className="size-18 bold text-center">{t('values_title')}</h5>
                <p className="color-opac text-center">{t('values_text')}</p>
            </div>
        </div>
        <div className="d-flex column g-36px mt-100">
            <h3 className="size-32 extra-bold text-center">{t('values_in_action')}</h3>
            <div className="grid-values">
                <div className="value d-flex g-20px">
                    <i className="fi fi-rr-bullseye size-18"></i>
                    <div className="d-flex column g-8px">
                        <b className="size-16 medium">{t('innovation')}</b>
                        <p className="size-14 color-opac">{t('innovation_desc')}</p>
                    </div>
                </div>
                <div className="value d-flex g-20px">
                    <i className="fi fi-rr-users size-18"></i>
                    <div className="d-flex column g-8px">
                        <b className="size-16 medium">{t('accessibility')}</b>
                        <p className="size-14 color-opac">{t('accessibility_desc')}</p>
                    </div>
                </div>
                <div className="value d-flex g-20px">
                    <i className="fi fi-rr-lightbulb-on size-18"></i>
                    <div className="d-flex column g-8px">
                        <b className="size-16 medium">{t('trust')}</b>
                        <p className="size-14 color-opac">{t('trust_desc')}</p>
                    </div>
                </div>
                <div className="value d-flex g-20px">
                    <i className="fi fi-rr-arrow-trend-up size-18"></i>
                    <div className="d-flex column g-8px">
                        <b className="size-16 medium">{t('digital_inclusion')}</b>
                        <p className="size-14 color-opac">{t('digital_inclusion_desc')}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}