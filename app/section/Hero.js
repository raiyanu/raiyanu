"use client";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

export default function Hero() {
    return (
        <div className="py-2 md:pt-5 flex flex-col md:flex-row flex-wrap lg:flex-nowrap justify-center">
            <div className="my-4 mx-2 min-w-[72.5%] lg:px-10">
                <p className="text-2xl bg-slate-100 w-fit  py-1 md:px-2 md:py-3">
                    $ echo HI, THERE
                </p>
                <h1 className="text-6xl md:text-7xl font-extrabold">Raiyan Ahmed</h1>
                <div className="text-2xl md:text-3xl font-extralight tracking-wider">
                    <span>Web Developer & Gamer</span>
                </div>
                <div className="h-[500px] w-[300px] block ml-auto mr-4 mt-2 overflow-hidden min-w-[50%] bg-fuchsia-300 lg:mr-28">
                    <ImageEffect className="">
                        <Image
                            src="/person.jpg"
                            alt="my pic"
                            height={400}
                            width={300}
                            className="object-cover h-full min-w-full"
                        />
                    </ImageEffect>
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
	summary::after {
		content: ">";
		position: absolute;
		right: 20px;
		top: 2px;
	}
	summary[open] summary::after {
		content: "v";
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
	transition: transform 0.3s;
	border-radius: 5px;
	height: 100%;
	width: 100%;
	overflow: clip;
	img {
		z-index: -1;
	}
	&:hover {
		// transform: scale(1);
	}
`;
