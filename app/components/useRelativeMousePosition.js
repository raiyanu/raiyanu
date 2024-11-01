import { useState, useEffect } from "react";

export default function useMousePosition({ section }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const [maskHovered, setMaskHovered] = useState(false);

    useEffect(() => {
        const setMousePos = (pos) => setPosition({ x: pos.x, y: pos.y });
        if (!section) return;

        const sectionElement = section.current;
        if (!sectionElement) return;


        const handleBlobMove = (e) => {
            const sectionPosition = sectionElement.getBoundingClientRect();
            const relativeX = e.clientX - sectionPosition.left;
            const relativeY = e.clientY - sectionPosition.top;
            let position = {
                x: relativeX,
                y: relativeY,
            };
            setMousePos(position);
            console.log("mask", position);
        };
        const handleBlobScroll = (e) => {
            const sectionPosition = sectionElement.getBoundingClientRect();
            const relativeX = e.clientX - sectionPosition.left;
            const relativeY = e.clientY - sectionPosition.top;
            let position = {
                x: relativeX,
                y: relativeY,
            };
            setMousePos(position);
            console.log("mask", position);
        };

        window.addEventListener("mousemove", handleBlobMove);
        window.addEventListener("scroll", handleBlobScroll);

        return () => {
            window.removeEventListener("mousemove", handleBlobMove);
        };
    }, [section, maskHovered]);

    return position;
}
