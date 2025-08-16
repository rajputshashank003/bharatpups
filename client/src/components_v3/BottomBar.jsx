import React from 'react'

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
    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177.177a2.25 2.25 0 0 0-.998 1.787l-2.065 7.653a1.125 1.125 0 0 1-2.262 0l-2.065-7.653a2.25 2.25 0 0 0-.998-1.787L12.75 17.066h.008l.008-.008Z" />
    </svg>
);

const ProfileIcon = () => (
    <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
    </svg>
);


// --- Bottom Navigation Bar Component ---
const BottomBar = () => {
    // An array to hold navigation items for easier mapping
    const navItems = [
        { href: '#', icon: <SearchIcon />, label: 'Search' },
        { href: '#', icon: <HomeIcon />, label: 'Home' },
        { href: '#', icon: <ExploreIcon />, label: 'Explore' },
        { href: '#', icon: <ProfileIcon />, label: 'Profile' },
    ];

    return (
        <nav className="fixed lg:hidden bottom-0 bg-[#171717] left-0 right-0 border-t-[1px] border-t-neutral-700/60 shadow-t-lg z-50">
            <div className="max-w-md mx-auto px-4">
                {/* Flex container to evenly space the navigation items */}
                <div className="flex justify-around items-center h-20">
                    {navItems.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="p-3 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors duration-200"
                            aria-label={item.label}
                        >
                            {item.icon}
                            <span className="sr-only">{item.label}</span>
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default BottomBar