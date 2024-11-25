"use client";
import { useRef, useState, useContext } from "react";
import useMousePosition from "./useMousePosition";
import { motion } from "framer-motion";
import { BlobContext } from "../page";

export default function Cursor({ children }) {
    const section = useRef(null);
    const [blobSize, setBlobSize] = useState(50);
    const { x, y } = useMousePosition({ section });
    const { hideBlob, setHideBlob } = useContext(BlobContext);
    const secondBlob = true;

    return (
        <div
            ref={section}
            className="overflow-visible"
            onMouseEnter={() => {
                setBlobSize(50);
            }}
            onMouseLeave={() => {
                setBlobSize(0);
            }}
        >
            <motion.div
                ref={section}
                className={`fixed rounded-full pointer-events-none ${!secondBlob ? "bg-secondary-bg" : ""
                    } z-[1] overflow-visible ${!hideBlob && secondBlob ? "border-2" : "border-none"
                    }`}
                //  border-2
                animate={{
                    height: hideBlob ? 0 : blobSize,
                    width: hideBlob ? 0 : blobSize,
                    transition: {
                        duration: 0.24,
                        times: [0, 0.5, 1],
                        top: { duration: 0.15 },
                        left: { duration: 0.15 },
                    },
                    left: x - blobSize / 2,
                    top: y - blobSize / 2,
                }}
            >
                {secondBlob && (
                    <motion.div
                        ref={section}
                        className={`fixed rounded-full pointer-events-none
                              border-secondary-bg  z-[1] overflow-visible ${secondBlob && !hideBlob
                                ? "border-2"
                                : "border-none"
                            } `}
                        // background color: bg-secondary-content

                        animate={{
                            height: hideBlob ? 0 : blobSize / 4,
                            width: hideBlob ? 0 : blobSize / 4,
                            transition: {
                                duration: 0.24,
                                times: [0, 0.5, 1],
                                top: { duration: 0.25 },
                                left: { duration: 0.25 },
                            },
                            left: x - blobSize / 6,
                            top: y - blobSize / 6,
                        }}
                    ></motion.div>
                )}
            </motion.div>
            {children}
        </div>
    );
}
