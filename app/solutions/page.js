"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FeaturesGrid from "../components/sections/FeaturesGrid";
import FAQSection from "../components/sections/FAQSection";
import DownloadSection from "../components/sections/DownloadSection";
import OutroCTA from "../components/sections/OutroCTA";
import AudienceToggle from "../components/ui/AudienceToggle";
import { gsap, useGsapReveal, prefersReducedMotion } from "../../lib/gsap";
import styles from "./solutions.module.css";

export default function SolutionsPage() {
  const [selectedAudience, setSelectedAudience] = useState("retail"); // "retail" | "cafe"
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const audienceRef = useRef(null);

  useGsapReveal(
    containerRef,
    () => {
      gsap.fromTo(
        [audienceRef.current, cardRef.current],
        { opacity: 0.7, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "expo.out" }
      );
    },
    {
      onReducedMotion: () => {
        if (audienceRef.current) gsap.set(audienceRef.current, { opacity: 1, y: 0 });
        if (cardRef.current) gsap.set(cardRef.current, { opacity: 1, y: 0 });
      },
    }
  );

  // Audience switch cross-fade
  useEffect(() => {
    if (!cardRef.current || prefersReducedMotion()) return;

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
          <AudienceToggle
            ref={audienceRef}
            variant="solutions"
            value={selectedAudience}
            onChange={setSelectedAudience}
            layoutId="activeSolutionsAudienceTab"
            syncHash
          />

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
        <FeaturesGrid
          audience={selectedAudience}
          hideIntro={true}
          onGetDemo={handleGetDemoNavbar}
        />
      </div>

      {/* ── Frequently Asked Questions ── */}
      <FAQSection />

      {/* ── Download Desktop App Section ── */}
      <DownloadSection />

      {/* ── Outro Store Operations CTA Banner ── */}
      <OutroCTA />

      {/* ── Floating Dark Glass Footer ── */}
      <Footer onGetDemo={handleGetDemoNavbar} />
    </main>
  );
}
