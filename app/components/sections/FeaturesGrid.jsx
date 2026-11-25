"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UtensilsCrossed, ShoppingBag, Globe, BarChart3, Tag, Cloud } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion, scrollReveal, useGsapReveal } from "../../../lib/gsap";
import { GooglePayIcon, ApplePayIcon, MastercardIcon } from "../ui/BrandIcons";
import { AUDIENCE_BENTO } from "../../data/featuresData";
import styles from "./FeaturesGrid.module.css";

const STRIP_ICONS = { BarChart3, Tag, Cloud };

function FeatureChips({ kind }) {
  if (kind === "payments") {
    return (
      <div className={styles["w-chips"]}>
        <span className={styles["w-chip"]} aria-label="Google Pay">
          <GooglePayIcon />
          Pay
        </span>
        <span className={styles["w-chip"]} aria-label="Apple Pay">
          <ApplePayIcon />
          Pay
        </span>
        <span
          className={styles["w-chip"]}
          aria-label="Mastercard"
          title="Mastercard"
          style={{ padding: "7px 14px" }}
        >
          <MastercardIcon />
        </span>
      </div>
    );
  }

  return (
    <div className={styles["w-chips"]}>
      <span className={styles["w-chip"]}>
        <UtensilsCrossed size={13} strokeWidth={2.2} aria-hidden="true" />
        Dine-in
      </span>
      <span className={styles["w-chip"]}>
        <ShoppingBag size={13} strokeWidth={2.2} aria-hidden="true" />
        Takeaway
      </span>
      <span className={styles["w-chip"]}>
        <Globe size={13} strokeWidth={2.2} aria-hidden="true" />
        Online
      </span>
    </div>
  );
}

function HeroFeatureCard({ item, onDemoClick }) {
  return (
    <div className={`${styles["w-card"]} ${styles["w-hero-card"]}`}>
      <div className={styles["w-hero-media"]}>
        <img
          src={item.image}
          alt={item.alt}
          className={styles["w-hero-img"]}
          referrerPolicy="no-referrer"
        />
      </div>
      <div className={styles["w-hero-content"]}>
        <h3 className={styles["w-hero-title"]}>{item.title}</h3>
        {item.body && <p className={styles["w-hero-body"]}>{item.body}</p>}
        <button
          type="button"
          className={styles["w-lime-pill-btn"]}
          onClick={onDemoClick}
        >
          {item.ctaLabel}
        </button>
      </div>
    </div>
  );
}

function TextFeatureCard({ item }) {
  return (
    <div className={`${styles["w-card"]} ${styles["w-text-card"]}`}>
      <div>
        <h3 className={styles["w-text-title"]}>{item.title}</h3>
        <p className={styles["w-text-body"]}>{item.body}</p>
      </div>
      <FeatureChips kind={item.chipKind} />
    </div>
  );
}

function VisualFeatureCard({ item }) {
  const variantClass =
    item.variant === "wide"
      ? styles["w-wide-card"]
      : item.variant === "tall"
      ? styles["w-tall-card"]
      : "";
  const flexClass = item.flexClass ? styles[item.flexClass] : "";
  const TitleClass =
    item.variant === "wide" ? styles["w-wide-title"] : styles["w-photo-title"];

  return (
    <div
      className={[styles["w-card"], styles["w-visual-card"], variantClass, flexClass]
        .filter(Boolean)
        .join(" ")}
    >
      <img
        src={item.image}
        alt={item.alt}
        className={styles["w-visual-img"]}
        style={{ objectPosition: item.objectPosition }}
        referrerPolicy="no-referrer"
      />
      <div className={styles["w-scrim"]} aria-hidden="true" />
      <div className={styles["w-visual-overlay"]}>
        <h3 className={TitleClass}>{item.title}</h3>
        {item.body && <p className={styles["w-photo-sub"]}>{item.body}</p>}
      </div>
    </div>
  );
}

