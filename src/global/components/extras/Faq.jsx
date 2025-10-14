import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export default function Faq() {
  const { t } = useTranslation();

  const faqs = t("faqs", { returnObjects: true });

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };


  return (
    <div className="padding-inside mt-100 d-flex column g-36px">
      <div class="d-flex items-center justify-center text-center column">
        <h2 class="color size-32 extra-bold text-center">
          {t('_faqs')}
        </h2>
      </div>
      <div class="grid-faqs d-flex prspsv">
        <div class="faq-section">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
          >
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              style={{ cursor: "pointer" }}
            >
              <span className="plus-icon">
                {activeIndex === index ? "-" : "+"}
              </span>
              <h3 className="size-16 bold">{faq.question}</h3>
            </div>
            {activeIndex === index && (
              <div className="faq-answer">
                <p className="color-opac size-14">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
