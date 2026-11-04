"use client";

import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer({ onGetDemo, theme = "dark" }) {
  const currentYear = 2026;

  return (
    <footer
      className={`${styles.footerWrapper} ${
        theme === "light" ? styles.wrapperLight : ""
      }`}
      aria-label="Site Footer"
    >
      <div
        className={`${styles.footerContainer} ${
          theme === "light" ? styles.containerLight : ""
        }`}
      >
        <div className={styles.grid}>
          {/* Column 1: Brand & Mission */}
          <div className={styles.brandCol}>
            <a href="/" className={styles.brandLogo} aria-label="Wusooly POS Home">
              <Image
                src={
                  theme === "light"
                    ? "/assets/wusooly-brand-logo-dark.png"
                    : "/assets/wusooly-brand-logo.png"
                }
                alt="Wusooly POS"
                width={124}
                height={28}
                className={styles.logoImg}
              />
            </a>
            <p className={styles.brandDesc}>
              POS and business-management software for shops, supermarkets, cafés
              and restaurants.
            </p>
          </div>

          {/* Column 2: Solutions */}
          <div className={styles.navCol}>
            <h3 className={styles.colTitle}>Solutions</h3>
            <ul className={styles.linkList}>
              <li>
                <a href="/#solutions-retail" className={styles.link}>
                  Shops &amp; Supermarkets
                </a>
              </li>
              <li>
                <a href="/#solutions-cafe" className={styles.link}>
                  Cafés &amp; Restaurants
                </a>
              </li>
              <li>
                <a href="/#download" className={styles.link}>
                  Desktop App
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className={styles.navCol}>
            <h3 className={styles.colTitle}>Company</h3>
            <ul className={styles.linkList}>
              <li>
                <a href="/pricing" className={styles.link}>
                  Pricing
                </a>
              </li>
              <li>
                <a href="/about" className={styles.link}>
                  About
                </a>
              </li>
              <li>
                <a href="/#faq" className={styles.link}>
                  FAQ
                </a>
              </li>
              <li>
                <a href="/contact" className={styles.link}>
                  Contact
                </a>
              </li>
              <li>
                {onGetDemo ? (
                  <button
                    type="button"
                    onClick={onGetDemo}
                    className={`${styles.link} ${styles.demoLinkBtn}`}
                  >
                    Get a Demo
                  </button>
                ) : (
                  <a href="/contact" className={styles.link}>
                    Get a Demo
                  </a>
                )}
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className={styles.navCol}>
            <h3 className={styles.colTitle}>Legal</h3>
            <ul className={styles.linkList}>
              <li>
                <a href="/privacy" className={styles.link}>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className={styles.link}>
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Utility Row */}
        <div className={styles.bottomBar}>
          <p className={styles.copyright}>
            &copy; {currentYear} Wusooly POS. All rights reserved.
          </p>

          <div className={styles.productOf}>
            <span className={styles.productOfLabel}>A product of</span>
            <span className={styles.productOfBrand}>ZIQX CC LLP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
