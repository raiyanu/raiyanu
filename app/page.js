"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./section/Hero";
import LenisScroll from "./components/LenisScroll";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import About from "./section/About";
import Cursor from "./components/Cursor";
import LoadPreview from "./components/LoadPreview";

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
      <Cursor hideBlob={hideBlob}>
        <LenisScroll>
          <div className=" bg-slate-100 min-h-screen">
            <Navbar />
            <div className="flex *:flex-1 h-fit flex-col">
              <main
                className="bg-slate-400 flex flex-col lg:flex-row relative"
                ref={containerRef}
              >
                <div className="  w-1/3 h-screen sticky  top-0  border-white flex-1 max-lg:left-1/2 max-lg:right-1/2 max-lg:w-full overflow-hidden">
                  <motion.div
                    style={{ scale, filter }}
                    className="w-full max-w-[100vw] h-full "
                    onMouseEnter={() => {
                      setHideBlob(true);
                    }}
                    onMouseLeave={() => {
                      setHideBlob(false);
                    }}
                  >
                    <Image
                      src="/person.jpg"
                      width={300}
                      height={500}
                      className="w-full overflow-hidden h-full object-cover bg-fixed"
                      alt="my pic"
                    />
                  </motion.div>
                </div>
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
            </div>
            {/* <Hero /> */}
          </div>
        </LenisScroll>
      </Cursor>
    </>
  );
}
