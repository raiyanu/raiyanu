"use client";
import { motion, useScroll, useTransform } from "framer-motion";

const words = [
  // Hero section background
  { text: "RAIYAN", left: "8%", top: "4%", xStart: -120, xEnd: 180, yStart: -50, yEnd: 150 },
  { text: "AHMED", left: "42%", top: "11%", xStart: 180, xEnd: -180, yStart: -80, yEnd: 120 },
  
  // About section background
  { text: "CREATIVE", left: "10%", top: "20%", xStart: -220, xEnd: 120, yStart: -120, yEnd: 120 },
  { text: "DEVELOPER", left: "35%", top: "28%", xStart: 120, xEnd: -220, yStart: -100, yEnd: 150 },
  
  // Experience section background
  { text: "ENGINEERING", left: "5%", top: "40%", xStart: -180, xEnd: 180, yStart: -150, yEnd: 100 },
  { text: "PRODUCTS", left: "45%", top: "48%", xStart: 180, xEnd: -120, yStart: -100, yEnd: 180 },
  
  // Selected Work section background
  { text: "SELECTED", left: "8%", top: "60%", xStart: -120, xEnd: 220, yStart: -120, yEnd: 120 },
  { text: "SHOWCASE", left: "38%", top: "69%", xStart: 220, xEnd: -180, yStart: -100, yEnd: 150 },
  
  // Skills section background
  { text: "TECHNICAL", left: "6%", top: "79%", xStart: -200, xEnd: 150, yStart: -150, yEnd: 150 },
  { text: "STACKS", left: "48%", top: "86%", xStart: 150, xEnd: -200, yStart: -80, yEnd: 180 },
  
  // Contact section background
  { text: "LET'S BUILD", left: "10%", top: "93%", xStart: -150, xEnd: 150, yStart: -100, yEnd: 100 },
];

function FloatingWord({ word, scrollYProgress }) {
  // Horizontal parallax drift
  const x = useTransform(scrollYProgress, [0, 1], [word.xStart, word.xEnd]);
  // Vertical parallax drift (slower/faster than scroll)
  const y = useTransform(scrollYProgress, [0, 1], [word.yStart, word.yEnd]);

  return (
    <motion.div
      style={{
        x,
        y,
        left: word.left,
        top: word.top,
        position: "absolute",
        willChange: "transform",
      }}
      className="font-display font-black text-outline text-[15vw] md:text-[12vw] lg:text-[10vw] leading-none select-none pointer-events-none whitespace-nowrap tracking-tighter opacity-[0.06] dark:opacity-[0.1]"
    >
      {word.text}
    </motion.div>
  );
}

export default function CinematicTypographyBackground() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {words.map((word, i) => (
        <FloatingWord
          key={`${word.text}-${i}`}
          word={word}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}
