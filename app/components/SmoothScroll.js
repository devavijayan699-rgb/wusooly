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
 * Synchronizes with GSAP ticker and provides seamless anchor hash navigation.
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

    // Global click listener for anchor links containing hashes
    const handleAnchorClick = (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href) return;

      const isSamePageHash =
        href.startsWith("#") ||
        (href.startsWith("/#") && window.location.pathname === "/");

      if (isSamePageHash) {
        const hash = href.split("#")[1];
        if (!hash) return;
        const targetEl = document.getElementById(hash);
        if (targetEl) {
          e.preventDefault();
          lenis.scrollTo(targetEl, {
            offset: -60,
            duration: 1.2,
          });
          window.history.pushState(null, "", `#${hash}`);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Check if initial URL on mount already contains a hash target
    const scrollToInitialHash = () => {
      if (window.location.hash) {
        const hash = window.location.hash.slice(1);
        const targetEl = document.getElementById(hash);
        if (targetEl) {
          lenis.scrollTo(targetEl, {
            offset: -60,
            duration: 1.2,
          });
        }
      }
    };

    // Run slightly delayed to allow DOM hydration and dynamic components to mount
    const timer = setTimeout(scrollToInitialHash, 350);
    window.addEventListener("hashchange", scrollToInitialHash);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", scrollToInitialHash);
      document.removeEventListener("click", handleAnchorClick);
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
