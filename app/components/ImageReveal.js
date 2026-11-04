"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../lib/gsap";

export default function ImageReveal({
  children,
  className = "",
  parallax = true,
  parallaxSpeed = 0.08,
  duration = 1.25,
  delay = 0,
  style = {},
  ...props
}) {
  const wrapperRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    const inner = innerRef.current || wrapper.firstElementChild;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      gsap.set(wrapper, { clipPath: "none", opacity: 1 });
      if (inner) gsap.set(inner, { scale: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Clip-Path reveal timeline
      gsap.fromTo(
        wrapper,
        {
          clipPath: "inset(12% 0% 12% 0%)",
          opacity: 0.7,
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration,
          delay,
          ease: "expo.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top 88%",
            once: true,
          },
        }
      );

      // 2. Inner Image scale decay
      if (inner) {
        gsap.fromTo(
          inner,
          {
            scale: 1.15,
          },
          {
            scale: 1.0,
            duration: duration * 1.1,
            delay,
            ease: "expo.out",
            scrollTrigger: {
              trigger: wrapper,
              start: "top 88%",
              once: true,
            },
          }
        );

        // 3. Optional subtle vertical parallax scrub (capped at 8%)
        if (parallax) {
          const travelPx = Math.min(Math.abs(parallaxSpeed), 0.08) * 100;
          gsap.fromTo(
            inner,
            { yPercent: -travelPx / 2 },
            {
              yPercent: travelPx / 2,
              ease: "none",
              scrollTrigger: {
                trigger: wrapper,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }
      }
    }, wrapperRef);

    return () => ctx.revert();
  }, [duration, delay, parallax, parallaxSpeed]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        overflow: "hidden",
        position: "relative",
        ...style,
      }}
      {...props}
    >
      <div
        ref={innerRef}
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
}

