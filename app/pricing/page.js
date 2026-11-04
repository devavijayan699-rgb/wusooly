"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PricingSection from "../components/PricingSection";
import FAQSection from "../components/FAQSection";
import styles from "./pricing.module.css";

export default function PricingPage() {
  const handleGetDemo = (planName) => {
    window.location.href = `/contact?plan=${encodeURIComponent(planName || "Pricing Inquiry")}`;
  };

  return (
    <main className={styles.page}>
      {/* ── Top Header Navigation Bar ── */}
      <div className={styles.navbarContainer}>
        <Navbar onGetDemo={handleGetDemo} variant="pricing" theme="dark" />
      </div>

      {/* ── Main Content Area: Grand Botanical Pricing Canvas ── */}
      <div className={styles.mainContent}>
        <PricingSection onGetDemo={handleGetDemo} />
      </div>

      {/* ── Frequently Asked Questions ── */}
      <div className={styles.faqSection}>
        <FAQSection />
      </div>

      {/* ── Full-Bleed Site Footer ── */}
      <Footer onGetDemo={handleGetDemo} theme="dark" />
    </main>
  );
}

