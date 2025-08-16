import React, { useEffect, useRef } from 'react'
import MotionImages from './MotionImages.js';
import { useNavigate } from 'react-router-dom';

const GlslImage1 = () => {
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        let motionImages;
        if (containerRef.current) {
            motionImages = new MotionImages({ dom: containerRef.current });
        }
        return () => {
            if (motionImages) {
                motionImages.renderer.dispose();
            }
            if (containerRef.current && motionImages?.renderer?.domElement) {
                containerRef.current.removeChild(motionImages.renderer.domElement);
            }
        };
    }, []);

    return (
        <div onClick={() => navigate('/home')} className='relative'>
            <div ref={containerRef} className='relative flex justify-center items-center col-span-1 h-[20rem]'>
            </div>
            <div className='images opacity-0 absolute w-[45rem] h-[35rem] max-sm:h-[30rem] max-sm:w-[40rem] '>
                <img className='absolute opacity-0 h-full w-full object-cover' src="https://images.unsplash.com/photo-1754942668740-8a815525cf2b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                {/* <img className='absolute opacity-0 h-full w-full object-cover' src="/foods/food-5.jpg" alt="" /> */}
                {/* <img className='absolute opacity-0 h-full w-full object-cover' src="/foods/food-7.jpg" alt="" />
                <img className='absolute opacity-0 h-full w-full object-cover' src="/foods/food-8.jpg" alt="" />
                <img className='absolute opacity-0 h-full w-full object-cover' src="/foods/food-9.jpg" alt="" /> */}
            </div>
        </div>
    )
}

export default GlslImage1