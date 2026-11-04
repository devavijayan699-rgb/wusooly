"use client";

import { useEffect, useRef } from "react";
import Magnetic from "./Magnetic";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import styles from "./DownloadSection.module.css";

export default function DownloadSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const ltsRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
      if (cardsRef.current) gsap.set(cardsRef.current.children, { opacity: 1, y: 0 });
      if (ltsRef.current) gsap.set(ltsRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Header ambient reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0.65, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 95%",
              once: true,
            },
          }
        );
      }

      // 2. Dual Platform cards staggered upward rise
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0.65, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 95%",
              once: true,
            },
          }
        );
      }

      // 3. LTS link reveal
      if (ltsRef.current) {
        gsap.fromTo(
          ltsRef.current,
          { opacity: 0.65, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "expo.out",
            scrollTrigger: {
              trigger: ltsRef.current,
              start: "top 95%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDownload = (platform) => {
    console.log(`Initiating download for ${platform}`);
    const alertMsg =
      platform === "windows"
        ? "Downloading Wusooly for Windows (64-bit installer)..."
        : "Downloading Wusooly for macOS (.dmg)...";
    alert(alertMsg);
  };

  return (
    <section
      ref={sectionRef}
      className={styles.sectionWrapper}
      id="download"
      aria-label="Download Wusooly POS Desktop Application"
    >
      <div className={styles.container}>
        {/* Header - STRICTLY ZERO EYEBROW TEXT */}
        <header className={styles.header} ref={headerRef}>
          <h2 className={styles.headline}>Download Wusooly</h2>
          <p className={styles.subtext}>
            Get the desktop app for Windows or macOS to manage billing, inventory, and sales.
          </p>
        </header>

        {/* Dual Platform Cards Grid */}
        <div className={styles.cardsGrid} ref={cardsRef}>
          {/* Windows Platform Card */}
          <div className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.iconSquircle} aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.902-1.799" />
                </svg>
              </div>
              <span className={styles.versionBadge}>v1.7.4</span>
            </div>

            <div className={styles.cardContent}>
              <h3 className={styles.platformName}>Windows</h3>
              <p className={styles.platformCompat}>For Windows 10 and 11</p>

              <div className={styles.metaList}>
                <div className={styles.metaItem}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>Released 19-10-2026</span>
                </div>
                <div className={styles.metaItem}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <line x1="9" y1="1" x2="9" y2="4" />
                    <line x1="15" y1="1" x2="15" y2="4" />
                    <line x1="9" y1="20" x2="9" y2="23" />
                    <line x1="15" y1="20" x2="15" y2="23" />
                  </svg>
                  <span>64-bit · 4 GB RAM · 500 MB storage</span>
                </div>
              </div>
            </div>

            <Magnetic style={{ width: "100%" }}>
              <button
                type="button"
                className={styles.downloadBtn}
                onClick={() => handleDownload("windows")}
                aria-label="Download Wusooly for Windows"
              >
                <span>Download for Windows</span>
                <div className={styles.arrowBubble} aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            </Magnetic>
          </div>

          {/* macOS Platform Card */}
          <div className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.iconSquircle} aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.66-.82 1.11-1.96.99-3.1-.96.04-2.13.65-2.82 1.46-.61.71-1.14 1.87-1 2.99 1.07.08 2.17-.53 2.83-1.35z"/>
                </svg>
              </div>
              <span className={styles.versionBadge}>v1.7.4</span>
            </div>

            <div className={styles.cardContent}>
              <h3 className={styles.platformName}>macOS</h3>
              <p className={styles.platformCompat}>For Macs with Apple silicon or Intel processors</p>

              <div className={styles.metaList}>
                <div className={styles.metaItem}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>Released 19-10-2026</span>
                </div>
                <div className={styles.metaItem}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <line x1="9" y1="1" x2="9" y2="4" />
                    <line x1="15" y1="1" x2="15" y2="4" />
                    <line x1="9" y1="20" x2="9" y2="23" />
                    <line x1="15" y1="20" x2="15" y2="23" />
                  </svg>
                  <span>macOS 12+ · 4 GB RAM · 500 MB storage</span>
                </div>
              </div>
            </div>

            <Magnetic style={{ width: "100%" }}>
              <button
                type="button"
                className={styles.downloadBtn}
                onClick={() => handleDownload("macos")}
                aria-label="Download Wusooly for macOS"
              >
                <span>Download for macOS</span>
                <div className={styles.arrowBubble} aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 5v14M19 12l-7 7-7-7" />
                  </svg>
                </div>
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Secondary Legacy / LTS Link */}
        <div className={styles.ltsRow} ref={ltsRef}>
          <a
            href="#lts"
            className={styles.ltsLink}
            onClick={(e) => {
              e.preventDefault();
              handleDownload("windows-lts");
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 14 14" />
            </svg>
            <span>Download Windows v0.5 LTS</span>
            <span className={styles.ltsArrow} aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
