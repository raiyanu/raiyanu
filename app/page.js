"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import LenisScroll from "./components/LenisScroll";
import LoadPreview from "./components/LoadPreview";
import Footer from "./components/Footer";
import Cursor from "./components/Cursor";
import CinematicTypographyBackground from "./components/CinematicTypographyBackground";
import Hero from "./section/Hero";
import About from "./section/About";
import Experience from "./section/Experience";
import Project from "./section/Project";
import Skills from "./section/Skills";
import Contact from "./section/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadPreview onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!isLoading && (
        <Cursor>
          <LenisScroll>
            <div className="noise relative min-h-screen overflow-hidden">
              {/* Cinematic 3D Camera Flythrough Typography Background */}
              <CinematicTypographyBackground />
              
              {/* Foreground Content */}
              <div className="relative z-10">
                <Navbar />
                <main>
                  <Hero />
                  <About />
                  <Experience />
                  <Project />
                  <Skills />
                  <Contact />
                </main>
                <Footer />
              </div>
            </div>
          </LenisScroll>
        </Cursor>
      )}
    </>
  );
}