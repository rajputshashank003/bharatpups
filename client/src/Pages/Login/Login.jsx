import React from 'react';

// SVG Icon for Apple
const AppleIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mr-2"
    >
        <path d="M12.01,2.05C10.73,2.05,9.23,2.7,8.2,3.81C7.11,4.99,6.5,6.43,6.5,7.94c0,1.53,0.61,2.96,1.7,4.09 C9.28,13.11,10.71,13.7,12.01,13.7c0.06,0,0.12,0,0.18,0c0.06,0,0.12,0,0.18,0c1.3,0,2.73-0.59,3.82-1.68 c1.09-1.13,1.7-2.56,1.7-4.09c0-1.51-0.61-2.95-1.7-4.13C15.29,2.7,13.79,2.05,12.01,2.05z M12.01,4.01 c1.13,0,2.15,0.45,2.88,1.18c0.73,0.73,1.18,1.75,1.18,2.88s-0.45,2.15-1.18,2.88c-0.73,0.73-1.75,1.18-2.88,1.18 s-2.15-0.45-2.88-1.18C8.4,10.16,7.95,9.14,7.95,8.07S8.4,5.92,9.13,5.19C9.86,4.46,10.88,4.01,12.01,4.01z"></path>
        <path d="M19.38,13.17c-0.12-0.18-0.24-0.35-0.38-0.52c-1.2-1.46-2.89-2.3-4.78-2.3c-0.59,0-1.17,0.08-1.73,0.24 c-1.13,0.32-2.19,0.95-3.09,1.81c-1.2,1.15-2.04,2.64-2.38,4.32c-0.08,0.39-0.04,0.78,0.12,1.14c0.16,0.36,0.44,0.65,0.79,0.81 c0.18,0.08,0.37,0.12,0.56,0.12c0.26,0,0.52-0.08,0.74-0.24c0.44-0.32,0.65-0.89,0.49-1.42c-0.22-0.75-0.12-1.53,0.28-2.22 c0.39-0.68,1-1.22,1.73-1.56c1.13-0.52,2.4-0.52,3.54,0c0.73,0.34,1.34,0.88,1.73,1.56c0.39,0.68,0.49,1.47,0.28,2.22 c-0.16,0.53,0.04,1.1,0.49,1.42c0.22,0.16,0.48,0.24,0.74,0.24c0.19,0,0.38-0.04,0.56-0.12c0.35-0.16,0.63-0.45,0.79-0.81 c0.16-0.36,0.2-0.75,0.12-1.14C21.42,15.81,20.58,14.32,19.38,13.17z"></path>
    </svg>
);

// SVG Icon for Google
const GoogleIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="mr-3"
    >
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
);


export default function Login() {
    return (
        // Main container with a dark background and centered content
        <div  className="flex items-center justify-center min-h-screen text-gray-300 font-sans">
            {/* Card container */}
            <div className="bg-[#1c1c1e] p-4 lg:p-8 rounded-2xl shadow-lg w-full max-lg:w-[80%] max-w-sm">

                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 style={{ fontFamily: 'cdg, serif' }} className="text-[28px] max-lg:text-[20px] text-white mb-2">Welcome to Bharatpups</h1>
                    <p style={{ fontFamily: 'cdg, serif' }} className="text-gray-400 text-[16px] ">Sign in to your account to continue</p>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-4 mb-6">
                    {/* Google Button */}
                    <button className="w-full max-sm:text-[14px] flex gap-[12px] items-center justify-center py-3 px-4 bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white font-semibold rounded-xl transition duration-300">
                        <img src='/google_logo.svg' className='h-[20px] w-[20px] ' alt="" />
                        <span style={{ fontFamily: 'cdg, serif' }} >
                            Continue with Google
                        </span>
                    </button>
                </div>

                {/* Divider */}
                <div className="flex items-center my-6 flex-row">
                    <div className="bg-neutral-700/60 h-[1px] w-full " />
                    <span style={{ fontFamily: 'cdg, serif' }} className="mx-4 text-gray-500 whitespace-nowrap text-sm">Or continue with email</span>
                    <div className="bg-neutral-700/60 h-[1px] w-full " />
                </div>

                {/* Email Form */}
                <form>
                    <div className="mb-6">
                        <label style={{ fontFamily: 'cdg, serif' }} htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                            Email address
                        </label>
                        <input
                            style={{ fontFamily: 'cdg, serif' }}
                            type="email"
                            id="email"
                            placeholder="name@example.com"
                            className="w-full px-4 py-3 bg-[#2c2c2e] border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        style={{ fontFamily: 'cdg, serif' }}
                        type="submit"
                        className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition duration-300"
                    >
                        Continue with Email
                    </button>
                </form>

                {/* Footer Text */}
                <p style={{ fontFamily: 'cdg, serif' }} className="text-center text-xs text-gray-500 mt-8">
                    By clicking continue, you agree to our{' '}
                    <a href="#" className="underline hover:text-gray-300">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="underline hover:text-gray-300">
                        Privacy Policy
                    </a>
                    .
                </p>
            </div>
        </div>
    );
}
