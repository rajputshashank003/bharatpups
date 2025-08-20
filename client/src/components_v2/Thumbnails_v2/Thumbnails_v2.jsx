import * as React from 'react';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import { useNavigate } from "react-router-dom";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from 'react';
import { useEffect } from 'react';
import * as userService from "../../Services/userService.js"
import { addToFavourites, isFavourite, removeFromFavourites, saveSearchTerm, removeSearchTerm } from '../../Services/services.js';
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
import Price from '../../components/Price/Price.jsx';
import { useCart } from '../../components/Hooks/useCart.jsx';
import { theme_color } from '../../constants/constants.js';
import Counter from '../../components/Counter/Counter.jsx';
import GetShortName from '../../components/GetShortName/GetShortName.jsx';
import axios from 'axios';

export default function Thumbnails_v2({ set_dogs, is_favorite, food, load_next_5_foods, ind }) {
    const [quantity, set_quantity] = useState(0);
    const [favoriteFood, setFavouriteFood] = useState(is_favorite);
    const [favorite_count, set_favorite_count] = useState(0);

    const copy_phone = () => {
        navigator.clipboard.writeText('9876543214')
        toast.success("Phone no. copied");
    }

    useEffect(() => {
        setFavouriteFood(is_favorite);
    }, [is_favorite]);

    useEffect(() => {
        set_favorite_count(food?.favorite_count);
    }, [food]);

    const navigate = useNavigate();
    const handleFavouriteFood = async () => {
        if (!userService.getUser()) {
            navigate("/login");
            toast.error("login before adding to favourite");
            return;
        }
        if (!favoriteFood) {
            const res = await addToFavourites(food.id, userService.getUser().id);
            // await saveSearchTerm(userService.getUser().id, food.name);
            set_favorite_count(prev => prev + 1);
        } else {
            const res = await removeFromFavourites(food.id, userService.getUser().id);
            // await removeSearchTerm(userService.getUser().id, food.name);
            set_favorite_count(prev => prev - 1);
        }
        setFavouriteFood((prev) => !prev);
    }

    const handle_remove_dog = async () => {
        if (!userService.getUser()) {
            navigate("/login");
            toast.error("login before adding to favourite");
            return;
        }
        if (!userService?.getUser()?.isAdmin) {
            toast.error("Admin credentials required");
            return ;
        }
        try {
            await axios.delete(`/api/dog/${food._id}`);
            set_dogs((prev) => prev.filter((dog) => dog._id !== food._id));
            toast.success(`${food?.name} from breed ${food?.breed} Deleted`)
        } catch (err) {
            console.log(err);
            toast.error('Delete error');
        }
    }

    return (
        <motion.div
            // onViewportEnter={() => load_next_5_foods(ind)}
            className='w-full max-w-[270px]'
        >
            <div className='w-full bg-neutral-800 h-[300px] p-[5px] rounded-[8px] gap-2 grid grid-rows-5' >
                <div className=' relative row-span-3 w-full h-full shadow-[0px_0px_1px] shadow-neutral-500 rounded-[6px] '>
                    {userService?.getUser()?.isAdmin && <div onClick={handle_remove_dog} className='absolute flex justify-center items-center cursor-pointer bg-neutral-800 h-[28px] w-[44px] top-[-2px] z-[2] left-[-2px] rounded-br-[8px]' >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                    </div>}
                    <img onClick={() => navigate(`/dog/${food._id}`)} style={{ padding: 0, margin: 0, width: '100%' }} className='h-full cursor-pointer object-contain duration-200 rounded-[12px]' src={food.image} alt="" />
                    <div onClick={handleFavouriteFood} className='absolute flex justify-center items-center cursor-pointer bg-neutral-800 h-[28px] w-[44px] top-[-2px] right-[-2px] rounded-bl-[8px]' >
                        <FavoriteIcon sx={{ color: favoriteFood ? "#D32F2F" : "grey" }} />
                    </div>
                </div>
                <div className='row-span-2 grid grid-rows-2 w-full'>
                    <div className='text-[20px] bg-neutral-600 rounded-[8px] p-2 pb-4 grid-rows-2 row-span-1 grid font-semibold' onClick={() => navigate(`/food/${food.id}`)} >
                        <div className='row-span-1 flex flex-row  justify-between w-full'>
                            <span
                                className='flex whitespace-nowrap justify-center items-center'>
                                <GetShortName food_name={food.breed} length={12} />
                            </span>
                            <span className='text-[20px] font-normal flex flex-row gap-2 justify-center items-center'>
                                <span>
                                    {food.age}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className='row-span-1 flex flex-row justify-between items-center h-full'>
                        <div className="">
                            <FavoriteIcon sx={{ color: "#D32F2F" }} />
                            <span>{favorite_count}</span>
                        </div>
                        {
                            quantity == 0 ?
                                <motion.button
                                    whileTap={{
                                        scale: 0.75
                                    }}
                                    transition={{
                                        duration: 0.2,
                                        ease: 'linear'
                                    }}
                                    onClick={copy_phone}
                                    className={`bg-[${theme_color}] relative w-[40%] h-[70%] flex justify-center items-center text-white rounded-[8px]`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-phone"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
                                </motion.button>
                                :
                                <div className="w-[50%] h-[70%] ">
                                    <Counter curr={quantity} setCurr={set_quantity} foodId={food.id} min={0} />
                                </div>
                        }
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
