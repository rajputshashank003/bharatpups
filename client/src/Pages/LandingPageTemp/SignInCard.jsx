import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignInCard() {
    const navigate = useNavigate();
    
    return (
        <div className="rounded-[28px] overflow-hidden relative grid grid-cols-1 lg:grid-cols-2 border-[1px] border-neutral-700/60 h-[74vh] w-full ">
            <div className="col-span-1 max-h-full w-full relative max-lg:p-[28px] min-h-0 lg:p-[28px]">
                <div style={{
                    fontFamily: 'cdg, serif',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                    }}
                    className="lg:hidden relative z-[99] font-bold text-[36px]">
                    Sign in
                </div>
                <div style={{
                    fontFamily: 'cdg, serif',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.8)'
                }}
                    className="lg:hidden relative z-[99] text-neutral-300 text-[18px]">
                    Sign in to your account to access all features.
                </div>
                <img
                    src="/dane.png"
                    className="w-full h-full absolute m-0 top-0 z-[0] left-0 lg:hidden object-cover"
                />
                <div style={{ fontFamily: 'cdg, serif' }} className="max-lg:hidden text-[28px]">
                    Welcome
                </div>
                <div style={{ fontFamily: 'cdg, serif' }} className="max-lg:hidden mt-[12px] text-neutral-500 text-[16px]">
                    Sign in to your account to access all feature.
                </div>
                <div onClick={() => navigate('/login') } className="flex justify-center items-center cursor-pointer absolute bottom-[24px] lg:bottom-[12px] max-lg:w-[80%] max-lg:left-[10%] lg:w-[70%] lg:translate-x-[7%] py-3 px-4 bg-[#A89AFF] text-black rounded-full font-semibold">
                    Sign in
                </div>
            </div>
            <div className="max-lg:hidden col-span-1 min-h-0">
                <img src="https://cardog.app/images/dane.png"
                    className='h-full w-full object-cover'
                    alt="" />
            </div>
        </div>
    );
}
