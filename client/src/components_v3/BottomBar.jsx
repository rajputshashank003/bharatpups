import React from 'react'
import { FavoriteIcon, GarageIcon } from './SideBar';
import { Link } from 'react-router-dom';

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
    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
);


// --- Bottom Navigation Bar Component ---
const BottomBar = () => {
    const is_admin = false;
    // An array to hold navigation items for easier mapping
    const navItems = [
        { icon: <GarageIcon className="w-6 h-6" />, name: 'Home', location: '/' },
        { icon: <ExploreIcon className="w-6 h-6" />, name: 'Explore', location: '/explore' },
        { icon: <FavoriteIcon className="w-6 h-6" />, name: 'Favorites', location: '/favorites' },
        { icon: <ProfileIcon className="w-6 h-6" />, name: 'Profile', location: '/profile' },
        ...(is_admin ? [{ icon: <ProfileIcon className="w-6 h-6" />, name: 'Add dog', location: '/profile' },
        { icon: <ProfileIcon className="w-6 h-6" />, name: 'Inquiry', location: '/profile' }] : [] ),
    ];

    return (
        <nav className="fixed lg:hidden bottom-0 bg-[#171717] left-0 right-0 border-t-[1px] border-t-neutral-700/60 shadow-t-lg z-50">
            <div className="max-w-md mx-auto px-4">
                {/* Flex container to evenly space the navigation items */}
                <div className="flex justify-around items-center h-20">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.location}
                            className="p-3 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                            aria-label={item.label}
                        >
                            {item.icon}
                            <span className="sr-only">{item.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default BottomBar