"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UtensilsCrossed, ShoppingBag, Globe, BarChart3, Tag, Cloud } from "lucide-react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

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
  brandLogoDark: "/assets/wusooly-brand-logo-dark.png",
  // Shops & Supermarkets
  retailLifetimeBilling: "/images/retail-lifetime-billing.webp",
  retailLifetimeWallets: "/images/retail-lifetime-wallets.webp",
  retailLifetimeStock: "/images/retail-lifetime-stock.webp",
  retailLifetimePurchase: "/images/retail-lifetime-purchase.webp",
  retailLifetimeReports: "/images/retail-lifetime-reports.webp",
  retailCloudDashboard: "/images/retail-cloud-dashboard.webp",
  retailCloudPromos: "/images/retail-cloud-promos.webp",

  // Cafés & Restaurants
  cafeLifetimeBilling: "/images/cafe-lifetime-billing.webp",
  cafeLifetimeWallets: "/images/cafe-lifetime-wallets.webp",
  cafeLifetimeKot: "/images/cafe-lifetime-kot.webp",
  cafeLifetimeTables: "/images/cafe-lifetime-tables.webp",
  cafeLifetimeStock: "/images/cafe-lifetime-stock.webp",
  cafeLifetimeReports: "/images/cafe-lifetime-reports.webp",
  cafeCloudQrOnline: "/images/cafe-cloud-qr-online.webp",
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

  // Ambient ScrollTrigger for Editorial Cards & "Window to the World" Photo Scrub
  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // 1. Content-first ambient entrance on scroll
      const cards = gsap.utils.toArray(".w-card", sectionRef.current);
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.65, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "expo.out",
            scrollTrigger: {
              trigger: card,
              start: "top 96%",
              once: true,
            },
          }
        );
      });

      // 2. "Window to the World" inner photo scrub inside existing .w-visual-card containers
      const visualCards = gsap.utils.toArray(".w-visual-card", sectionRef.current);
      visualCards.forEach((card) => {
        const img = card.querySelector(".w-visual-img");
        if (img) {
          gsap.fromTo(
            img,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [audience]);

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

        /* ── Header & Intro Copy (Old Style: Left-Aligned, Punchy Extrabold) ── */
        .w-header-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 12px;
          padding: 8px 0 18px;
          max-width: 600px;
          width: 100%;
        }

        .w-segmented-control {
          position: relative;
          display: inline-flex;
          background: #ecece8;
          border: 1px solid #dfdfd9;
          padding: 4px;
          border-radius: 9999px;
          gap: 4px;
          align-self: flex-start;
        }

        .w-segment-btn {
          position: relative;
          background: transparent;
          border: none;
          padding: 10px 22px;
          border-radius: 9999px;
          font-size: 0.9rem;
          font-weight: 500;
          color: #2c3e32;
          cursor: pointer;
          white-space: nowrap;
          transition: color 0.2s ease;
          z-index: 1;
        }

        .w-segment-btn.active {
          color: var(--w-forest-dark);
          font-weight: 700;
        }

        .w-segment-pill {
          position: absolute;
          inset: 0;
          background: var(--w-lime);
          border-radius: 9999px;
          box-shadow: 0 2px 8px rgba(156, 230, 42, 0.35);
          z-index: -1;
        }

        .w-intro-headline {
          font-size: clamp(2.2rem, 4vw, 3.4rem);
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: #171717;
          margin: 0;
          text-align: left;
          max-width: 600px;
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

        @media (max-width: 767px) {
          .w-row {
            flex-direction: column;
          }
        }

        .w-card {
          border-radius: var(--w-radius);
          overflow: hidden;
          position: relative;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .w-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.12);
        }

        .w-hero-card:hover,
        .w-visual-card:hover {
          box-shadow: 0 20px 48px -10px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(180, 240, 70, 0.22);
        }

        /* ── Row 1 Hero Card (Forest Green) ── */
        .w-hero-card {
          background: var(--w-forest);
          display: flex;
          align-items: center;
          padding: clamp(28px, 4.5vw, 52px);
          gap: clamp(28px, 4.5vw, 56px);
        }

        @media (max-width: 767px) {
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

        @media (max-width: 767px) {
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

        /* ── Tactile Pill Badges (Google Pay, Apple Pay, Mastercard) ── */
        .w-payment-chips {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }

        .w-payment-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #eff0ea;
          border: 1.5px solid #cccdc8;
          border-radius: 9999px;
          height: 44px;
          width: 86px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.04);
          box-sizing: border-box;
          padding: 0 10px;
          flex-shrink: 0;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .w-payment-chip:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04);
        }

        .w-payment-gpay {
          height: 22px;
          width: auto;
          display: block;
        }

        .w-payment-applepay {
          height: 21px;
          width: auto;
          display: block;
        }

        .w-payment-mastercard {
          height: 26px;
          width: auto;
          display: block;
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

        @media (max-width: 767px) {
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
          top: -8%;
          left: 0;
          width: 100%;
          height: 116%;
          object-fit: cover;
          display: block;
          z-index: 0;
          will-change: transform;
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

        @media (max-width: 767px) {
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

        .w-brand-logo-img {
          height: 22px;
          width: auto;
          object-fit: contain;
          align-self: flex-start;
          display: block;
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
          margin-left: -32px;
          margin-right: -32px;
          margin-bottom: 0;
          padding-top: 16px;
          overflow: hidden;
        }

        .w-kot-photo {
          width: 100%;
          aspect-ratio: 16 / 11;
          height: auto;
          display: block;
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

        @media (max-width: 767px) {
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

        /* ── Tablet Optimization (768px – 1024px) ── */
        @media (min-width: 768px) and (max-width: 1024px) {
          .w-row {
            flex-direction: row;
            gap: 12px;
          }
          .w-hero-card {
            flex-direction: row;
            text-align: left;
            padding: clamp(24px, 3.5vw, 36px);
            gap: clamp(20px, 3vw, 32px);
          }
          .w-hero-media {
            flex: 0 0 46%;
          }
          .w-text-card {
            flex: 0 0 38%;
            min-height: auto;
            padding: 24px;
          }
          .w-visual-card {
            min-height: 330px;
            padding: 24px;
          }
          .w-visual-card.w-wide-card {
            min-height: 350px;
            padding: 28px;
          }
          .w-visual-card.w-tall-card {
            min-height: 420px;
          }
          .w-kot-card {
            flex: 0 0 42%;
            padding: 24px 24px 0 24px;
          }
          .w-stat-card {
            padding: 26px;
          }
          .w-strip-card {
            padding: 24px 20px;
          }
          .w-strip-item {
            padding: 4px 14px;
          }
        }

        /* ── Large Monitor Typography Scaling ── */
        @media (min-width: 1440px) {
          .w-segment-btn {
            font-size: 0.98rem;
            padding: 11px 26px;
          }
          .w-intro-headline {
            font-size: clamp(2.6rem, 4vw, 3.8rem);
          }
          .w-intro-subtext {
            font-size: 1.04rem;
          }
          .w-card-title {
            font-size: clamp(1.35rem, 1.7vw, 1.65rem);
          }
          .w-card-desc {
            font-size: 0.96rem;
          }
          .w-card-badge {
            font-size: 0.85rem;
          }
          .w-cloud-banner-title {
            font-size: clamp(1.35rem, 1.85vw, 1.72rem);
          }
          .w-cloud-banner-subtitle {
            font-size: clamp(1.85rem, 2.75vw, 2.6rem);
          }
          .w-cloud-feature-title {
            font-size: clamp(1.35rem, 1.8vw, 1.7rem);
          }
          .w-cloud-feature-desc {
            font-size: 0.96rem;
          }
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
                  {audience === "retail" && (
                    <motion.span
                      layoutId="activeEditorialAudienceTab"
                      className="w-segment-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    />
                  )}
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
                  {audience === "cafe" && (
                    <motion.span
                      layoutId="activeEditorialAudienceTab"
                      className="w-segment-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    />
                  )}
                  Cafés &amp; Restaurants
                </button>
              </div>
            )}

            <h2 className="w-intro-headline">
              {audience === "retail" ? (
                <>The essentials to run your store, connected.</>
              ) : (
                <>Every order. One simple system.</>
              )}
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

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={audience}
            initial={{ opacity: 0.65, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.65, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
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
                <div className="w-payment-chips">
                  <span className="w-payment-chip" aria-label="Google Pay" title="Google Pay">
                    <svg className="w-payment-gpay" viewBox="0 0 65 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <g transform="translate(0, 0.5)">
                        <path fill="#4285F4" d="M22.5 11.75c0-.66-.06-1.3-.17-1.92H11.5v3.98h6.18c-.27 1.42-1.07 2.62-2.28 3.42v2.85h3.69c2.16-1.99 3.41-4.92 3.41-8.33z"/>
                        <path fill="#34A853" d="M11.5 23c3.1 0 5.71-1.03 7.61-2.79l-3.69-2.85c-1.03.69-2.35 1.1-3.92 1.1-3.01 0-5.56-2.03-6.47-4.76H1.2v2.95C3.12 20.48 7.03 23 11.5 23z"/>
                        <path fill="#FBBC05" d="M5.03 13.7c-.24-.69-.37-1.43-.37-2.2s.13-1.51.37-2.2V6.35H1.2C.44 7.86 0 9.58 0 11.5s.44 3.64 1.2 5.15l3.83-2.95z"/>
                        <path fill="#EA4335" d="M11.5 4.54c1.69 0 3.2.58 4.39 1.72l3.29-3.29C17.2 1.07 14.59 0 11.5 0 7.03 0 3.12 2.52 1.2 6.35l3.83 2.95c.91-2.73 3.46-4.76 6.47-4.76z"/>
                      </g>
                      <g fill="#5F6368">
                        <path d="M 27 18.67 V 1 h 6 c 1.06 0 2.02.23 2.88.69.86.44 1.54 1.08 2.05 1.9.52.81.78 1.74.78 2.81 0 1.05-.26 1.99-.78 2.81-.5.82-1.19 1.46-2.05 1.92-.86.45-1.82.67-2.88.67 H 29.68 v 6.87 z m 2.68-9.43 h 3.39 c.63 0 1.17-.13 1.61-.39.44-.28.77-.63 1-1.06.24-.45.37-.9.37-1.38 0-.48-.12-.93-.37-1.36-.23-.43-.56-.78-1-1.06-.44-.28-.98-.42-1.61-.42 H 29.68 Z"/>
                        <path d="M 44.44 19.06 c-.91 0-1.7-.18-2.39-.54-.68-.36-1.23-.86-1.63-1.48-.39-.64-.59-1.37-.59-2.2 0-.9.23-1.67.68-2.3.47-.62 1.09-1.1 1.85-1.43.78-.33 1.64-.49 2.59-.49.54 0 1.02.04 1.46.12.44.07.83.15 1.17.25.34.1.61.2.8.32 v-.67 c 0-.82-.29-1.48-.87-1.97-.59-.49-1.35-.74-2.27-.74-.63 0-1.24.15-1.8.44-.57.28-1.04.67-1.39 1.16 l -1.78-1.41 c.36-.51.79-.95 1.29-1.31.52-.36 1.1-.64 1.73-.84.64-.2 1.31-.3 2.03-.3 1.78 0 3.17.45 4.14 1.36.98.89 1.46 2.14 1.46 3.75 v 7.87 h -2.53 v -1.55 h -.15 c-.23.33-.53.64-.9.94-.36.3-.78.53-1.27.71-.49.2-1.03.3-1.63.3 z m .46-2.17 c.68 0 1.29-.16 1.81-.49.52-.33.92-.76 1.22-1.28.3-.55.46-1.13.46-1.76-.37-.21-.81-.38-1.32-.51-.5-.15-1.04-.23-1.63-.23-1.06 0-1.81.22-2.27.65-.45.42-.68.96-.68 1.6 0 .59.21 1.08.63 1.46.44.37 1.04.56 1.78.56 z"/>
                        <path d="M 57.59 23.38 c-.05.12-.1.23-.17.35-.05.13-.08.22-.1.27 h -2.8 c.08-.18.19-.44.34-.76.16-.33.32-.66.46-.99.1-.21.2-.44.3-.69.11-.25.22-.5.34-.77.13-.26.25-.51.36-.76 l .93-2.05 -5.2-11.9 h 2.93 l 3.56 8.59 h .12 l 3.39-8.59 H 65 l -6.44 15 c-.11.28-.24.58-.39.89-.13.31-.25.59-.36.84-.1.26-.18.45-.22.57 z"/>
                      </g>
                    </svg>
                  </span>
                  <span className="w-payment-chip" aria-label="Apple Pay" title="Apple Pay">
                    <svg className="w-payment-applepay" viewBox="0 0 512 210.2" fill="#000000" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <path d="M93.6,27.1C87.6,34.2,78,39.8,68.4,39c-1.2-9.6,3.5-19.8,9-26.1c6-7.3,16.5-12.5,25-12.9 C103.4,10,99.5,19.8,93.6,27.1 M102.3,40.9c-13.9-0.8-25.8,7.9-32.4,7.9c-6.7,0-16.8-7.5-27.8-7.3c-14.3,0.2-27.6,8.3-34.9,21.2 c-15,25.8-3.9,64,10.6,85c7.1,10.4,15.6,21.8,26.8,21.4c10.6-0.4,14.8-6.9,27.6-6.9c12.9,0,16.6,6.9,27.8,6.7 c11.6-0.2,18.9-10.4,26-20.8c8.1-11.8,11.4-23.3,11.6-23.9c-0.2-0.2-22.4-8.7-22.6-34.3c-0.2-21.4,17.5-31.6,18.3-32.2 C123.3,42.9,107.7,41.3,102.3,40.9 M182.6,11.9v155.9h24.2v-53.3h33.5c30.6,0,52.1-21,52.1-51.4c0-30.4-21.1-51.2-51.3-51.2H182.6z M206.8,32.3h27.9c21,0,33,11.2,33,30.9c0,19.7-12,31-33.1,31h-27.8V32.3z M336.6,169c15.2,0,29.3-7.7,35.7-19.9h0.5v18.7h22.4V90.2 c0-22.5-18-37-45.7-37c-25.7,0-44.7,14.7-45.4,34.9h21.8c1.8-9.6,10.7-15.9,22.9-15.9c14.8,0,23.1,6.9,23.1,19.6v8.6l-30.2,1.8 c-28.1,1.7-43.3,13.2-43.3,33.2C298.4,155.6,314.1,169,336.6,169z M343.1,150.5c-12.9,0-21.1-6.2-21.1-15.7c0-9.8,7.9-15.5,23-16.4 l26.9-1.7v8.8C371.9,140.1,359.5,150.5,343.1,150.5z M425.1,210.2c23.6,0,34.7-9,44.4-36.3L512,54.7h-24.6l-28.5,92.1h-0.5 l-28.5-92.1h-25.3l41,113.5l-2.2,6.9c-3.7,11.7-9.7,16.2-20.4,16.2c-1.9,0-5.6-0.2-7.1-0.4v18.7C417.3,210,423.3,210.2,425.1,210.2z"/>
                    </svg>
                  </span>
                  <span className="w-payment-chip" aria-label="Mastercard" title="Mastercard">
                    <svg className="w-payment-mastercard" viewBox="0 0 999.2 618" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <rect x="364" y="66.1" fill="#FF5F00" width="270.4" height="485.8"/>
                      <path fill="#EB001B" d="M382,309c0-98.7,46.4-186.3,117.6-242.9C447.2,24.9,381.1,0,309,0C138.2,0,0,138.2,0,309s138.2,309,309,309c72.1,0,138.2-24.9,190.6-66.1C428.3,496.1,382,407.7,382,309z"/>
                      <path fill="#F79E1B" d="M999.2,309c0,170.8-138.2,309-309,309c-72.1,0-138.2-24.9-190.6-66.1c72.1-56.7,117.6-144.2,117.6-242.9S570.8,122.7,499.6,66.1C551.9,24.9,618,0,690.1,0C861,0,999.2,139.1,999.2,309z"/>
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
                    <UtensilsCrossed size={13} strokeWidth={2.2} aria-hidden="true" />
                    Dine-in
                  </span>
                  <span className="w-chip">
                    <ShoppingBag size={13} strokeWidth={2.2} aria-hidden="true" />
                    Takeaway
                  </span>
                  <span className="w-chip">
                    <Globe size={13} strokeWidth={2.2} aria-hidden="true" />
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
                <img src={ASSETS.brandLogoDark} alt="Wusooly POS" className="w-brand-logo-img" />
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
                    <BarChart3 size={20} strokeWidth={2.2} />
                  </div>
                  <h4 className="w-strip-title">Expense Ledger &amp; Tracking</h4>
                  <p className="w-strip-body">
                    Categorise every café expense (ingredients, utilities, rent,
                    wages) and see exactly where money goes each month.
                  </p>
                </div>
                <div className="w-strip-item">
                  <div className="w-strip-icon-box" aria-hidden="true">
                    <Tag size={20} strokeWidth={2.2} />
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
                    <Cloud size={20} strokeWidth={2.2} />
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
          </motion.div>
        </AnimatePresence>
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
