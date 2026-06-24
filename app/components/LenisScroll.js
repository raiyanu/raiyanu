"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export default function LenisScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return children;
}