"use client";

import { useRef } from "react";
import {
  Smartphone,
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  Download,
  QrCode,
  PhoneCall,
  PhoneIncoming,
  MessageSquare,
  Wifi,
  Clock,
  Lock,
  Monitor,
  ChevronRight,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Magnetic from "../components/ui/Magnetic";
import HelperPhonePreview from "../components/sections/HelperPhonePreview";
import { HELPER_HERO, HELPER_STEPS, HELPER_NOTES, PAIRING_GUIDE } from "../data/helperData";
import { gsap, scrollReveal, useGsapReveal } from "../../lib/gsap";
import styles from "./helper.module.css";

const ICONS = {
  PhoneIncoming,
  MessageSquare,
  QrCode,
  Download,
  PhoneCall,
  Wifi,
  Clock,
  Lock,
  Monitor,
  Smartphone,
};

export default function HelperPage() {
  const pageRef = useRef(null);
  const heroCopyRef = useRef(null);
  const apkCardRef = useRef(null);
  const stepsRef = useRef(null);
  const notesRef = useRef(null);
  const pairRef = useRef(null);

  useGsapReveal(
    pageRef,
    () => {
      gsap.fromTo(
        [heroCopyRef.current, apkCardRef.current],
        { opacity: 0.72, y: 12 },
        { opacity: 1, y: 0, duration: 0.55, stagger: 0.08, ease: "expo.out" }
      );

      if (stepsRef.current) {
        scrollReveal(stepsRef.current.children, {
          y: 12,
          opacity: 0.65,
          duration: 0.5,
          stagger: 0.08,
          trigger: stepsRef.current,
          start: "top 90%",
        });
      }

      if (notesRef.current) {
        scrollReveal(notesRef.current, {
          y: 10,
          opacity: 0.65,
          duration: 0.5,
          start: "top 92%",
        });
      }

      if (pairRef.current) {
        scrollReveal(pairRef.current, {
          y: 12,
          opacity: 0.65,
          duration: 0.55,
          start: "top 90%",
        });
      }
    },
    {
      onReducedMotion: () => {
        if (heroCopyRef.current) gsap.set(heroCopyRef.current, { opacity: 1, y: 0 });
        if (apkCardRef.current) gsap.set(apkCardRef.current, { opacity: 1, y: 0 });
        if (stepsRef.current) gsap.set(stepsRef.current.children, { opacity: 1, y: 0 });
        if (notesRef.current) gsap.set(notesRef.current, { opacity: 1, y: 0 });
        if (pairRef.current) gsap.set(pairRef.current, { opacity: 1, y: 0 });
      },
    }
  );

  const handleGetDemo = () => {
    window.location.href = "/contact";
  };

  const handleDownloadApk = () => {
    alert("Downloading Wusooly Helper v0.5.2 (Android APK, 3.4 MB)...");
  };

  return (
    <main ref={pageRef} className={styles.page}>
      {/* Floating Solid Navbar */}
      <div className={styles.navbarContainer}>
        <Navbar onGetDemo={handleGetDemo} />
      </div>

      {/* 01 · Split Hero & Android Installer Card */}
      <section className={`${styles.sectionWrap} ${styles.heroSection}`} aria-label="Wusooly Helper">
        <div className={styles.heroGrid}>
          <div ref={heroCopyRef} className={styles.heroCopy}>
            <h1 className={styles.heroTitle}>
              {HELPER_HERO.title}
              <span className={styles.accentDot} aria-hidden="true">
                .
              </span>
            </h1>
            <p className={styles.heroSubtext}>{HELPER_HERO.subtitle}</p>

            <div className={styles.featureChips}>
              {HELPER_HERO.chips.map(({ id, label, icon }) => {
                const IconComp = ICONS[icon];
                return (
                  <span key={id} className={styles.featureChip}>
                    {IconComp && (
                      <IconComp size={14} strokeWidth={2.2} className={styles.chipIcon} aria-hidden="true" />
                    )}
                    {label}
                  </span>
                );
              })}
            </div>

            <a href="#how-to-pair" className={styles.setupAnchor}>
              <span>{HELPER_HERO.anchorLabel}</span>
              <ArrowRight size={15} strokeWidth={2.4} className={styles.anchorArrow} aria-hidden="true" />
            </a>
          </div>

          <div ref={apkCardRef} className={styles.apkCard}>
            <div className={styles.apkCardTop}>
              <div className={styles.apkIdentity}>
                <div className={styles.apkSquircle} aria-hidden="true">
                  <Smartphone size={22} strokeWidth={2} />
                </div>
                <div>
                  <h2 className={styles.apkTitle}>{HELPER_HERO.apkCard.title}</h2>
                  <div className={styles.apkVersionSub}>
                    {HELPER_HERO.apkCard.version} &middot; {HELPER_HERO.apkCard.size}
                  </div>
                </div>
              </div>
              <span className={styles.apkBadge}>APK</span>
            </div>

            <Magnetic style={{ width: "100%" }}>
              <button
                type="button"
                className={styles.downloadBtn}
                onClick={handleDownloadApk}
                aria-label="Download Wusooly Helper APK for Android"
              >
                <span>{HELPER_HERO.apkCard.ctaLabel}</span>
                <span className={styles.arrowBubble} aria-hidden="true">
                  <ArrowDown size={16} strokeWidth={2.5} />
                </span>
              </button>
            </Magnetic>

            <p className={styles.apkCaption}>{HELPER_HERO.apkCard.caption}</p>

            <div className={styles.specsGrid}>
              {HELPER_HERO.apkCard.specs.map((spec) => (
                <div key={spec.label} className={styles.specTile}>
                  <span className={styles.specLabel}>{spec.label}</span>
                  <span className={styles.specValue}>{spec.value}</span>
                </div>
              ))}
            </div>

            <div className={styles.trustSeal}>
              <ShieldCheck size={15} strokeWidth={2.2} className={styles.trustIcon} aria-hidden="true" />
              <span>{HELPER_HERO.apkCard.trustLabel}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02 · Connect in 3 Steps */}
      <section className={`${styles.sectionWrap} ${styles.stepsSection}`} aria-label="Connect in 3 steps">
        <h2 className={styles.sectionHeading}>
          Connect in 3 steps
          <span className={styles.accentDot} aria-hidden="true">
            .
          </span>
        </h2>

        <div ref={stepsRef} className={styles.stepsGrid}>
          {HELPER_STEPS.map(({ number, title, body, icon }) => {
            const StepIcon = ICONS[icon];
            return (
              <div key={number} className={styles.stepCard}>
                <div className={styles.stepCardTop}>
                  <span className={styles.stepNumBadge}>{number}</span>
                  {StepIcon && (
                    <StepIcon size={18} strokeWidth={2} className={styles.stepIcon} aria-hidden="true" />
                  )}
                </div>
                <h3 className={styles.stepTitle}>{title}</h3>
                <p className={styles.stepBody}>{body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 03 · Good to Know */}
      <section className={`${styles.sectionWrap} ${styles.notesSection}`} aria-label="Good to know">
        <div ref={notesRef} className={styles.notesContainer}>
          <h2 className={styles.notesHeading}>Good to know</h2>
          <div className={styles.notesGrid}>
            {HELPER_NOTES.map(({ id, title, body, icon }) => {
              const NoteIcon = ICONS[icon];
              return (
                <div key={id} className={styles.noteItem}>
                  <div className={styles.noteIconBox} aria-hidden="true">
                    {NoteIcon && <NoteIcon size={18} strokeWidth={2} />}
                  </div>
                  <div className={styles.noteContent}>
                    <h3 className={styles.noteTitle}>{title}</h3>
                    <p className={styles.noteBody}>{body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 04 · How to Pair */}
      <section
        id="how-to-pair"
        className={`${styles.sectionWrap} ${styles.pairSection}`}
        aria-labelledby="how-to-pair-heading"
      >
        <div ref={pairRef} className={styles.pairGrid}>
          <HelperPhonePreview />

          <div className={styles.pairGuide}>
            <h2 id="how-to-pair-heading" className={styles.pairHeading}>
              {PAIRING_GUIDE.headline}
              <span className={styles.accentDot} aria-hidden="true">
                .
              </span>
            </h2>

            <div className={styles.pairGroups}>
              {PAIRING_GUIDE.groups.map((group) => {
                const GroupIcon = ICONS[group.icon];
                return (
                  <div key={group.id} className={styles.pairGroup}>
                    <div className={styles.pairGroupLabel}>
                      {GroupIcon && <GroupIcon size={15} strokeWidth={2.2} aria-hidden="true" />}
                      <span>{group.label}</span>
                    </div>

                    <ol className={styles.pairStepsList}>
                      {group.steps.map((step) => (
                        <li key={step.number} className={styles.pairStep}>
                          <span className={styles.pairStepNum} aria-hidden="true">
                            {step.number}
                          </span>
                          <div className={styles.pairStepContent}>
                            <span>{step.text}</span>
                            {step.breadcrumbs && (
                              <div className={styles.breadcrumbs}>
                                {step.breadcrumbs.map((crumb, idx) => (
                                  <span key={crumb} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                                    <span className={styles.crumbPill}>{crumb}</span>
                                    {idx < step.breadcrumbs.length - 1 && (
                                      <ChevronRight size={13} strokeWidth={2.4} className={styles.crumbArrow} aria-hidden="true" />
                                    )}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                );
              })}
            </div>

            <div className={styles.troubleshootBox}>
              <strong>{PAIRING_GUIDE.troubleshoot.prefix}</strong>
              {PAIRING_GUIDE.troubleshoot.body}
            </div>
          </div>
        </div>
      </section>

      {/* Full-Bleed Obsidian Footer */}
      <Footer onGetDemo={handleGetDemo} />
    </main>
  );
}
