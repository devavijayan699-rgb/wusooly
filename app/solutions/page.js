"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import EditorialFeaturesSection from "../components/EditorialFeaturesSection";
import CafeRestaurantFeaturesSection from "../components/CafeRestaurantFeaturesSection";
import FAQSection from "../components/FAQSection";
import DownloadSection from "../components/DownloadSection";
import { gsap } from "../../lib/gsap";
import styles from "./solutions.module.css";

export default function SolutionsPage() {
  const [selectedAudience, setSelectedAudience] = useState("retail"); // "retail" | "cafe"
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const audienceRef = useRef(null);

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

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      if (audienceRef.current) gsap.set(audienceRef.current, { opacity: 1, y: 0 });
      if (cardRef.current) gsap.set(cardRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [audienceRef.current, cardRef.current],
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.15,
          stagger: 0.12,
          ease: "expo.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Audience switch cross-fade
  useEffect(() => {
    if (!cardRef.current) return;
    const isReduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    gsap.fromTo(
      cardRef.current,
      { opacity: 0.4, y: 6 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [selectedAudience]);

  const handleGetDemoNavbar = () => {
    window.location.href = "/contact";
  };

  return (
    <main className={styles.page} ref={containerRef}>
      {/* ── Top Header Navigation Bar ── */}
      <div className={styles.navbarContainer}>
        <Navbar onGetDemo={handleGetDemoNavbar} variant="solutions" />
      </div>

      {/* ── Main Content Area: Solutions Essentials Card ── */}
      <div className={styles.mainContent}>
        <section className={styles.cardSection} aria-label="Solutions Overview">
          {/* Audience Selector Segmented Control */}
          <div
            ref={audienceRef}
            className={styles.audienceSelector}
            role="tablist"
            aria-label="Select store category"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedAudience === "retail"}
              className={`${styles.audienceSegment} ${
                selectedAudience === "retail" ? styles.segmentActive : styles.segmentInactive
              }`}
              onClick={() => {
                setSelectedAudience("retail");
                if (typeof window !== "undefined") {
                  window.history.replaceState(null, "", "#retail");
                }
              }}
            >
              Shops &amp; Supermarkets
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={selectedAudience === "cafe"}
              className={`${styles.audienceSegment} ${
                selectedAudience === "cafe" ? styles.segmentActive : styles.segmentInactive
              }`}
              onClick={() => {
                setSelectedAudience("cafe");
                if (typeof window !== "undefined") {
                  window.history.replaceState(null, "", "#cafe");
                }
              }}
            >
              Cafés &amp; Restaurants
            </button>
          </div>

          <div className={styles.solutionsCard} ref={cardRef}>
            <h1 className={styles.cardTitle}>
              {selectedAudience === "retail" ? (
                <>
                  The essentials to run your store,{" "}
                  <br className={styles.titleBr} />
                  connected.
                </>
              ) : (
                <>
                  Every order.{" "}
                  <br className={styles.titleBr} />
                  One simple system.
                </>
              )}
            </h1>
            <p className={styles.cardSubtext}>
              {selectedAudience === "retail"
                ? "From checkout to stock control and business reporting, manage key retail operations through one POS system."
                : "From table service to takeaway and online ordering, manage billing, kitchen tickets, and business analytics through one unified POS."}
            </p>
          </div>
        </section>
      </div>

      {/* ── Features Section from Hero ── */}
      <div className={styles.featuresWrapper}>
        {selectedAudience === "retail" ? (
          <EditorialFeaturesSection onGetDemo={handleGetDemoNavbar} hideIntro={true} />
        ) : (
          <CafeRestaurantFeaturesSection onGetDemo={handleGetDemoNavbar} hideIntro={true} />
        )}
      </div>

      {/* ── Frequently Asked Questions ── */}
      <FAQSection />

      {/* ── Download Desktop App Section ── */}
      <DownloadSection />

      {/* ── Floating Dark Glass Footer ── */}
      <Footer onGetDemo={handleGetDemoNavbar} theme="dark" />
    </main>
  );
}
