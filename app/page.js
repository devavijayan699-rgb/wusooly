"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
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
  const heroContentRef = useRef(null);

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
      const heroTl = gsap.timeline();

      // Initial states - subtle and immediately visible
      if (bgImageRef.current) {
        gsap.set(bgImageRef.current, {
          scale: 1.025,
          opacity: 0.85,
        });
      }
      if (navbarRef.current) {
        gsap.set(navbarRef.current, { opacity: 0, y: -8 });
      }
      if (audienceRef.current) {
        gsap.set(audienceRef.current, { opacity: 0, y: 8 });
      }
      if (headlineRef.current) {
        gsap.set(headlineRef.current.querySelectorAll(`.${styles.headlineLine}`), {
          opacity: 0,
          yPercent: 75,
          letterSpacing: "-0.038em",
        });
      }
      if (descRef.current) {
        gsap.set(descRef.current, { opacity: 0, y: 8 });
      }

      // 1. Background artwork soft settling
      if (bgImageRef.current) {
        heroTl.to(bgImageRef.current, {
          scale: 1.0,
          opacity: 1,
          duration: 0.75,
          ease: "expo.out",
        });
      }

      // 2. Navbar glides softly down
      if (navbarRef.current) {
        heroTl.to(
          navbarRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "expo.out",
          },
          0.05
        );
      }

      // 3. Audience Selector rises
      if (audienceRef.current) {
        heroTl.to(
          audienceRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "expo.out",
          },
          0.1
        );
      }

      // 4. Headline lines rise cleanly with kinetic tracking compression
      if (headlineRef.current) {
        heroTl.to(
          headlineRef.current.querySelectorAll(`.${styles.headlineLine}`),
          {
            opacity: 1,
            yPercent: 0,
            letterSpacing: "-0.022em",
            duration: 0.65,
            stagger: 0.05,
            ease: "expo.out",
          },
          0.16
        );
      }

      // 5. Description copy rises
      if (descRef.current) {
        heroTl.to(
          descRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "expo.out",
          },
          0.28
        );
      }

      // 6. Hero 4-Layer Optical Parallax Scrubbing
      if (heroRef.current) {
        if (bgImageRef.current) {
          gsap.to(bgImageRef.current, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        if (heroContentRef.current) {
          gsap.to(heroContentRef.current, {
            yPercent: -12,
            opacity: 0.15,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }
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
      headlineRef.current.querySelectorAll(`.${styles.headlineLine}`),
      { opacity: 0.4, y: 6, letterSpacing: "-0.034em" },
      { opacity: 1, y: 0, letterSpacing: "-0.022em", duration: 0.45, stagger: 0.04, ease: "expo.out" }
    );
    gsap.fromTo(
      descRef.current,
      { opacity: 0.4, y: 6 },
      { opacity: 1, y: 0, duration: 0.45, ease: "expo.out" }
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
        <div className={styles.heroContent} ref={heroContentRef}>
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
              {selectedAudience === "retail" && (
                <motion.span
                  layoutId="activeHeroAudienceTab"
                  className={styles.segmentPill}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                />
              )}
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
              {selectedAudience === "cafe" && (
                <motion.span
                  layoutId="activeHeroAudienceTab"
                  className={styles.segmentPill}
                  transition={{ type: "spring", stiffness: 420, damping: 30 }}
                />
              )}
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

          {/* Description - Deliberate Two-Line Hierarchy */}
          <p className={styles.description} ref={descRef}>
            {selectedAudience === "retail" ? (
              <>
                <span className={styles.descLine}>
                  Handle billing, stock, purchases, expenses, and performance reports with
                </span>
                <span className={styles.descLine}>
                  Wusooly POS—built for everyday retail operations.
                </span>
              </>
            ) : (
              <>
                <span className={styles.descLine}>
                  From table service to takeaway and online ordering, manage billing, kitchen tickets, and business
                </span>
                <span className={styles.descLine}>
                  analytics through one unified POS.
                </span>
              </>
            )}
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
