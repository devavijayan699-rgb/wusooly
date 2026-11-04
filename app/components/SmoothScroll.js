"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { ReactLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

export const ScrollContext = createContext({
  stop: () => {},
  start: () => {},
  scrollTo: () => {},
  lenis: null,
});

export const useSmoothScroll = () => useContext(ScrollContext);

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    const lenisInstance = lenisRef.current?.lenis;
    if (!lenisInstance || mediaQuery.matches) return;

    // Connect Lenis scroll to ScrollTrigger updates
    lenisInstance.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's unified ticker
    const update = (time) => {
      lenisInstance.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
      lenisInstance.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
    };
  }, [reducedMotion]);

  const stop = () => lenisRef.current?.lenis?.stop();
  const start = () => lenisRef.current?.lenis?.start();
  const scrollTo = (target, options) => lenisRef.current?.lenis?.scrollTo(target, options);

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ScrollContext.Provider
      value={{
        stop,
        start,
        scrollTo,
        get lenis() {
          return lenisRef.current?.lenis;
        },
      }}
    >
      <ReactLenis
        ref={lenisRef}
        root
        autoRaf={false}
        options={{
          lerp: 0.1,
          duration: 1.2,
          smoothWheel: true,
        }}
      >
        {children}
      </ReactLenis>
    </ScrollContext.Provider>
  );
}

