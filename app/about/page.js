"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import TransitionLink from "../components/TransitionLink";
import Magnetic from "../components/Magnetic";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import styles from "./about.module.css";

export default function AboutPage() {
  const containerRef = useRef(null);

  // ── GSAP ScrollTrigger Orchestration for About Page ──
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      gsap.set(containerRef.current.querySelectorAll(`.${styles.reveal}`), {
        opacity: 1,
        y: 0,
      });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Hero Headline & Subtext
      gsap.fromTo(
        `.${styles.heroMain}`,
        { opacity: 0.7, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "expo.out",
        }
      );

      // 2. Hero Purpose Card
      gsap.fromTo(
        `.${styles.purposeCard}`,
        { opacity: 0.7, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: 0.08,
          ease: "expo.out",
        }
      );

      // 3. Photo Strip: Ambient scale settling
      const photoFrames = gsap.utils.toArray(`.${styles.photoFrame}`);
      photoFrames.forEach((frame, i) => {
        gsap.fromTo(
          frame,
          { scale: 1.02, opacity: 0.85 },
          {
            scale: 1.0,
            opacity: 1,
            duration: 0.6,
            delay: i * 0.06,
            ease: "expo.out",
            scrollTrigger: {
              trigger: frame,
              start: "top 95%",
              once: true,
            },
          }
        );
      });

      // 4. Story Card & Mission Card
      gsap.fromTo(
        [`.${styles.storyCard}`, `.${styles.missionCard}`],
        { opacity: 0.65, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: `.${styles.storySection}`,
            start: "top 95%",
            once: true,
          },
        }
      );

      // 5. Core Values Bento Grid
      gsap.fromTo(
        `.${styles.valueCard}`,
        { opacity: 0.65, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "expo.out",
          scrollTrigger: {
            trigger: `.${styles.valuesGrid}`,
            start: "top 95%",
            once: true,
          },
        }
      );

      // 6. Dual Split Cards
      gsap.fromTo(
        [`.${styles.splitCardLight}`, `.${styles.splitCardDark}`],
        { opacity: 0.65, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: `.${styles.splitGrid}`,
            start: "top 95%",
            once: true,
          },
        }
      );

      // 7. Outro Card
      gsap.fromTo(
        `.${styles.outroCard}`,
        { opacity: 0.65, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: `.${styles.outroCard}`,
            start: "top 95%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className={styles.page} ref={containerRef}>
      {/* ── 00. Floating Liquid Dark Sage Navbar ── */}
      <div className={styles.navbarContainer}>
        <Navbar variant="about" theme="dark" />
      </div>

      {/* ── 01. Hero & Purpose Section (Zero Eyebrow Text) ── */}
      <section className={`${styles.sectionWrap} ${styles.heroSection}`} aria-label="About Wusooly">
        <div className={styles.heroGrid}>
          <div className={styles.heroMain}>
            <h1 className={styles.heroHeadline}>
              Business made simpler.
            </h1>
            <p className={styles.heroSubtext}>
              Technology that helps everyday businesses grow.
            </p>
          </div>

          <div className={`${styles.purposeCard} ${styles.reveal}`}>
            <p className={styles.purposeQuote}>
              &ldquo;We build powerful, intuitive POS tools for the businesses that keep our communities moving.&rdquo;
            </p>
            <div className={styles.purposeMeta}>
              <svg
                className={styles.metaIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Wusooly Purpose</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02. Cinematic 2-Photo Gallery (Only 2 Images) ── */}
      <section className={`${styles.sectionWrap} ${styles.stripSection}`} aria-label="Editorial Gallery">
        <div className={`${styles.photoStrip} ${styles.reveal}`}>
          {/* Photo 1: Retail & Supermarket Checkout */}
          <div className={styles.photoFrame}>
            <Image
              src="/assets/retailer-story.webp"
              alt="Retail grocer managing fresh produce checkout"
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className={styles.stripImg}
              priority
            />
          </div>

          {/* Photo 2: Ambient Café & Hospitality Dining */}
          <div className={styles.photoFrame}>
            <Image
              src="/assets/cafe-aerial-v4.jpg"
              alt="Café interior and table hospitality management"
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className={styles.stripImg}
              priority
            />
          </div>
        </div>
      </section>

      {/* ── 03. Story Card ("Empowering business through simplicity.") ── */}
      <section className={`${styles.sectionWrap} ${styles.storySection}`} aria-label="Our Story">
        <div className={`${styles.storyCard} ${styles.reveal}`}>
          <div className={styles.storyContent}>
            <h2 className={styles.storyHeadline}>
              Empowering business through simplicity.
            </h2>
            <p className={styles.storyBody}>
              We believe powerful technology should be simple and reliable. At Wusooly, we build tools that help businesses streamline daily operations, save hours of manual work, and focus entirely on their customers.
            </p>
            <Magnetic>
              <TransitionLink href="/contact" className={styles.cardBtn}>
                <span>Get to Know Us</span>
                <span className={styles.btnArrow} aria-hidden="true">&rarr;</span>
              </TransitionLink>
            </Magnetic>
          </div>

          <div className={styles.storyMedia}>
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/assets/pos-video-poster.webp"
              className={styles.storyVideo}
              aria-label="Wusooly POS Terminal 360-degree turntable hardware demonstration"
            >
              <source src="/assets/pos.webm" type="video/webm" />
              <source src="/assets/pos-optimized.mp4" type="video/mp4" />
              <source src="/assets/pos.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      {/* ── 04. Mission Card ("To democratize access to enterprise-grade POS technology.") ── */}
      <section className={`${styles.sectionWrap} ${styles.missionSection}`} aria-label="Our Mission">
        <div className={`${styles.missionCard} ${styles.reveal}`}>
          <div className={styles.missionContent}>
            <h2 className={styles.missionHeadline}>
              To democratize access to modern POS technology.
            </h2>
            <p className={styles.missionBody}>
              We serve the caf&eacute;s, restaurants, corner groceries, and growing retail chains with equal dedication.
            </p>
          </div>

          <div className={styles.missionMedia}>
            <Image
              src="/assets/cafe-table-management-v5.jpg"
              alt="Warm restaurant dining space with modern POS management"
              fill
              sizes="(max-width: 960px) 100vw, 520px"
              className={styles.missionImg}
            />
          </div>
        </div>
      </section>

      {/* ── 05. Core Values Bento Grid ("Built around what matters.") ── */}
      <section className={`${styles.sectionWrap} ${styles.valuesSection}`} aria-label="Our Values">
        <div className={styles.valuesHeader}>
          <h2 className={styles.valuesHeadline}>
            Built around what matters.
          </h2>
          <p className={styles.valuesSubtext}>
            We keep things simple, reliable, and transparent so you can focus on running your business with total confidence.
          </p>
        </div>

        <div className={styles.valuesGrid}>
          {/* Card 1: Customer First Approach */}
          <div className={`${styles.valueCard} ${styles.reveal}`}>
            <div className={styles.valueIconBox}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3 className={styles.valueTitle}>Customer First Approach</h3>
            <p className={styles.valueDesc}>
              We listen, learn and build features that solve real problems.
            </p>
          </div>

          {/* Card 2: Simplicity by Design */}
          <div className={`${styles.valueCard} ${styles.reveal}`}>
            <div className={styles.valueIconBox}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <h3 className={styles.valueTitle}>Simplicity by Design</h3>
            <p className={styles.valueDesc}>
              Clean, intuitive and easy to use for everyone on your team.
            </p>
          </div>

          {/* Card 3: Transparent Experience */}
          <div className={`${styles.valueCard} ${styles.reveal}`}>
            <div className={styles.valueIconBox}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <h3 className={styles.valueTitle}>Transparent Experience</h3>
            <p className={styles.valueDesc}>
              No hidden costs. Just honest pricing and clear communication.
            </p>
          </div>

          {/* Card 4: Constant Innovation */}
          <div className={`${styles.valueCard} ${styles.reveal}`}>
            <div className={styles.valueIconBox}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            </div>
            <h3 className={styles.valueTitle}>Constant Innovation</h3>
            <p className={styles.valueDesc}>
              We keep improving based on real feedback from shop owners.
            </p>
          </div>
        </div>
      </section>

      {/* ── 06. Dual Reliability Split ("Always improving." & "Always reliable.") ── */}
      <section className={`${styles.sectionWrap} ${styles.splitSection}`} aria-label="Innovation & Reliability">
        <div className={styles.splitGrid}>
          {/* Light Card: Always improving. */}
          <div className={`${styles.splitCardLight} ${styles.reveal}`}>
            <div className={styles.splitIconLight}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <h3 className={styles.splitTitleLight}>
              Always improving.
            </h3>
            <p className={styles.splitBodyLight}>
              We constantly update our software based on real feedback from shop owners on the ground.
            </p>
          </div>

          {/* Dark Card: Always reliable. */}
          <div className={`${styles.splitCardDark} ${styles.reveal}`}>
            <div className={styles.splitIconDark}>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h3 className={styles.splitTitleDark}>
              Always reliable.
            </h3>
            <p className={styles.splitBodyDark}>
              Your business doesn&apos;t stop, and neither do we. Our systems are built to run 24/7 with the stability you can depend on.
            </p>
          </div>
        </div>
      </section>

      {/* ── 07. Outro Card (Exact match of beloved Wusooly card layout) ── */}
      <section className={`${styles.sectionWrap} ${styles.outroSection}`} aria-label="Get Started">
        <div className={`${styles.outroCard} ${styles.reveal}`}>
          <h2 className={styles.outroTitle}>
            Ready to bring your store <br className={styles.titleBr} />operations together?
          </h2>
          <p className={styles.outroSubtext}>
            Talk to our team about Wusooly for your business.
          </p>
          <Magnetic>
            <TransitionLink href="/contact" className={styles.outroBtn}>
              <span>Get in Touch</span>
              <span className={styles.btnArrow} aria-hidden="true">&rarr;</span>
            </TransitionLink>
          </Magnetic>
        </div>
      </section>

      {/* ── 08. Floating Glass Dark Footer ── */}
      <Footer theme="dark" />
    </main>
  );
}
