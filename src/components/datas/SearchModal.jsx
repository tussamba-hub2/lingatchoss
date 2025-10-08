import React from 'react';
import { useTranslation } from 'react-i18next';

export default function SearchModal() {
    const { t } = useTranslation();

    return (
        <div className="search-modal d-flex items-center justify-center g-20px column">
            <div className="search-input d-flex items-center g-12px">
                <i className="fi fi-rr-search"></i>
                <input type="text" placeholder={t("search")} />
            </div>
            <div className="search-form d-flex column g-12px p-16 relative">
                <div className="footer-search d-flex items-center justify-between">
                    <div className="d-flex items-center g-12px">
                        <img src="./assets/images/app-logo.png" alt="logo" />
                        <span className="size-12 bold">Linga Tchoss</span>
                    </div>
                    <button className='sm-some'>{t("close")}</button>
                </div>
            </div>
        </div>
    )
}