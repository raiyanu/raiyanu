import { AnimatePresence, motion } from "framer-motion";
import { Rotate3D } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";
import { NavLinkList } from "./Navbar";

export default function NavigationMenu({ text }) {
	const [isOpen, setIsOpen] = useState(false);
	const variants = {
		open: {
			display: "flex",
			height: 480,
			width: 330,
		},
		closed: {
			display: "none",
			height: 150,
			width: 150,
		},
		hidden: {
			display: "hidden",
		},
		shown: {
			display: "block",
		},
	};
	return (
		<>
			<StyledButton onClick={() => setIsOpen(!isOpen)}>
				<motion.div
					className={`fixed right-0 bottom-0  bg-secondary-content rounded-md h-[480px] w-[330px] max-w-[70vw] lg:bottom-[unset] p-4 pb-10 lg:pb-0 lg:pt-10 lg:top-0 lg:right-10`}
					variants={variants}
					initial="closed"
					animate={isOpen ? "open" : "closed"}
					transition={
						isOpen
							? {
								type: "spring",
								damping: 12,
								stiffness: 100,
								duration: 0.5,
							}
							: {
								duration: 0.5,
							}
					}
				>
					<motion.div
						className={`${isOpen ? "block" : "hidden"} w-full h-full`}
					>
						<div className="flex items-start justify-center flex-col text-2xl">
							<AnimatePresence>{isOpen && <NavLinkList />}</AnimatePresence>
						</div>
					</motion.div>
				</motion.div>
				<div className="relative h-full w-full overflow-hidden rounded-3xl">
					<SlidingTwoElement
						animate={{
							top: isOpen ? "-100%" : 0,
						}}
						transition={{
							type: "spring",
							damping: 10,
							stiffness: 100,
							duration: 0.5,
						}}
						className="*:rounded-xl secondary-bg"
					>
						<motion.div
							animate={{
								rotateX: isOpen ? 90 : 0,
							}}
							className=""
						>
							{text}
						</motion.div>
						<motion.div
							animate={{
								rotateX: isOpen ? 0 : 180,
							}}
							className="bg-primary-bg text-secondary-content "
						>
							Close
						</motion.div>
					</SlidingTwoElement>
				</div>
			</StyledButton>
		</>
	);
}

const SlidingTwoElement = styled(motion.div)`
	cursor: pointer;
	transition: background-color 0.3s;
	position: relative;
	height: 30px;
	& > * {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 0.85rem;
		text-transform: uppercase;
		preserve-3d: true;
	}
	& > :nth-child(2) {
		position: absolute;
		top: 100%;
		left: 0;
	}
`;

const StyledButton = styled.button`
	color: var(bg-secondary-content);
	border: none;
	border-radius: 25px;
	cursor: pointer;
	position: relative;
	height: 30px;
	width: 100px;
	z-index: 3;
`;
