"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

const springConfig = { damping: 28, stiffness: 380, mass: 0.35 };
const ringSpringConfig = { damping: 24, stiffness: 220, mass: 0.65 };
const trailSpringConfig = { damping: 20, stiffness: 120, mass: 1.3 }; // Trailing delay

export default function Cursor({ children }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [label, setLabel] = useState("");
  const [hoveredProject, setHoveredProject] = useState(null); // { title, category }
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const dotX = useSpring(cursorX, springConfig);
  const dotY = useSpring(cursorY, springConfig);
  const ringX = useSpring(cursorX, ringSpringConfig);
  const ringY = useSpring(cursorY, ringSpringConfig);
  const trailX = useSpring(cursorX, trailSpringConfig);
  const trailY = useSpring(cursorY, trailSpringConfig);

  useEffect(() => {
    // Detect touch device
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);

    const handleElementHover = (e) => {
      const target = e.target.closest("[data-cursor-project]");
      const interactiveTarget = e.target.closest("a, button, [data-cursor], input, textarea, select");

      if (target) {
        setHovered(true);
        setHoveredProject({
          title: target.getAttribute("data-cursor-project"),
          category: target.getAttribute("data-cursor-category") || "",
        });
      } else if (interactiveTarget) {
        setHovered(true);
        setHoveredProject(null);
        setLabel(interactiveTarget.getAttribute("data-cursor") || "");
      } else {
        setHovered(false);
        setHoveredProject(null);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleElementHover);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleElementHover);
    };
  }, [cursorX, cursorY, isTouchDevice]);

  if (isTouchDevice) return <>{children}</>;

  return (
    <>
      {/* 3. Trailing Ring Layer (Faintest, slowest lag) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] opacity-[0.14] dark:opacity-[0.08]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: hovered ? (hoveredProject ? 180 : 80) : 52,
            height: hovered ? (hoveredProject ? 96 : 80) : 52,
            opacity: hidden || clicked ? 0 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-full border border-text-secondary dark:border-text-muted"
          style={{ borderRadius: hoveredProject ? "24px" : "9999px" }}
        />
      </motion.div>

      {/* 2. Main Spring Ring Layer (Interactive & Custom Contexts) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: hovered ? (hoveredProject ? 150 : 64) : 32,
            height: hovered ? (hoveredProject ? 72 : 64) : 32,
            opacity: hidden ? 0 : 1,
            backgroundColor: hoveredProject
              ? "rgba(181, 150, 109, 0.12)"
              : "rgba(0,0,0,0)",
            borderColor: hovered ? "var(--accent)" : "var(--text-muted)",
            borderWidth: hoveredProject ? "1.5px" : "1px",
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-full border flex flex-col items-center justify-center p-2 text-center overflow-hidden"
          style={{ borderRadius: hoveredProject ? "18px" : "9999px" }}
        >
          <AnimatePresence mode="wait">
            {hoveredProject ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-0.5 justify-center items-center w-full h-full"
              >
                <span className="text-[9.5px] font-display font-bold tracking-wider text-text-primary uppercase truncate max-w-[130px]">
                  {hoveredProject.title}
                </span>
                <span className="text-[7.5px] font-mono text-accent uppercase tracking-widest truncate max-w-[130px]">
                  {hoveredProject.category}
                </span>
              </motion.div>
            ) : (
              label && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-[8.5px] font-mono uppercase tracking-widest text-accent whitespace-nowrap"
                >
                  {label}
                </motion.span>
              )
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* 1. Core Dot Layer (Fastest, fades out during project hover) */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            width: clicked ? 4 : hoveredProject ? 0 : hovered ? 4 : 6,
            height: clicked ? 4 : hoveredProject ? 0 : hovered ? 4 : 6,
            opacity: hidden || hoveredProject ? 0 : 1,
            backgroundColor: hovered ? "var(--accent)" : "var(--text-primary)",
          }}
          transition={{ duration: 0.2 }}
          className="rounded-full"
        />
      </motion.div>

      {children}
    </>
  );
}
