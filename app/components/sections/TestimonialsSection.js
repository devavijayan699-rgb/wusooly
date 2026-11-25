"use client";

import { useRef } from "react";
import { gsap, scrollReveal, useGsapReveal } from "../../../lib/gsap";
import { TESTIMONIALS_HEADER, TESTIMONIALS } from "../../data/testimonialsData";
import styles from "./TestimonialsSection.module.css";

function QuoteMarkIcon() {
  return (
    <svg
      width="22"
      height="16"
      viewBox="0 0 24 18"
      fill="currentColor"
      aria-hidden="true"
      className={styles.quoteIcon}
    >
      <path d="M14.4 18h7.2c1.33 0 2.4-1.07 2.4-2.4V8.4c0-1.33-1.07-2.4-2.4-2.4h-4.2c.35-2.18 1.52-3.35 3.6-3.74.55-.1.95-.58.95-1.14V1c0-.7-.62-1.24-1.31-1.13C16.29.55 13.2 3.57 13.2 9.2v6.4c0 1.33 1.07 2.4 2.4 2.4zm-13.2 0h7.2c1.33 0 2.4-1.07 2.4-2.4V8.4C10.8 7.07 9.73 6 8.4 6H4.2c.35-2.18 1.52-3.35 3.6-3.74.55-.1.95-.58.95-1.14V1c0-.7-.62-1.24-1.31-1.13C3.09.55 0 3.57 0 9.2v6.4C0 16.93 1.07 18 2.4 18z" />
    </svg>
  );
}

export default function TestimonialsSection({ id = "testimonials" }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);

  useGsapReveal(
    sectionRef,
    () => {
      if (headerRef.current) {
        scrollReveal(headerRef.current, {
          y: 10,
          opacity: 0.65,
          duration: 0.5,
          trigger: headerRef.current,
          start: "top 92%",
        });
      }
      if (gridRef.current) {
        scrollReveal(gridRef.current.children, {
          y: 14,
          opacity: 0.65,
          duration: 0.55,
          stagger: 0.08,
          trigger: gridRef.current,
          start: "top 90%",
        });
      }
    },
    {
      onReducedMotion: () => {
        if (headerRef.current) gsap.set(headerRef.current, { opacity: 1, y: 0 });
        if (gridRef.current) gsap.set(gridRef.current.children, { opacity: 1, y: 0 });
      },
    }
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className={styles.section}
      aria-labelledby="testimonials-heading"
    >
      <div className={styles.container}>
        <header ref={headerRef} className={styles.header}>
          <h2 id="testimonials-heading" className={styles.headline}>
            {TESTIMONIALS_HEADER.headline}
            <span className={styles.headlineDot} aria-hidden="true">
              .
            </span>
          </h2>
          <p className={styles.subtext}>{TESTIMONIALS_HEADER.subtext}</p>
        </header>

        <div ref={gridRef} className={styles.grid}>
          {TESTIMONIALS.map((item) => (
            <figure key={item.id} className={styles.card}>
              <div>
                <div className={styles.cardTop}>
                  <QuoteMarkIcon />
                </div>

                <blockquote className={styles.blockquote}>
                  <p className={styles.quoteText}>{item.quote}</p>
                </blockquote>
              </div>

              <figcaption className={styles.attribution}>
                <div className={styles.avatar} aria-hidden="true">
                  {item.initials}
                </div>
                <div className={styles.authorMeta}>
                  <cite className={styles.authorName}>{item.author}</cite>
                  <span className={styles.authorRole}>{item.role}</span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
