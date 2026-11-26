"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "../../../lib/gsap";
import { useSmoothScroll } from "./SmoothScroll";

export default function TransitionProvider({ children }) {
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();

  // Handle immediate scroll restoration & anchor resolution on route change
  useEffect(() => {
    const targetHash = typeof window !== "undefined" && window.location.hash
      ? window.location.hash.slice(1)
      : "";

    if (!targetHash && typeof window !== "undefined") {
      window.scrollTo(0, 0);
      scrollTo?.(0, { immediate: true });
    }

    // Refresh ScrollTriggers for new page DOM and resolve hash target (or top for tab hashes)
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      if (targetHash) {
        const el = document.getElementById(targetHash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo(0, 0);
          scrollTo?.(0, { immediate: true });
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, scrollTo]);

  // Handle browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 80);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return <>{children}</>;
}
