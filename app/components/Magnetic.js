"use client";

import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";

export default function Magnetic({
  children,
  strength = 0.35,
  maxDisplacement = 12,
  className = "",
  style = {},
  ...props
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    // Desktop pointer fine check only
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || isReduced) return;

    const el = containerRef.current;
    const xTo = gsap.quickTo(el, "x", {
      duration: 0.5,
      ease: "power2.out",
    });
    const yTo = gsap.quickTo(el, "y", {
      duration: 0.5,
      ease: "power2.out",
    });

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let dx = (e.clientX - centerX) * strength;
      let dy = (e.clientY - centerY) * strength;

      // Clamp displacement to maxDisplacement
      dx = Math.max(-maxDisplacement, Math.min(maxDisplacement, dx));
      dy = Math.max(-maxDisplacement, Math.min(maxDisplacement, dy));

      xTo(dx);
      yTo(dy);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      xTo(0);
      yTo(0);
    };
  }, [strength, maxDisplacement]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: "inline-block",
        willChange: "transform",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}

