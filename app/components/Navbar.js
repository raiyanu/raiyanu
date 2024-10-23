"use client";
import { LucideOctagon } from "lucide-react";
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
	background-color: #fc8181;
	width: fit-content;
	min-width: 30%;
	padding: 0.375rem 3rem;
	border-bottom-left-radius: 1rem;
	border-bottom-right-radius: 1rem;
	z-index: 3;
	&::before {
		content: "";
		position: absolute;
		background-color: transparent;
		top: 0;
		left: -25px;
		height: 50px;
		width: 25px;
		border-top-right-radius: 22px;
		box-shadow: 0 -25px 0 0 rgba(255, 0, 0, 0.5);
		z-index: -1;
	}
	&::after {
		z-index: -1;
		content: "";
		position: absolute;
		background-color: transparent;
		top: 0;
		right: -25px;
		height: 50px;
		width: 25px;
		border-top-left-radius: 22px;
		box-shadow: 0 -25px 0 0 rgba(255, 0, 0, 0.5);
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
			<LucideOctagon size={24} />
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
			{links.map((link, index) => {
				return (
					<motion.div
						key={index}
						variants={LinkVariants}
						custom={index}
						initial="initial"
						animate="enter"
						exit="exit"
						style={{ perspective: "120px", perspectiveOrigin: "bottom" }}
					>
						<NavLink key={index} href={link.href} text={link.title} />
					</motion.div>
				);
			})}
		</>
	);
}

export function NavLink({ href, text }) {
	return (
		<NavLinkStyled href={href ? href : "#"}>{text ? text : "#"}</NavLinkStyled>
	);
}

const NavLinkStyled = styled.a`
	color: #000;
	padding: 0.075rem 1.25rem;
	border-radius: 0.25rem;
	&:hover {
		background-color: #000;
		color: #fff;
	}
	text-transform: uppercase;
	font-weight: 600;
`;
