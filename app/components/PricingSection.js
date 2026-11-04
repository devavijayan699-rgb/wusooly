"use client";

import { useEffect, useRef } from "react";
import Magnetic from "./Magnetic";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import styles from "./PricingSection.module.css";

export default function PricingSection({ onGetDemo, id = "pricing" }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
      if (gridRef.current) gsap.set(gridRef.current.children, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // 2. Cards stagger upward
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.14,
            ease: "expo.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleAction = (planName) => {
    if (typeof onGetDemo === "function") {
      onGetDemo(planName);
    } else {
      window.location.href = `/contact?plan=${encodeURIComponent(planName)}`;
    }
  };

  return (
    <section className={styles.pricingWrap} id={id} ref={sectionRef} aria-label="Wusooly POS Pricing Plans">
      <div className={styles.contentContainer}>
        {/* ── Section Header ── */}
        <header className={styles.headerBlock} ref={headerRef}>
          <h2 className={styles.headline}>
            Plans that grow your business.
          </h2>
          <p className={styles.subtext}>
            Choose the right plan for your business and unlock greater efficiency, control and growth.
          </p>
        </header>

        {/* ── Two Pricing Cards ── */}
        <div className={styles.pricingGrid} ref={gridRef}>
          {/* ══════════════════════════════════════════════════════════
              CARD 1: POS Core (Crisp White Card)
              ══════════════════════════════════════════════════════════ */}
          <div className={`${styles.tierCard} ${styles.cardCore}`}>
            <div className={styles.cardTop}>
              {/* Badge */}
              <div className={styles.cardHeaderRow}>
                <span className={styles.labelCore}>Lifetime License</span>
              </div>

              {/* Title & Description */}
              <h3 className={styles.planTitle}>POS Core</h3>
              <p className={styles.planDescription}>
                Essential billing, inventory and business management for your everyday operations.
              </p>

              {/* Divider */}
              <div className={styles.divider} />

              {/* Feature Checklist (13 items with bare checkmarks) */}
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Offline Billing</span>
                </li>

                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Product Categories &amp; Listings</span>
                </li>

                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Automated Stock Management</span>
                </li>

                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Low-Stock Alerts</span>
                </li>

                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Stock Purchase Expense Tracking</span>
                </li>

                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Expense Ledger</span>
                </li>

                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Sales, Shift, Profit &amp; Loss Reports</span>
                </li>

                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Stock Reports</span>
                </li>

                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Customer-Based Orders</span>
                </li>

                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Table Ordering &amp; Reservations</span>
                </li>

                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Customer Wallet</span>
                </li>

                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Kitchen Order Tickets (KOT)</span>
                </li>

                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Multi-Staff Roles</span>
                </li>
              </ul>
            </div>

            {/* Bottom CTA Button */}
            <Magnetic style={{ width: "100%" }}>
              <button
                type="button"
                className={styles.cardBtnCore}
                onClick={() => handleAction("POS Core")}
              >
                <span>Get Quote</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </Magnetic>
          </div>

          {/* ══════════════════════════════════════════════════════════
              CARD 2: Cloud & Growth (Deep Forest Green)
              ══════════════════════════════════════════════════════════ */}
          <div className={`${styles.tierCard} ${styles.cardGrowth}`}>
            <div className={styles.cardTop}>
              {/* Badge */}
              <div className={styles.cardHeaderRow}>
                <span className={styles.badgeGrowth}>
                  <span className={styles.badgeDot} />
                  <span>Most Popular</span>
                </span>
              </div>

              {/* Title & Description */}
              <h3 className={styles.planTitle}>Cloud &amp; Growth</h3>
              <p className={styles.planDescription}>
                Connect your business with online ordering, live insights and powerful cloud features.
              </p>

              {/* Highlight Strip */}
              <div className={styles.highlightStrip}>
                <svg className={styles.cloudIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
                </svg>
                <span>Cloud Backup Included &mdash; First Year Free</span>
              </div>

              {/* Supporting Text Heading */}
              <div className={styles.supportingHeading}>
                Everything in POS Core, plus:
              </div>

              {/* Feature Checklist (6 items with bare lime checkmarks) */}
              <ul className={styles.featureList}>
                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Online Ordering</span>
                </li>

                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Digital Menu</span>
                </li>

                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Live Dashboard &amp; Reports (App &amp; Web)</span>
                </li>

                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Promo Codes &amp; Gift Cards</span>
                </li>

                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Cloud Backup</span>
                </li>

                <li className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Dynamic Staff Role Controls</span>
                </li>
              </ul>
            </div>

            {/* Bottom CTA Button */}
            <Magnetic style={{ width: "100%" }}>
              <button
                type="button"
                className={styles.cardBtnGrowth}
                onClick={() => handleAction("Cloud & Growth")}
              >
                <span>Get Quote</span>
                <span aria-hidden="true">&rarr;</span>
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
