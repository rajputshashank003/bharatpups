import { motion, useAnimate } from 'framer-motion';
import React, { useEffect } from 'react'

const TopBanner = () => {
    const [scope, animate] = useAnimate();

    const handleMotion1 = async () => {
        console.log("motion1");
        await animate(
            '.top_banner',
            {
                y: [-50, 8, -3, 0],
                filter: 'blur(0px)'
            },
            {
                duration: 0.5,
                ease: 'linear'
            }
        );
        await animate(
            '.dot_1',
            {
                scale: [1.4, 1.2],
                opacity: 1,
                filter: 'blur(0px)'
            },
            {
                duration: 0.5,
                ease: 'backInOut'
            }
        );
        await animate(
            '.dot_2',
            {
                scale: [1.3, 1],
                opacity: 1,
                filter: 'blur(0px)'
            },
            {
                duration: 0.2,
                ease: 'backInOut'
            }
        );
        await animate(
            '.dot_3',
            {
                scale: [1.2, 1],
                opacity: 1,
                filter: 'blur(0px)'
            },
            {
                duration: 0.2,
                ease: 'backInOut'
            }
        );
        await animate(
            '.learn_more_arrow_1',
            {
                x: 0,
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)'
            },
            {
                duration: 0.8,
                ease: 'backInOut'
            }
        );
    }

    useEffect(() => {
        handleMotion1();
    }, []);

    return (
        <div ref={scope} className='flex flex-col items-center w-full'>
            {/* Top Banner */}
            <motion.div
                initial={{
                    y: -100,
                    filter: 'blur(8px)'
                }}
                className="flex top_banner items-center justify-center space-x-2 mb-4 p-2 rounded-full bg-[#1e1e1e] border border-gray-700 text-sm shadow-[0_0px_1px_rgba(0,255,255,0.1),0_0px_5px_rgba(0,0,255,0.2)] ">
                <span className="bg-gradient-to-tr from-cyan-300 via-blue-400 to-blue-800 text-white px-3 py-1 rounded-full text-xs font-semibold">new</span>
                <span className="text-gray-300">German Shepherd</span>
                <span onClick={() => navigate(`/explore/breed/?breed=${'German Shepherd'}`)} className="text-blue-400 cursor-pointer hover:underline flex items-center">
                    learn more
                    <motion.svg
                        initial={{
                            x: -50,
                            opacity: 0,
                            scale: 0,
                            filter: 'blur(5px)'
                        }}
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 learn_more_arrow_1">
                        <path d="m9 18 6-6-6-6" />
                    </motion.svg>
                </span>
            </motion.div>

            {/* Pagination Dots */}
            <div className="flex space-x-2 mb-8">
                <motion.div
                    initial={{
                        scale: 0,
                        opacity: 0,
                        filter: 'blur(5px)'
                    }}
                    className="w-2 dot_1 h-2 bg-gradient-to-tr from-cyan-200 via-cyan-600 to-blue-800 rounded-full" />
                <motion.div
                    initial={{
                        scale: 0,
                        opacity: 0,
                        filter: 'blur(5px)'
                    }}
                    className="w-2 dot_2 h-2 bg-gray-600 rounded-full" />
                <motion.div
                    initial={{
                        scale: 0,
                        opacity: 0,
                        filter: 'blur(5px)'
                    }}
                    className="w-2 dot_3 h-2 bg-gray-600 rounded-full" />
            </div>
        </div>
    )
}

export default TopBanner