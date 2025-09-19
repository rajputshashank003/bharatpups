import { motion, useAnimate } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const TopBanner = () => {
    const [scope, animate] = useAnimate();
    const navigate = useNavigate();
    const [selected_name, set_selected_name] = useState('German Shepherd');

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
                scale: [1.4, 1],
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
        animate(
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

    const handle_banner_motion = async () => {
        await animate(
            '.german_shepherd',
            {
                y: -40,
                opacity: 0,
                filter: 'blur(5px)'
            },
            {
                duration: 1.5,
                ease: 'backOut',
                delay: 1.5,
            }
        );
        await animate(
            '.german_shepherd',
            {
                y: 40,
                opacity: 0,
            },
            {
                duration: 0.1,
            }
        );
        set_selected_name(prev => (prev === 'German Shepherd' ? 'Bull dog' : 'German Shepherd'));
        await animate(
            '.german_shepherd',
            {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)'
            },
            {
                duration: 1.5,
                ease: 'backOut',
            }
        );
    };

    useEffect(() => {
        handleMotion1();
        const timeout = setTimeout(() => {
            handle_banner_motion();
        }, 3000);

        const interval = setInterval(() => {
            handle_banner_motion();
        }, 8000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <div ref={scope} className='flex flex-col items-center w-full'>
            {/* Top Banner */}
            <motion.div
                initial={{
                    y: -100,
                    filter: 'blur(8px)'
                }}
                layout
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex top_banner overflow-hidden items-center justify-center space-x-2 mb-4 p-2 rounded-full bg-[#1e1e1e] border border-gray-700 text-sm shadow-[0_0px_1px_rgba(0,255,255,0.1),0_0px_5px_rgba(0,0,255,0.2)] "
            >
                {/* new icon */}
                <motion.div
                    className="relative inline-block bg-gradient-to-r overflow-hidden from-cyan-300 via-blue-500 to-blue-800 text-white px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                        fontFamily: 'cdg',
                        backgroundSize: '300% 300%'
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
                    <span className="relative z-10">new</span>

                    {/* Animated shine line */}
                    <motion.div
                        className="absolute inset-0 w-full h-full"
                        style={{
                            background: 'linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)',
                            backgroundSize: '200% 180%',
                            rotate: '-35deg',
                            width: '120%',
                            height: '180%',
                            left: '0%',
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

                <motion.div style={{ fontFamily: 'cdg' }} className="text-gray-300 german_shepherd">
                    {selected_name}
                </motion.div>
                <span style={{ fontFamily: 'cdg' }} onClick={() => navigate(`/explore/breed/?breed=${selected_name}`)} className="text-blue-400 cursor-pointer hover:underline flex items-center">
                    learn more
                    <motion.svg
                        initial={{
                            x: -50,
                            opacity: 0,
                            scale: 0,
                            filter: 'blur(5px)'
                        }}
                        xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
                        className="ml-1 learn_more_arrow_1"
                    >
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
                    className={`w-2 dot_1 h-2  rounded-full ${selected_name === 'Bull dog' ? 'bg-gray-600' : 'bg-gradient-to-tr from-cyan-200 via-cyan-600 to-blue-800'}`}/>
                <motion.div
                    initial={{
                        scale: 0,
                        opacity: 0,
                        filter: 'blur(5px)'
                    }}
                    className={`w-2 dot_2 h-2 bg-gray-600 rounded-full ${selected_name !== 'Bull dog' ? 'bg-gray-600' : 'bg-gradient-to-tr from-cyan-200 via-cyan-600 to-blue-800'}`} />
            </div>
        </div>
    )
}

export default TopBanner