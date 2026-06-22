"use client";
import { useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

/* ─── Layer Data ──────────────────────────────────────────────────────────── */

// Layer A: Filled text — very slow rightward drift with scroll
const LAYER_A = [
  { text: "RAIYAN",    left: "-3%",  top: "2%"  },
  { text: "CRAFT",     left: "52%",  top: "21%" },
  { text: "SYSTEMS",   left: "4%",   top: "43%" },
  { text: "PRODUCTS",  left: "43%",  top: "63%" },
  { text: "ENGINEER",  left: "-2%",  top: "83%" },
];

// Layer B: Outline text — medium speed leftward drift
const LAYER_B = [
  { text: "DEVELOPER",  left: "28%", top: "8%"  },
  { text: "DESIGN",     left: "3%",  top: "29%" },
  { text: "EXPERIENCE", left: "34%", top: "51%" },
  { text: "BUILDER",    left: "7%",  top: "71%" },
  { text: "LAUNCH",     left: "29%", top: "91%" },
];

// Layer C: Outline text — subtle vertical drift only
const LAYER_C = [
  { text: "FRONTEND", left: "18%", top: "14%" },
  { text: "CREATIVE", left: "56%", top: "36%" },
  { text: "EXECUTE",  left: "21%", top: "58%" },
  { text: "ITERATE",  left: "51%", top: "77%" },
];

/* ─── Individual Word Components ─────────────────────────────────────────── */

/** Layer A — solid fill, ultra-slow scroll parallax */
function WordA({ word, scrollYProgress, mx, my }) {
  const scrollX = useTransform(scrollYProgress, [0, 1], [-18, 55]);
  return (
    <motion.div
      style={{
        x: scrollX,
        left: word.left,
        top: word.top,
        position: "absolute",
        willChange: "transform",
      }}
      aria-hidden="true"
      className="select-none pointer-events-none"
    >
      <motion.span
        style={{ x: mx, y: my }}
        className="block font-display font-black leading-none whitespace-nowrap tracking-tighter text-[13vw] text-text-primary opacity-[0.038] dark:opacity-[0.045]"
      >
        {word.text}
      </motion.span>
    </motion.div>
  );
}

/** Layer B — outline text, medium-speed leftward drift */
function WordB({ word, scrollYProgress, mx, my }) {
  const scrollX = useTransform(scrollYProgress, [0, 1], [55, -75]);
  return (
    <motion.div
      style={{
        x: scrollX,
        left: word.left,
        top: word.top,
        position: "absolute",
        willChange: "transform",
      }}
      aria-hidden="true"
      className="select-none pointer-events-none"
    >
      <motion.span
        style={{
          x: mx,
          y: my,
          WebkitTextStroke: "1.5px var(--text-primary)",
          color: "transparent",
        }}
        className="block font-display font-black leading-none whitespace-nowrap tracking-tighter text-[11vw] opacity-[0.028] dark:opacity-[0.038]"
      >
        {word.text}
      </motion.span>
    </motion.div>
  );
}

/** Layer C — outline text, vertical drift only */
function WordC({ word, scrollYProgress, mx, my }) {
  const scrollY = useTransform(scrollYProgress, [0, 1], [-12, 22]);
  return (
    <motion.div
      style={{
        y: scrollY,
        left: word.left,
        top: word.top,
        position: "absolute",
        willChange: "transform",
      }}
      aria-hidden="true"
      className="select-none pointer-events-none"
    >
      <motion.span
        style={{
          x: mx,
          y: my,
          WebkitTextStroke: "1px var(--text-muted)",
          color: "transparent",
        }}
        className="block font-display font-black leading-none whitespace-nowrap tracking-tighter text-[9vw] opacity-[0.022] dark:opacity-[0.028]"
      >
        {word.text}
      </motion.span>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */

export default function CinematicTypographyBackground() {
  const { scrollYProgress } = useScroll();

  // Normalized mouse position (0 to 1)
  const rawMX = useMotionValue(0.5);
  const rawMY = useMotionValue(0.5);

  // Spring-smoothed mouse values (different damping per layer for depth illusion)
  const springMXA = useSpring(rawMX, { damping: 50, stiffness: 60 });
  const springMYA = useSpring(rawMY, { damping: 50, stiffness: 60 });
  const springMXB = useSpring(rawMX, { damping: 38, stiffness: 50 });
  const springMYB = useSpring(rawMY, { damping: 38, stiffness: 50 });
  const springMXC = useSpring(rawMX, { damping: 60, stiffness: 70 });
  const springMYC = useSpring(rawMY, { damping: 60, stiffness: 70 });

  // Layer A: ±5px horizontal, ±3px vertical mouse offset
  const mxA = useTransform(springMXA, [0, 1], [-5, 5]);
  const myA = useTransform(springMYA, [0, 1], [-3, 3]);

  // Layer B: ±8px horizontal, ±5px vertical (more reactive)
  const mxB = useTransform(springMXB, [0, 1], [-8, 8]);
  const myB = useTransform(springMYB, [0, 1], [-5, 5]);

  // Layer C: ±4px horizontal, ±2px vertical (least reactive)
  const mxC = useTransform(springMXC, [0, 1], [-4, 4]);
  const myC = useTransform(springMYC, [0, 1], [-2, 2]);

  useEffect(() => {
    const handleMouse = (e) => {
      rawMX.set(e.clientX / window.innerWidth);
      rawMY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [rawMX, rawMY]);

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {LAYER_A.map((word, i) => (
        <WordA
          key={`a-${i}`}
          word={word}
          scrollYProgress={scrollYProgress}
          mx={mxA}
          my={myA}
        />
      ))}
      {LAYER_B.map((word, i) => (
        <WordB
          key={`b-${i}`}
          word={word}
          scrollYProgress={scrollYProgress}
          mx={mxB}
          my={myB}
        />
      ))}
      {LAYER_C.map((word, i) => (
        <WordC
          key={`c-${i}`}
          word={word}
          scrollYProgress={scrollYProgress}
          mx={mxC}
          my={myC}
        />
      ))}
    </div>
  );
}
