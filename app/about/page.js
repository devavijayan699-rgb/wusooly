"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Users, Zap, ShieldCheck, BarChart3, Sparkles, Clock, ArrowRight } from "lucide-react";
import TransitionLink from "../components/TransitionLink";
import Magnetic from "../components/Magnetic";
import Navbar from "../components/Navbar";
import OutroCTA from "../components/OutroCTA";
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
              <Clock
                className={styles.metaIcon}
                size={16}
                strokeWidth={2.4}
                aria-hidden="true"
              />
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
              src="/assets/cafe-aerial-v4.webp"
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
                <ArrowRight size={16} strokeWidth={2.4} className={styles.btnArrow} aria-hidden="true" />
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
              src="/assets/cafe-table-management-v5.webp"
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
              <Users size={20} strokeWidth={2.2} aria-hidden="true" />
            </div>
            <h3 className={styles.valueTitle}>Customer First Approach</h3>
            <p className={styles.valueDesc}>
              We listen, learn and build features that solve real problems.
            </p>
          </div>

          {/* Card 2: Simplicity by Design */}
          <div className={`${styles.valueCard} ${styles.reveal}`}>
            <div className={styles.valueIconBox}>
              <Zap size={20} strokeWidth={2.2} aria-hidden="true" />
            </div>
            <h3 className={styles.valueTitle}>Simplicity by Design</h3>
            <p className={styles.valueDesc}>
              Clean, intuitive and easy to use for everyone on your team.
            </p>
          </div>

          {/* Card 3: Transparent Experience */}
          <div className={`${styles.valueCard} ${styles.reveal}`}>
            <div className={styles.valueIconBox}>
              <ShieldCheck size={20} strokeWidth={2.2} aria-hidden="true" />
            </div>
            <h3 className={styles.valueTitle}>Transparent Experience</h3>
            <p className={styles.valueDesc}>
              No hidden costs. Just honest pricing and clear communication.
            </p>
          </div>

          {/* Card 4: Constant Innovation */}
          <div className={`${styles.valueCard} ${styles.reveal}`}>
            <div className={styles.valueIconBox}>
              <BarChart3 size={20} strokeWidth={2.2} aria-hidden="true" />
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
              <Sparkles size={22} strokeWidth={2.2} aria-hidden="true" />
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
              <ShieldCheck size={22} strokeWidth={2.2} aria-hidden="true" />
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

      {/* ── 07. Outro Card (Unified Wusooly Store Operations CTA) ── */}
      <OutroCTA />

      {/* ── 08. Floating Glass Dark Footer ── */}
      <Footer theme="dark" />
    </main>
  );
}
