"use client";

import React, { useState, useEffect, useRef } from "react";

/**
 * EditorialFeaturesStandalone.jsx
 * -------------------------------------------------------------
 * 100% Standalone, Self-Contained Editorial Features Section
 * Based on wusooly-editorial-features.zip from Google AI Studio.
 *
 * Features:
 * • 14 Minimal Natural Editorial Photos (7 Retail + 7 Café)
 * • Complete lifetime & cloud tier card compositions
 * • Embedded scoped CSS (no external .module.css required)
 * • Zero Next.js-exclusive imports (uses standard <img> tags)
 * • Audience selector (Shops & Supermarkets vs. Cafés & Restaurants)
 * • Interactive Demo Walkthrough Booking Modal with validation
 * • Full compatibility with Next.js, AI Studio, and Vite
 */

const ASSETS = {
  // Shops & Supermarkets
  retailLifetimeBilling: "/images/retail-lifetime-billing.jpg",
  retailLifetimeWallets: "/images/retail-lifetime-wallets.jpg",
  retailLifetimeStock: "/images/retail-lifetime-stock.jpg",
  retailLifetimePurchase: "/images/retail-lifetime-purchase.jpg",
  retailLifetimeReports: "/images/retail-lifetime-reports.jpg",
  retailCloudDashboard: "/images/retail-cloud-dashboard.jpg",
  retailCloudPromos: "/images/retail-cloud-promos.jpg",

  // Cafés & Restaurants
  cafeLifetimeBilling: "/images/cafe-lifetime-billing.jpg",
  cafeLifetimeWallets: "/images/cafe-lifetime-wallets.jpg",
  cafeLifetimeKot: "/images/cafe-lifetime-kot.jpg",
  cafeLifetimeTables: "/images/cafe-lifetime-tables.jpg",
  cafeLifetimeStock: "/images/cafe-lifetime-stock.jpg",
  cafeLifetimeReports: "/images/cafe-lifetime-reports.jpg",
  cafeCloudQrOnline: "/images/cafe-cloud-qr-online.jpg",
};

function getIntroCopy(audience) {
  if (audience === "retail") {
    return {
      headline: "The essentials to run your store, connected.",
      subtext:
        "From checkout to stock control and business reporting, manage key retail operations through one POS system.",
      outroTitle: "Ready to see Wusooly in your store?",
    };
  }
  return {
    headline: "Every order. One simple system.",
    subtext:
      "From table service to takeaway and online ordering, manage billing, kitchen tickets, and business analytics through one unified POS.",
    outroTitle: "Ready to see Wusooly in your café?",
  };
}

function validateDemoRequest(input) {
  const name = (input.fullName || "").trim();
  const phone = (input.phone || "").trim();
  if (!name) {
    return { valid: false, error: "Please enter your full name." };
  }
  if (!phone || phone.length < 5) {
    return {
      valid: false,
      error: "Please enter a valid phone or WhatsApp number.",
    };
  }
  return { valid: true };
}

