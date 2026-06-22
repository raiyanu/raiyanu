"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadPreview({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerating counter
        const increment = prev < 70 ? 3 : prev < 90 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (counter >= 100) {
      const timer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 800);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [counter, onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={isExiting ? { y: "-100%" } : { y: 0 }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="fixed inset-0 z-50 bg-bg-primary flex items-center justify-center"
      style={{
        borderBottomLeftRadius: isExiting ? "50% 15%" : "0%",
        borderBottomRightRadius: isExiting ? "50% 15%" : "0%",
      }}
    >
      <div className="relative flex flex-col items-center">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-4xl sm:text-5xl text-text-primary mb-8 tracking-tight"
        >
          R<span className="text-accent">.</span>
        </motion.h1>

        {/* Progress bar */}
        <div className="w-48 h-[2px] bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${counter}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>

        {/* Counter */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-4 text-label font-mono text-text-muted tracking-widest"
        >
          {counter}%
        </motion.span>
      </div>
    </motion.div>
  );
}
