import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../components/Hooks/useCart';
import { theme_color } from '../../constants/constants';
import { AnimatePresence, motion } from 'framer-motion';

const Header_v2 = () => {

    const [term, setTerm] = useState('');
    const navigate = useNavigate();
    const { searchTerm } = useParams();
    const { cart } = useCart();
    const [search_placeholder, set_search_placeholder] = useState('Ai Search...');
    const [fade_placeholder, set_fade_placeholder] = useState(true)
    const totalCount = cart.totalCount;

    useEffect(() => {
        setTerm(searchTerm ?? '');
    }, [searchTerm]);

    const search = async () => {
        setTerm('');
        term && term.length > 0 ? navigate(`/explore?search=${term}`) : navigate("/explore");
    };

    useEffect(() => {
        const values = ["AI Search...", "bulldog", "german"];
        let ind = 0;
        const interval = setInterval(() => {
            set_fade_placeholder(true);
            setTimeout(() => {
                ind = (ind + 1) % values.length;
                set_search_placeholder(values[ind]);
                set_fade_placeholder(false);
            }, 1000);
        }, 3000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className='z-[99999] grid grid-cols-5 max-lg:h-[50px] h-[60px] gap-[16px] lg:gap-[20px] w-full '>
            <input
                placeholder={search_placeholder}
                style={{ placeContent: fade_placeholder && term?.length == 0 ? 0 : 1, transition: "placeContent 1.2s linear" }}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        search();
                    }
                }}
                className={` bg-neutral-800 px-2 lg:px-4 text-[20px] focus:outline-none focus:border border-neutral-700/60 font-[400] col-span-4 rounded-[8px]`}>
            </input>
            <motion.button
                whileTap={{
                    scale: 0.75
                }}
                transition={{
                    duration: 0.2,
                    ease: 'linear'
                }}
                onClick={search}
                className={`bg-gradient-to-tr from-cyan-300 via-blue-400 to-blue-800 relative col-span-1 w-full flex justify-center items-center text-white rounded-[8px]`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
            </motion.button>
        </div>
    )
}

export default Header_v2