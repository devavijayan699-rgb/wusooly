"use client";

import { forwardRef, useEffect } from "react";
import { motion } from "motion/react";
import styles from "./AudienceToggle.module.css";

const AUDIENCES = [
  { id: "retail", label: "Shops & Supermarkets" },
  { id: "cafe", label: "Cafés & Restaurants" },
];

const AudienceToggle = forwardRef(function AudienceToggle(
  {
    value,
    onChange,
    variant = "solutions", // "hero" | "solutions" | "pricing"
    layoutId,
    syncHash = false,
    scrollOnHash = false,
    ariaLabel = "Select store category",
    ariaControls,
  },
  ref
) {
  useEffect(() => {
    if (!syncHash || typeof window === "undefined") return;
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#solutions-cafe" || hash === "#cafe") {
        onChange("cafe");
      } else if (hash === "#solutions-retail" || hash === "#retail") {
        onChange("retail");
      }

      if (scrollOnHash && hash) {
        const targetId = hash.slice(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          setTimeout(() => {
            targetEl.scrollIntoView({ behavior: "smooth" });
          }, 400);
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [syncHash, scrollOnHash, onChange]);

  const isHero = variant === "hero";
  const isPricing = variant === "pricing";

  const selectorClass = isHero
    ? styles.heroSelector
    : `${styles.lightSelector} ${variant === "solutions" ? styles.solutionsMargin : ""}`;

  const renderButtons = () =>
    AUDIENCES.map((item) => {
      const isActive = value === item.id;
      const segmentClass = isHero
        ? `${styles.heroSegment} ${isActive ? styles.heroActive : styles.heroInactive}`
        : `${styles.lightSegment} ${isPricing ? styles.pricingSegment : ""} ${
            isActive ? styles.lightActive : styles.lightInactive
          }`;

      return (
        <button
          key={item.id}
          type="button"
          role="tab"
          aria-selected={isActive}
          aria-controls={ariaControls}
          className={segmentClass}
          onClick={() => {
            onChange(item.id);
            if (syncHash && typeof window !== "undefined") {
              window.history.replaceState(null, "", `#${item.id}`);
            }
          }}
        >
          {isActive && (
            <motion.span
              layoutId={layoutId}
              className={isHero ? styles.heroPill : styles.lightPill}
              transition={{ type: "spring", stiffness: 420, damping: 30 }}
            />
          )}
          {item.label}
        </button>
      );
    });

  if (isPricing) {
    return (
      <div className={styles.pricingWrap} role="tablist" aria-label={ariaLabel} ref={ref}>
        <div className={styles.lightSelector}>{renderButtons()}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className={selectorClass} role="tablist" aria-label={ariaLabel}>
      {renderButtons()}
    </div>
  );
});

export default AudienceToggle;
