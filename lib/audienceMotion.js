"use client";

import { useState } from "react";

export const AUDIENCE_ORDER = {
  retail: 0,
  cafe: 1,
};

export const TAB_EASE = [0.16, 1, 0.3, 1];

export const AUDIENCE_PILL_SPRING = {
  type: "spring",
  stiffness: 360,
  damping: 32,
  mass: 0.9,
};

export function getAudienceDirection(prevAudience, nextAudience) {
  const prevIdx = AUDIENCE_ORDER[prevAudience] ?? 0;
  const nextIdx = AUDIENCE_ORDER[nextAudience] ?? 0;
  return nextIdx >= prevIdx ? 1 : -1;
}

/**
 * Computes synchronous directional transition metadata (`1` left->right, `-1` right->left)
 * and whether the audience has changed at least once since initial mount.
 */
export function useAudienceTransition(audience) {
  const [state, setState] = useState({
    current: audience,
    direction: 1,
    switchCount: 0,
  });

  if (audience !== state.current) {
    setState({
      current: audience,
      direction: getAudienceDirection(state.current, audience),
      switchCount: state.switchCount + 1,
    });
  }

  return {
    direction: state.direction,
    hasSwitched: state.switchCount > 0,
  };
}

export const headerTextVariants = {
  initial: (dir) => ({
    opacity: 0,
    x: dir * 20,
    filter: "blur(4px)",
  }),
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.36,
      ease: TAB_EASE,
    },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir * -18,
    filter: "blur(3px)",
    transition: {
      duration: 0.16,
      ease: [0.4, 0, 1, 1],
    },
  }),
};

export const heroImageVariants = {
  initial: (dir) => ({
    opacity: 0,
    x: dir * 24,
    scale: 1.055,
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.42,
      ease: TAB_EASE,
    },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir * -20,
    scale: 0.985,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  }),
};

export const heroCopyVariants = {
  initial: (dir) => ({
    opacity: 0,
    x: dir * 18,
    filter: "blur(3px)",
  }),
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.36,
      delay: 0.045,
      ease: TAB_EASE,
    },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir * -14,
    filter: "blur(2px)",
    transition: {
      duration: 0.16,
      ease: [0.4, 0, 1, 1],
    },
  }),
};

export const lowerDeckVariants = {
  initial: (dir) => ({
    opacity: 0,
    x: dir * 20,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.34,
      ease: TAB_EASE,
    },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir * -16,
    transition: {
      duration: 0.14,
      ease: [0.4, 0, 1, 1],
    },
  }),
};
