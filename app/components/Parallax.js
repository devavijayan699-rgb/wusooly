"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

export default function Parallax({
  children,
  speed = 0.06,
  className = "",
  style = {},
  ...props
}) {
  const targetRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !targetRef.current) return;

    const el = targetRef.current;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    // Cap parallax speed to max 8%
    const safeSpeed = Math.min(Math.abs(speed), 0.08) * (speed < 0 ? -1 : 1);
    const yShift = safeSpeed * 100;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -yShift / 2 },
        {
          yPercent: yShift / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }, targetRef);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div
      ref={targetRef}
      className={className}
      style={{
        willChange: "transform",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

