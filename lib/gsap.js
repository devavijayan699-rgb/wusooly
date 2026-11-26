"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.defaults({
    ease: "expo.out",
    duration: 1.15,
  });
}

let activeRevealCleanups = null;

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Viewport-resilient reveal helper that pairs GSAP animation with
 * live IntersectionObserver + scroll-past & bottom-of-page safeguards
 * so sections never stay stuck at partial opacity after fast scrolls,
 * anchor jumps, or dynamic height changes.
 */
export function scrollReveal(
  target,
  {
    y = 10,
    opacity = 0.65,
    duration = 0.5,
    stagger = 0,
    delay = 0,
    scale,
  } = {}
) {
  if (typeof window === "undefined" || !target) return;

  const elements = gsap.utils
    .toArray(target)
    .filter((el) => el && el.nodeType === 1);
  if (!elements.length) return;

  if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
    gsap.set(elements, { opacity: 1, y: 0, ...(scale !== undefined ? { scale: 1 } : {}) });
    return;
  }

  const revealed = new WeakSet();
  const pending = new Set(elements);

  const revealEl = (el, idxDelay = 0, instant = false) => {
    if (revealed.has(el)) return;
    revealed.add(el);
    pending.delete(el);
    observer?.unobserve(el);

    if (instant) {
      gsap.set(el, {
        opacity: 1,
        y: 0,
        ...(scale !== undefined ? { scale: 1 } : {}),
        overwrite: "auto",
      });
      return;
    }

    gsap.to(el, {
      opacity: 1,
      y: 0,
      ...(scale !== undefined ? { scale: 1 } : {}),
      duration,
      delay: delay + idxDelay,
      ease: "expo.out",
      overwrite: "auto",
    });
  };

  let observer = null;

  const flushVisibleOrPassed = () => {
    if (!pending.size) return;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const doc = document.documentElement;
    const nearPageBottom = window.scrollY + vh >= doc.scrollHeight - 72;

    let batchIndex = 0;
    for (const el of Array.from(pending)) {
      if (!el.isConnected) {
        pending.delete(el);
        continue;
      }
      const rect = el.getBoundingClientRect();
      // Reveal if near bottom of document, already scrolled past top, or entering bottom edge
      if (nearPageBottom || rect.bottom < 0) {
        revealEl(el, 0, rect.bottom < 0);
      } else if (rect.top <= vh + 32) {
        revealEl(el, stagger ? batchIndex * stagger : 0, false);
        batchIndex += 1;
      }
    }

    if (!pending.size) {
      cleanup();
    }
  };

  observer = new IntersectionObserver(
    (entries) => {
      let batchIndex = 0;
      for (const entry of entries) {
        if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight + 32) {
          revealEl(entry.target, stagger ? batchIndex * stagger : 0, false);
          batchIndex += 1;
        }
      }
      if (!pending.size) {
        cleanup();
      }
    },
    { rootMargin: "0px 0px 40px 0px", threshold: 0.01 }
  );

  // Set starting state only on elements currently below the fold
  const vh = window.innerHeight || document.documentElement.clientHeight;
  let initialVisibleIdx = 0;
  for (const el of elements) {
    const rect = el.getBoundingClientRect();
    const fromState = {
      opacity,
      y,
      ...(scale !== undefined ? { scale } : {}),
    };
    if (rect.bottom < 0) {
      revealEl(el, 0, true);
    } else if (rect.top <= vh + 24) {
      gsap.set(el, fromState);
      revealEl(el, stagger ? initialVisibleIdx * stagger : 0, false);
      initialVisibleIdx += 1;
    } else {
      gsap.set(el, fromState);
      observer.observe(el);
    }
  }

  let cleaned = false;
  const onScrollOrResize = () => flushVisibleOrPassed();

  function cleanup() {
    if (cleaned) return;
    cleaned = true;
    observer?.disconnect();
    window.removeEventListener("scroll", onScrollOrResize);
    window.removeEventListener("resize", onScrollOrResize);
  }

  if (pending.size) {
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });
  } else {
    cleanup();
  }

  activeRevealCleanups?.push(cleanup);
  return cleanup;
}

export function useGsapReveal(containerRef, setup, { onReducedMotion, deps = [] } = {}) {
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    if (prefersReducedMotion()) {
      onReducedMotion?.();
      return;
    }

    const cleanups = [];
    const prevCleanups = activeRevealCleanups;
    activeRevealCleanups = cleanups;
    let ctx;
    try {
      ctx = gsap.context(setup, containerRef);
    } finally {
      activeRevealCleanups = prevCleanups;
    }

    return () => {
      cleanups.forEach((fn) => fn());
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger, useGSAP };
export default gsap;
