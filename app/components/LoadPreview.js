"use client";
import { useEffect, useState } from "react";
import { delay, easeInOut, motion } from "framer-motion";

export default function LoadPreview({ isLoading }) {
    const loadWait = 3;
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
        return () => {
            window.scrollTo(0, 0);
        };
    }, []);
    let borderRadius = `${dimensions.width / 2}px ${dimensions.width / 3}px`;
    const variants = {
        initial: {
            y: 0,
            borderRadius: "0%",
        },
        exit: {
            y: "-100vh",
            borderBottomRightRadius: borderRadius,
            borderBottomLeftRadius: borderRadius,
            transition: {
                duration: 1.5,
                delay: loadWait, // delay the exit animation by Ns
                ease: easeInOut,
            },
        },
    };
    const DotsVariants = {
        initial: {
            opacity: 1,
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 1.5,
                delay: loadWait - .75,
                ease: easeInOut,
            },
        },
    };

    const dotVariants = {
        bounce: (delay) => ({
            y: ["-20px", "0px", "-20px"],
            fill: ["#fff", "transparent", "#fff"],
            transition: {
                duration: 1,
                delay: delay * 0.2,
                ease: easeInOut,
                repeat: Infinity,
            }
        })
    }
    return (
        <motion.div
            variants={variants}
            animate={isLoading ? "initial" : "exit"}
            initial="initial"
            exit="exit"
            className=" flex items-center justify-center fixed h-screen w-screen top-0 left-0 bg-black z-50 text-white font-sans font-bold text-2xl"
        >
            <motion.svg
                variants={DotsVariants}
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                className="lucide lucide-ellipsis flex items-cenet justify-center gap-12"
            >
                <motion.circle animate={"bounce"} variants={dotVariants} custom={2} cx="30" cy="50" r="4" />
                <motion.circle animate={"bounce"} variants={dotVariants} custom={1.5} cx="60" cy="50" r="4" />
                <motion.circle animate={"bounce"} variants={dotVariants} custom={1} cx="90" cy="50" r="4" />
            </motion.svg>
        </motion.div>
    );
}
