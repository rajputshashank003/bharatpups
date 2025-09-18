import * as React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import * as userService from "../../Services/userService.js"
import { addToFavourites, removeFromFavourites, saveSearchTerm, removeSearchTerm } from '../../Services/services.js';
import { toast } from 'react-toastify';
import { motion } from "framer-motion";
import GetShortName from '../../components/GetShortName/GetShortName.jsx';
import axios from 'axios';
import { add_quality_to_cloudinary, open_whatsapp } from '../../helpers/utils.js';
import Loader from '../Loader/Loader.jsx';

export default function Thumbnails_v2({ set_dogs, is_favorite, food}) {
    const [favoriteFood, setFavouriteFood] = useState(is_favorite);
    const [favorite_count, set_favorite_count] = useState(0);
    const [adding_to_favorite, set_adding_to_favorite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setFavouriteFood(is_favorite);
    }, [is_favorite]);

    useEffect(() => {
        set_favorite_count(food?.favorite_count);
    }, [food]);

    const handleFavouriteFood = async () => {
        try {
            set_adding_to_favorite(true);
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
        } catch (err) {

        } finally {
            set_adding_to_favorite(false);
        }
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
        <div
            // onViewportEnter={() => load_next_5_foods(ind)}
            className='w-full max-w-full'
        >
            <div className='w-full bg-neutral-800 h-[300px] p-[5px] rounded-[8px] gap-2 grid grid-rows-5' >
                <div className=' relative row-span-3 w-full h-full shadow-[0px_0px_1px] shadow-neutral-500 rounded-b-none rounded-[6px] '>
                    {userService?.getUser()?.isAdmin && <div onClick={handle_remove_dog} className='absolute flex justify-center items-center cursor-pointer bg-neutral-800 h-[28px] w-[44px] top-[-2px] z-[2] left-[-2px] rounded-br-[8px]' >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-x"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                    </div>}
                    <div onClick={() => navigate(`/dog/${food._id}`)} className='h-full relative cursor-pointer object-cover duration-200 rounded-[6px] rounded-b-none overflow-hidden'>
                        {/* it create lag or glitch on website -> the blur, object cover fill etc even bg as image also show glitch   */}
                        <img style={{ padding: 0, margin: 0, width: '100%' }} className='h-full cursor-pointer z-[2] relative object-contain' src={add_quality_to_cloudinary(food.image, 10)} alt="" />
                        {/* <img style={{ padding: 0, margin: 0, width: '100%' }} className='h-full cursor-pointer z-[1] object-cover absolute top-0 left-0' src={add_quality_to_cloudinary(food.image)} alt="" /> */}
                    </div>
                    <div onClick={handleFavouriteFood} className='absolute flex z-[2] justify-center items-center cursor-pointer bg-neutral-800 h-[28px] w-[44px] top-[-2px] right-[-2px] rounded-bl-[8px]' >
                        {
                            !adding_to_favorite ? <FavoriteIcon sx={{ color: favoriteFood ? "#D32F2F" : "grey" }} /> :
                                <Loader color={!favoriteFood ? "#D32F2F" : "white"}  />
                        }
                    </div>
                </div>
                <div className='row-span-2 grid grid-rows-2 w-full'>
                    <div className='text-[20px] bg-neutral-600 rounded-[8px] rounded-t-none p-2 pb-4 grid-rows-2 row-span-1 grid font-semibold' onClick={() => navigate(`/food/${food.id}`)} >
                        <span
                            style={{ fontFamily: 'cdg, serif' }}
                            className='flex whitespace-nowrap row-span-2 justify-start items-center'>
                            <GetShortName food_name={food.breed} length={14} />
                        </span>
                    </div>
                    <div className='row-span-1 flex flex-row justify-between items-center h-full'>
                        <div className="flex justify-center items-center gap-[4px]">
                            <FavoriteIcon sx={{ color: "#D32F2F" }} />
                            <span style={{ fontFamily: 'cdg, serif'}} className='text-neutral-300 text-bold'>{favorite_count}</span>
                        </div>
                        <motion.button
                            whileTap={{
                                scale: 0.75
                            }}
                            transition={{
                                duration: 0.2,
                                ease: 'linear'
                            }}
                            onClick={() => open_whatsapp(food?.breed)}
                            className={`bg-[#25D366] relative w-[30%] h-[60%] flex justify-center items-center text-white rounded-[8px]`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>                        
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}
