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
            setMousePos({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleBlobMove);

        return () => {
            window.removeEventListener("mousemove", handleBlobMove);

        };
    }, [section, maskHovered]);

    return position;
}
