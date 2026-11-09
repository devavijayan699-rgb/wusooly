"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Check, ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "./icons/BrandIcons";
import Magnetic from "./Magnetic";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import styles from "./PricingSection.module.css";

const PRICING_DATA = {
  retail: {
    categoryLabel: "Shops & Supermarkets",
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
    categoryLabel: "Cafés & Restaurants",
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
        feature: "Live dashboard on mobile app and web",
        availability: { lifetime: false, backup: true, connect: true },
      },
      {
        feature: "Live sales and business reports",
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

export default function PricingSection({ onGetDemo, id = "pricing", initialAudience = "retail", isHero = false }) {
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



  return (
    <section
      className={`${styles.pricingWrap} ${isHero ? styles.pricingWrapHero : ""}`}
      id={id}
      ref={sectionRef}
      aria-label="Wusooly POS Pricing & License Configurator"
    >
      <div className={styles.contentContainer}>
        {/* ── Section Header ── */}
        <header className={styles.headerBlock} ref={headerRef}>
          {/* ── Audience Segmented Control (Matched to Solutions Page Position & Style) ── */}
          <div className={styles.audienceToggleWrap} role="tablist" aria-label="Select store category">
            <div className={styles.audienceSelector}>
              <button
                type="button"
                role="tab"
                aria-selected={audience === "retail"}
                className={`${styles.audienceSegment} ${audience === "retail" ? styles.segmentActive : styles.segmentInactive}`}
                onClick={() => setAudience("retail")}
              >
                {audience === "retail" && (
                  <motion.span
                    layoutId="activePricingAudienceTab"
                    className={styles.segmentPill}
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  />
                )}
                Shops &amp; Supermarkets
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={audience === "cafe"}
                className={`${styles.audienceSegment} ${audience === "cafe" ? styles.segmentActive : styles.segmentInactive}`}
                onClick={() => setAudience("cafe")}
              >
                {audience === "cafe" && (
                  <motion.span
                    layoutId="activePricingAudienceTab"
                    className={styles.segmentPill}
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  />
                )}
                Cafés &amp; Restaurants
              </button>
            </div>
          </div>

          <h2 className={styles.headline}>Plans that grow your business.</h2>
          <p className={styles.subtext}>
            Simple, transparent lifetime licensing tailored for retail stores, restaurants, and cafés.
          </p>
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
                    <Check size={11} strokeWidth={2.6} />
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
          <Magnetic strength={0.25}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.quoteBtn}
              aria-label={`Get a quote on WhatsApp for ${currentData.categoryLabel} ${activeOption.name}`}
            >
              <WhatsAppIcon className={styles.whatsappIcon} size={18} />
              <span>Get a quote on WhatsApp</span>
              <ArrowRight size={17} strokeWidth={2.5} className={styles.btnArrow} aria-hidden="true" />
            </a>
          </Magnetic>


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
                              <Check size={13} strokeWidth={2.6} />
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
