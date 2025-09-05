import React, { useEffect, useState } from 'react'
import { FavoriteIcon, GarageIcon } from './SideBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Hooks/useAuth';
import {motion} from 'framer-motion';
import { capitalize } from '@mui/material';

const SearchIcon = () => (
    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
);

const HomeIcon = () => (
    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
    </svg>
);

const ExploreIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon w-6 h-6 icon-tabler icons-tabler-outline icon-tabler-device-ipad-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M11.5 21h-5.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6" /><path d="M9 18h2" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M20.2 20.2l1.8 1.8" /></svg>
);

const ProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="inherit" height="inherit" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon h-6 w-6 icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
);

export const AddIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="inherit" height="inherit" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon h-6 w-6 icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
);

// --- Bottom Navigation Bar Component ---
const BottomBar = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const params = useLocation();
    const [selected_icon, set_selected_icon] = useState(capitalize(params.pathname.slice(1) === '' ? 'home' : params.pathname.slice(1) ));

    const navItems = [
        { icon: <GarageIcon className="w-6 h-6" />, name: 'Home', location: '/' },
        { icon: <ExploreIcon className="w-6 h-6" />, name: 'Explore', location: '/explore' },
        { icon: <FavoriteIcon className="w-6 h-6" />, name: 'Favorites', location: '/favorites' },
        { icon: <ProfileIcon className="w-6 h-6" />, name: 'Profile', location: '/profile' },
        ...(auth?.user?.isAdmin ? [
            { icon: <AddIcon className="w-6 h-6" />, name: 'Add dog', location: '/admin/add' },
        ] : []
        ),
    ];

    return (
        <>
        <nav className='lg:hidden h-[50px] '></nav>
        <nav className="fixed lg:hidden bottom-0 bg-[#171717] left-0 right-0 border-t-[1px] border-t-neutral-700/60 shadow-t-lg z-50">
            <div className="max-w-md mx-auto px-4">
                {/* Flex container to evenly space the navigation items */}
                <div className="flex justify-around items-center h-20 p-4">
                    {navItems.map((item, index) => (
                        <motion.div
                            whileTap={{
                                scale: 0.75
                            }}
                            animate={{
                                scale: selected_icon === item.name ? 1.2 : 1,
                            }}
                            transition={{
                                duration: 0.2,
                                ease: 'linear'
                            }}
                            onClick={() => {
                                set_selected_icon(item.name);
                                navigate(item.location);
                            }}
                            className={` h-fit p-[4px] rounded-[8px] ${selected_icon === item.name ? 'bg-neutral-600 text-white shadow-[0px_0px_1px] shadow-neutral-100 ' : 'bg-transparent text-neutral-300/90' } cursor-pointer transition-colors duration-200`}
                        >
                            {item.icon}
                            <span className="sr-only">{item.label}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </nav>
        </>
    );
};

export default BottomBar