function KotFeatureCard({ item, onDemoClick }) {
  return (
    <div className={`${styles["w-card"]} ${styles["w-kot-card"]}`}>
      <img
        src={item.logo}
        alt={item.logoAlt}
        className={styles["w-brand-logo-img"]}
      />
      <h3 className={styles["w-kot-title"]}>{item.title}</h3>
      <p className={styles["w-kot-body"]}>{item.body}</p>
      <button
        type="button"
        className={styles["w-discover-btn"]}
        onClick={onDemoClick}
      >
        {item.ctaLabel}
      </button>
      <div className={styles["w-kot-photo-wrap"]}>
        <img
          src={item.image}
          alt={item.alt}
          className={styles["w-kot-photo"]}
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}

function StatFeatureCard({ item }) {
  return (
    <div className={`${styles["w-card"]} ${styles["w-stat-card"]}`}>
      <div className={styles["w-stat-number"]}>{item.number}</div>
      <p className={styles["w-stat-body"]}>{item.body}</p>
    </div>
  );
}

function StripFeatureCard({ item }) {
  return (
    <div className={`${styles["w-card"]} ${styles["w-strip-card"]}`}>
      <div className={styles["w-strip-grid"]}>
        {item.items.map((entry) => {
          const IconComponent = STRIP_ICONS[entry.icon];
          return (
            <div key={entry.title} className={styles["w-strip-item"]}>
              <div className={styles["w-strip-icon-box"]} aria-hidden="true">
                {IconComponent && <IconComponent size={20} strokeWidth={2.2} />}
              </div>
              <h4 className={styles["w-strip-title"]}>{entry.title}</h4>
              <p className={styles["w-strip-body"]}>{entry.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OutroStrip({ title, ctaLabel, onDemoClick }) {
  return (
    <div className={styles["w-outro"]}>
      <h4 className={styles["w-outro-title"]}>{title}</h4>
      <button
        type="button"
        className={styles["w-lime-pill-btn"]}
        onClick={onDemoClick}
      >
        {ctaLabel}
      </button>
    </div>
  );
}

function renderCardItem(item, index, outroTitle, onDemoClick) {
  switch (item.type) {
    case "hero":
      return <HeroFeatureCard key={index} item={item} onDemoClick={onDemoClick} />;
    case "text":
      return <TextFeatureCard key={index} item={item} />;
    case "visual":
      return <VisualFeatureCard key={index} item={item} />;
    case "kot":
      return <KotFeatureCard key={index} item={item} onDemoClick={onDemoClick} />;
    case "stat":
      return <StatFeatureCard key={index} item={item} />;
    case "strip":
      return <StripFeatureCard key={index} item={item} />;
    case "outro":
      return (
        <OutroStrip
          key={index}
          title={outroTitle}
          ctaLabel={item.ctaLabel}
          onDemoClick={onDemoClick}
        />
      );
    case "row":
      return (
        <div key={index} className={styles["w-row"]}>
          {item.items.map((child, childIdx) =>
            renderCardItem(child, childIdx, outroTitle, onDemoClick)
          )}
        </div>
      );
    default:
      return null;
  }
}

export default function FeaturesGrid({
  audience = "retail",
  hideIntro = false,
  onGetDemo: externalGetDemo,
}) {
  const sectionRef = useRef(null);
  const config = AUDIENCE_BENTO[audience] || AUDIENCE_BENTO.cafe;

  const handleOpenDemo = () => {
    if (externalGetDemo) {
      externalGetDemo();
      return;
    }
    window.location.href = "/contact";
  };

  useGsapReveal(
    sectionRef,
    () => {
      const cards = gsap.utils.toArray(`.${styles["w-card"]}`, sectionRef.current);
      cards.forEach((card) => {
        scrollReveal(card, { y: 12, duration: 0.55, start: "top 96%" });
      });

      const isFinePointer = window.matchMedia("(pointer: fine)").matches;
      if (isFinePointer) {
        const visualCards = gsap.utils.toArray(
          `.${styles["w-visual-card"]}`,
          sectionRef.current
        );
        visualCards.forEach((card) => {
          const img = card.querySelector(`.${styles["w-visual-img"]}`);
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -6 },
              {
                yPercent: 6,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }
        });
      }
    },
    { deps: [audience] }
  );

  useEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) return;
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
    return () => clearTimeout(timer);
  }, [audience]);

  return (
    <section
      className={styles["wusooly-editorial-root"]}
      ref={sectionRef}
      id={config.sectionId}
      aria-label="Wusooly editorial POS features"
    >
      <div className={styles["w-container"]}>
        {!hideIntro && (
          <header className={styles["w-header-block"]}>
            <h2 className={styles["w-intro-headline"]}>{config.headline}</h2>
            <p className={styles["w-intro-subtext"]}>{config.subtext}</p>
          </header>
        )}

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={audience}
            initial={{ opacity: 0.65, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.65, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles["w-grid"]}>
              {config.rows.map((row, idx) =>
                renderCardItem(row, idx, config.outroTitle, handleOpenDemo)
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
