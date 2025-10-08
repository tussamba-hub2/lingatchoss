import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function MayLike() {
  const { t } = useTranslation();
    return (
        <div className="d-flex column g-36px">
            <h3 className="size-18 bold">{t("more_by")} Instituição</h3>

        </div>       
    )
}