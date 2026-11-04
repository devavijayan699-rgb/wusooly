"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import Magnetic from "./Magnetic";
import TransitionLink from "./TransitionLink";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import styles from "./FAQSection.module.css";

const FAQ_ITEMS = [
  {
    id: "what-is-wusooly",
    question: "What is Wusooly?",
    answer:
      "Wusooly is a modern cloud POS and business management platform designed for supermarkets, retail shops, cafés, and restaurants. It connects fast touch-screen billing, live inventory tracking, VAT compliance, customer ledgers, and reporting into one unified system.",
  },
  {
    id: "business-types",
    question: "What types of businesses can use Wusooly?",
    answer:
      "Wusooly is purpose-built for both retail and food service. It supports supermarkets, grocery stores, fashion boutiques, and electronics outlets, as well as specialty coffee shops, bakeries, quick-service counters, and full-service dining.",
  },
  {
    id: "barcode-billing",
    question: "Does Wusooly support barcode billing?",
    answer:
      "Yes. Wusooly features seamless plug-and-play support for wireless, Bluetooth, and USB barcode scanners, multi-unit packaging barcodes, scale-embedded weight barcodes, and custom barcode label printing.",
  },
  {
    id: "stock-updates",
    question: "Does stock update automatically?",
    answer:
      "Every sale, return, or supplier intake updates your inventory immediately in real time. You also receive automatic low-stock alerts and reorder suggestions before critical items run out.",
  },
  {
    id: "customer-credit",
    question: "Can I manage customer credit and wallets?",
    answer:
      "Yes. You can manage complete customer credit ledgers, set credit limits, track outstanding balances, maintain customer store wallets, and send automated billing receipts directly over WhatsApp.",
  },
  {
    id: "expenses-profit",
    question: "Can I track expenses and profit?",
    answer:
      "Wusooly records daily operational expenses, supplier payouts, and cash drawer reconciliations. It calculates gross and net profit margins automatically alongside VAT-ready financial summaries.",
  },
  {
    id: "data-safety",
    question: "Is my data safe?",
    answer:
      "Your data is protected with enterprise-grade 256-bit encryption and continuous automated cloud backups. Wusooly also includes offline mode billing so checkout stays fast even during network interruptions.",
  },
];

export default function FAQSection() {
  // First item open by default for immediate engagement, others collapsed
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      if (headlineRef.current) gsap.set(headlineRef.current.children, { opacity: 1, y: 0 });
      if (subtextRef.current) gsap.set(subtextRef.current, { opacity: 1, y: 0 });
      if (listRef.current) gsap.set(listRef.current.children, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Headline words masked rise
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current.children,
          { opacity: 0.65, y: 8 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 95%",
              once: true,
            },
          }
        );
      }

      // 2. Subtext fade
      if (subtextRef.current) {
        gsap.fromTo(
          subtextRef.current,
          { opacity: 0.65, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 95%",
              once: true,
            },
          }
        );
      }

      // 3. Accordion items ambient rise
      if (listRef.current) {
        gsap.fromTo(
          listRef.current.children,
          { opacity: 0.65, y: 10 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.04,
            duration: 0.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: listRef.current,
              start: "top 95%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className={styles.faqSection} id="faq" ref={sectionRef} aria-label="Frequently Asked Questions">
      {/* Background Halftone / Dot Grid Canvas Texture */}
      <div className={styles.gridPattern} aria-hidden="true" />

      <div className={styles.container}>
        {/* Left Column: Zero Eyebrow, Pure Display Headline & Context */}
        <div className={styles.headerCol}>
          <div className={styles.stickyHeader}>
            <h2 className={styles.headline} ref={headlineRef} style={{ overflow: "hidden" }}>
              <span className={styles.headlineDark} style={{ display: "inline-block" }}>Frequently</span>{" "}
              <span className={styles.headlineDark} style={{ display: "inline-block" }}>Asked</span>{" "}
              <span className={styles.headlineLime} style={{ display: "inline-block" }}>Questions</span>
            </h2>
            <p className={styles.subtext} ref={subtextRef}>
              Everything you need to know about Wusooly. From billing and inventory to reports
              and integrations, we have got you covered.
            </p>
          </div>
        </div>

        {/* Right Column: Accordion List & Bottom CTA */}
        <div className={styles.faqCol}>
          <div className={styles.accordionList} ref={listRef} role="region" aria-label="FAQ Accordion">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openIndex === index;
              const headingId = `faq-title-${item.id}`;
              const contentId = `faq-content-${item.id}`;

              return (
                <div
                  key={item.id}
                  className={`${styles.accordionItem} ${isOpen ? styles.itemOpen : ""}`}
                >
                  <button
                    type="button"
                    className={styles.questionBtn}
                    onClick={() => toggleItem(index)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    id={headingId}
                  >
                    <span className={styles.questionText}>{item.question}</span>
                    <span
                      className={`${styles.toggleCircle} ${isOpen ? styles.circleOpen : ""}`}
                      aria-hidden="true"
                    >
                      <svg
                        className={`${styles.plusIcon} ${isOpen ? styles.plusRotated : ""}`}
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 3.2V12.8M3.2 8H12.8"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={contentId}
                        role="region"
                        aria-labelledby={headingId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className={styles.answerInner}>
                          <p className={styles.answerText}>{item.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA Row: Arrow Circle + Still have a question? */}
          <div className={styles.ctaRow}>
            <Magnetic strength={0.3} maxDisplacement={10}>
              <TransitionLink href="/contact" className={styles.ctaCard} aria-label="Still have a question? Contact our team">
                <div className={styles.ctaCircle}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.ctaArrow}
                    aria-hidden="true"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
                <div className={styles.ctaContent}>
                  <span className={styles.ctaTitle}>Still have a question?</span>
                  <span className={styles.ctaSub}>CONTACT OUR TEAM</span>
                </div>
              </TransitionLink>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
