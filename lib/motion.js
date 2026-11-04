/**
 * WUSOOLY POS — GSAP MOTION TOKENS & SYSTEM SPECIFICATION
 * Mood: Calm Luxury / Editorial
 * Core Rule: Restraint, consistency, one easing family, upward travel.
 */

export const MOTION_TOKENS = {
  // Easing Curves
  ease: {
    out: "expo.out",          // cubic-bezier(0.16, 1, 0.3, 1) — confident, decelerating reveal
    inOut: "power3.inOut",    // cubic-bezier(0.76, 0, 0.24, 1) — seamless transitions
    micro: "power2.out",      // snappy interactive feedback
  },

  // Durations (Tuned +15% for calm luxury editorial rhythm)
  duration: {
    micro: 0.35,              // Hover feedback, toggles
    base: 1.15,               // Standard section / card entries
    hero: 1.5,                // Signature hero timeline
    page: 1.0,                // Fullscreen route curtain wipe
    split: 0.85,              // Masked text line reveal
  },

  // Staggers
  stagger: {
    base: 0.09,               // Sibling elements (cards, badges)
    lines: 0.06,              // Masked text lines
  },

  // Distances & Scales
  travel: {
    y: 40,                    // Max upward displacement (px)
    ySmall: 24,               // Badges, captions, micro labels
    parallax: 0.08,           // Max 8% image translation
  },

  // Image Reveals
  image: {
    clipFrom: "inset(12% 0% 12% 0%)",
    clipTo: "inset(0% 0% 0% 0%)",
    scaleFrom: 1.15,
    scaleTo: 1.0,
  },

  // Lenis Smooth Scroll Configuration
  lenis: {
    lerp: 0.1,
    duration: 1.2,
    smoothWheel: true,
  },
};

