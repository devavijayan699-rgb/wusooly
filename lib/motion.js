/**
 * WUSOOLY POS — 120Hz ULTRA-FLUID MOTION TOKENS & SYSTEM SPECIFICATION
 * Design Standard: Linear / Apple / Studio Freight Tier
 * Rules: Instant response (0ms latency), 120Hz native momentum, zero blank-screen buffering.
 */

export const MOTION_TOKENS = {
  // Easing Curves
  ease: {
    fluid: [0.16, 1, 0.3, 1],       // Apple / Linear fluid exponential decay
    out: "expo.out",                 // GSAP equivalent
    spring: { type: "spring", stiffness: 420, damping: 28 }, // Tactile buttons & tabs
    snappy: { type: "spring", stiffness: 500, damping: 32 }, // Micro-switches
  },

  // Responsive Durations (Snappy & effortless)
  duration: {
    instant: 0.18,                   // Tab highlight, click feedback
    micro: 0.28,                     // Hover states, dropdowns, accordions
    base: 0.48,                      // Cards & section ambient reveals
    hero: 0.70,                      // Initial page load settling
  },

  // Staggers
  stagger: {
    base: 0.05,                      // Cards, badges, list items
    lines: 0.04,                     // Text headlines
  },

  // Ambient Displacements (Restrained to prevent empty space during fast scrolling)
  travel: {
    micro: 4,                        // Hover elevation
    ambient: 10,                     // In-view card lift
    hero: 14,                        // Hero entrance lift
  },

  // Native 120Hz ProMotion Scroll Configuration
  lenis: {
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.85,
    touchMultiplier: 1.4,
  },
};
