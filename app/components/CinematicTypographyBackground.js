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

// Layer A: Filled text — very slow rightward drift
const LAYER_A = [
  { text: "RAIYAN",   left: "-3%",  top: "2%"  },
  { text: "CRAFT",    left: "52%",  top: "21%" },
  { text: "SYSTEMS",  left: "4%",   top: "43%" },
  { text: "PRODUCTS", left: "43%",  top: "63%" },
  { text: "ENGINEER", left: "-2%",  top: "83%" },
];

// Layer B: Outline text — medium leftward drift
const LAYER_B = [
  { text: "DEVELOPER",  left: "28%", top: "8%"  },
  { text: "DESIGN",     left: "3%",  top: "29%" },
  { text: "EXPERIENCE", left: "34%", top: "51%" },
  { text: "BUILDER",    left: "7%",  top: "71%" },
  { text: "LAUNCH",     left: "29%", top: "91%" },
];

// Layer C: Outline text — subtle vertical drift
const LAYER_C = [
  { text: "FRONTEND", left: "18%", top: "14%" },
  { text: "CREATIVE", left: "56%", top: "36%" },
  { text: "EXECUTE",  left: "21%", top: "58%" },
  { text: "ITERATE",  left: "51%", top: "77%" },
];

/* ─── Layer A — solid fill, ultra-slow rightward drift ───────────────────── */
function WordA({ word, scrollYProgress, mx, my }) {
  const scrollX = useTransform(scrollYProgress, [0, 1], [-18, 55]);
  return (
    <motion.div
      style={{ x: scrollX, left: word.left, top: word.top, position: "absolute", willChange: "transform" }}
      aria-hidden="true"
      className="select-none pointer-events-none"
    >
      <motion.span
        style={{ x: mx, y: my }}
        className="block font-display font-black leading-none whitespace-nowrap tracking-tighter text-[13vw]"
        // Light mode: near-black text at 5%, Dark mode: near-white at 7%
        style2={{ x: mx, y: my }}
      >
        <span
          className="text-text-primary opacity-[0.05] dark:!text-[#f0e9dc] dark:opacity-[0.07]"
          style={{ fontSize: "13vw", fontFamily: "inherit", fontWeight: 900, lineHeight: 1, whiteSpace: "nowrap", letterSpacing: "-0.03em" }}
        >
          {word.text}
        </span>
      </motion.span>
    </motion.div>
  );
}

/* ─── Layer B — outline, leftward drift ─────────────────────────────────── */
function WordB({ word, scrollYProgress, mx, my }) {
  const scrollX = useTransform(scrollYProgress, [0, 1], [55, -75]);
  return (
    <motion.div
      style={{ x: scrollX, left: word.left, top: word.top, position: "absolute", willChange: "transform" }}
      aria-hidden="true"
      className="select-none pointer-events-none"
    >
      <motion.div style={{ x: mx, y: my }}>
        {/* Light mode stroke */}
        <span
          className="block dark:hidden font-display font-black leading-none whitespace-nowrap tracking-tighter opacity-[0.045]"
          style={{ fontSize: "11vw", WebkitTextStroke: "1.5px #191714", color: "transparent", fontWeight: 900, letterSpacing: "-0.03em" }}
        >
          {word.text}
        </span>
        {/* Dark mode stroke — more visible */}
        <span
          className="hidden dark:block font-display font-black leading-none whitespace-nowrap tracking-tighter opacity-[0.09]"
          style={{ fontSize: "11vw", WebkitTextStroke: "1.5px #f0e9dc", color: "transparent", fontWeight: 900, letterSpacing: "-0.03em" }}
        >
          {word.text}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ─── Layer C — outline, vertical drift ─────────────────────────────────── */
function WordC({ word, scrollYProgress, mx, my }) {
  const scrollY = useTransform(scrollYProgress, [0, 1], [-12, 22]);
  return (
    <motion.div
      style={{ y: scrollY, left: word.left, top: word.top, position: "absolute", willChange: "transform" }}
      aria-hidden="true"
      className="select-none pointer-events-none"
    >
      <motion.div style={{ x: mx, y: my }}>
        <span
          className="block dark:hidden font-display font-black leading-none whitespace-nowrap tracking-tighter opacity-[0.032]"
          style={{ fontSize: "9vw", WebkitTextStroke: "1px #9e9587", color: "transparent", fontWeight: 900, letterSpacing: "-0.03em" }}
        >
          {word.text}
        </span>
        <span
          className="hidden dark:block font-display font-black leading-none whitespace-nowrap tracking-tighter opacity-[0.07]"
          style={{ fontSize: "9vw", WebkitTextStroke: "1px #a89f92", color: "transparent", fontWeight: 900, letterSpacing: "-0.03em" }}
        >
          {word.text}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function CinematicTypographyBackground() {
  const { scrollYProgress } = useScroll();

  const rawMX = useMotionValue(0.5);
  const rawMY = useMotionValue(0.5);

  const springMXA = useSpring(rawMX, { damping: 50, stiffness: 60 });
  const springMYA = useSpring(rawMY, { damping: 50, stiffness: 60 });
  const springMXB = useSpring(rawMX, { damping: 38, stiffness: 50 });
  const springMYB = useSpring(rawMY, { damping: 38, stiffness: 50 });
  const springMXC = useSpring(rawMX, { damping: 60, stiffness: 70 });
  const springMYC = useSpring(rawMY, { damping: 60, stiffness: 70 });

  const mxA = useTransform(springMXA, [0, 1], [-5, 5]);
  const myA = useTransform(springMYA, [0, 1], [-3, 3]);
  const mxB = useTransform(springMXB, [0, 1], [-8, 8]);
  const myB = useTransform(springMYB, [0, 1], [-5, 5]);
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
        <WordA key={`a-${i}`} word={word} scrollYProgress={scrollYProgress} mx={mxA} my={myA} />
      ))}
      {LAYER_B.map((word, i) => (
        <WordB key={`b-${i}`} word={word} scrollYProgress={scrollYProgress} mx={mxB} my={myB} />
      ))}
      {LAYER_C.map((word, i) => (
        <WordC key={`c-${i}`} word={word} scrollYProgress={scrollYProgress} mx={mxC} my={myC} />
      ))}
    </div>
  );
}
