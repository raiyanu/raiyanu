"use client";
import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { BlobContext } from "../page";

// import Image from "next/image";
// import styled from "styled-components";
// import WordCloud from "../components/WordCloud";
// import useMousePosition from "../components/useMousePosition";

export default function Hero() {
    const { hideBlob, setHideBlob } = useContext(BlobContext);
    const [isFocused, setisFocused] = useState(false);
    return (
        <>
            <div className="h-fit w-full flex flex-col">
                <div className="min-h-screen flex items-center justify-center flex-col">
                    <div className="max-w-2xl w-full min-h-[80vh] flex flex-col justify-center pt-12">
                        <h1 className="text-4xl font-bold mb-4 text-gray-800 max-w-lg">
                            Hello, I{"'"}m a full stack developer
                        </h1>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                            My name{"'"}s{" "}
                            <motion.span
                                className="text-4xl cursor-pointer transition-colors text-secondary-content rounded-md"
                                animate={{
                                    backgroundColor: [isFocused ? "#000" : "transparent"],
                                }}
                                onMouseEnter={() => {
                                    setHideBlob(true);
                                    setisFocused(true);
                                }}
                                onMouseLeave={() => {
                                    setHideBlob(false);
                                    setisFocused(false);
                                }}

                            >
                                Raiyan Ahmed.
                            </motion.span>{" "}
                            <br />I build web applications using modern web technologies.
                        </h2>
                        <button
                            className="px-8 py-3 bg-primary-bg rounded-full font-medium hover:bg-secondary-bg transition duration-300 block my-4 w-fit"
                            onMouseEnter={() => {
                                console.log("enter");
                                setHideBlob(true);
                            }}
                            onMouseLeave={() => {
                                console.log("Leave");
                                setHideBlob(false);
                            }}
                        >
                            Let{"'"}s work together!
                        </button>
                    </div>
                    <div className="max-w-2xl w-full flex-1 px-4 text-left flex justify-start items-center min-h-[15vh]">
                        <p className="text-gray-700">
                            Find me at
                            <Link
                                href="https://www.linkedin.com/in/c-raiyan"
                                text="LinkedIn"
                            />
                            <Link
                                href="https://www.twitter.com/in/raiyan-ahmed-7a3b3b1b1/"
                                text="Twitter"
                            />
                            <br />
                            Download
                            <Link href="myresume.pdf" text="My Resume (PDF 59kb)" toDownload />
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export function Link({ href, text, toDownload }) {
    const { hideBlob, setHideBlob } = useContext(BlobContext);
    const [linkFocus, setLinkFocus] = useState(false);
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className={`underline transition-colors uppercase ml-2 ${linkFocus ? "text-secondary-content" : "text-gray-800"}`}
            onMouseEnter={() => {
                setHideBlob(true);
                setLinkFocus(true);
            }}
            onMouseLeave={() => {
                setHideBlob(false);
                setLinkFocus(false);
            }}
            download={toDownload ? true : undefined}
        >
            {text}
        </a>
    );
}
