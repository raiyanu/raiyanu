"use client";
import { useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./section/Hero";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Home() {
  const spanref = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  useEffect(() => {
    console.log("scrollYProgress", scrollYProgress);
    spanref.current.innerHTML = scrollYProgress.y;
  }, [scrollYProgress])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  return (
    <>
      <div className=" max-md:pb-8 md:pt-4 bg-slate-100 min-h-screen">
        <Navbar />
        <div className="flex *:flex-1 h-fit">
          <main className="bg-slate-400 flex p-3 flex-row relative" ref={containerRef} >
            <motion.div style={{ scale }} className="container mx-auto bg-slate-950 w-1/3 h-screen sticky text-white top-0 border-4 border-white ">
              {"-" + scrollYProgress.x + " : " + scrollYProgress.y + "-"}
              <span className="text-red-500" ref={spanref}></span>
            </motion.div>
            <div className="container mx-auto bg-red-950 *:border-2 *:border-green-700 w-4/6 sticky text-white " >
              <Hero className="h-screen" />
              <Hero className="h-screen" />
            </div>

          </main>
        </div>
        {/* <Hero /> */}
      </div>

    </>
  );
}
