"use client";
import { LucideOctagon } from "lucide-react";
import styled from "styled-components";

const MyHeader = styled.header`
	display: flex;
    gap: 1rem;
	position: absolute;
    top: 0;
	left: 50%;
	right: 50%;
	transform: translateX(-50%);
	background-color: #fc8181;
	width: fit-content;
	align-items: center;
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
	}
	&::after {
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
`;
export default function Navbar() {
    return (
        <MyHeader>
            <LucideOctagon size={24} />
            <nav className="flex gap-3">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </nav>
        </MyHeader>
    );
}
