import { ReactLenis } from "@studio-freight/react-lenis";

export default function LenisScroll({ children }) {
    return (
        <ReactLenis options={{ duration: 2 }} root>
            {children}
        </ReactLenis>
    );
}
