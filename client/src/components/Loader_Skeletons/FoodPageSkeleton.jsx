import { motion } from "framer-motion";
import React from "react";

const FoodPageSkeleton = () => {
    
    return (
        <div className={" flex-col w-full flex justify-start items-start pb-[24px] md:items-center "}>
            <div className={" flex w-full flex-col justify-start gap-[22px]"}>
                <div className={" h-[400px] rounded-[12px] m-0 max-md:w-full overflow-hidden relative  "}>
                    <motion.div
                        className="relative h-full w-full inline-block bg-gradient-to-r overflow-hidden from-zinc-950 via-neutral-700 to-neutral-950 text-white px-3 py-1 rounded-[12px] text-xs font-semibold"
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
                                width: '320%',
                                height: '350%',
                                left: '-40%',
                                top: '-150%',
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
                <div className={" flex flex-col gap-[12px] max-md:mt-[18px] "}>
                    <h1 className={" flex w-[50%] animate-pulse duration-75 bg-neutral-800 rounded-[12px] h-[34px] justify-between gap-[12px] items-center"}>
                       
                    </h1>
                    <div className='bg-neutral-800 animate-pulse duration-75 h-[32px] w-[50px] px-[12px] rounded-[6px] py-[8px]'>
                    </div>
                    <div className='flex flex-wrap gap-[16px]'>
                        <div className='bg-neutral-800 animate-pulse duration-75 h-[32px] w-[50px] px-[12px] rounded-[6px] py-[8px]'>
                        </div>
                        <div className='bg-neutral-800 animate-pulse duration-75 h-[32px] w-[50px] px-[12px] rounded-[6px] py-[8px]'>
                        </div>
                        <div className='bg-neutral-800 animate-pulse duration-75 h-[32px] w-[50px] px-[12px] rounded-[6px] py-[8px]'>
                        </div>
                    </div>
                </div>
                <div className="text-white animate-pulse duration-75 w-full h-[100px] bg-neutral-800 rounded-[12px] ">
                </div>
                <div className='bg-neutral-800 animate-pulse duration-75 h-[40px] w-[100px] px-[12px] rounded-[6px] py-[8px]'>
                </div>
            </div>
        </div>
    );
};

export default FoodPageSkeleton;
