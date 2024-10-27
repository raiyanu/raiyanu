import { useState, useEffect } from "react";

export default function useMousePosition({ maskRef, paraRef }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const maskDefaultSize = 30;

    const [paraHovered, setParaHovered] = useState(false);
    const [maskHovered, setMaskHovered] = useState(false);

    useEffect(() => {
        const setMousePos = (pos) => setPosition({ x: pos.x, y: pos.y });
        const maskElement = maskRef.current;
        const paraElement = paraRef.current;

        if (!maskElement || !paraElement) return;

        const handleMaskMove = (e) => {
            const maskPos = maskElement.getBoundingClientRect();
            const relativeX = e.clientX - maskPos.left;
            const relativeY = e.clientY - maskPos.top;
            let pos = {
                x: relativeX,
                y: relativeY,
            };
            setMousePos(pos);
        };

        maskElement.addEventListener("mousemove", handleMaskMove);

        return () => {
            maskElement.removeEventListener("mousemove", handleMaskMove);
        };
    }, [maskRef, paraRef, maskHovered, paraHovered]);

    return position;
}
