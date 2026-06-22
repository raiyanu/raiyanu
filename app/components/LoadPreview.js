"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Name characters ────────────────────────────────────────────────────── */
const NAME = "RAIYAN".split("");
const SUBTITLE_CHARS = "FRONTEND ENGINEER".split("");

/* ─── Rotating words ─────────────────────────────────────────────────────── */
const ROTATING_WORDS = ["CRAFT", "SYSTEMS", "PRODUCTS", "DESIGN", "MOTION", "INTERFACES"];

/* ─── SVG decorative grid ────────────────────────────────────────────────── */
const GRID_LINES = [
  { x1: "15%",  y1: "0",    x2: "15%",  y2: "100%", delay: 0.2 },
  { x1: "50%",  y1: "0",    x2: "50%",  y2: "100%", delay: 0 },
  { x1: "85%",  y1: "0",    x2: "85%",  y2: "100%", delay: 0.2 },
  { x1: "0",    y1: "30%",  x2: "100%", y2: "30%",  delay: 0.4 },
  { x1: "0",    y1: "70%",  x2: "100%", y2: "70%",  delay: 0.4 },
];

export default function LoadPreview({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState("loading"); // "loading" | "content-out" | "panels-out"
  const [wordIndex, setWordIndex] = useState(0);
  const wordIntervalRef = useRef(null);

  /* ─── Counter — slow, takes ~5.5 seconds to reach 100 ─────────────────── */
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Slow: 0-40% fast, 40-80% medium, 80-100% very slow
        const inc = prev < 40 ? 1.8 : prev < 80 ? 1.0 : 0.5;
        return Math.min(prev + inc, 100);
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  /* ─── Rotating word cycle ──────────────────────────────────────────────── */
  useEffect(() => {
    wordIntervalRef.current = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 900);
    return () => clearInterval(wordIntervalRef.current);
  }, []);

  /* ─── Exit sequence ─────────────────────────────────────────────────────  */
  useEffect(() => {
    if (counter >= 100) {
      clearInterval(wordIntervalRef.current);
      const t1 = setTimeout(() => setPhase("content-out"), 500);
      const t2 = setTimeout(() => setPhase("panels-out"), 950);
      const t3 = setTimeout(() => onComplete?.(), 1900);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [counter, onComplete]);

  const isLoading = phase === "loading";
  const panelsOut = phase === "panels-out";

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden" style={{ backgroundColor: "#080706" }}>

      {/* ── Structural SVG grid overlay ─────────────────────────────── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        fill="none"
        aria-hidden="true"
      >
        {GRID_LINES.map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1} y1={line.y1}
            x2={line.x2} y2={line.y2}
            stroke="rgba(240,233,220,0.04)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: line.delay, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        {/* Corner intersections */}
        {[["15%","30%"],["85%","30%"],["15%","70%"],["85%","70%"]].map(([cx, cy], i) => (
          <motion.circle
            key={`c-${i}`}
            cx={cx} cy={cy} r="2.5"
            fill="rgba(181,150,109,0.5)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 + i * 0.12, duration: 0.4 }}
          />
        ))}
      </svg>

      {/* ── Ambient accent glow ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(181,150,109,0.05) 0%, transparent 70%)" }}
      />

      {/* ── Left panel ──────────────────────────────────────────────── */}
      <motion.div
        className="absolute top-0 left-0 bottom-0 right-1/2"
        style={{ backgroundColor: "#080706" }}
        animate={panelsOut ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 1.0, ease: [0.87, 0, 0.13, 1] }}
      />

      {/* ── Right panel ─────────────────────────────────────────────── */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 left-1/2"
        style={{ backgroundColor: "#080706" }}
        animate={panelsOut ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 1.0, ease: [0.87, 0, 0.13, 1] }}
      />

      {/* ── Main content ────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center"
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 0.4, ease: "easeIn" }}
      >
        {/* Rotating word */}
        <div className="h-8 overflow-hidden mb-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={wordIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[11px] uppercase tracking-[0.35em] text-center"
              style={{ color: "rgba(181,150,109,0.7)" }}
            >
              {ROTATING_WORDS[wordIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Name – 3D stagger entrance */}
        <div
          className="flex items-end overflow-hidden mb-5"
          style={{ perspective: "1000px" }}
        >
          {NAME.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 100, opacity: 0, rotateX: 65, filter: "blur(16px)" }}
              animate={{ y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.15 + i * 0.08,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block font-display font-black leading-none tracking-tighter"
              style={{
                fontSize: "clamp(4.5rem, 14vw, 10rem)",
                color: "#f0e9dc",
                transformOrigin: "bottom center",
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Subtitle – char stagger */}
        <div className="flex items-center overflow-hidden mb-12">
          {SUBTITLE_CHARS.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: char === " " ? 0 : 0.45, y: 0 }}
              transition={{ delay: 0.7 + i * 0.03, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[10px] uppercase tracking-[0.28em]"
              style={{ color: "#6b6357" }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: "clamp(140px, 20vw, 200px)" }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] rounded-full overflow-hidden relative mb-3"
          style={{ backgroundColor: "rgba(240,233,220,0.08)" }}
        >
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full origin-left"
            style={{ backgroundColor: "#b5966d" }}
            animate={{ scaleX: counter / 100 }}
            transition={{ duration: 0.15, ease: "linear" }}
          />
        </motion.div>

        {/* Counter */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.38 }}
          transition={{ delay: 0.7 }}
          className="font-mono text-[10px] tracking-[0.4em] tabular-nums"
          style={{ color: "#6b6357" }}
        >
          {String(Math.floor(counter)).padStart(3, "0")} / 100
        </motion.span>
      </motion.div>

      {/* ── Corner decorations ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute bottom-6 left-6 font-mono text-[8px] uppercase tracking-widest select-none"
        style={{ color: "rgba(107,99,87,0.5)" }}
      >
        © {new Date().getFullYear()} Raiyan Ahmed
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-6 right-6 font-mono text-[8px] uppercase tracking-widest select-none"
        style={{ color: "rgba(107,99,87,0.5)" }}
      >
        Portfolio v2
      </motion.div>

      {/* ── Top-right: version tag ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute top-6 right-6 font-mono text-[8px] uppercase tracking-widest select-none"
        style={{ color: "rgba(107,99,87,0.5)" }}
      >
        Loading...
      </motion.div>
    </div>
  );
}
