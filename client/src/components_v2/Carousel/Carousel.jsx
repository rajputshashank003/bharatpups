import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Carousel() {
    const images_length = 3;

    const [current, setCurrent] = useState(0);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const resetTimeout = () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };

        const startCarousel = () => {
            resetTimeout();
            timeoutRef.current = setTimeout(() => {
                setCurrent((prev) => (prev + 1) % images_length);
            }, 4000);
        };

        startCarousel();

        return () => {
            resetTimeout();
        };
    }, [current, images_length]);

    const handleDotClick = (idx) => {
        clearTimeout(timeoutRef.current);
        setCurrent(idx);
    };

    return (
        <div className=" h-[30vh] lg:h-[40vh] rounded-[12px] w-full relative overflow-hidden flex items-center justify-center">
            <motion.div
                className="flex h-full w-full"
                animate={{ x: `-${current * 100}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                {Array(images_length).fill(null).map((_, idx) => (
                    <div
                        key={idx}
                        className="relative h-full w-full shrink-0 flex items-center justify-center"
                    >
                        <img
                            src={`/BannerCarousel/img${idx + 1}.png`}
                            alt={`carousel-background-${idx}`}
                            className="absolute inset-0 h-full w-full scale-[1.1] left-[5%] object-cover rounded-[12px] "
                        />
                        <img
                            src={`/BannerCarousel/img${idx + 1}.png`}
                            alt={`carousel-slide-${idx}`}
                            className="relative h-full w-full object-contain backdrop-blur-[4px] rounded-[12px] z-[1]"
                        />
                    </div>
                ))}
            </motion.div>

            <div className="absolute z-[2] bottom-4 flex space-x-2">
                {Array(images_length).fill(null).map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-[8px] h-[8px] rounded-full transition-colors duration-300 cursor-pointer ${idx === current ? "bg-white" : "bg-gray-500"
                            }`}
                        onClick={() => handleDotClick(idx)}
                    />
                ))}
            </div>
        </div>
    );
}
