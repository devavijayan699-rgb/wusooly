"use client";

import TransitionLink from "./TransitionLink";
import Magnetic from "./Magnetic";
import styles from "./OutroCTA.module.css";

export default function OutroCTA({
  title,
  subtext = "Talk to our team about Wusooly for your business.",
  buttonText = "Get in Touch",
  href = "/contact",
  onClick,
  className = "",
}) {
  return (
    <section className={`${styles.outroSection} ${className}`} aria-label="Get Started">
      <div className={styles.container}>
        <div className={styles.outroCard}>
          <h2 className={styles.outroTitle}>
            {title || (
              <>
                Ready to bring your store <br className={styles.titleBr} />operations together?
              </>
            )}
          </h2>
          <p className={styles.outroSubtext}>{subtext}</p>
          <Magnetic strength={0.3} maxDisplacement={8}>
            {onClick ? (
              <button type="button" onClick={onClick} className={styles.outroBtn}>
                <span>{buttonText}</span>
                <span className={styles.btnArrow} aria-hidden="true">&rarr;</span>
              </button>
            ) : (
              <TransitionLink href={href} className={styles.outroBtn}>
                <span>{buttonText}</span>
                <span className={styles.btnArrow} aria-hidden="true">&rarr;</span>
              </TransitionLink>
            )}
          </Magnetic>
        </div>
      </div>
    </section>
  );
}

