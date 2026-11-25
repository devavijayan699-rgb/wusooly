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

export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function scrollReveal(
  target,
  {
    y = 10,
    opacity = 0.65,
    duration = 0.5,
    stagger = 0,
    delay = 0,
    scale,
    trigger = target,
    start = "top 95%",
    ease = "expo.out",
  } = {}
) {
  if (!target) return;
  const fromVars = { opacity, y };
  const toVars = {
    opacity: 1,
    y: 0,
    duration,
    ease,
    scrollTrigger: { trigger, start, once: true },
  };
  if (scale !== undefined) {
    fromVars.scale = scale;
    toVars.scale = 1;
  }
  if (stagger) toVars.stagger = stagger;
  if (delay) toVars.delay = delay;
  return gsap.fromTo(target, fromVars, toVars);
}

export function useGsapReveal(containerRef, setup, { onReducedMotion, deps = [] } = {}) {
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    if (prefersReducedMotion()) {
      onReducedMotion?.();
      return;
    }
    const ctx = gsap.context(setup, containerRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { gsap, ScrollTrigger, useGSAP };
export default gsap;

