"use client";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PricingSection from "../components/sections/PricingSection";
import FAQSection from "../components/sections/FAQSection";
import OutroCTA from "../components/sections/OutroCTA";
import styles from "./pricing.module.css";

export default function PricingPage() {
  const handleGetDemo = (planName) => {
    window.location.href = `/contact?plan=${encodeURIComponent(planName || "Pricing Inquiry")}`;
  };

  return (
    <main className={styles.page}>
      {/* ── Top Header Navigation Bar ── */}
      <div className={styles.navbarContainer}>
        <Navbar onGetDemo={handleGetDemo} variant="pricing" />
      </div>

      {/* ── Main Content Area: Grand Botanical Pricing Canvas ── */}
      <div className={styles.mainContent}>
        <PricingSection onGetDemo={handleGetDemo} isHero={true} />
      </div>

      {/* ── Frequently Asked Questions ── */}
      <div className={styles.faqSection}>
        <FAQSection />
      </div>

      {/* ── Outro Store Operations CTA Banner ── */}
      <OutroCTA />

      {/* ── Full-Bleed Site Footer ── */}
      <Footer onGetDemo={handleGetDemo} />
    </main>
  );
}

