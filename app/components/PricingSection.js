"use client";

import styles from "./PricingSection.module.css";

export default function PricingSection({ onGetDemo, id = "pricing" }) {
  const handleAction = (planName) => {
    if (typeof onGetDemo === "function") {
      onGetDemo(planName);
    } else {
      window.location.href = `/contact?plan=${encodeURIComponent(planName)}`;
    }
  };

  return (
    <section className={styles.pricingWrap} id={id} aria-label="Wusooly POS Pricing Plans">
      <div className={styles.contentContainer}>
        {/* ── Section Header ── */}
        <header className={styles.headerBlock}>
          <h2 className={styles.headline}>
            Plans that grow your business.
          </h2>
          <p className={styles.subtext}>
            Choose the right plan for your business and unlock greater efficiency, control and growth.
          </p>
        </header>

        {/* ── Two Pricing Cards ── */}
        <div className={styles.pricingGrid}>
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
            <button
              type="button"
              className={styles.cardBtnCore}
              onClick={() => handleAction("POS Core")}
            >
              <span>Get Quote</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
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
            <button
              type="button"
              className={styles.cardBtnGrowth}
              onClick={() => handleAction("Cloud & Growth")}
            >
              <span>Get Quote</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
