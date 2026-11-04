"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "../../lib/gsap";
import { useSmoothScroll } from "./SmoothScroll";

export default function Preloader() {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const tagRef = useRef(null);
  const [show, setShow] = useState(false);
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // First visit per session only
    const visited = sessionStorage.getItem("wusooly_intro_seen");
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (visited || isReduced) {
      // Notify hero to start immediately
      window.dispatchEvent(new CustomEvent("wusooly_preloader_complete"));
      return;
    }

    setShow(true);
    stop?.();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("wusooly_intro_seen", "true");
          start?.();
          setShow(false);
          window.dispatchEvent(new CustomEvent("wusooly_preloader_complete"));
        },
      });

      // 1. Logo & wordmark entrance
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: 18, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1.0, duration: 0.6, ease: "expo.out" }
      );

      // 2. Micro tagline
      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 8 },
        { opacity: 0.8, y: 0, duration: 0.4, ease: "power2.out" },
        "-=0.25"
      );

      // 3. Pause
      tl.to({}, { duration: 0.25 });

      // 4. Upward mask wipe exit
      tl.to(containerRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.8,
        ease: "power3.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [stop, start]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100000,
        backgroundColor: "#06180d",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        clipPath: "inset(0 0 0% 0)",
        willChange: "clip-path",
      }}
    >
      <div ref={logoRef} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Image
          src="/assets/wusooly-brand-logo.png"
          alt="Wusooly POS"
          width={154}
          height={34}
          priority
          style={{ width: "auto", height: "32px", objectFit: "contain" }}
        />
      </div>
      <p
        ref={tagRef}
        style={{
          fontFamily: 'var(--font-sans, "Manrope", sans-serif)',
          fontSize: "0.80rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "rgba(255, 255, 255, 0.6)",
          margin: 0,
          fontWeight: 500,
        }}
      >
        Simpler Point of Sale
      </p>
    </div>
  );
}

