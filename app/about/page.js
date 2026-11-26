"use client";

import { useRef } from "react";
import Image from "next/image";
import { Users, Zap, ShieldCheck, BarChart3, Sparkles, Clock, ArrowRight } from "lucide-react";
import TransitionLink from "../components/layout/TransitionLink";
import Magnetic from "../components/ui/Magnetic";
import Navbar from "../components/layout/Navbar";
import OutroCTA from "../components/sections/OutroCTA";
import Footer from "../components/layout/Footer";
import { gsap, scrollReveal, useGsapReveal } from "../../lib/gsap";
import styles from "./about.module.css";

const GALLERY_PHOTOS = [
  {
    src: "/about/retailer-story.webp",
    alt: "Retail grocer managing fresh produce checkout",
  },
  {
    src: "/about/cafe-aerial.webp",
    alt: "Cafe interior and table hospitality management",
  },
];

const CORE_VALUES = [
  {
    title: "Customer First Approach",
    desc: "We listen, learn and build features that solve real problems.",
    Icon: Users,
  },
  {
    title: "Simplicity by Design",
    desc: "Clean, intuitive and easy to use for everyone on your team.",
    Icon: Zap,
  },
  {
    title: "Transparent Experience",
    desc: "No hidden costs. Just honest pricing and clear communication.",
    Icon: ShieldCheck,
  },
  {
    title: "Constant Innovation",
    desc: "We keep improving based on real feedback from shop owners.",
    Icon: BarChart3,
  },
];

export default function AboutPage() {
  const containerRef = useRef(null);

  useGsapReveal(
    containerRef,
    () => {
      gsap.fromTo(`.${styles.heroMain}`, { opacity: 0.7, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" });
      gsap.fromTo(`.${styles.purposeCard}`, { opacity: 0.7, y: 10 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.08, ease: "expo.out" });
      gsap.utils.toArray(`.${styles.photoFrame}`).forEach((frame, i) => {
        scrollReveal(frame, { y: 0, scale: 1.02, opacity: 0.85, duration: 0.6, delay: i * 0.06 });
      });
      scrollReveal([`.${styles.storyCard}`, `.${styles.missionCard}`], {
        y: 12, opacity: 0.65, duration: 0.55, stagger: 0.08, trigger: `.${styles.storySection}`,
      });
      scrollReveal(`.${styles.valueCard}`, {
        y: 10, opacity: 0.65, duration: 0.5, stagger: 0.05, trigger: `.${styles.valuesGrid}`,
      });
      scrollReveal([`.${styles.splitCardLight}`, `.${styles.splitCardDark}`], {
        y: 12, opacity: 0.65, duration: 0.55, stagger: 0.08, trigger: `.${styles.splitGrid}`,
      });
    },
    {
      onReducedMotion: () => {
        gsap.set(containerRef.current.querySelectorAll(`.${styles.reveal}`), { opacity: 1, y: 0 });
      },
    }
  );

  return (
    <main className={styles.page} ref={containerRef}>
      {/* ── 00. Floating Liquid Dark Navbar ── */}
      <div className={styles.navbarContainer}>
        <Navbar variant="about" />
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
          {GALLERY_PHOTOS.map(({ src, alt }) => (
            <div key={src} className={styles.photoFrame}>
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className={styles.stripImg}
                priority
              />
            </div>
          ))}
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
              We believe powerful technology should be simple and reliable. At Wusooly, we build tools that help businesses simplify daily operations, save hours of manual work, and focus entirely on their customers.
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
              poster="/about/pos-turntable-poster.webp"
              className={styles.storyVideo}
              aria-label="Wusooly POS Terminal 360-degree turntable hardware demonstration"
            >
              <source src="/about/pos-turntable.webm" type="video/webm" />
              <source src="/about/pos-turntable.mp4" type="video/mp4" />
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
              src="/about/cafe-table-management.webp"
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
          {CORE_VALUES.map(({ title, desc, Icon }) => (
            <div key={title} className={`${styles.valueCard} ${styles.reveal}`}>
              <div className={styles.valueIconBox}>
                <Icon size={20} strokeWidth={2.2} aria-hidden="true" />
              </div>
              <h3 className={styles.valueTitle}>{title}</h3>
              <p className={styles.valueDesc}>{desc}</p>
            </div>
          ))}
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
      <Footer />
    </main>
  );
}
