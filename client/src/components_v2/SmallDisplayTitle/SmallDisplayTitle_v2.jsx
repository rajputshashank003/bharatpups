import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { theme_color } from '../../constants/constants'
import { useAuth } from '../../components/Hooks/useAuth'
import Menu_v2 from '../../components/Header/Menu_v2'
import { useCart } from '../../components/Hooks/useCart'
import { useNavigate } from 'react-router-dom'

const SmallDisplayTitle_v2 = () => {
    const { user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const { cart } = useCart();
    const navigate = useNavigate();

    return (
        <div className="w-full relative px-4 flex flex-col pt-4">
            <div className={"line-1 flex flex-row justify-between items-center w-full "}>
                <div onClick={() => navigate("/")} style={{ color: theme_color }} className="home relative h-[60px] cursor-pointer font-bold text-[40px] max-sm:text-[35px]">
                    <img
                        src={"/AIKSAVA.png"}
                        className="h-[220px] absolute -top-[76px] -left-6 min-w-[125px]"
                    />
                </div>
                <motion.div
                    whileTap={{
                        scale: 0.75
                    }}
                    whileHover={{
                        backgroundColor: "#fc8181"
                    }}
                    transition={{
                        duration: 0.2,
                        ease: 'linear'
                    }}
                    style={{ backgroundColor: theme_color }}
                    onClick={() => setMenuOpen(prev => !prev)} className="profile z-[99999] cursor-pointer rounded-full text-white flex justify-center items-center w-[50px] h-[50px]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" /></svg>
                </motion.div>
                <Menu_v2 totalCount={cart.totalCount} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            </div>
            {/* <motion.div 
            className="welcome text-[35px] leading-[40px] mb-4 max-sm:[30px]">
            Welcome, { user?.name ?? 'Guest'}
        </motion.div> */}
            <div className="relative text-[20px] italic text-neutral-500 mb-4">
                Taste the earth's sweetness
            </div>

            {/* t
        {/*fix the add to cart button at the bottom  */}
        </div>
    )
}

export default SmallDisplayTitle_v2