export default function EditorialFeaturesStandalone({
  audience: controlledAudience,
  defaultAudience = "retail",
  showAudienceToggle = true,
  hideIntro = false,
  onGetDemo: externalGetDemo,
}) {
  const [internalAudience, setInternalAudience] = useState(defaultAudience);
  const audience = controlledAudience ?? internalAudience;
  const setAudience = setInternalAudience;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Schedule a 1-on-1 Walkthrough");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [formError, setFormError] = useState(null);
  const [submittedBookings, setSubmittedBookings] = useState([]);
  const [justSubmitted, setJustSubmitted] = useState(null);
  const sectionRef = useRef(null);

  const introCopy = getIntroCopy(audience);

  const handleOpenDemo = (title = "Get a Demo") => {
    if (externalGetDemo) {
      externalGetDemo();
      return;
    }
    setModalTitle(title);
    setFormError(null);
    setJustSubmitted(null);
    setModalOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    if (modalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [modalOpen]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validation = validateDemoRequest({ fullName, phone });
    if (!validation.valid) {
      setFormError(validation.error || "Please check your details.");
      return;
    }
    const booking = {
      id: `${Date.now()}`,
      title: modalTitle,
      audience,
      fullName: fullName.trim(),
      phone: phone.trim(),
      submittedAt: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setSubmittedBookings((prev) => [booking, ...prev]);
    setJustSubmitted(booking);
    setFullName("");
    setPhone("");
    setFormError(null);
  };

  return (
    <section
      className="wusooly-editorial-root"
      ref={sectionRef}
      id={audience === "retail" ? "features" : "cafe-features"}
      aria-label="Wusooly editorial POS features"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap');

        .wusooly-editorial-root {
          --w-canvas: #f6f6f3;
          --w-card-bg: #ffffff;
          --w-forest: #081f11;
          --w-forest-dark: #071b0e;
          --w-lime: #9ce62a;
          --w-lime-hover: #aae942;
          --w-text-dark: #0a1f12;
          --w-text-muted: #5a645e;
          --w-border: #e8e8e3;
          --w-radius: 18px;
          --w-gap: 10px;
          font-family: var(--font-sans, "Manrope", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif);
          background: var(--w-canvas);
          color: var(--w-text-dark);
          padding: 48px 16px 88px;
          box-sizing: border-box;
          width: 100%;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .wusooly-editorial-root.no-intro {
          padding-top: 16px;
        }

        .wusooly-editorial-root * {
          box-sizing: border-box;
          font-family: inherit;
        }

        .w-container {
          max-width: 1104px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* ── Left-Aligned Header (Classic Editorial Style) ── */
        .w-header-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 12px;
          padding: 8px 0 16px;
          max-width: 600px;
        }

        .w-segmented-control {
          display: inline-flex;
          background: #ecece8;
          border: 1px solid #dfdfd9;
          padding: 5px;
          border-radius: 9999px;
          gap: 4px;
          margin-bottom: 8px;
        }

        .w-segment-btn {
          background: transparent;
          border: none;
          padding: 10px 22px;
          border-radius: 9999px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #2c3e32;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .w-segment-btn.active {
          background: var(--w-lime);
          color: var(--w-forest-dark);
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(156, 230, 42, 0.3);
        }

        .w-intro-headline {
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: #171717;
          margin: 0;
          max-width: 600px;
          text-align: left;
        }

        .w-intro-subtext {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #666666;
          max-width: 600px;
          margin: 0;
          font-weight: 400;
          text-align: left;
        }

        /* ── Grids & Rows ── */
        .w-grid {
          display: flex;
          flex-direction: column;
          gap: var(--w-gap);
        }

        .w-row {
          display: flex;
          gap: var(--w-gap);
          width: 100%;
          align-items: stretch;
        }

        @media (max-width: 860px) {
          .w-row {
            flex-direction: column;
          }
        }

        .w-card {
          border-radius: var(--w-radius);
          overflow: hidden;
          position: relative;
        }

        /* ── Row 1 Hero Card (Forest Green) ── */
        .w-hero-card {
          background: var(--w-forest);
          display: flex;
          align-items: center;
          padding: clamp(28px, 4.5vw, 52px);
          gap: clamp(28px, 4.5vw, 56px);
        }

        @media (max-width: 860px) {
          .w-hero-card {
            flex-direction: column;
            text-align: center;
          }
        }

        .w-hero-media {
          flex: 0 0 51%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .w-hero-img {
          width: 100%;
          aspect-ratio: 3 / 2;
          height: auto;
          border-radius: 14px;
          display: block;
          object-fit: cover;
        }

        .w-hero-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .w-hero-title {
          font-size: clamp(1.9rem, 3.2vw, 2.75rem);
          font-weight: 800;
          line-height: 1.10;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0;
          text-transform: uppercase;
        }

        .w-hero-body {
          font-size: 0.92rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.82);
          margin: 0;
          font-weight: 400;
        }

        .w-lime-pill-btn {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--w-lime);
          color: var(--w-forest-dark);
          border: none;
          font-size: 0.86rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          padding: 11px 24px;
          border-radius: 9999px;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 2px 10px rgba(156, 230, 42, 0.28);
          transition: background 0.2s ease, transform 0.15s ease;
        }
        .w-lime-pill-btn:hover {
          background: var(--w-lime-hover);
          transform: translateY(-1px);
        }

        @media (max-width: 860px) {
          .w-lime-pill-btn {
            align-self: center;
          }
        }

        /* ── Left White Feature Card (Row 2) ── */
        .w-text-card {
          flex: 0 0 33.2%;
          background: var(--w-card-bg);
          border: 1px solid var(--w-border);
          padding: clamp(26px, 3vw, 36px);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 22px;
        }

        .w-text-title {
          font-size: clamp(1.2rem, 1.7vw, 1.5rem);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.02em;
          margin: 0;
          text-transform: uppercase;
          color: var(--w-forest-dark);
        }

        .w-text-body {
          font-size: 0.88rem;
          line-height: 1.58;
          color: #68706b;
          margin: 18px 0 0;
          font-weight: 400;
        }

        .w-chips {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          align-items: center;
        }

        .w-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f4f4f1;
          border: 1px solid #e5e5e0;
          border-radius: 9999px;
          padding: 7px 14px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #222;
        }

        /* ── Full-Bleed Editorial Photo Cards ── */
        .w-visual-card {
          position: relative;
          background: #171412;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          min-height: 350px;
          padding: clamp(24px, 3.2vw, 36px);
        }

        .w-visual-card.w-wide-card {
          min-height: 390px;
          padding: clamp(28px, 4vw, 44px);
        }

        .w-visual-card.w-tall-card {
          min-height: 510px;
        }

        .w-visual-card.flex-67 {
          flex: 1;
        }

        .w-visual-card.flex-61 {
          flex: 0 0 61.2%;
        }

        .w-visual-card.flex-62 {
          flex: 1;
        }

        .w-visual-card.flex-59 {
          flex: 1;
        }

        .w-visual-card.flex-41 {
          flex: 0 0 41%;
        }

        @media (max-width: 860px) {
          .w-visual-card.flex-67,
          .w-visual-card.flex-61,
          .w-visual-card.flex-62,
          .w-visual-card.flex-59,
          .w-visual-card.flex-41,
          .w-text-card {
            flex: 1 1 auto;
            min-height: 320px;
          }
        }

        .w-visual-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          z-index: 0;
        }

        .w-scrim {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              rgba(14, 12, 10, 0.04) 0%,
              rgba(14, 12, 10, 0.18) 46%,
              rgba(12, 10, 9, 0.78) 84%,
              rgba(10, 9, 8, 0.88) 100%
            ),
            linear-gradient(
              90deg,
              rgba(10, 9, 8, 0.46) 0%,
              rgba(10, 9, 8, 0.16) 50%,
              rgba(10, 9, 8, 0.0) 100%
            );
          z-index: 1;
          pointer-events: none;
        }

        .w-visual-overlay {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 10px;
          max-width: 640px;
        }

        .w-photo-title {
          font-size: clamp(1.22rem, 1.85vw, 1.58rem);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0;
          text-transform: uppercase;
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.45);
        }

        .w-wide-title {
          font-size: clamp(1.65rem, 2.75vw, 2.38rem);
          font-weight: 800;
          line-height: 1.10;
          letter-spacing: -0.02em;
          color: #ffffff;
          margin: 0;
          text-transform: uppercase;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.45);
        }

        .w-photo-sub {
          font-size: 0.90rem;
          line-height: 1.58;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          font-weight: 400;
          max-width: 540px;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.45);
        }

        /* ── KOT Left Card (Cafe Row 3 Left) ── */
        .w-kot-card {
          flex: 0 0 38%;
          background: #f1f1e9;
          border: 1px solid #e5e5dc;
          padding: 32px 32px 0 32px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        @media (max-width: 860px) {
          .w-kot-card {
            flex: 1 1 auto;
          }
        }

        .w-brand-logo-text {
          font-size: 1.25rem;
          font-weight: 800;
          letter-spacing: -0.04em;
          color: var(--w-forest-dark);
        }

        .w-kot-title {
          font-size: clamp(1.25rem, 1.8vw, 1.55rem);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.02em;
          color: var(--w-forest-dark);
          margin: 0;
          text-transform: uppercase;
        }

        .w-kot-body {
          font-size: 0.88rem;
          line-height: 1.58;
          color: #626a64;
          margin: 0;
          font-weight: 400;
        }

        .w-discover-btn {
          align-self: flex-start;
          background: var(--w-lime);
          color: var(--w-forest-dark);
          border: none;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          padding: 9px 18px;
          border-radius: 9999px;
          cursor: pointer;
          white-space: nowrap;
          margin-top: 2px;
          transition: background 0.15s ease;
        }
        .w-discover-btn:hover {
          background: var(--w-lime-hover);
        }

        .w-kot-photo-wrap {
          margin-top: auto;
          padding-top: 10px;
          border-radius: 12px 12px 0 0;
          overflow: hidden;
        }

        .w-kot-photo {
          width: 100%;
          aspect-ratio: 4 / 3;
          height: auto;
          display: block;
          border-radius: 12px 12px 0 0;
          object-fit: cover;
          object-position: center 22%;
        }

        /* ── Stat Card (38.5% & 6+) ── */
        .w-stat-card {
          flex: 1;
          background: var(--w-forest);
          padding: clamp(28px, 4vw, 44px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
        }

        .w-stat-number {
          font-size: clamp(3.2rem, 5.6vw, 4.6rem);
          font-weight: 800;
          letter-spacing: -0.04em;
          line-height: 1;
          color: var(--w-lime);
          font-variant-numeric: tabular-nums;
        }

        .w-stat-body {
          font-size: 0.90rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
          font-weight: 400;
        }

        /* ── Feature Strip (3-Column Minimal Strip) ── */
        .w-strip-card {
          background: var(--w-card-bg);
          border: 1px solid var(--w-border);
          padding: clamp(28px, 3.5vw, 40px);
        }

        .w-strip-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }

        .w-strip-item {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 4px 28px;
        }

        .w-strip-item:first-child {
          padding-left: 4px;
        }

        .w-strip-item + .w-strip-item {
          border-left: 1px solid #ecece7;
        }

        @media (max-width: 800px) {
          .w-strip-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .w-strip-item {
            padding: 0;
          }
          .w-strip-item + .w-strip-item {
            border-left: none;
            border-top: 1px solid #ecece7;
            padding-top: 20px;
          }
        }

        .w-strip-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #f2f3ef;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--w-forest-dark);
          margin-bottom: 4px;
        }

        .w-strip-title {
          font-size: 1.10rem;
          font-weight: 700;
          line-height: 1.25;
          color: var(--w-forest-dark);
          margin: 0;
        }

        .w-strip-body {
          font-size: 0.86rem;
          line-height: 1.58;
          color: #68706b;
          margin: 0;
          font-weight: 400;
        }

        /* ── Outro CTA Strip ── */
        .w-outro {
          background: #ffffff;
          border: 1px solid var(--w-border);
          border-radius: var(--w-radius);
          padding: clamp(22px, 3vw, 30px) clamp(24px, 4vw, 42px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
          margin-top: 10px;
        }

        .w-outro-title {
          font-size: clamp(1.25rem, 1.9vw, 1.6rem);
          font-weight: 700;
          color: var(--w-forest-dark);
          margin: 0;
          letter-spacing: -0.02em;
        }

        /* ── Confirmed Bookings Banner ── */
        .w-bookings-banner {
          background: #eaf1ea;
          border: 1px solid rgba(11, 31, 18, 0.14);
          border-radius: 14px;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 0.88rem;
          color: var(--w-forest-dark);
        }

        /* ── Interactive Modal ── */
        .w-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(7, 26, 14, 0.72);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          z-index: 9999;
        }

        .w-modal-box {
          background: #ffffff;
          border-radius: 20px;
          padding: 32px;
          max-width: 480px;
          width: 100%;
          position: relative;
          box-shadow: 0 20px 40px rgba(0,0,0,0.25);
          animation: wModalIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes wModalIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .w-modal-close {
          position: absolute;
          top: 18px;
          right: 18px;
          background: #f0f0ed;
          border: none;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #555;
        }
        .w-modal-close:hover {
          background: #e2e2de;
          color: #111;
        }

        .w-modal-heading {
          margin: 0 0 8px 0;
          font-size: 1.4rem;
          color: var(--w-forest-dark);
          font-weight: 800;
        }

        .w-modal-desc {
          margin: 0 0 20px 0;
          font-size: 0.9rem;
          color: #666;
        }

        .w-modal-label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 14px;
        }

        .w-modal-label-last {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 22px;
        }

        .w-modal-input {
          width: 100%;
          padding: 12px 14px;
          border-radius: 10px;
          border: 1px solid #d5d5d0;
          font-size: 0.95rem;
          margin-top: 10px;
          font-family: inherit;
        }
        .w-modal-input:focus {
          outline: none;
          border-color: var(--w-forest);
        }

        .w-modal-error {
          margin: 0 0 12px 0;
          font-size: 0.85rem;
          color: #b91c1c;
          font-weight: 600;
        }

        .w-modal-success {
          background: #eaf1ea;
          border-radius: 14px;
          padding: 20px;
          text-align: center;
          color: var(--w-forest-dark);
        }

        .w-modal-success-title {
          margin: 0 0 8px 0;
          font-weight: 700;
          font-size: 1.05rem;
        }

        .w-modal-success-sub {
          margin: 0 0 16px 0;
          font-size: 0.9rem;
          color: #3b5043;
        }

        .w-full-btn {
          width: 100%;
          justify-content: center;
        }
      `}</style>

      <div className="w-container">
        {/* ── Centered Audience Switcher & Clean Minimal Header ── */}
        {!hideIntro && (
          <header className="w-header-block">
            {showAudienceToggle && (
              <div
                className="w-segmented-control"
                role="tablist"
                aria-label="Business Audience"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={audience === "retail"}
                  className={`w-segment-btn ${
                    audience === "retail" ? "active" : ""
                  }`}
                  onClick={() => setAudience("retail")}
                >
                  Shops &amp; Supermarkets
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={audience === "cafe"}
                  className={`w-segment-btn ${
                    audience === "cafe" ? "active" : ""
                  }`}
                  onClick={() => setAudience("cafe")}
                >
                  Cafés &amp; Restaurants
                </button>
              </div>
            )}

            <h2 className="w-intro-headline">
              {audience === "retail"
                ? "The essentials to run your store, connected."
                : "Every order. One simple system."}
            </h2>
            <p className="w-intro-subtext">{introCopy.subtext}</p>
          </header>
        )}

        {/* ── Active Walkthrough Bookings Status ── */}
        {submittedBookings.length > 0 && (
          <div className="w-bookings-banner" role="status">
            <span>
              <strong>Walkthrough Scheduled:</strong>{" "}
              {submittedBookings[0].title} for {submittedBookings[0].fullName} (
              {submittedBookings[0].phone})
            </span>
            <span>{submittedBookings.length} requested</span>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════════
            SHOPS & SUPERMARKETS — MINIMAL PREMIUM BENTO GRID
            ══════════════════════════════════════════════════════════════════ */}
        {audience === "retail" ? (
          <div className="w-grid">
            {/* ── ROW 1 · Dark Hero Card: Offline & Barcode Billing ── */}
            <div className="w-card w-hero-card">
              <div className="w-hero-media">
                <img
                  src={ASSETS.retailLifetimeBilling}
                  alt="Wusooly POS offline and barcode billing terminal on counter"
                  className="w-hero-img"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-hero-content">
                <h3 className="w-hero-title">
                  OFFLINE &amp; BARCODE BILLING THAT GROWS SMARTER EVERY DAY.
                </h3>
                <button
                  type="button"
                  className="w-lime-pill-btn"
                  onClick={() => handleOpenDemo("Retail POS Demo")}
                >
                  Get a Demo
                </button>
              </div>
            </div>

            {/* ── ROW 2 · Asymmetric Pair: Barcode Generator & Categories (33%) + Customer Wallets & Credit (67%) ── */}
            <div className="w-row">
              <div className="w-card w-text-card">
                <div>
                  <h3 className="w-text-title">
                    BARCODE GENERATOR &amp; PRODUCT CATEGORIES
                  </h3>
                  <p className="w-text-body">
                    Print custom barcode labels, organize products by category,
                    and connect wallets and scanners in one platform.
                  </p>
                </div>
                <div className="w-chips">
                  <span className="w-chip">
                    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="11" fill="#1f2937" />
                      <text
                        x="12"
                        y="16"
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="12"
                        fontWeight="bold"
                        fontFamily="sans-serif"
                      >
                        G
                      </text>
                    </svg>
                    G Pay
                  </span>
                  <span className="w-chip">
                    <svg width="13" height="14" viewBox="0 0 170 170" fill="#111" aria-hidden="true">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.13-1.9-14.34-6.08-3.69-3.03-7.61-7.82-11.77-14.37-5.93-9.28-10.72-20.03-14.37-32.27-3.66-12.24-5.48-23.38-5.48-33.42 0-12.73 3.19-23.16 9.56-31.29 6.37-8.13 14.36-12.33 23.98-12.6 4.69 0 9.89 1.39 15.6 4.18 5.7 2.79 9.37 4.24 11.01 4.35 1.23 0 5.19-1.67 11.88-5.01 6.7-3.34 12.4-4.79 17.11-4.35 12.86 1.04 22.52 5.93 28.98 14.66-11.51 6.98-17.16 16.75-16.94 29.31.22 9.81 3.88 17.97 10.98 24.47 4.91 4.58 10.67 7.36 17.28 8.35-1.39 4.27-3.06 8.33-5.02 12.17zM119.22 31.02c0 7.69-2.81 14.88-8.42 21.56-6.77 7.91-14.96 12.48-23.82 11.77-.11-.93-.17-1.91-.17-2.95 0-7.38 3.21-15.27 8.91-21.74 2.84-3.27 6.45-5.99 10.83-8.16 4.38-2.16 8.53-3.36 12.45-3.59.15 1.08.22 2.12.22 3.11z" />
                    </svg>
                    Pay
                  </span>
                  <span className="w-chip" aria-label="Mastercard">
                    <svg width="22" height="14" viewBox="0 0 32 20" aria-hidden="true">
                      <circle cx="11" cy="10" r="8" fill="#eb001b" />
                      <circle cx="21" cy="10" r="8" fill="#f79e1b" fillOpacity="0.9" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="w-card w-visual-card flex-67">
                <img
                  src={ASSETS.retailLifetimeWallets}
                  alt="Customer-based billing, store wallets, and credit system at counter"
                  className="w-visual-img"
                  style={{ objectPosition: "center 35%" }}
                  referrerPolicy="no-referrer"
                />
                <div className="w-scrim" aria-hidden="true" />
                <div className="w-visual-overlay">
                  <h3 className="w-photo-title">
                    CUSTOMER BILLING, WALLETS &amp; CREDIT SYSTEM.
                  </h3>
                </div>
              </div>
            </div>

            {/* ── ROW 3 · Full-Width Photo Panel: Automated Stock & Low-Stock Alerts ── */}
            <div className="w-card w-visual-card w-wide-card">
              <img
                src={ASSETS.retailLifetimeStock}
                alt="POS terminal showing automated stock updates and low-stock alerts"
                className="w-visual-img"
                style={{ objectPosition: "center 22%" }}
                referrerPolicy="no-referrer"
              />
              <div className="w-scrim" aria-hidden="true" />
              <div className="w-visual-overlay">
                <h3 className="w-wide-title">
                  STOCK THAT UPDATES ITSELF. ALERTS BEFORE YOU RUN OUT.
                </h3>
                <p className="w-photo-sub">
                  Real-time inventory reconciliation across every register.
                  Automated low-stock alerts keep your shelves full without
                  manual checks.
                </p>
              </div>
            </div>

            {/* ── ROW 4 · Asymmetric Pair: Stock Purchase Expense (61%) + 38.5% Margin & Expense Ledger (39%) ── */}
            <div className="w-row">
              <div className="w-card w-visual-card flex-61">
                <img
                  src={ASSETS.retailLifetimePurchase}
                  alt="Store owner recording stock purchase expenses with barcode scanner"
                  className="w-visual-img"
                  style={{ objectPosition: "center 18%" }}
                  referrerPolicy="no-referrer"
                />
                <div className="w-scrim" aria-hidden="true" />
                <div className="w-visual-overlay">
                  <h3 className="w-photo-title">
                    RECORD EVERY PURCHASE. REPLENISH WITHOUT GUESSWORK.
                  </h3>
                </div>
              </div>

              <div className="w-card w-stat-card">
                <div className="w-stat-number">38.5%</div>
                <p className="w-stat-body">
                  Review profit margins, expense ledgers, and multi-staff role
                  records calculated automatically from your store activity.
                </p>
              </div>
            </div>

            {/* ── ROW 5 · Full-Width Wide Photo Banner: Shift, Sales, P&L & Performance Reports ── */}
            <div className="w-card w-visual-card w-wide-card">
              <img
                src={ASSETS.retailLifetimeReports}
                alt="Store owner reviewing shift, sales, P&L, and stock performance reports"
                className="w-visual-img"
                style={{ objectPosition: "center 20%" }}
                referrerPolicy="no-referrer"
              />
              <div className="w-scrim" aria-hidden="true" />
              <div className="w-visual-overlay">
                <h3 className="w-wide-title">
                  PERFORMANCE REPORTS THAT REVEAL WHAT MATTERS MOST.
                </h3>
                <p className="w-photo-sub">
                  Shift, sales, profit &amp; loss, and stock reports in one
                  clear operations dashboard built for store owners.
                </p>
              </div>
            </div>

            {/* ── ROW 6 · Asymmetric Cloud Pair: Live App/Web Dashboard (59%) + Promos, Gift Cards & Backup (41%) ── */}
            <div className="w-row">
              <div className="w-card w-visual-card flex-59">
                <img
                  src={ASSETS.retailCloudDashboard}
                  alt="Store owner checking live cloud dashboard on app and web"
                  className="w-visual-img"
                  style={{ objectPosition: "center 22%" }}
                  referrerPolicy="no-referrer"
                />
                <div className="w-scrim" aria-hidden="true" />
                <div className="w-visual-overlay">
                  <h3 className="w-photo-title">
                    LIVE CLOUD DASHBOARD ON APP &amp; WEB. FIRST YEAR FREE.
                  </h3>
                </div>
              </div>

              <div className="w-card w-visual-card flex-41">
                <img
                  src={ASSETS.retailCloudPromos}
                  alt="Customer redeeming gift card and promo code at counter"
                  className="w-visual-img"
                  style={{ objectPosition: "center 38%" }}
                  referrerPolicy="no-referrer"
                />
                <div className="w-scrim" aria-hidden="true" />
                <div className="w-visual-overlay">
                  <h3 className="w-photo-title">
                    PROMO CODES, GIFT CARDS &amp; CLOUD BACKUP.
                  </h3>
                </div>
              </div>
            </div>

            {/* ── Outro CTA Strip ── */}
            <div className="w-outro">
              <h4 className="w-outro-title">{introCopy.outroTitle}</h4>
              <button
                type="button"
                className="w-lime-pill-btn"
                onClick={() => handleOpenDemo("Store Walkthrough")}
              >
                Schedule a 1-on-1 Walkthrough
              </button>
            </div>
          </div>
        ) : (
          /* ══════════════════════════════════════════════════════════════════
             CAFÉS & RESTAURANTS — MINIMAL PREMIUM BENTO GRID
             ══════════════════════════════════════════════════════════════════ */
          <div className="w-grid">
            {/* ── CAFE ROW 1 · Dark Hero Card: Offline & Fast Multi-Payment Billing ── */}
            <div className="w-card w-hero-card">
              <div className="w-hero-media">
                <img
                  src={ASSETS.cafeLifetimeBilling}
                  alt="Modern café POS terminal displaying Wusooly POS billing interface"
                  className="w-hero-img"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="w-hero-content">
                <h3 className="w-hero-title">
                  FAST BILLING. MULTIPLE PAYMENT METHODS. ZERO&nbsp;FRICTION.
                </h3>
                <p className="w-hero-body">
                  Accept cash, cards, UPI, wallets, and split payments from one
                  screen—online or offline. Whether it&apos;s a single coffee or
                  a full-table dinner, checkout stays fast and accurate.
                </p>
                <button
                  type="button"
                  className="w-lime-pill-btn"
                  onClick={() => handleOpenDemo("Café POS Demo")}
                >
                  Get a Demo
                </button>
              </div>
            </div>

            {/* ── CAFE ROW 2 · Dine-In, Takeaway & Online (33%) + Customer Orders & Wallets (67%) ── */}
            <div className="w-row">
              <div className="w-card w-text-card">
                <div>
                  <h3 className="w-text-title">
                    DINE-IN, TAKEAWAY &amp; ONLINE ORDERING
                  </h3>
                  <p className="w-text-body">
                    One POS handles sit-down service, counter pickup, category
                    menus, and online delivery orders without juggling systems.
                  </p>
                </div>
                <div className="w-chips">
                  <span className="w-chip">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                      <path d="M7 2v20" />
                      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                    </svg>
                    Dine-in
                  </span>
                  <span className="w-chip">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                      <path d="M3 6h18" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                    Takeaway
                  </span>
                  <span className="w-chip">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    Online
                  </span>
                </div>
              </div>

              <div className="w-card w-visual-card flex-67">
                <img
                  src={ASSETS.cafeLifetimeWallets}
                  alt="Customer orders, wallets, and credit balances at espresso bar"
                  className="w-visual-img"
                  style={{ objectPosition: "center 35%" }}
                  referrerPolicy="no-referrer"
                />
                <div className="w-scrim" aria-hidden="true" />
                <div className="w-visual-overlay">
                  <h3 className="w-photo-title">
                    CUSTOMER ORDERS, WALLETS &amp; CREDIT BALANCES.
                  </h3>
                </div>
              </div>
            </div>

            {/* ── CAFE ROW 3 · Kitchen KOT Card (38%) + Table Management & Reservations (62%) ── */}
            <div className="w-row">
              <div className="w-card w-kot-card">
                <div className="w-brand-logo-text">wusooly</div>
                <h3 className="w-kot-title">
                  KITCHEN ORDER TICKETS &amp; LIVE DISPLAY
                </h3>
                <p className="w-kot-body">
                  Every order fires a KOT straight to the kitchen printer or
                  display screen. Cooks see exactly what to make, modifications
                  included without lost tickets.
                </p>
                <button
                  type="button"
                  className="w-discover-btn"
                  onClick={() => handleOpenDemo("Kitchen Display & KOT Demo")}
                >
                  See KOT in Action
                </button>
                <div className="w-kot-photo-wrap">
                  <img
                    src={ASSETS.cafeLifetimeKot}
                    alt="Chef plating dishes in front of Wusooly Kitchen Display Screen"
                    className="w-kot-photo"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="w-card w-visual-card w-tall-card flex-62">
                <img
                  src={ASSETS.cafeLifetimeTables}
                  alt="Table ordering and reservations floor plan tablet in restaurant"
                  className="w-visual-img"
                  style={{ objectPosition: "82% 45%" }}
                  referrerPolicy="no-referrer"
                />
                <div className="w-scrim" aria-hidden="true" />
                <div className="w-visual-overlay">
                  <h3 className="w-photo-title">
                    TABLE ORDERING &amp; RESERVATIONS MADE EFFORTLESS
                  </h3>
                  <p className="w-photo-sub">
                    Visual floor plans, real-time table status, and reservation
                    management to seat guests faster and maximise covers without
                    the chaos.
                  </p>
                </div>
              </div>
            </div>

            {/* ── CAFE ROW 4 · Full-Width Stock Management & Purchase Expenses ── */}
            <div className="w-card w-visual-card w-wide-card">
              <img
                src={ASSETS.cafeLifetimeStock}
                alt="Automated kitchen stock updates, low-stock alerts, and purchase expenses"
                className="w-visual-img"
                style={{ objectPosition: "center 22%" }}
                referrerPolicy="no-referrer"
              />
              <div className="w-scrim" aria-hidden="true" />
              <div className="w-visual-overlay">
                <h3 className="w-wide-title">
                  AUTOMATED STOCK UPDATES, ALERTS &amp; PURCHASE EXPENSES.
                </h3>
                <p className="w-photo-sub">
                  Deduct kitchen ingredients automatically, receive low-stock
                  alerts before prep runs short, and record supplier purchase
                  expenses.
                </p>
              </div>
            </div>

            {/* ── CAFE ROW 5 · Reports & Margin Analysis (61%) + 6+ Roles Stat (39%) ── */}
            <div className="w-row">
              <div className="w-card w-visual-card flex-61">
                <img
                  src={ASSETS.cafeLifetimeReports}
                  alt="Café owner reviewing shift, sales, P&L, and best-seller margin reports"
                  className="w-visual-img"
                  style={{ objectPosition: "center 18%" }}
                  referrerPolicy="no-referrer"
                />
                <div className="w-scrim" aria-hidden="true" />
                <div className="w-visual-overlay">
                  <h3 className="w-photo-title">
                    SHIFT, SALES, P&amp;L &amp; BEST-SELLER MARGIN REPORTS.
                  </h3>
                </div>
              </div>

              <div className="w-card w-stat-card">
                <div className="w-stat-number">6+</div>
                <p className="w-stat-body">
                  Cashier, waiter, kitchen, manager, admin, delivery: assign
                  roles with dynamic access control so every team member sees
                  only what they need.
                </p>
              </div>
            </div>

            {/* ── CAFE ROW 6 · 3-Column Feature Strip with Icons ── */}
            <div className="w-card w-strip-card">
              <div className="w-strip-grid">
                <div className="w-strip-item">
                  <div className="w-strip-icon-box" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="3" y="3" width="18" height="18" rx="3" />
                      <path d="M8 16V12M12 16V8M16 16V10" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h4 className="w-strip-title">Expense Ledger &amp; Tracking</h4>
                  <p className="w-strip-body">
                    Categorise every café expense (ingredients, utilities, rent,
                    wages) and see exactly where money goes each month.
                  </p>
                </div>
                <div className="w-strip-item">
                  <div className="w-strip-icon-box" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                      <circle cx="7" cy="7" r="1.8" fill="#ffffff" />
                    </svg>
                  </div>
                  <h4 className="w-strip-title">Promo Codes &amp; Gift Cards</h4>
                  <p className="w-strip-body">
                    Create promo codes, happy-hour discounts, and preloadable
                    gift cards. Auto-apply at checkout for a seamless guest
                    experience.
                  </p>
                </div>
                <div className="w-strip-item">
                  <div className="w-strip-icon-box" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                      <polyline points="16 7 22 7 22 13" />
                    </svg>
                  </div>
                  <h4 className="w-strip-title">
                    Cloud Backup (1st Year Free)
                  </h4>
                  <p className="w-strip-body">
                    Automatic cloud backup and live multi-device sync across
                    web and mobile—included free for your entire first year.
                  </p>
                </div>
              </div>
            </div>

            {/* ── CAFE ROW 7 · Full-Width QR Digital Menu & Live Cloud Dashboard Banner ── */}
            <div className="w-card w-visual-card w-wide-card">
              <img
                src={ASSETS.cafeCloudQrOnline}
                alt="Guest scanning table QR digital menu while live cloud dashboard updates"
                className="w-visual-img"
                style={{ objectPosition: "center 35%" }}
                referrerPolicy="no-referrer"
              />
              <div className="w-scrim" aria-hidden="true" />
              <div className="w-visual-overlay">
                <h3 className="w-wide-title">
                  QR DIGITAL MENU &amp; LIVE CLOUD DASHBOARD.
                </h3>
                <p className="w-photo-sub">
                  Scan-at-table QR menus, direct online ordering, and live app
                  &amp; web performance reports—all in one clear dashboard.
                </p>
              </div>
            </div>

            {/* ── Outro CTA Strip ── */}
            <div className="w-outro">
              <h4 className="w-outro-title">{introCopy.outroTitle}</h4>
              <button
                type="button"
                className="w-lime-pill-btn"
                onClick={() => handleOpenDemo("Café Walkthrough")}
              >
                Schedule a 1-on-1 Walkthrough
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Demo Modal ── */}
      {modalOpen && (
        <div
          className="w-modal-backdrop"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="w-modal-heading"
        >
          <div className="w-modal-box" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="w-modal-close"
              onClick={() => setModalOpen(false)}
              aria-label="Close dialog"
            >
              &times;
            </button>
            <h3 id="w-modal-heading" className="w-modal-heading">
              {modalTitle}
            </h3>
            <p className="w-modal-desc">
              Experience the power of Wusooly POS customized for your business.
            </p>

            {justSubmitted ? (
              <div className="w-modal-success">
                <p className="w-modal-success-title">
                  Thank you, {justSubmitted.fullName}!
                </p>
                <p className="w-modal-success-sub">
                  Our product specialist will connect with you shortly at{" "}
                  <strong>{justSubmitted.phone}</strong>.
                </p>
                <button
                  type="button"
                  className="w-lime-pill-btn w-full-btn"
                  onClick={() => setModalOpen(false)}
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} noValidate>
                {formError && (
                  <p role="alert" className="w-modal-error">
                    {formError}
                  </p>
                )}
                <label className="w-modal-label">
                  Full Name
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-modal-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </label>
                <label className="w-modal-label-last">
                  Phone / WhatsApp Number
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-modal-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>
                <button
                  type="submit"
                  className="w-lime-pill-btn w-full-btn"
                >
                  Request Walkthrough
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
