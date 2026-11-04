"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  gsap.defaults({
    ease: "expo.out",
    duration: 1.15,
  });
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
export default gsap;

