"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const directionMap = {
  up: { y: 40, x: 0 },
  down: { y: -40, x: 0 },
  left: { x: 60, y: 0 },
  right: { x: -60, y: 0 },
  none: { x: 0, y: 0 },
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className = "",
  once = true,
  threshold = 0.15,
  scale = 1,
  rotate = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const { x, y } = directionMap[direction] || directionMap.up;

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        x,
        y,
        scale: scale !== 1 ? 0.95 : 1,
        rotate,
      }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }
          : { opacity: 0, x, y, scale: scale !== 1 ? 0.95 : 1, rotate }
      }
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
