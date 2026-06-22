"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAME_CHARS = "RAIYAN".split("");

export default function LoadPreview({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState("loading"); // "loading" | "content-out" | "panels-out"

  /* ─── Counter logic ───────────────────────────────────────────────────── */
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const inc = prev < 60 ? 4 : prev < 85 ? 2 : 1;
        return Math.min(prev + inc, 100);
      });
    }, 28);
    return () => clearInterval(interval);
  }, []);

  /* ─── Exit sequence ───────────────────────────────────────────────────── */
  useEffect(() => {
    if (counter >= 100) {
      // Step 1: Fade content out
      const t1 = setTimeout(() => setPhase("content-out"), 380);
      // Step 2: Panels slide away
      const t2 = setTimeout(() => setPhase("panels-out"), 720);
      // Step 3: Signal complete
      const t3 = setTimeout(() => onComplete?.(), 1500);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [counter, onComplete]);

  const contentVisible = phase === "loading";
  const panelsOut = phase === "panels-out";

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* ── Left panel ─────────────────────────────────────────────────── */}
      <motion.div
        className="absolute top-0 left-0 bottom-0 right-1/2"
        style={{ backgroundColor: "#080706" }}
        animate={panelsOut ? { x: "-100%" } : { x: 0 }}
        transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1], delay: 0 }}
      />

      {/* ── Right panel ────────────────────────────────────────────────── */}
      <motion.div
        className="absolute top-0 right-0 bottom-0 left-1/2"
        style={{ backgroundColor: "#080706" }}
        animate={panelsOut ? { x: "100%" } : { x: 0 }}
        transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1], delay: 0 }}
      />

      {/* ── Center content ─────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center"
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeIn" }}
      >
        {/* Name — character stagger */}
        <div
          className="flex items-end overflow-hidden mb-10"
          style={{ perspective: "1000px" }}
        >
          {NAME_CHARS.map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 90, opacity: 0, rotateX: 60 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{
                delay: 0.12 + i * 0.07,
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block font-display font-black leading-none tracking-tighter"
              style={{
                fontSize: "clamp(4rem, 12vw, 9rem)",
                color: "#f0e9dc",
                transformOrigin: "bottom center",
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Role line */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-mono text-[10px] uppercase tracking-[0.3em] mb-10"
          style={{ color: "#6b6357" }}
        >
          Frontend Engineer
        </motion.p>

        {/* Progress bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.3 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-40 h-[1px] rounded-full overflow-hidden"
          style={{ backgroundColor: "#2a2620" }}
        >
          <motion.div
            className="h-full origin-left rounded-full"
            style={{ backgroundColor: "#b5966d" }}
            animate={{ scaleX: counter / 100 }}
            transition={{ duration: 0.12, ease: "linear" }}
          />
        </motion.div>

        {/* Counter */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ delay: 0.65 }}
          className="mt-3 font-mono text-[10px] tracking-[0.3em]"
          style={{ color: "#6b6357" }}
        >
          {String(counter).padStart(3, "0")}
        </motion.span>
      </motion.div>

      {/* ── Vertical split accent line at 50% ──────────────────────────── */}
      <motion.div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{
          left: "calc(50% - 0.5px)",
          width: "1px",
          backgroundColor: "#2a2620",
        }}
        animate={panelsOut ? { scaleY: 0, opacity: 0 } : { scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
