import React from 'react';

// SVG Icon Components for clarity and reusability

const DogIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-white"
    >
        <path d="M12 4c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
        <path d="M10.5 12.5c-2.2 0-4.2 1-5.5 2.5-1.3 1.5-2 3.5-2 5.5h15c0-2-0.7-4-2-5.5-1.3-1.5-3.3-2.5-5.5-2.5z" />
        <path d="M18 8c0-2.2-1.8-4-4-4" />
        <path d="M18 12c0 2.2-1.8 4-4 4" />
        <circle cx="12" cy="8" r="1" fill="black" />
        <path d="M12 10c-1.1 0-2 0.9-2 2s0.9 2 2 2 2-0.9 2-2-0.9-2-2-2z" fill="#4A90E2" />
    </svg>
);


const PlusIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);

const GarageIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5M3.75 12a2.25 2.25 0 01-2.25-2.25V6.75c0-1.24 1.01-2.25 2.25-2.25h16.5c1.24 0 2.25 1.01 2.25 2.25v3c0 1.24-1.01 2.25-2.25 2.25M3.75 12v6.75c0 1.24 1.01 2.25 2.25 2.25h16.5c1.24 0 2.25-1.01 2.25-2.25V12" />
    </svg>
);

const ExploreIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.5V21m0-17.5a9 9 0 00-9 9h18a9 9 0 00-9-9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l-4.5 4.5m4.5-4.5l4.5 4.5m-4.5-4.5l-4.5-4.5m4.5 4.5l4.5-4.5" />
    </svg>
);


const RoomsIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 3h15a1.5 1.5 0 011.5 1.5v15a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5v-15A1.5 1.5 0 014.5 3zm0 6.75h15" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 3v18" />
    </svg>
);


// Main Sidebar Component
export default function SideBar() {
    const navItems = [
        { icon: <GarageIcon className="w-6 h-6" />, name: 'Garage' },
        { icon: <ExploreIcon className="w-6 h-6" />, name: 'Explore' },
        { icon: <RoomsIcon className="w-6 h-6" />, name: 'Rooms' },
    ];

    return (
        <div className="bg-gray-900 text-white flex justify-center items-center min-h-screen font-sans">
            <div className="bg-[#1C1C1E] max-lg:hidden w-full max-w-xs h-[95vh] max-h-[800px] rounded-2xl p-4 flex flex-col shadow-2xl">

                {/* Header */}
                <header className="flex items-center gap-3 p-2 mb-6">
                    <div className="bg-gray-700 p-1 rounded-full">
                        <DogIcon />
                    </div>
                    <span className="text-3xl font-bold tracking-wider">cardog</span>
                </header>

                {/* New Chat Button */}
                <button className="flex items-center gap-3 w-full text-left p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 mb-6">
                    <PlusIcon className="w-6 h-6" />
                    <span className="font-semibold">New Chat</span>
                </button>

                <hr className="border-gray-700 my-2" />

                {/* Navigation */}
                <nav className="flex-grow">
                    <ul>
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <a href="#" className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-gray-300 hover:text-white">
                                    {item.icon}
                                    <span className="font-medium">{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <hr className="border-gray-700 my-2" />

                {/* Auth Buttons */}
                <footer className="mt-auto flex flex-col gap-3">
                    <button className="w-full py-3 px-4 bg-[#2C2C2E] rounded-full font-semibold hover:bg-gray-600 transition-colors duration-200">
                        Log in
                    </button>
                    <button className="w-full py-3 px-4 bg-[#A89AFF] text-black rounded-full font-semibold hover:bg-blue-400 transition-colors duration-200">
                        Sign up
                    </button>
                </footer>
            </div>
        </div>
    );
}
