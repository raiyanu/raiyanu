"use client";
import { useEffect, useRef, useState } from "react";
import useMousePosition from "./useMousePosition";
import { motion } from "framer-motion";

export default function Cursor({ children, hideBlob }) {
    const section = useRef(null);
    const [blobSize, setBlobSize] = useState(30);
    const { x, y } = useMousePosition({ section });
    const handleMaskEnter = () => {
        setBlobSize(50);
    };
    const handleMaskLeave = () => {
        setBlobSize(0);
    };

    return (
        <div
            ref={section}
            className=""
            onMouseEnter={handleMaskEnter}
            onMouseLeave={handleMaskLeave}
        >
            <motion.div
                ref={section}
                className={`fixed rounded-full pointer-events-none bg-secondary-content bg-opacity-30 border-primary-content z-[1] ${hideBlob ? "border-none" : "border-2"
                    }`}
                style={{ left: x - blobSize / 2, top: y - blobSize / 2 }}
                animate={{
                    height: hideBlob ? 0 : blobSize,
                    width: hideBlob ? 0 : blobSize,
                    transition: {
                        duration: 0.5,
                        times: [0, 0.5, 1],
                    },
                }}
            >
            </motion.div>

            {children}
        </div>
    );
}
