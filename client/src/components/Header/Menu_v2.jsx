import React, { useEffect, useRef } from 'react'
import { motion } from "motion/react";
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAuth } from '../Hooks/useAuth';

gsap.registerPlugin(useGSAP);

const Menu_v2 = ({ totalCount, menuOpen, setMenuOpen }) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const isFirstRender = useRef(true);
    const menu_options =
        user && user.name ?
            [
                {
                    type: 'navigate',
                    link: '/profile',
                    label: () => {
                        return (
                            <div className='flex flex-row gap-2 justify-start items-center text-start' >
                                <div className='h-[25px] w-[25px] '>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill='#D32F2F' x="0px" y="0px" width="currentHeight" height="currentHeight" viewBox="0 0 48 48">
                                        <path d="M43.47,25.71l-2.6-4.26l1.29-4.82c0.19-0.7-0.15-1.42-0.79-1.74l-4.49-2.18l-1.52-4.75c-0.22-0.68-0.89-1.11-1.61-1.03	L28.8,7.52l-3.84-3.18c-0.56-0.46-1.36-0.46-1.92,0L19.2,7.52l-4.95-0.59c-0.72-0.08-1.39,0.35-1.61,1.03l-1.52,4.75l-4.49,2.18	c-0.64,0.32-0.98,1.04-0.79,1.74l1.29,4.82l-2.6,4.26c-0.37,0.61-0.26,1.4,0.28,1.89l3.69,3.35l0.12,4.99	c0.01,0.72,0.54,1.32,1.25,1.44l4.92,0.83l2.79,4.13c0.41,0.6,1.17,0.82,1.84,0.54L24,40.91l4.58,1.97c0.2,0.08,0.4,0.12,0.59,0.12	c0.49,0,0.96-0.24,1.25-0.66l2.79-4.13l4.92-0.83c0.71-0.12,1.24-0.72,1.25-1.44l0.12-4.99l3.69-3.35	C43.73,27.11,43.84,26.32,43.47,25.71z M30.968,21.192l-8.017,9.289C22.655,30.822,22.236,31,21.814,31	c-0.322,0-0.646-0.104-0.92-0.316l-4.706-3.66c-0.436-0.339-0.514-0.967-0.175-1.403l0.614-0.789	c0.339-0.436,0.967-0.514,1.403-0.175l3.581,2.785l7.086-8.209c0.361-0.418,0.992-0.464,1.41-0.104l0.757,0.653	C31.282,20.142,31.329,20.773,30.968,21.192z"></path>
                                    </svg>
                                </div>
                                <span>Profile</span>
                            </div>
                        )
                    }
                },
                {
                    type: 'navigate',
                    link: '/cart',
                    label: () => {
                        return (<div className='flex flex-row gap-2 justify-start items-center text-start' >
                            <div className='h-[25px] text-[14px] font-bold flex justify-center items-center text-white bg-[#D32F2F] rounded-full w-[25px] '>
                                {totalCount ? totalCount : 0}
                            </div>
                            <span>Cart</span>
                        </div>
                        )
                    }
                },
                {
                    type: 'navigate',
                    link: '/orders',
                    label: () => {
                        return (
                            <div className='flex flex-row gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill='none' width="25" height="25" viewBox="0 0 24 24" stroke="#D32F2F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                <span>Orders</span>
                            </div>
                        )
                    }
                }
            ] : [
                {
                    type: 'navigate',
                    link: '/login',
                    label: () => 'Login'
                },
                {
                    type: 'navigate',
                    link: '/cart',
                    label: () => {
                        return (
                            <div className='flex flex-row gap-2 justify-start items-center text-start' >
                                <div className='h-[25px] text-[14px] font-bold flex justify-center items-center text-white bg-[#D32F2F] rounded-full w-[25px] '>
                                    {totalCount ? totalCount : 0}
                                </div>
                                <span>Cart</span>
                            </div>
                        )
                    }
                }
            ]
    const menu_options_2 = [
        {
            type: 'navigate',
            link: '/',
            label: () => {
                return (
                    <Link to='https://instagram.com/aiksava' className='flex flex-row gap-2 p-0 m-0'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-help"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 17l0 .01" /><path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" /></svg>
                        Help Center
                    </Link>
                )
            }
        },
        ...(
            user && user.name ?
                [
                    {
                        type: 'sign_out',
                        label: () => {
                            return (
                                <div className='flex flex-row gap-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#D32F2F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-logout"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" /><path d="M9 12h12l-3 -3" /><path d="M18 15l3 -3" /></svg>
                                    Sign out
                                </div>
                            )
                        }
                    },
                ]
                :
                []
        )
    ];

    const handleMenuOpen = () => {
        const gtl = gsap.timeline();
        gtl
            .to(".menu_screen", {
                display: 'flex',
                opacity: 1,
                duration: 0.2,
                ease: 'linear'
            })
            .fromTo(".menu_par", {
                height: 0,
                opacity: 0,
            }, {
                height: user && user.name ? '318px' : '160px',
                opacity: 1,
            }, {
                duration: 2,
                ease: 'linear',
            })
    }
    const handleMenuClose = () => {

        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const gtl = gsap.timeline();
        gtl.fromTo(".menu_par", {
            height: user && user.name ? '318px' : '155px',
            opacity: 1,
        }, {
            height: 0,
            opacity: 0,
        }, {
            duration: 2,
            ease: 'linear',
        })
            .to(".menu_screen", {
                display: 'none',
                opacity: 0,
                duration: 0.2,
                ease: "circ.in"
            })
    }

    useEffect(() => {
        if (menuOpen) {
            handleMenuOpen();
        } else {
            handleMenuClose();
        }
    }, [menuOpen]);

    // if ( !menuOpen ) return ;

    return (
        <>
            <div onClick={() => setMenuOpen(false)} className="h-screen hidden opacity-0 menu_screen w-screen z-[999] bg-black/20 backdrop-blur-[7px] fixed top-0 right-0"></div>
            <div className=' menu_par h-[0px] opacity-0 overflow-hidden shadow-[0px_4px_12px] shadow-gray-700 flex flex-col w-[230px] bg-white z-[9999] backdrop-blur-[5px] text-zinc-900 absolute top-[10px] right-[70px] rounded-[12px] border-[1.5px] border-black'>
                {
                    user && user.name && user.email &&
                    <motion.div
                        onClick={() => {
                            setMenuOpen(false);
                            navigate("/dashboard");
                        }}
                        whileTap={{
                            scale: 0.9
                        }}
                        whileHover={{
                            backgroundColor: '#d4d4da'
                        }}
                        transition={{
                            duration: 0.2,
                            ease: 'easeIn'
                        }}
                        className="user_details cursor-pointer m-2 mb-0 p-2 flex flex-col rounded-[8px] justify-start items-start border border-gray-600/40 "
                    >
                        <span className='text-[18px] font-bold uppercase' >{user.name}</span>
                        <span className='text-[13px] font-semibold text-gray-700' >{user.email}</span>
                    </motion.div>
                }
                <div className='flex m-2 flex-col gap-2'>
                    {
                        menu_options.map((label, ind) => (
                            <Option setMenuOpen={setMenuOpen} key={ind} label={label} />
                        ))
                    }
                </div>
                <div className="w-full h-[0.5px] bg-black/30"></div>
                <div className="flex m-2 flex-col gap-2">
                    {
                        menu_options_2.map((label, ind) => (
                            <Option setMenuOpen={setMenuOpen} key={ind} label={label} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

const Option = ({ label, setMenuOpen }) => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handle_logout = () => {
        setMenuOpen(false);
        logout();
        navigate('/login');
    }

    const handleNavigate = () => {
        setMenuOpen(false);
        navigate(label.link);
    }

    return (
        <>
            {
                label.type === 'navigate' ?
                    <motion.div
                        whileTap={{
                            scale: 0.9
                        }}
                        whileHover={{
                            backgroundColor: '#d4d4da'
                        }}
                        onClick={handleNavigate}
                        transition={{
                            duration: 0.2,
                            ease: 'easeIn'
                        }}
                        className="text-[18px] border border-gray-200/50 rounded-[8px] p-2 py-1 text-start font-semibold cursor-pointer"
                    >
                        {label.label()}
                    </motion.div>
                    :
                    <motion.div
                        onClick={label.type === 'sign_out' ? handle_logout : () => { setMenuOpen(false) }}
                        whileTap={{
                            scale: 0.9
                        }}
                        whileHover={{
                            backgroundColor: '#d4d4da'
                        }}
                        transition={{
                            duration: 0.2,
                            ease: 'easeIn'
                        }}
                        className="text-[18px] border border-gray-200/50 rounded-[8px] p-2 py-1 text-start font-semibold cursor-pointer"
                    >
                        {label.label()}
                    </motion.div>
            }
        </>
    )
}

export default Menu_v2