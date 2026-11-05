"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Input, Select, Button } from "@ziqx/react-comps";
import Navbar from "../components/Navbar";
import OutroCTA from "../components/OutroCTA";
import Footer from "../components/Footer";
import Magnetic from "../components/Magnetic";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import styles from "./contact.module.css";

const BUSINESS_OPTIONS = [
  { value: "Shops & Supermarkets", label: "Shops & Supermarkets" },
  { value: "Cafés & Restaurants", label: "Cafés & Restaurants" },
  { value: "Fashion & Boutique", label: "Fashion & Boutique" },
  { value: "Electronics & Hardware", label: "Electronics & Hardware" },
  { value: "Grocery & FMCG", label: "Grocery & FMCG" },
  { value: "Other Retail / Hospitality", label: "Other Retail / Hospitality" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    businessType: "Shops & Supermarkets",
    phone: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const containerRef = useRef(null);
  const infoCardRef = useRef(null);
  const formCardRef = useRef(null);
  const bannerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      if (infoCardRef.current) gsap.set(infoCardRef.current, { opacity: 1, y: 0 });
      if (formCardRef.current) gsap.set(formCardRef.current, { opacity: 1, y: 0 });
      if (bannerRef.current) gsap.set(bannerRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Two main cards entrance
      if (infoCardRef.current && formCardRef.current) {
        gsap.fromTo(
          [infoCardRef.current, formCardRef.current],
          { opacity: 0.7, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.08,
            ease: "expo.out",
          }
        );
      }

      // 2. Outro Banner entrance
      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { opacity: 0.65, y: 10 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "expo.out",
            scrollTrigger: {
              trigger: bannerRef.current,
              start: "top 95%",
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      businessName: "",
      businessType: "Shops & Supermarkets",
      phone: "",
      email: "",
      message: "",
    });
    setSubmitted(false);
  };

  const handleGetDemoNavbar = () => {
    const nameInput = document.getElementById("name");
    if (nameInput) {
      nameInput.focus();
    }
  };

  const handleScrollToForm = () => {
    const nameInput = document.getElementById("name");
    if (nameInput) {
      nameInput.focus({ preventScroll: false });
      nameInput.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <main className={styles.page} ref={containerRef}>
      {/* ── Top Header Navigation Bar (Contact Liquid Glass Navbar) ── */}
      <div className={styles.navbarContainer}>
        <Navbar onGetDemo={handleGetDemoNavbar} variant="contact" />
      </div>

      {/* ── Main Two-Column Container ── */}
      <div className={styles.mainContainer}>
        {/* Left Column: Forest Green Showcase Card */}
        <div className={styles.infoCard} ref={infoCardRef}>
          <div className={styles.infoTop}>
            <h1 className={styles.headline}>
              Talk to<br />our team.
            </h1>
            <p className={styles.subtext}>
              Share a few details and we will get in touch about a demo.
            </p>
          </div>

          {/* Clean Interactive Map Interface — Ziqx Creative Clique */}
          <div className={styles.mapContainer}>
            <div className={styles.mapOverlayTop}>
              <div className={styles.locInfo}>
                <div className={styles.locText}>
                  <span className={styles.locTitle}>Ziqx Creative Clique</span>
                  <span className={styles.locSub}>Wayanad, Kerala</span>
                </div>
              </div>
              <Button
                size="compact"
                bgColor="#a3e635"
                fgColor="#071a0e"
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/place/Ziqx+Creative+Clique/@11.4747303,76.0032317,1159m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3ba66da82972dd35:0xae67d69a3ecea692!8m2!3d11.4747251!4d76.0058066!16s%2Fg%2F11l6zcjbr6?entry=ttu",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: "700",
                  fontSize: "0.74rem",
                  borderRadius: "9999px",
                  padding: "6px 12px",
                  boxShadow: "0 2px 8px rgba(163, 230, 53, 0.3)",
                }}
                aria-label="Open Ziqx Creative Clique in Google Maps"
              >
                Open Maps ↗
              </Button>
            </div>

            <iframe
              title="Ziqx Creative Clique Location Map"
              className={styles.mapFrame}
              src="https://maps.google.com/maps?q=11.4747251,76.0058066&hl=en&z=15&output=embed"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Right Column: Clean White Form Card */}
        <div className={styles.formCard} ref={formCardRef}>
          {!submitted ? (
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Name */}
              <Input
                id="name"
                name="name"
                label="Name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                autoComplete="name"
                bgColor="#ffffff"
                fgColor="#0c291e"
              />

              {/* Business name */}
              <Input
                id="businessName"
                name="businessName"
                label="Business name"
                type="text"
                required
                value={formData.businessName}
                onChange={handleChange}
                autoComplete="organization"
                bgColor="#ffffff"
                fgColor="#0c291e"
              />

              {/* Business type — Ziqx Select */}
              <Select
                id="businessType"
                label="Business type"
                value={formData.businessType}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, businessType: val }))
                }
                options={BUSINESS_OPTIONS}
                bgColor="#ffffff"
                fgColor="#0c291e"
              />

              {/* Phone or WhatsApp number */}
              <Input
                id="phone"
                name="phone"
                label="Phone or WhatsApp number"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                bgColor="#ffffff"
                fgColor="#0c291e"
              />

              {/* Email (optional if phone is supplied) */}
              <Input
                id="email"
                name="email"
                label={
                  <span>
                    Email <span className={styles.optionalNote}>(optional if phone is supplied)</span>
                  </span>
                }
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                bgColor="#ffffff"
                fgColor="#0c291e"
              />

              {/* Message (optional) */}
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>
                  Message <span className={styles.optionalNote}>(optional)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className={styles.textarea}
                />
              </div>

              {/* Action Button */}
              <Magnetic style={{ width: "100%" }}>
                <Button
                  type="submit"
                  variant="primary"
                  loading={submitting}
                  loadingLabel="Sending..."
                  bgColor="#a3e635"
                  fgColor="#071a0e"
                  full
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: "700",
                    fontSize: "0.95rem",
                    padding: "13px 24px",
                    borderRadius: "9999px",
                    boxShadow: "0 4px 16px rgba(163, 230, 53, 0.35)",
                  }}
                >
                  Get in Touch
                </Button>
              </Magnetic>

              {/* Privacy Note */}
              <p className={styles.privacyNote}>
                We only use your details to respond to your enquiry.
              </p>
            </form>
          ) : (
            <div className={styles.successContainer}>
              <div className={styles.successIcon}>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h2 className={styles.successTitle}>Thank You!</h2>
              <p className={styles.successBody}>
                We&apos;ve received your demo request,{" "}
                <strong>{formData.name || "friend"}</strong>. A Wusooly POS specialist will be in touch shortly.
              </p>
              <Magnetic>
                <Button
                  type="button"
                  variant="primary"
                  bgColor="#a3e635"
                  fgColor="#071a0e"
                  onClick={handleReset}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: "700",
                    fontSize: "0.9rem",
                    borderRadius: "9999px",
                    padding: "10px 22px",
                  }}
                >
                  Submit another request
                </Button>
              </Magnetic>
            </div>
          )}
        </div>
      </div>

      {/* ── Store Operations Outro Banner (Unified Component) ── */}
      <OutroCTA onClick={handleScrollToForm} />

      {/* ── Floating Glass Footer (Navbar Aesthetic DNA) ── */}
      <Footer onGetDemo={handleScrollToForm} theme="dark" />
    </main>
  );
}
