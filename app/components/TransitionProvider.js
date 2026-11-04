"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "../../lib/gsap";
import { useSmoothScroll } from "./SmoothScroll";

export const TransitionContext = createContext({
  navigate: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(TransitionContext);

export default function TransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtainRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const pendingHrefRef = useRef(null);
  const { scrollTo } = useSmoothScroll();
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Play "Enter" animation whenever pathname changes after a transition
  useEffect(() => {
    if (!curtainRef.current) return;
    const curtain = curtainRef.current;

    // Reset scroll to top immediately
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      scrollTo?.(0, { immediate: true });
    }

    // Refresh ScrollTriggers for new page DOM
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // If curtain was covering screen during a transition, wipe it away
    if (isTransitioningRef.current) {
      gsap.to(curtain, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.55,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(curtain, {
            pointerEvents: "none",
            clipPath: "inset(100% 0 0 0)",
          });
          isTransitioningRef.current = false;
          setIsTransitioning(false);
          pendingHrefRef.current = null;
          ScrollTrigger.refresh();
        },
      });
    }
  }, [pathname, scrollTo]);

  // Handle browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      setTimeout(() => {
        window.scrollTo(0, 0);
        scrollTo?.(0, { immediate: true });
        ScrollTrigger.refresh();
      }, 50);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [scrollTo]);

  const navigate = (href) => {
    if (!href || href === pathname || isTransitioningRef.current) return;

    // Skip transitions for hash anchors on same page
    if (href.startsWith("#") || href.startsWith("/#") && pathname === "/") {
      return;
    }

    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      router.push(href);
      return;
    }

    isTransitioningRef.current = true;
    setIsTransitioning(true);
    pendingHrefRef.current = href;

    const curtain = curtainRef.current;

    // Wipe down curtain
    gsap.set(curtain, {
      pointerEvents: "auto",
      clipPath: "inset(100% 0 0 0)",
    });

    gsap.to(curtain, {
      clipPath: "inset(0% 0 0 0)",
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        // Kill existing triggers before unmount
        ScrollTrigger.getAll().forEach((t) => t.kill());
        router.push(href);
      },
    });
  };

  return (
    <TransitionContext.Provider value={{ navigate, isTransitioning }}>
      {children}
      {/* Full-bleed Deep Forest Route Curtain */}
      <div
        ref={curtainRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99999,
          pointerEvents: "none",
          backgroundColor: "#082012",
          clipPath: "inset(100% 0 0 0)",
          willChange: "clip-path",
        }}
      />
    </TransitionContext.Provider>
  );
}

