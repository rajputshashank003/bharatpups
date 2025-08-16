import React from 'react'

function Footer() {
    return (
        <footer className="bg-[#D32F2F] rounded-md shadow m-4 mt-0">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-white sm:text-center ">©{new Date().getFullYear()}<a href="https://aiksava.vercel.app/" className="hover:underline">Aiksava </a> All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-white sm:mt-0">
                <li>
                    <a href="https://instagram.com/aiksava" className="hover:underline">Contact</a>
                </li>
            </ul>
            </div>
        </footer>
    )
}

export default Footer
