"use client";
import { createContext, useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./section/Hero";
import LenisScroll from "./components/LenisScroll";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import About from "./section/About";
import Cursor from "./components/Cursor";
import LoadPreview from "./components/LoadPreview";
import HeroImage from "./components/HeroImage";
import Project from "./section/Project";

export default function Home() {
  const [isLoading, setIsloading] = useState(true);
  const [hideBlob, setHideBlob] = useState(false);
  const spanref = useRef(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  useEffect(() => {
    console.log("width", width);
    const LoadingCompleteHandler = () => {
      setIsloading(false);
    };
    setTimeout(LoadingCompleteHandler, 7000);
    return () => {
      window.scrollTo(0, 0);
    };
  }, [scrollYProgress]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ["brightness(100%)", "brightness(50%)"]
  );
  const width = useTransform(scrollYProgress, [0, 1], ["40%", "100%"]);
  return (
    <>
      {isLoading && (
        <AnimatePresence mode="wait" isLoading={isLoading}>
          <LoadPreview />
        </AnimatePresence>
      )}
      <BlobContextProvider>

        <Cursor hideBlob={hideBlob}>
          <LenisScroll>
            <div className=" bg-slate-100 min-h-screen">
              <Navbar />
              <div className="flex *:flex-1 h-fit flex-col">
                <main
                  className="bg-slate-400 flex flex-col lg:flex-row relative"
                  ref={containerRef}
                >
                  <HeroImage util={{ scale, filter }} />
                  <motion.div
                    style={{ width }}
                    className=" mx-auto max-lg:!w-full  sticky text-white flex-shrink-0 basis-auto grow snap-y"
                  >
                    <Hero
                      className="snap-start h-screen"
                      blob={{ hideBlob, setHideBlob }}
                    />
                    <About className="snap-start h-screen" />
                  </motion.div>
                </main>
                <Project />
              </div>
              {/* <Hero /> */}
            </div>
          </LenisScroll>
        </Cursor>
      </BlobContextProvider>

    </>
  );
}
export const BlobContext = createContext();

export function BlobContextProvider({ children }) {
  const [hideBlob, setHideBlob] = useState(false);
  return (
    <BlobContext.Provider value={{ hideBlob, setHideBlob }}>
      {children}
    </BlobContext.Provider>
  );
}