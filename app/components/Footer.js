"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import TransitionLink from "./TransitionLink";
import Magnetic from "./Magnetic";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import styles from "./Footer.module.css";

export default function Footer({ onGetDemo, theme = "dark" }) {
  const currentYear = 2026;
  const footerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !footerRef.current) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "expo.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
            once: true,
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
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
            <TransitionLink href="/" className={styles.brandLogo} aria-label="Wusooly POS Home">
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
            </TransitionLink>
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
                <TransitionLink href="/solutions#retail" className={styles.link}>
                  Shops &amp; Supermarkets
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/solutions#cafe" className={styles.link}>
                  Cafés &amp; Restaurants
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/#download" className={styles.link}>
                  Desktop App
                </TransitionLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className={styles.navCol}>
            <h3 className={styles.colTitle}>Company</h3>
            <ul className={styles.linkList}>
              <li>
                <TransitionLink href="/pricing" className={styles.link}>
                  Pricing
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/about" className={styles.link}>
                  About
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/#faq" className={styles.link}>
                  FAQ
                </TransitionLink>
              </li>
              <li>
                <TransitionLink href="/contact" className={styles.link}>
                  Contact
                </TransitionLink>
              </li>
              <li>
                {onGetDemo ? (
                  <Magnetic strength={0.25} maxDisplacement={8}>
                    <button
                      type="button"
                      onClick={onGetDemo}
                      className={`${styles.link} ${styles.demoLinkBtn}`}
                    >
                      Get a Demo
                    </button>
                  </Magnetic>
                ) : (
                  <Magnetic strength={0.25} maxDisplacement={8}>
                    <TransitionLink href="/contact" className={styles.link}>
                      Get a Demo
                    </TransitionLink>
                  </Magnetic>
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
