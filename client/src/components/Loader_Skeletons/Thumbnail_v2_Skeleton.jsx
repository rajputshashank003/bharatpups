import { motion } from 'framer-motion';
import React from 'react';

const Thumbnail_v2_Skeleton = () => {
    return (
        <div className="w-full max-w-full bg-neutral-800 rounded-lg shadow-md overflow-hidden">

            {/* Image Placeholder */}
            <div className="relative">
                <div className="w-full h-48 bg-neutral-600 animate-pulse">
                    <motion.div
                        className="relative h-full w-full inline-block bg-gradient-to-r overflow-hidden from-zinc-950 via-neutral-700 to-neutral-950 text-white px-3 py-1 text-xs font-semibold"
                        style={{
                            backgroundSize: '300% 300%',
                        }}
                        animate={{
                            backgroundPosition: ["20% 50%", "100% 50%", "20% 50%"]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        {/* Animated shine line */}
                        <motion.div
                            className="absolute inset-0 w-full h-full"
                            style={{
                                background: 'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
                                backgroundSize: '200% 180%',
                                rotate: '-35deg',
                                width: '240%',
                                height: '250%',
                                left: '-50%',
                                top: '-60%',
                            }}
                            animate={{
                                backgroundPosition: ["-100% 0%", "100% 0%"]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </motion.div>
                </div>
                {/* Heart Icon Placeholder */}
                <div className="absolute top-2 right-[10px] w-10 h-10 bg-neutral-400 rounded-md animate-pulse"></div>
            </div>

            {/* Content Section */}
            <div className="p-4">
                {/* Top row with Title and Rating */}
                <div className="flex justify-between items-center mb-4">
                    {/* Product Name Placeholder */}
                    <div className="w-3/5 h-6 bg-neutral-400 rounded animate-pulse"></div>
                    {/* Rating Placeholder */}
                    <div className="w-1/5 h-6 bg-neutral-400 rounded animate-pulse"></div>
                </div>

                {/* Bottom row with Price and Add to Cart Button */}
                <div className="flex justify-between items-center">
                    {/* Price Placeholder */}
                    <div className="w-1/4 h-8 bg-neutral-400 rounded animate-pulse"></div>
                    {/* Button Placeholder */}
                    <div className="w-1/3 h-10 bg-neutral-400 rounded-lg animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};
export default Thumbnail_v2_Skeleton;

