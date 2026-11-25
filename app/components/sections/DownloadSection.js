"use client";

import { useRef } from "react";
import { Calendar, Cpu, ArrowDown, ArrowRight, Smartphone } from "lucide-react";
import { WindowsIcon, AppleIcon } from "../ui/BrandIcons";
import Magnetic from "../ui/Magnetic";
import TransitionLink from "../layout/TransitionLink";
import { gsap, scrollReveal, useGsapReveal } from "../../../lib/gsap";
import styles from "./DownloadSection.module.css";

const PLATFORMS = [
  {
    id: "windows",
    name: "Windows",
    compat: "For Windows 10 and 11",
    version: "v1.7.4",
    releaseDate: "Released 19-10-2026",
    specs: "64-bit · 4 GB RAM · 500 MB storage",
    ctaLabel: "Download for Windows",
    ariaLabel: "Download Wusooly for Windows",
    Icon: WindowsIcon,
  },
  {
    id: "macos",
    name: "macOS",
    compat: "For Macs with Apple silicon or Intel processors",
    version: "v1.7.4",
    releaseDate: "Released 19-10-2026",
    specs: "macOS 12+ · 4 GB RAM · 500 MB storage",
    ctaLabel: "Download for macOS",
    ariaLabel: "Download Wusooly for macOS",
    Icon: AppleIcon,
  },
];

export default function DownloadSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);
  const helperBannerRef = useRef(null);

  useGsapReveal(
    sectionRef,
    () => {
      scrollReveal(headerRef.current, { y: 10, opacity: 0.65, duration: 0.5 });
      if (cardsRef.current) {
        scrollReveal(cardsRef.current.children, {
          y: 12,
          opacity: 0.65,
          duration: 0.55,
          stagger: 0.08,
          trigger: cardsRef.current,
        });
      }
      if (helperBannerRef.current) {
        scrollReveal(helperBannerRef.current, { y: 10, opacity: 0.65, duration: 0.5 });
      }
    },
    {
      onReducedMotion: () => {
        if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
        if (cardsRef.current) gsap.set(cardsRef.current.children, { opacity: 1, y: 0 });
        if (helperBannerRef.current) gsap.set(helperBannerRef.current, { opacity: 1, y: 0 });
      },
    }
  );

  const handleDownload = (platform) => {
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
          <h2 className={styles.headline}>Download Wusooly.</h2>
          <p className={styles.subtext}>
            Get the desktop app for Windows or macOS to manage billing, inventory, and sales.
          </p>
        </header>

        {/* Dual Platform Cards Grid */}
        <div className={styles.cardsGrid} ref={cardsRef}>
          {PLATFORMS.map(({ id, name, compat, version, releaseDate, specs, ctaLabel, ariaLabel, Icon }) => (
            <div key={id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.iconSquircle} aria-hidden="true">
                  <Icon size={24} />
                </div>
                <span className={styles.versionBadge}>{version}</span>
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.platformName}>{name}</h3>
                <p className={styles.platformCompat}>{compat}</p>

                <div className={styles.metaList}>
                  <div className={styles.metaItem}>
                    <Calendar size={15} strokeWidth={2} aria-hidden="true" />
                    <span>{releaseDate}</span>
                  </div>
                  <div className={styles.metaItem}>
                    <Cpu size={15} strokeWidth={2} aria-hidden="true" />
                    <span>{specs}</span>
                  </div>
                </div>
              </div>

              <Magnetic style={{ width: "100%" }}>
                <button
                  type="button"
                  className={styles.downloadBtn}
                  onClick={() => handleDownload(id)}
                  aria-label={ariaLabel}
                >
                  <span>{ctaLabel}</span>
                  <div className={styles.arrowBubble} aria-hidden="true">
                    <ArrowDown size={16} strokeWidth={2.5} />
                  </div>
                </button>
              </Magnetic>
            </div>
          ))}
        </div>

        {/* Companion Android Helper Banner */}
        <div className={styles.helperRow} ref={helperBannerRef}>
          <TransitionLink
            href="/helper"
            className={styles.helperCard}
            aria-label="Wusooly Helper Tool - Caller ID and WhatsApp alerts on Android"
          >
            <div className={styles.helperLeft}>
              <div className={styles.helperIconBox} aria-hidden="true">
                <Smartphone size={20} strokeWidth={2} />
              </div>
              <div className={styles.helperCopy}>
                <span className={styles.helperTitle}>Wusooly Helper Tool</span>
                <span className={styles.helperDesc}>
                  Caller ID and WhatsApp alerts on Android
                </span>
              </div>
            </div>
            <span className={styles.helperCtaPill}>
              <span>Get Helper Tool</span>
              <ArrowRight size={15} strokeWidth={2.4} className={styles.helperArrowIcon} aria-hidden="true" />
            </span>
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
