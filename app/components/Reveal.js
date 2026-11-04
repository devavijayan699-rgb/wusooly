"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

export default function Reveal({
  children,
  as: Component = "div",
  className = "",
  delay = 0,
  duration = 0.6,
  y = 12,
  ...props
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const el = containerRef.current;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Content starts gently visible so fast scrolling never encounters blank spaces
      gsap.fromTo(
        el,
        { opacity: 0.45, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 95%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [delay, duration, y]);

  return (
    <Component ref={containerRef} className={className} {...props}>
      {children}
    </Component>
  );
}
