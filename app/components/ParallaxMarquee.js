"use client";
import { useState } from "react";

/**
 * ParallaxMarquee — infinite looping marquee strip.
 * Pauses on hover. Uses CSS custom property for speed.
 *
 * @param {string[]} items     - Items to display
 * @param {number}   speed     - Seconds per full loop (default 32)
 * @param {boolean}  reverse   - Run in reverse direction
 * @param {string}   className - Additional container classes
 */
export default function ParallaxMarquee({
  items = [],
  speed = 32,
  reverse = false,
  className = "",
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-hidden="true"
    >
      <div
        className={reverse ? "animate-marquee-reverse" : "animate-marquee"}
        style={{
          display: "flex",
          width: "max-content",
          "--marquee-duration": `${speed}s`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {/* Double items for seamless infinite loop */}
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-0 whitespace-nowrap font-mono text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-text-muted"
          >
            <span className="px-6 py-1">{item}</span>
            <span className="text-accent/40 text-xs select-none">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
