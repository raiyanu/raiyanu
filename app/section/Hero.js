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
        <div className="py-2 md:pt-5 flex flex-col md:flex-row flex-wrap lg:flex-nowrap justify-center">
            <div className="mb-4 mx-2 min-w-[72.5%] lg:px-10">
                <p className="text-2xl bg-slate-100 w-fit  py-1 md:px-2 md:py-3">
                    $ echo HI, THERE
                </p>
                <p className="text-xl bg-slate-100 w-fit  pt-1 -mb-2 px-1 text-red-400">
                    It{"'"}s
                </p>
                <h1 className="text-6xl md:text-7xl font-extrabold">Raiyan Ahmed</h1>
                <div className="text-2xl md:text-3xl font-extralight tracking-wider z-10">
                    <span>Web Developer & Gamer</span>
                </div>
                <div className="flex justify-center items-center gap-3 my-4">
                    <a
                        href="#"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Hire Me
                    </a>
                    <a
                        href="#"
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                    >
                        View Portfolio
                    </a>
                </div>
                <div
                    className="border-4 relative h-[300px]"
                    onMouseEnter={handleMouseEntryOnBorder}
                    onMouseLeave={handleMouseExitOnBorder}
                >
                    <Mask
                        ref={maskRef}
                        animate={{
                            WebkitMaskPosition: `${x - maskSize / 2}px ${y - maskSize / 2}px`,
                            maskSize: `${maskSize}px`,
                        }}
                    >
                        <p onMouseEnter={handleMaskEnter} onMouseLeave={handleMaskLeave}>
                            There was a mask here but now it{"'"}s gone :{"("}
                            But you can still hover over me to see the magic! Thus I am a
                            mask, a mask of the past.
                        </p>
                    </Mask>
                    <MaskBody ref={paraRef}>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                            enim ad minim veniam, quis nostrud.
                        </p>
                    </MaskBody>
                </div>
            </div>
            <div className="my-4 mx-2 min-w-[22.5%] max-md:p-[1rem] overflow-y-scroll content-center">
                <div className="flex justify-between items-center max-md:px-[1rem]">
                    <p className="text-base italic text-gray-400 w-fit px-2 py-1  md:py-3">
                        Follow me
                    </p>
                    <span className="flex justify-center items-center gap-3">
                        <QubeText>WA</QubeText>
                        <QubeText>IG</QubeText>
                        <QubeText>X</QubeText>
                    </span>
                </div>
                <p className="my-16">
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis
                </p>
                <div className="flex flex-col items-start">
                    <MyDetails className="mb-4">
                        <summary className="text-xl font-bold">About Me</summary>
                        <p className="text-base text-gray-600 py-4">
                            I am a passionate web developer with a love for creating dynamic
                            and responsive web applications. My journey in web development
                            started with a curiosity for how websites are built and has grown
                            into a full-fledged career.
                        </p>
                    </MyDetails>
                    <MyDetails className="mb-4">
                        <summary className="text-xl font-bold">Skills</summary>
                        <ul className="list-disc list-inside text-base text-gray-600 py-4">
                            <li>JavaScript</li>
                            <li>React</li>
                            <li>Next.js</li>
                            <li>CSS</li>
                            <li>HTML</li>
                        </ul>
                    </MyDetails>
                    <MyDetails className="mb-4">
                        <summary className="text-xl font-bold">Contact</summary>
                        <p className="text-base text-gray-600 py-4">
                            Feel free to reach out to me via email at
                            <a
                                href="mailto:example@example.com"
                                className="text-blue-500 underline"
                            >
                                example@example.com
                            </a>
                            .
                        </p>
                    </MyDetails>
                </div>
            </div>
        </div>
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
	z-index: 1;
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
const MyDetails = styled.details`
	margin-bottom: 1rem;
	width: 100%;
	position: relative;
	summary {
		border-bottom: 2px solid #000;
		cursor: pointer;
	}
	summary::marker {
		content: "";
	}
	&[open] summary ~ * {
		animation: sweep 0.5s ease-in-out;
	}
	@keyframes sweep {
		0% {
			opacity: 0;
			margin-top: -10px;
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
