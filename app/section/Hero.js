"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import styled from "styled-components";
import WordCloud from "../components/WordCloud";
import useMousePosition from "../components/useMousePosition";
import { motion } from "framer-motion";

export default function Hero({ blob }) {
    return (
        <>
            <div className="h-fit w-full flex flex-col">
                <div className="min-h-screen flex items-center justify-center flex-col">
                    <div className="max-w-2xl w-full min-h-[80vh] flex flex-col justify-center pt-12">
                        <h1 className="text-4xl font-bold mb-4 text-gray-800 max-w-lg"

                        >
                            Hello,
                            I{"'"}m a full stack developer
                        </h1>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                            My name{"'"}s <motion.span className="text-4xl cursor-pointer text-secondary-content rounded-md" animate={{
                                backgroundColor: [!blob.hideBlob ? "transparent" : "#000"],
                            }}
                                onMouseEnter={() => {
                                    blob.setHideBlob(true)
                                }}
                                onMouseLeave={() => {
                                    blob.setHideBlob(false)
                                }}
                            >Raiyan Ahmed.</motion.span> <br />I build web applications using modern web
                            technologies.
                        </h2>
                        <button className="px-8 py-3 bg-primary-bg rounded-full font-medium hover:bg-secondary-bg transition duration-300 block my-4 w-fit"
                            onMouseEnter={() => {
                                console.log("enter");
                                blob.setHideBlob(true)
                            }}
                            onMouseLeave={() => {
                                console.log("Leave");
                                blob.setHideBlob(false)
                            }}
                        >
                            Let{"'"}s work together!
                        </button>

                    </div>
                    <div className="max-w-2xl w-full flex-1 px-4 text-left flex justify-start items-center min-h-[15vh]">
                        <p className="text-gray-700">
                            Find me at{" "}
                            <a
                                href="https://www.linkedin.com/in/c-raiyan"
                                target="_blank"
                                rel="noreferrer"
                                className="underline uppercase"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="https://www.linkedin.com/in/raiyan-ahmed-7a3b3b1b1/"
                                target="_blank"
                                rel="noreferrer"
                                className="underline uppercase"
                            >
                                Twitter
                            </a>
                            <br />
                            Download{" "}
                            <a
                                href="myresume.pdf"
                                download
                                className="underline uppercase"
                            >
                                my resume
                            </a>{" "}
                            {"(PDF 59kb)"}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
