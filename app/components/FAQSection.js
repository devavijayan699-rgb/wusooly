"use client";

import { useState } from "react";
import styles from "./FAQSection.module.css";

const FAQ_ITEMS = [
  {
    id: "what-is-wusooly",
    question: "What is Wusooly?",
    answer:
      "Wusooly is a modern cloud POS and business management platform designed for supermarkets, retail shops, cafés, and restaurants. It connects fast touch-screen billing, live inventory tracking, VAT compliance, customer ledgers, and reporting into one unified system.",
  },
  {
    id: "business-types",
    question: "What types of businesses can use Wusooly?",
    answer:
      "Wusooly is purpose-built for both retail and food service. It supports supermarkets, grocery stores, fashion boutiques, and electronics outlets, as well as specialty coffee shops, bakeries, quick-service counters, and full-service dining.",
  },
  {
    id: "barcode-billing",
    question: "Does Wusooly support barcode billing?",
    answer:
      "Yes. Wusooly features seamless plug-and-play support for wireless, Bluetooth, and USB barcode scanners, multi-unit packaging barcodes, scale-embedded weight barcodes, and custom barcode label printing.",
  },
  {
    id: "stock-updates",
    question: "Does stock update automatically?",
    answer:
      "Every sale, return, or supplier intake updates your inventory immediately in real time. You also receive automatic low-stock alerts and reorder suggestions before critical items run out.",
  },
  {
    id: "customer-credit",
    question: "Can I manage customer credit and wallets?",
    answer:
      "Yes. You can manage complete customer credit ledgers, set credit limits, track outstanding balances, maintain customer store wallets, and send automated billing receipts directly over WhatsApp.",
  },
  {
    id: "expenses-profit",
    question: "Can I track expenses and profit?",
    answer:
      "Wusooly records daily operational expenses, supplier payouts, and cash drawer reconciliations. It calculates gross and net profit margins automatically alongside VAT-ready financial summaries.",
  },
  {
    id: "data-safety",
    question: "Is my data safe?",
    answer:
      "Your data is protected with enterprise-grade 256-bit encryption and continuous automated cloud backups. Wusooly also includes offline mode billing so checkout stays fast even during network interruptions.",
  },
];

export default function FAQSection() {
  // First item open by default for immediate engagement, others collapsed
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className={styles.faqSection} id="faq" aria-label="Frequently Asked Questions">
      {/* Background Halftone / Dot Grid Canvas Texture */}
      <div className={styles.gridPattern} aria-hidden="true" />

      <div className={styles.container}>
        {/* Left Column: Zero Eyebrow, Pure Display Headline & Context */}
        <div className={styles.headerCol}>
          <div className={styles.stickyHeader}>
            <h2 className={styles.headline}>
              <span className={styles.headlineDark}>Frequently</span>
              <span className={styles.headlineDark}>Asked</span>
              <span className={styles.headlineLime}>Questions</span>
            </h2>
            <p className={styles.subtext}>
              Everything you need to know about Wusooly. From billing and inventory to reports
              and integrations, we have got you covered.
            </p>
          </div>
        </div>

        {/* Right Column: Accordion List & Bottom CTA */}
        <div className={styles.faqCol}>
          <div className={styles.accordionList} role="region" aria-label="FAQ Accordion">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              const headingId = `faq-title-${item.id}`;
              const contentId = `faq-content-${item.id}`;

              return (
                <div
                  key={item.id}
                  className={`${styles.accordionItem} ${isOpen ? styles.itemOpen : ""}`}
                >
                  <button
                    type="button"
                    className={styles.questionBtn}
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    id={headingId}
                  >
                    <span className={styles.questionText}>{item.question}</span>
                    <span
                      className={`${styles.toggleCircle} ${isOpen ? styles.circleOpen : ""}`}
                      aria-hidden="true"
                    >
                      <svg
                        className={`${styles.plusIcon} ${isOpen ? styles.plusRotated : ""}`}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 3.2V12.8M3.2 8H12.8"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headingId}
                    className={`${styles.answerWrapper} ${isOpen ? styles.wrapperExpanded : ""}`}
                  >
                    <div className={styles.answerInner}>
                      <p className={styles.answerText}>{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA Row: Arrow Circle + Still have a question? */}
          <div className={styles.ctaRow}>
            <a href="/contact" className={styles.ctaCard} aria-label="Still have a question? Contact our team">
              <div className={styles.ctaCircle}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.ctaArrow}
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
              <div className={styles.ctaContent}>
                <span className={styles.ctaTitle}>Still have a question?</span>
                <span className={styles.ctaSub}>CONTACT OUR TEAM</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

