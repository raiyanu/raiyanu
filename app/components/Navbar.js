"use client";
import { Origami } from "lucide-react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import NavigationMenu from "./NavigationMenu";
import { delay, motion } from "framer-motion";

const links = [
	{ href: "/home", title: "Home" },
	{ href: "/about", title: "About" },
	{ href: "/contact", title: "Contact" },
	{ href: "/home", title: "Home" },
	{ href: "/about", title: "About" },
	{ href: "/contact", title: "Contact" },
];

const MyHeader = styled.header`
	display: flex;
	justify-content: space-between;
	gap: 1rem;
	position: fixed;
	top: 0;
	left: 50%;
	right: 50%;
	transform: translateX(-50%);
	background-color: var(--light-bg);
	width: fit-content;
	min-width: 30%;
	padding: 0.375rem 3rem;
	border-bottom-left-radius: 1rem;
	border-bottom-right-radius: 1rem;
	z-index: 3;
	border: 0 !important;

	&::before, 
	&::after{
		z-index: -1;
		content: "";
		top: 0;
		height: 50px;
		position: absolute;
		width: 25px;
		box-shadow: 0 -25px 0 0 var(--light-bg);
		background-color: transparent;
	}

	&::before {
		left: -25px;
		border-top-right-radius: 22px;
	}
	&::after {
		right: -25px;
		border-top-left-radius: 22px;
	}

	@media (max-width: 768px) {
		align-items: center;
		gap: 0.5rem;
		padding: 0.375rem 0.75rem;
		width: 90%;
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
		margin-bottom: 10px;
		top: unset;
		bottom: 0;
		position: fixed;
		justify-content: space-between;
		padding-inline: 2rem;
		&::before {
			display: none;
		}
		&::after {
			display: none;
		}
	}
`;
export default function Navbar() {
	return (
		<MyHeader>
			<Origami />
			<NavigationMenu text="Menu" />
		</MyHeader>
	);
}

const LinkVariants = {
	initial: {
		opacity: 0,
		rotateX: 90,
		translateY: 80,
		translateX: -20,
	},
	enter: (index) => ({
		opacity: 1,
		transition: {
			delay: 0.5 + index * 0.1,
			opacity: { duration: 0.35 },
		},
		rotateX: 0,
		translateY: 0,
		translateX: -0,
	}),
	exit: {
		opacity: 0,
		delay: 0.3,
	},
};

export function NavLinkList() {
	return (
		<>
			<motion.div
				style={{
					display: "block",
					width: "max-content",
					width: "100%",
				}}
			>

				{links.map((link, index) => {
					return (
						<motion.div
							key={index}
							variants={LinkVariants}
							custom={index}
							initial="initial"
							animate="enter"
							exit="exit"
							style={{
								perspective: "120px",
								perspectiveOrigin: "bottom",
								display: "block",
								width: "max-content",
								width: "100%",
							}}
						>
							<NavLink key={index} href={link.href} text={link.title} />
						</motion.div>
					);
				})}
			</motion.div>
		</>
	);
}

export function NavLink({ href, text }) {
	return (
		<NavLinkStyled href={href ? href : "#"}>{text ? text : "#"}</NavLinkStyled>
	);
}

const NavLinkStyled = styled.a`
	color: var(--primary-bg);
	padding: 0.35rem 1.25rem;
	&:hover {
		// background-color: var(--primary-content);
		color: var(--secondary-bg);
	}
	text-align: left;
	transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out,
		height 0.25s ease-in-out;
	text-transform: uppercase;
	font-weight: 600;
	position: relative;
	display: block;
	width: full;
	&::after {
		content: "";
		display: block;
		position: absolute;
		height: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		background: var(--primary-bg);
		transition: height 0.25s ease;
		z-index: -1;
		transition-delay: 0ms;
	}
	&:hover::after {
		height: 100%;
		transition-delay: 200ms;
		bottom: unset;
		top: 0;
	}
	&:hover &::not(:hover) {
		// background-color: var(--primary-bg);
	}
`;
