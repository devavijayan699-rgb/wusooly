"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "../../lib/gsap";

export default function Reveal({
  children,
  as: Component = "div",
  className = "",
  delay = 0,
  duration = 1.15,
  stagger = 0.06,
  y = 30,
  useSplit = true,
  ...props
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const el = containerRef.current;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isReduced) {
      gsap.set(el, { opacity: 1, visibility: "visible" });
      return;
    }

    let split = null;
    let ctx = gsap.context(() => {
      const initAnimation = () => {
        if (useSplit) {
          try {
            // Two-layer split for masked line rise
            const childSplit = new SplitText(el, {
              type: "lines",
              linesClass: "w-split-child",
            });
            const parentSplit = new SplitText(el, {
              type: "lines",
              linesClass: "w-split-parent",
            });

            gsap.set(el.querySelectorAll(".w-split-parent"), {
              overflow: "hidden",
              display: "block",
            });
            gsap.set(el.querySelectorAll(".w-split-child"), {
              display: "block",
              yPercent: 115,
              opacity: 0,
            });

            gsap.to(childSplit.lines, {
              yPercent: 0,
              opacity: 1,
              duration,
              delay,
              stagger,
              ease: "expo.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
              },
            });

            split = { parentSplit, childSplit };
          } catch (e) {
            // Graceful fallback if SplitText meets non-text child
            fallbackFade();
          }
        } else {
          fallbackFade();
        }
      };

      const fallbackFade = () => {
        gsap.fromTo(
          el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: "expo.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      };

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(initAnimation);
      } else {
        initAnimation();
      }
    }, containerRef);

    return () => {
      ctx.revert();
      if (split) {
        split.childSplit?.revert();
        split.parentSplit?.revert();
      }
    };
  }, [delay, duration, stagger, y, useSplit]);

  return (
    <Component ref={containerRef} className={className} {...props}>
      {children}
    </Component>
  );
}

