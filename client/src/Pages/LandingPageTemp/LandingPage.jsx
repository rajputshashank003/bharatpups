import React, { useEffect, useState } from 'react';
import SideBar from '../../components_v3/SideBar';
import { BREEDS_EXPIRY_DAYS, BREEDS_KEY, MAX_BREEDS_USES, call_us, open_whatsapp } from '../../helpers/utils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import DogLogo from './DogLogo';
import TopBanner from './TopBanner';

const PaperclipIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.59a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
);

const ArrowUpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
    </svg>
);

const LandingPage = () => {
    const [loading, set_loading] = useState(true);
    const [breeds, set_breeds] = useState([]);
    const [search_term, set_search_term] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                set_loading(true);
                const response = await axios.get("/api/dog/breeds");
                const data = response?.data?.slice(0, 5) || [];
                localStorage.setItem(
                    BREEDS_KEY,
                    JSON.stringify({
                        data,
                        timestamp: Date.now(),
                        usedCount: 1,
                    })
                );
                set_breeds(data);
            } catch (error) {
                console.error("Failed to fetch dog data:", error);
            } finally {
                set_loading(false);
            }
        };

        const cached = localStorage.getItem(BREEDS_KEY);

        if (cached) {
            const { data, timestamp, usedCount = 0 } = JSON.parse(cached);
            const now = Date.now();
            const expired = now - timestamp > BREEDS_EXPIRY_DAYS * 24 * 60 * 60 * 1000;

            if (expired || usedCount >= MAX_BREEDS_USES) {
                localStorage.removeItem(BREEDS_KEY);
                fetchBreeds();
            } else {
                set_breeds(data);
                localStorage.setItem(
                    BREEDS_KEY,
                    JSON.stringify({
                        data,
                        timestamp,
                        usedCount: usedCount + 1,
                    })
                );
                set_loading(false);
            }
        } else {
            fetchBreeds();
        }
    }, []);

    const handle_search = () => {
        if (search_term?.length < 1) return;
        search_term && search_term?.length > 0 && navigate(`/explore?search=${search_term}`);
    }

    return (
        <div className=" h-full bg-gradient-to-r from-neutral-950 via-cyan-950/10 to-neutral-900 text-gray-200 flex flex-row items-start justify-center font-sans p-[20px]">
            <SideBar />
            <div className="w-full relative pb-[50px] max-w-2xl mx-auto flex flex-col items-center">
                {/* {top banner} */}
                <TopBanner />
                {/* Dog Illustration */}
                <DogLogo />

                {/* Main Text */}
                <h1 style={{ fontFamily: 'cdg, serif' }} className="text-4xl md:text-5xl font-bold text-center text-gray-100 mb-3">
                    Trusted tails unleashed
                </h1>
                <p className="text-lg text-gray-400 text-center mb-8">
                    Where quality pups meet caring homes
                </p>

                {/* Input Area */}
                <div className="w-full bg-[#2a2a2a] rounded-2xl p-3 shadow-lg border border-gray-700">
                    <textarea
                        className="w-full bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none resize-none"
                        value={search_term}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handle_search();
                            }
                        }}
                        onChange={(e) => set_search_term(e.target.value)}
                        placeholder="Search here"
                        rows="1"
                    ></textarea>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex opacity-0 items-center w-full border-2 space-x-2">
                            {/* <button className="flex items-center space-x-2 bg-[#383838] hover:bg-gray-600 text-gray-300 px-3 py-1.5 rounded-lg text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72Z" /><path d="m14 7 3 3" /><path d="M12 12 2.36 2.36" /><path d="M18 6 7.5 16.5" /><path d="m17 11 4.5 4.5" /><path d="M14 12v1.5a2.5 2.5 0 0 0 5 0V12" /><path d="M6.5 12.5 12 7" /></svg>
                                <span>Auto</span>
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-gray-600 text-gray-400"><CarIcon /></button>
                            <button className="p-1.5 rounded-lg hover:bg-gray-600 text-gray-400"><ShieldIcon /></button>
                            <button className="p-1.5 rounded-lg hover:bg-gray-600 text-gray-400"><GlobeIcon /></button> */}
                        </div>
                        <div className="flex items-center space-x-2">
                            <button className="p-1.5 opacity-0 rounded-lg hover:bg-gray-600 text-gray-400"><PaperclipIcon /></button>
                            <button onClick={handle_search} className="bg-gray-600 hover:bg-gray-500 text-gray-200 p-2 rounded-lg">
                                <ArrowUpIcon />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Suggestion Buttons */}
                <div className="w-full mt-6 flex flex-wrap items-center justify-center gap-3">

                    {loading ?
                        [1, 2, 3, 4, 5].map((breed) => (
                            <button
                                className="flex w-[80px] h-[20px] items-center animate-pulse gap-2 bg-[#1e1e1e] hover:bg-gray-800 border border-gray-700 text-gray-300 px-4 py-2 rounded-full text-sm">

                            </button>
                        )) :
                        breeds?.length > 0 ?
                            breeds?.map((breed) => (
                                <button
                                    onClick={() => navigate(`/explore/breed/?breed=${breed}`)}
                                    className="flex items-center gap-2 bg-[#1e1e1e] hover:bg-gray-800 border border-gray-700 text-gray-300 px-4 py-[4px] rounded-full text-sm">
                                    {breed}
                                </button>
                            )) :
                            <></>
                    }
                </div>
                <div className=' mt-[34px] max-w-[400px] flex flex-row gap-[24px] w-full'>
                    <div onClick={call_us} className='flex text-white gap-[12px] text-[14px] justify-center items-center cursor-pointer bg-neutral-800 p-2 rounded-[12px] w-full '>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-phone">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
                        <span style={{ fontFamily: 'cdg, serif' }}>{import.meta.env.VITE_PHONE}</span>
                    </div>
                    <motion.button
                        whileTap={{
                            scale: 0.75
                        }}
                        transition={{
                            duration: 0.2,
                            ease: 'linear'
                        }}
                        onClick={() => open_whatsapp()}
                        className={`bg-[#25D366] lg:w-full relative p-2 flex justify-center items-center text-white rounded-[12px]`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
                            <path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;