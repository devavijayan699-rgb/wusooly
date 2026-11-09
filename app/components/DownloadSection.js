"use client";

import { useEffect, useRef } from "react";
import { Calendar, Cpu, ArrowDown, Clock, ArrowRight } from "lucide-react";
import { WindowsIcon, AppleIcon } from "./icons/BrandIcons";
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
                <WindowsIcon size={24} />
              </div>
              <span className={styles.versionBadge}>v1.7.4</span>
            </div>

            <div className={styles.cardContent}>
              <h3 className={styles.platformName}>Windows</h3>
              <p className={styles.platformCompat}>For Windows 10 and 11</p>

              <div className={styles.metaList}>
                <div className={styles.metaItem}>
                  <Calendar size={15} strokeWidth={2} aria-hidden="true" />
                  <span>Released 19-10-2026</span>
                </div>
                <div className={styles.metaItem}>
                  <Cpu size={15} strokeWidth={2} aria-hidden="true" />
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
                  <ArrowDown size={16} strokeWidth={2.5} />
                </div>
              </button>
            </Magnetic>
          </div>

          {/* macOS Platform Card */}
          <div className={styles.card}>
            <div className={styles.cardTop}>
              <div className={styles.iconSquircle} aria-hidden="true">
                <AppleIcon size={24} />
              </div>
              <span className={styles.versionBadge}>v1.7.4</span>
            </div>

            <div className={styles.cardContent}>
              <h3 className={styles.platformName}>macOS</h3>
              <p className={styles.platformCompat}>For Macs with Apple silicon or Intel processors</p>

              <div className={styles.metaList}>
                <div className={styles.metaItem}>
                  <Calendar size={15} strokeWidth={2} aria-hidden="true" />
                  <span>Released 19-10-2026</span>
                </div>
                <div className={styles.metaItem}>
                  <Cpu size={15} strokeWidth={2} aria-hidden="true" />
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
                  <ArrowDown size={16} strokeWidth={2.5} />
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
            <Clock size={14} strokeWidth={2} aria-hidden="true" />
            <span>Download Windows v0.5 LTS</span>
            <ArrowRight size={14} strokeWidth={2.2} className={styles.ltsArrow} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
