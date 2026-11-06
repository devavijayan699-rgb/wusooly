"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import Magnetic from "./Magnetic";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import styles from "./PricingSection.module.css";

const PRICING_DATA = {
  retail: {
    categoryLabel: "Retail & Stores",
    title: "Lifetime license",
    lead: "Pay once per terminal and own your POS. Every feature on the right is included in all options below.",
    inclusions: [
      "Offline billing and checkout",
      "Product listing and product management",
      "Category management",
      "Barcode-based product lookup and billing",
      "Stock management with automated stock updates",
      "Low-stock alerts",
      "Stock purchase and supplier purchase expense tracking",
      "Expense ledger",
      "Sales reports",
      "Profit and loss reports",
      "Stock and inventory reports",
      "Customer profiles and customer-based orders",
      "Customer wallet",
      "Multiple staff accounts and role-based access",
    ],
    options: [
      {
        id: "lifetime",
        name: "Lifetime",
        description: "The complete core POS for your store, owned permanently. No cloud backup.",
        tag: "One-time license",
      },
      {
        id: "backup",
        name: "Lifetime + Backup",
        description: "Everything in Lifetime, with a protected off-site copy of your business data.",
        tag: "One-time license + monthly Backup",
      },
    ],
    matrix: [
      {
        feature: "All lifetime license features",
        availability: { lifetime: true, backup: true },
      },
      {
        feature: "Automatic cloud backup",
        availability: { lifetime: false, backup: true },
      },
      {
        feature: "Backup history",
        availability: { lifetime: false, backup: true },
      },
      {
        feature: "Data recovery",
        availability: { lifetime: false, backup: true },
      },
      {
        feature: "Restore assistance",
        availability: { lifetime: false, backup: true },
      },
    ],
    footnote:
      "Priced per terminal. Additional outlets, installation, product data import, barcode setup and staff training are quoted separately. Taxes and payment fees are shown in your final quote.",
  },
  cafe: {
    categoryLabel: "Restaurants & Cafés",
    title: "Lifetime license",
    lead: "Pay once per terminal and own your POS. Every feature on the right is included in all options below.",
    inclusions: [
      "Offline billing",
      "Product listing and category management",
      "Stock management with automated updates and low-stock alerts",
      "Stock purchase and expense tracking",
      "Expense ledger",
      "Shift, sales, profit and loss, and stock reports",
      "Customer-based orders",
      "Table ordering and reservations",
      "Customer wallet",
      "Kitchen Order Ticket (KOT) slips",
      "Multiple staff roles",
    ],
    options: [
      {
        id: "lifetime",
        name: "Lifetime",
        description: "The complete core POS, owned permanently. No cloud services.",
        tag: "One-time license",
      },
      {
        id: "backup",
        name: "Lifetime + Backup",
        description: "Everything in Lifetime, with an off-site copy of your POS data.",
        tag: "One-time license + monthly Backup",
      },
      {
        id: "connect",
        name: "Lifetime + Connect",
        description: "Everything in Lifetime, plus online ordering and remote visibility.",
        tag: "One-time license + monthly Connect",
      },
    ],
    matrix: [
      {
        feature: "All lifetime license features",
        availability: { lifetime: true, backup: true, connect: true },
      },
      {
        feature: "Cloud backup",
        availability: { lifetime: false, backup: true, connect: true },
      },
      {
        feature: "Online ordering (1,000 orders a month included)",
        availability: { lifetime: false, backup: false, connect: true },
      },
      {
        feature: "Digital menu",
        availability: { lifetime: false, backup: false, connect: true },
      },
      {
        feature: "Live dashboard on mobile app and web",
        availability: { lifetime: false, backup: false, connect: true },
      },
      {
        feature: "Live sales and business reports",
        availability: { lifetime: false, backup: false, connect: true },
      },
      {
        feature: "Promotional codes",
        availability: { lifetime: false, backup: false, connect: true },
      },
      {
        feature: "Gift cards",
        availability: { lifetime: false, backup: false, connect: true },
      },
      {
        feature: "Dynamic staff role controls",
        availability: { lifetime: false, backup: false, connect: true },
      },
    ],
    footnote:
      "Priced per terminal. Additional outlets, installation, menu setup, data migration and staff training are quoted separately. Taxes and payment fees are shown in your final quote.",
  },
};

