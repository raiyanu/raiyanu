"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ParallaxText({
  text,
  speed = 0.3,
  direction = "left",
  className = "",
  offset,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset || ["start end", "end start"],
  });

  const xRange = direction === "left" ? [200, -200] : [-200, 200];
  const x = useTransform(scrollYProgress, [0, 1], xRange.map((v) => v * speed));
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div
      ref={ref}
      className={`overflow-hidden pointer-events-none select-none ${className}`}
    >
      <motion.div
        style={{ x, opacity }}
        className="parallax-text font-display whitespace-nowrap"
      >
        {text}
      </motion.div>
    </div>
  );
}

/* Horizontal scrolling marquee — continuous loop */
export function MarqueeText({
  text,
  repeat = 4,
  speed = 30,
  className = "",
  separator = " — ",
}) {
  const content = Array(repeat)
    .fill(null)
    .map((_, i) => (
      <span key={i} className="inline-flex items-center gap-4">
        <span>{text}</span>
        <span className="text-accent opacity-40 text-[0.5em]">✦</span>
      </span>
    ));

  return (
    <div
      className={`overflow-hidden pointer-events-none select-none ${className}`}
    >
      <div
        className="parallax-text font-display flex whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          width: "fit-content",
        }}
      >
        <div className="flex shrink-0 gap-8 pr-8">{content}</div>
        <div className="flex shrink-0 gap-8 pr-8">{content}</div>
      </div>
    </div>
  );
}
