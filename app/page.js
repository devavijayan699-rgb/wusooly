"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EditorialFeaturesSection from "./components/EditorialFeaturesSection";
import CafeRestaurantFeaturesSection from "./components/CafeRestaurantFeaturesSection";
import FAQSection from "./components/FAQSection";
import DownloadSection from "./components/DownloadSection";
import PricingSection from "./components/PricingSection";
import { gsap, ScrollTrigger } from "../lib/gsap";
import styles from "./page.module.css";

export default function Home() {
  const [selectedAudience, setSelectedAudience] = useState("retail"); // "retail" | "cafe"
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const bgImageRef = useRef(null);
  const navbarRef = useRef(null);
  const audienceRef = useRef(null);
  const headlineRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#solutions-cafe" || hash === "#cafe") {
        setSelectedAudience("cafe");
      } else if (hash === "#solutions-retail" || hash === "#retail") {
        setSelectedAudience("retail");
      }

      if (hash) {
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
  }, []);

  // ── Master Hero GSAP Timeline ──
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      if (bgImageRef.current) gsap.set(bgImageRef.current, { opacity: 1, scale: 1 });
      if (navbarRef.current) gsap.set(navbarRef.current, { opacity: 1, y: 0 });
      if (audienceRef.current) gsap.set(audienceRef.current, { opacity: 1, y: 0 });
      if (headlineRef.current) gsap.set(headlineRef.current.querySelectorAll(`.${styles.headlineLine}`), { opacity: 1, yPercent: 0 });
      if (descRef.current) gsap.set(descRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ paused: true });

      // Initial states
      if (bgImageRef.current) {
        gsap.set(bgImageRef.current, {
          clipPath: "inset(8% 0% 8% 0%)",
          scale: 1.08,
          opacity: 0.6,
        });
      }
      if (navbarRef.current) {
        gsap.set(navbarRef.current, { opacity: 0, y: -16 });
      }
      if (audienceRef.current) {
        gsap.set(audienceRef.current, { opacity: 0, y: 20 });
      }
      if (headlineRef.current) {
        gsap.set(headlineRef.current.querySelectorAll(`.${styles.headlineLine}`), {
          opacity: 0,
          yPercent: 115,
        });
      }
      if (descRef.current) {
        gsap.set(descRef.current, { opacity: 0, y: 20 });
      }

      // 1. Background artwork clip reveal & scale decay
      if (bgImageRef.current) {
        heroTl.to(bgImageRef.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1.0,
          opacity: 1,
          duration: 1.5,
          ease: "expo.out",
        });
      }

      // 2. Audience Selector rises
      if (audienceRef.current) {
        heroTl.to(
          audienceRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "expo.out",
          },
          0.18
        );
      }

      // 3. Headline lines rise out of their overflow masks
      if (headlineRef.current) {
        heroTl.to(
          headlineRef.current.querySelectorAll(`.${styles.headlineLine}`),
          {
            opacity: 1,
            yPercent: 0,
            duration: 1.15,
            stagger: 0.08,
            ease: "expo.out",
          },
          0.32
        );
      }

      // 4. Description copy softly rises
      if (descRef.current) {
        heroTl.to(
          descRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "expo.out",
          },
          0.55
        );
      }

      // 5. Navbar glides smoothly in
      if (navbarRef.current) {
        heroTl.to(
          navbarRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "expo.out",
          },
          0.4
        );
      }

      // Start timeline when preloader completes, or immediately if already visited
      const hasSeenIntro = sessionStorage.getItem("wusooly_intro_seen");
      if (hasSeenIntro) {
        heroTl.play();
      } else {
        const handlePreloaderDone = () => heroTl.play();
        window.addEventListener("wusooly_preloader_complete", handlePreloaderDone, { once: true });

        // Safety fallback timer so content is never hidden
        const fallbackTimer = setTimeout(() => {
          heroTl.play();
        }, 2200);

        return () => {
          window.removeEventListener("wusooly_preloader_complete", handlePreloaderDone);
          clearTimeout(fallbackTimer);
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Soft cross-fade when switching between Retail & Café audience
  useEffect(() => {
    if (!headlineRef.current || !descRef.current) return;
    const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    gsap.fromTo(
      [headlineRef.current.querySelectorAll(`.${styles.headlineLine}`), descRef.current],
      { opacity: 0.3, y: 6 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: "power2.out" }
    );
  }, [selectedAudience]);

  const handleGetDemo = () => {
    window.location.href = "/contact";
  };

  return (
    <div className={styles.pageContainer} ref={containerRef}>
      {/* ====================================================================
          Hero Section
          ==================================================================== */}
      <section className={styles.heroSection} ref={heroRef} aria-label="Wusooly POS Hero">

        {/* Layer 1: Dedicated Background Artwork Layer */}
        <div className={styles.bgArtworkLayer} ref={bgImageRef} style={{ position: "absolute" }} aria-hidden="true">
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
        <div className={styles.navbarContainer} ref={navbarRef}>
          <Navbar onGetDemo={handleGetDemo} />
        </div>

        {/* Layer 3: Centred Hero Marketing Content */}
        <div className={styles.heroContent}>
          {/* Audience Selector Segmented Control */}
          <div
            ref={audienceRef}
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
          <h1 className={styles.headline} id="hero-copy-panel" ref={headlineRef}>
            {selectedAudience === "retail" ? (
              <>
                <span className={styles.headlineMask}>
                  <span className={styles.headlineLine}>Run your store with</span>
                </span>
                <span className={styles.headlineMask}>
                  <span className={styles.headlineLine}>more control.</span>
                </span>
              </>
            ) : (
              <>
                <span className={styles.headlineMask}>
                  <span className={styles.headlineLine}>Every order. One</span>
                </span>
                <span className={styles.headlineMask}>
                  <span className={styles.headlineLine}>simple system.</span>
                </span>
              </>
            )}
          </h1>

          {/* Description */}
          <p className={styles.description} ref={descRef}>
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
