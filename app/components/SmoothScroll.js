"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { ScrollTrigger } from "../../lib/gsap";

export const ScrollContext = createContext({
  stop: () => {},
  start: () => {},
  scrollTo: () => {},
  lenis: null,
});

export const useSmoothScroll = () => useContext(ScrollContext);

/**
 * Child component that directly uses useLenis() hook from within ReactLenis tree.
 * Synchronizes with ScrollTrigger and provides seamless anchor hash navigation.
 */
function LenisGsapSync({ onLenisReady }) {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    onLenisReady?.(lenis);

    // Sync Lenis scroll with ScrollTrigger cleanly
    const handleScroll = () => {
      ScrollTrigger.update();
    };

    lenis.on("scroll", handleScroll);

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
            duration: 1.1,
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
            duration: 1.1,
          });
        }
      }
    };

    const timer = setTimeout(scrollToInitialHash, 250);
    window.addEventListener("hashchange", scrollToInitialHash);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", scrollToInitialHash);
      document.removeEventListener("click", handleAnchorClick);
      lenis.off("scroll", handleScroll);
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
      options={{
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.4,
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
