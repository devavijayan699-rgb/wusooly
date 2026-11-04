"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EditorialFeaturesSection from "./components/EditorialFeaturesSection";
import CafeRestaurantFeaturesSection from "./components/CafeRestaurantFeaturesSection";
import FAQSection from "./components/FAQSection";
import DownloadSection from "./components/DownloadSection";
import PricingSection from "./components/PricingSection";
import styles from "./page.module.css";

export default function Home() {
  const [selectedAudience, setSelectedAudience] = useState("retail"); // "retail" | "cafe"

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#solutions-cafe" || hash === "#cafe") {
        setSelectedAudience("cafe");
      } else if (hash === "#solutions-retail" || hash === "#retail") {
        setSelectedAudience("retail");
      }
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const handleGetDemo = () => {
    window.location.href = "/contact";
  };

  return (
    <div className={styles.pageContainer}>
      {/* ====================================================================
          Hero Section
          ==================================================================== */}
      <section className={styles.heroSection} aria-label="Wusooly POS Hero">

        {/* Layer 1: Dedicated Background Artwork Layer */}
        <div className={styles.bgArtworkLayer} style={{ position: "absolute" }} aria-hidden="true">
          <Image
            src="/assets/hero-pos.webp"
            alt="Wusooly POS display in clean forest-green studio with monitor, billing dashboard, marble pedestals, plants and ribbed glass panel"
            fill
            priority
            unoptimized
            className={styles.bgImage}
            sizes="100vw"
          />
          {/* Subtle contrast scrim to enhance text legibility over sunlight beam without hiding artwork */}
          <div className={styles.scrimOverlay} />
        </div>

        {/* Layer 2: Floating Rounded Glass Navbar */}
        <div className={styles.navbarContainer}>
          <Navbar onGetDemo={handleGetDemo} />
        </div>

        {/* Layer 3: Centred Hero Marketing Content */}
        <div className={styles.heroContent}>
          {/* Audience Selector Segmented Control */}
          <div
            className={styles.audienceSelector}
            role="tablist"
            aria-label="Select your store category"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedAudience === "retail"}
              aria-controls="hero-copy-panel"
              className={`${styles.audienceSegment} ${selectedAudience === "retail" ? styles.segmentActive : styles.segmentInactive
                }`}
              onClick={() => {
                setSelectedAudience("retail");
                if (typeof window !== "undefined") {
                  window.history.replaceState(null, "", "#retail");
                }
              }}
            >
              Shops & Supermarkets
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedAudience === "cafe"}
              aria-controls="hero-copy-panel"
              className={`${styles.audienceSegment} ${selectedAudience === "cafe" ? styles.segmentActive : styles.segmentInactive
                }`}
              onClick={() => {
                setSelectedAudience("cafe");
                if (typeof window !== "undefined") {
                  window.history.replaceState(null, "", "#cafe");
                }
              }}
            >
              Cafés & Restaurants
            </button>
          </div>

          {/* Headline - Deliberate Two-Line Layout on Desktop */}
          <h1 className={styles.headline} id="hero-copy-panel">
            {selectedAudience === "retail" ? (
              <>
                <span className={styles.headlineLine}>Run your store with</span>
                <span className={styles.headlineLine}>more control.</span>
              </>
            ) : (
              <>
                <span className={styles.headlineLine}>Every order. One</span>
                <span className={styles.headlineLine}>simple system.</span>
              </>
            )}
          </h1>

          {/* Description */}
          <p className={styles.description}>
            {selectedAudience === "retail"
              ? "Handle billing, stock, purchases, expenses, and performance reports with Wusooly POS, built for everyday retail operations."
              : "From table service to takeaway and online ordering, manage billing, kitchen tickets, and business analytics through one unified POS."}
          </p>
        </div>

        {/* Breathing space below description ensures the POS monitor remains visually dominant and unblocked */}
        <div className={styles.monitorViewSpacer} aria-hidden="true" />
      </section>

      {/* ====================================================================
          Section Anchors (for navigation functionality)
          ==================================================================== */}
      <div id="solutions-retail" className={styles.sectionAnchor} />
      <div id="solutions-cafe" className={styles.sectionAnchor} />
      <div id="solutions-inventory" className={styles.sectionAnchor} />
      <div id="solutions-reports" className={styles.sectionAnchor} />
      <div id="features" className={styles.sectionAnchor} />

      {/* ====================================================================
          Lower Content Canvas & Full-Bleed Footer
          ==================================================================== */}
      <div className={styles.lowerCanvas}>
        {selectedAudience === "retail" ? (
          <EditorialFeaturesSection onGetDemo={handleGetDemo} />
        ) : (
          <CafeRestaurantFeaturesSection onGetDemo={handleGetDemo} />
        )}

        {/* Frequently Asked Questions Section */}
        <FAQSection />

        {/* Pricing Section (Lifetime Core & Cloud Growth) */}
        <PricingSection onGetDemo={handleGetDemo} initialAudience={selectedAudience} id="pricing" />

        {/* Download Wusooly Desktop Section */}
        <DownloadSection />
        <div id="about" className={styles.sectionAnchor} />
        <div id="contact" className={styles.sectionAnchor} />
        <div id="demo" className={styles.sectionAnchor} />

        {/* Site Footer (Navbar Aesthetic DNA) */}
        <Footer onGetDemo={handleGetDemo} theme="dark" />
      </div>
    </div>
  );
}
