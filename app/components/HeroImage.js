import { motion } from "framer-motion";
import Image from "next/image";
import { useContext } from "react";
import { BlobContext } from "../page";
export default function HeroImage({ util }) {
    const { setHideBlob } = useContext(BlobContext);
    return (
        <div className="  w-1/3 h-screen sticky  top-0  border-white flex-1 max-lg:left-1/2 max-lg:right-1/2 max-lg:w-full overflow-hidden">
            <motion.div
                style={{ scale: util.scale, filter: util.filter }}
                className="w-full max-w-[100vw] h-full "
                onMouseEnter={() => {
                    setHideBlob(true);
                }}
                onMouseLeave={() => {
                    setHideBlob(false);
                }}
            >
                <Image
                    src="/person.jpg"
                    width={300}
                    height={500}
                    className="w-full overflow-hidden h-full object-cover bg-fixed"
                    alt="my pic"
                />
            </motion.div>
        </div>
    );
}