export default function PricingSection({ onGetDemo, id = "pricing", initialAudience = "retail" }) {
  const [audience, setAudience] = useState(initialAudience || "retail");
  const [selectedOption, setSelectedOption] = useState("backup");

  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  // Sync when parent changes audience
  useEffect(() => {
    if (initialAudience && (initialAudience === "retail" || initialAudience === "cafe")) {
      setAudience(initialAudience);
    }
  }, [initialAudience]);

  // Ensure selectedOption is valid whenever audience switches
  useEffect(() => {
    const validIds = PRICING_DATA[audience].options.map((opt) => opt.id);
    if (!validIds.includes(selectedOption)) {
      setSelectedOption("backup");
    }
  }, [audience, selectedOption]);

  // Ambient GSAP reveal
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0.7, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 92%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const currentData = PRICING_DATA[audience];
  const activeOption =
    currentData.options.find((opt) => opt.id === selectedOption) || currentData.options[0];

  const whatsappMessage = `Hi Wusooly Team, I'd like to get a quote for Wusooly POS (${currentData.categoryLabel} - ${activeOption.name}).`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;

  const handleDemoClick = () => {
    if (typeof onGetDemo === "function") {
      onGetDemo(activeOption.name);
    } else {
      window.location.href = `/contact?plan=${encodeURIComponent(currentData.categoryLabel + " - " + activeOption.name)}`;
    }
  };

  return (
    <section
      className={styles.pricingWrap}
      id={id}
      ref={sectionRef}
      aria-label="Wusooly POS Pricing & License Configurator"
    >
      <div className={styles.contentContainer}>
        {/* ── Section Header ── */}
        <header className={styles.headerBlock} ref={headerRef}>
          <h2 className={styles.headline}>Plans that grow your business.</h2>
          <p className={styles.subtext}>
            Simple, transparent lifetime licensing tailored for retail stores, restaurants, and cafés.
          </p>

          {/* ── Audience Segmented Control (Retail vs Cafes) ── */}
          <div className={styles.audienceToggleWrap} role="tablist" aria-label="Business Type">
            <div className={styles.audienceSelector}>
              <button
                type="button"
                role="tab"
                aria-selected={audience === "retail"}
                className={`${styles.audienceSegment} ${audience === "retail" ? styles.segmentActive : styles.segmentInactive}`}
                onClick={() => setAudience("retail")}
              >
                Retail &amp; Stores
                {audience === "retail" && (
                  <motion.span
                    layoutId="activePricingAudienceTab"
                    className={styles.segmentPill}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={audience === "cafe"}
                className={`${styles.audienceSegment} ${audience === "cafe" ? styles.segmentActive : styles.segmentInactive}`}
                onClick={() => setAudience("cafe")}
              >
                Restaurants &amp; Cafés
                {audience === "cafe" && (
                  <motion.span
                    layoutId="activePricingAudienceTab"
                    className={styles.segmentPill}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            </div>
          </div>
        </header>

        {/* ══════════════════════════════════════════════════════════
            SECTION 1: LIFETIME INCLUSIONS MASTER BENTO CARD
            ══════════════════════════════════════════════════════════ */}
        <div className={styles.inclusionsCard}>
          <div className={styles.inclusionsLeft}>
            <span className={styles.categoryPill}>{currentData.categoryLabel}</span>
            <h3 className={styles.lifetimeTitle}>{currentData.title}</h3>
            <p className={styles.lifetimeLead}>{currentData.lead}</p>
          </div>

          <div className={styles.inclusionsRight}>
            <div className={styles.featuresGrid}>
              {currentData.inclusions.map((item, idx) => (
                <div key={idx} className={styles.featureItem}>
                  <span className={styles.checkBadge} aria-hidden="true">
                    <svg
                      width="11"
                      height="9"
                      viewBox="0 0 11 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 4.5L3.8 7.5L9.5 1.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SECTION 2: CHOOSE YOUR OPTION (INTERACTIVE CARDS)
            ══════════════════════════════════════════════════════════ */}
        <div className={styles.chooseSection}>
          <h3 className={styles.subSectionTitle}>Choose your option</h3>

          <div
            className={styles.optionCardsGrid}
            style={{ "--option-cols": currentData.options.length }}
            role="radiogroup"
            aria-label="Pricing Options"
          >
            {currentData.options.map((opt) => {
              const isSelected = selectedOption === opt.id;
              return (
                <div
                  key={opt.id}
                  role="radio"
                  tabIndex={0}
                  aria-checked={isSelected}
                  className={`${styles.optionCard} ${isSelected ? styles.optionCardActive : ""}`}
                  onClick={() => setSelectedOption(opt.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedOption(opt.id);
                    }
                  }}
                >
                  <div className={styles.optionHeader}>
                    <div
                      className={`${styles.radioIndicator} ${isSelected ? styles.radioSelected : ""}`}
                    >
                      {isSelected && <span className={styles.radioDot} />}
                    </div>
                    <h4 className={styles.optionName}>{opt.name}</h4>
                  </div>

                  <p className={styles.optionBody}>{opt.description}</p>

                  <span className={styles.optionTag}>{opt.tag}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SECTION 3: ACTION CTA BAR (WHATSAPP DEEP LINK + DEMO)
            ══════════════════════════════════════════════════════════ */}
        <div className={styles.ctaBar}>
          <Magnetic pullFactor={0.25}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.quoteBtn}
              aria-label={`Get a quote on WhatsApp for ${currentData.categoryLabel} ${activeOption.name}`}
            >
              <svg
                className={styles.whatsappIcon}
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>Get a quote on WhatsApp</span>
              <span className={styles.btnArrow} aria-hidden="true">
                →
              </span>
            </a>
          </Magnetic>

          <button
            type="button"
            onClick={handleDemoClick}
            className={styles.demoLink}
          >
            or schedule a 1-on-1 walkthrough →
          </button>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SECTION 4: COMPARE OPTIONS FEATURE MATRIX TABLE
            ══════════════════════════════════════════════════════════ */}
        <div className={styles.compareSection}>
          <h3 className={styles.subSectionTitle}>Compare options</h3>

          <div className={styles.tableWrap}>
            <table className={styles.compareTable}>
              <thead>
                <tr className={styles.tableHeadRow}>
                  <th className={styles.thFeature} scope="col">
                    Feature
                  </th>
                  {currentData.options.map((opt) => {
                    const isColActive = selectedOption === opt.id;
                    return (
                      <th
                        key={opt.id}
                        scope="col"
                        className={`${styles.thCol} ${isColActive ? styles.thColActive : ""}`}
                        onClick={() => setSelectedOption(opt.id)}
                        title={`Select ${opt.name}`}
                      >
                        {opt.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {currentData.matrix.map((row, idx) => (
                  <tr key={idx} className={styles.tableRow}>
                    <td className={styles.tdFeature}>{row.feature}</td>
                    {currentData.options.map((opt) => {
                      const isColActive = selectedOption === opt.id;
                      const isIncluded = row.availability[opt.id] ?? false;

                      return (
                        <td
                          key={opt.id}
                          className={`${styles.tdVal} ${isColActive ? styles.tdValActive : ""}`}
                        >
                          {isIncluded ? (
                            <span
                              className={styles.checkIncluded}
                              aria-label={`${row.feature} included in ${opt.name}`}
                            >
                              <svg
                                width="12"
                                height="10"
                                viewBox="0 0 12 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M1.5 5L4.5 8L10.5 2"
                                  stroke="currentColor"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          ) : (
                            <span
                              className={styles.dashExcluded}
                              aria-label={`${row.feature} not included in ${opt.name}`}
                            >
                              —
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
            SECTION 5: TRANSPARENT FOOTNOTE STRIP
            ══════════════════════════════════════════════════════════ */}
        <p className={styles.pricingFootnote}>{currentData.footnote}</p>
      </div>
    </section>
  );
}
