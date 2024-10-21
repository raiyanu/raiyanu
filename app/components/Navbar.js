"use client";
import { LucideOctagon } from "lucide-react";
import styled from "styled-components";
import { useEffect, useState } from "react";

const MyHeader = styled.header`
	display: flex;
	justify-content: center;
	gap: 1rem;
	position: fixed;
	top: 0;
	left: 50%;
	right: 50%;
	transform: translateX(-50%);
	background-color: #fc8181;
	width: fit-content;
	padding: 0.375rem 1.25rem;
	border-bottom-left-radius: 1rem;
	border-bottom-right-radius: 1rem;
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
		gap: 0.5rem;
		padding: 0.375rem 0.75rem;
		width: 90%;
		border-top-left-radius: 1rem;
		border-top-right-radius: 1rem;
		margin-bottom: 10px;
		top: unset;
		bottom: 0;
		position: fixed;
		justify-content: space-around;
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
			<nav className="flex gap-0.5 md:gap-3 ">
				<NavLink href={"/home"} text="Home" />
				<NavLink href={"/about"} text="About" />
				<NavLink href={"/contact"} text="Contact" />
			</nav>
		</MyHeader>
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
`;
