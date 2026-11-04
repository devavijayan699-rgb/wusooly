"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

export const ScrollContext = createContext({
  stop: () => {},
  start: () => {},
  scrollTo: () => {},
  lenis: null,
});

export const useSmoothScroll = () => useContext(ScrollContext);

/**
 * Child component that directly uses useLenis() hook from within ReactLenis tree.
 * Guarantees that lenis is non-null when binding to gsap.ticker!
 */
function LenisGsapSync({ onLenisReady }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    onLenisReady?.(lenis);

    // Sync Lenis scroll with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's unified ticker
    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, [lenis, onLenisReady]);

  return null;
}

export default function SmoothScroll({ children }) {
  const [lenisInstance, setLenisInstance] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const stop = () => lenisInstance?.stop();
  const start = () => lenisInstance?.start();
  const scrollTo = (target, options) => lenisInstance?.scrollTo(target, options);

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      <LenisGsapSync onLenisReady={setLenisInstance} />
      <ScrollContext.Provider
        value={{
          stop,
          start,
          scrollTo,
          lenis: lenisInstance,
        }}
      >
        {children}
      </ScrollContext.Provider>
    </ReactLenis>
  );
}
