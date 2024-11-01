"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import styled from "styled-components";
import WordCloud from "../components/WordCloud";
import useMousePosition from "../components/useMousePosition";
import { motion } from "framer-motion";

export default function Hero() {
    const maskRef = useRef(null);
    const paraRef = useRef(null);
    const [maskSize, setMaskSize] = useState(30);
    const { x, y } = useMousePosition({ maskRef, paraRef });
    const handleMaskEnter = () => {
        setMaskSize(300);
    };
    const handleMaskLeave = () => {
        setMaskSize(30);
    };
    const handleMouseEntryOnBorder = () => {
        maskRef.current.style.background = "rgba(58, 9, 190, 1)";
    };
    const handleMouseExitOnBorder = () => {
        maskRef.current.style.background = "rgba(58, 9, 190, 0)";
    };

    return (
        <>
            <div className="h-fit w-full flex flex-col">
                <div className="min-h-screen flex items-center justify-center flex-col">
                    <div className="max-w-2xl w-full min-h-[80vh] flex flex-col justify-center pt-12">
                        <h1 className="text-4xl font-bold mb-4 text-gray-800 max-w-lg ">
                            Hello,
                            I{"'"}m a full stack developer
                        </h1>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                            My name{"'"}s <span className="text-4xl ">Raiyan Ahmed.</span> <br />I build web applications using modern web
                            technologies.
                        </h2>
                        <button className="px-8 py-3 bg-primary-bg rounded-full font-medium hover:bg-secondary-bg transition duration-300 block my-4 w-fit">
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

const center = `
            display: flex;
            justify-content: center;
            align-items: center;
            `;
const Mask = styled(motion.div)`
	position: absolute;
	mask-image: url("/mask.svg");
	mask-repeat: no-repeat;
	color: #fff;
	overflow: hidden;
	position: relative;
	height: 100%;
	width: 100%;
	mask-position: 50%;
	color: black;
	cursor: pointer;
	transition: all 50ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
	background: rgba(58, 9, 190, 0);
	${center}
	z-index: 2;
`;
const MaskBody = styled(motion.div)`
	position: absolute;
	top: 0;
	left: 0;
	${center}
	height: 100%;
	width: 100%;
	color: rgba(255, 0, 0, 0.7);
`;

const SlideIn = styled(motion.details)`
	z-index: 1;
	transition: all 1s ease-in-out;
	position: relative;
	overflow: hidden;
	padding-block: 0.75rem;
	&::after {
		content: " ";
		position: absolute;
		top: 0;
		left: 0;
		color: #fff;
		background-color: #000;
		width: 100%;
		height: 100%;
		z-index: -1;
		transition: all 0.5s ease-in-out;
		transform: translateX(-100%);
	}
	&:hover::after {
		transform: translateX(0%);
	}
`;

const MyDetails = styled(SlideIn)`
            margin-bottom: 1rem;
            width: 100%;
            position: relative;
            &:hover {
                color: #fff;
	}
            summary {
                border - bottom: 2px solid #000;
            cursor: pointer;
	}
            summary::marker {
                content: "";
	}
            &[open] summary ~ * {
                animation: sweep 0.5s ease-in-out;
	}
            @keyframes sweep {
                0 % {
                    opacity: 0;
                    margin- top: -10px;
		}
            100% {
                opacity: 1;
            margin-top: 0px;
		}
	}
	& > summary::after {
                content: "›";
            position: absolute;
            right: 20px;
            top: 2px;
	}
	&[open] > summary::after {
                content: "⌄";
            position: absolute;
            right: 20px;
            top: 2px;
	}

            &::after {
                content: " ";
            position: absolute;
            top: 0;
            left: 0;
            color: #fff;
            background-color: #000;
            width: 100%;
            height: 100%;
            z-index: -1;
	}
            `;

const QubeText = styled.a`
	text-align: center;
	align-content: center;
	font-size: 1rem;
	font-weight: 700;
	color: #000;
	width: 40px;
	height: 40px;
	padding: 0.5rem;
	border: 1px solid #000;
	transition: 0.3s;
	cursor: pointer;
	&:hover {
		transform: translateY(-2px);
	}
`;

const ImageEffect = styled.div`
	border-radius: 5px;
	height: 100%;
	width: 100%;
	overflow: clip;
`;

{
    /* <div className="h-fit border-4 flex">
                    <div className="h-[600px] w-2/5 block overflow-hidden min-w-[50%] bg-fuchsia-300">
                        <WordCloud className="w-full" />
                    </div>
                    <div className="h-[600px] w-3/5 block overflow-hidden min-w-[50%] -mt-5  bg-fuchsia-300">
                        <ImageEffect className="">
                            <img
                                src="/person.jpg"
                                alt="my pic"
                                height={500}
                                width={300}
                                className="object-cover h-full min-w-full"
                            />
                        </ImageEffect>
                    </div>
                </div> */
}
