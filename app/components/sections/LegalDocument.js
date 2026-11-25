"use client";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import TransitionLink from "../layout/TransitionLink";
import { Clock, ArrowRight, Mail } from "lucide-react";
import styles from "./LegalDocument.module.css";

export function LegalSection({ number, title, children }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionNumber}>{number}.</span> {title}
      </h2>
      {children}
    </section>
  );
}

export function LegalList({ items }) {
  return (
    <ul className={styles.list}>
      {items.map((item, idx) => (
        <li key={idx} className={styles.listItem}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function LegalCallout({ children }) {
  return (
    <div className={styles.calloutCard}>
      <p className={styles.calloutText}>{children}</p>
    </div>
  );
}

export default function LegalDocument({
  badgeIcon,
  badgeText,
  title,
  lead,
  lastUpdated,
  otherPolicyPrompt,
  otherPolicyLabel,
  otherPolicyHref,
  helpTitle,
  helpText,
  helpEmail,
  helpSecondaryLabel,
  children,
}) {
  const handleGetDemo = () => {
    window.location.href = "/contact";
  };

  return (
    <main className={styles.page}>
      <div className={styles.navbarContainer}>
        <Navbar onGetDemo={handleGetDemo} />
      </div>

      <div className={styles.mainContainer}>
        <header className={styles.headerWrap}>
          <div className={styles.badge}>
            {badgeIcon}
            <span>{badgeText}</span>
          </div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.lead}>{lead}</p>
          <div className={styles.metaBar}>
            <span className={styles.metaItem}>
              <Clock size={15} strokeWidth={2.2} aria-hidden="true" />
              <span>Last updated: {lastUpdated}</span>
            </span>
            <span className={styles.metaDivider}>&bull;</span>
            <span>
              {otherPolicyPrompt}{" "}
              <TransitionLink href={otherPolicyHref} className={styles.metaLink}>
                {otherPolicyLabel} &rarr;
              </TransitionLink>
            </span>
          </div>
        </header>

        <article className={styles.docCard}>
          {children}

          <div className={styles.helpBox}>
            <h3 className={styles.helpTitle}>{helpTitle}</h3>
            <p className={styles.helpText}>{helpText}</p>
            <div className={styles.helpActions}>
              <a href={`mailto:${helpEmail}`} className={styles.helpBtnPrimary}>
                <Mail size={16} strokeWidth={2.4} aria-hidden="true" />
                <span>{helpEmail}</span>
              </a>
              <TransitionLink href="/contact" className={styles.helpBtnSecondary}>
                <span>{helpSecondaryLabel}</span>
                <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
              </TransitionLink>
            </div>
          </div>
        </article>
      </div>

      <Footer onGetDemo={handleGetDemo} />
    </main>
  );
}
