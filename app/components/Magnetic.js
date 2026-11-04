"use client";

import { motion } from "motion/react";

export default function Magnetic({
  children,
  strength = 0.35,
  maxDisplacement = 12,
  className = "",
  style = {},
  ...props
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.025, y: -1.5 }}
      whileTap={{ scale: 0.98, y: 0 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
      style={{
        display: "inline-block",
        willChange: "transform",
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
