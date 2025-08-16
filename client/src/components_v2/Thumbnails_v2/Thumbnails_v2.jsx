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

export default function Thumbnails_v2({ food, load_next_5_foods, ind }) {
    const { addToCart, cart } = useCart();
    const [quantity, set_quantity] = useState(0);

    const handleAddToCart = () => {
        addToCart(food);
        set_quantity(1);
        toast.success("Added to cart!");
    }

    const find_quantity = () => {
        const result = cart.items.filter((f) => {
            if (f.food.id === food.id) {
                return true;
            }
            return false;
        });
        if (result[0]?.quantity) {
            set_quantity(result[0]?.quantity);
        }
    }

    const [favoriteFood, setFavouriteFood] = useState(false);

    useEffect(() => {
        console.log('pha page phli bar load page ');
        async function check() {
            const res = await isFavourite(food.id, userService.getUser().id);
            if (res.success) {
                setFavouriteFood(res.data);
            }
        }
        if (userService.getUser()) {
            check();
        }
        find_quantity();
    }, []);
    const navigate = useNavigate();
    const handleFavouriteFood = async () => {
        if (!userService.getUser()) {
            navigate("/login");
            toast.error("login before adding to favourite");
            return;
        }
        if (!favoriteFood) {
            const res = await addToFavourites(food.id, userService.getUser().id);
            await saveSearchTerm(userService.getUser().id, food.name);
            setFavouriteFood((prev) => !prev);
        } else {
            const res = await removeFromFavourites(food.id, userService.getUser().id);
            await removeSearchTerm(userService.getUser().id, food.name);
            setFavouriteFood((prev) => !prev);
        }
    }

    return (
        <motion.div
            onViewportEnter={() => load_next_5_foods(ind)}
            className='w-full max-w-[270px]'
        >
            <div className='w-full bg-neutral-200 h-[300px] p-[5px] rounded-[8px] gap-2 grid grid-rows-5' >
                <div className=' relative row-span-3 w-full h-full'>
                    <img onClick={() => navigate(`/food/${food.id}`)} style={{ padding: 0, margin: 0, width: '100%' }} className='h-full cursor-pointer hover:opacity-[0.9] duration-200 rounded-[12px]' src={food.imageUrl} alt="" />
                    <div onClick={handleFavouriteFood} className='absolute flex justify-center items-center cursor-pointer bg-gray-200 h-[28px] w-[44px] top-0 right-0 rounded-bl-[8px]' >
                        <FavoriteIcon sx={{ color: favoriteFood ? "#D32F2F" : "grey" }} />
                    </div>
                </div>
                <div className='row-span-2 grid grid-rows-2 w-full'>
                    <div className='text-[20px] bg-neutral-300 rounded-[8px] p-2 pb-4 grid-rows-2 row-span-1 grid font-semibold' onClick={() => navigate(`/food/${food.id}`)} >
                        <div className='row-span-1 flex flex-row  justify-between w-full'>
                            <span className='flex justify-center items-center'>
                                <GetShortName food_name={food.name} length={14} />
                            </span>
                            <span className='text-[20px] font-normal flex flex-row gap-2 justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FF5733 " class="icon icon-tabler icons-tabler-filled icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>
                                <span>
                                    {food.rating}
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className='row-span-1 flex flex-row justify-between items-center h-full'>
                        <div className="">
                            <Typography gutterBottom variant="h6" component="span">
                                <Price price={food.price} />
                            </Typography>
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
                                    onClick={handleAddToCart}
                                    className={`bg-[${theme_color}] relative w-[40%] h-[70%] flex justify-center items-center text-white rounded-[8px]`}
                                >
                                    <AddShoppingCartIcon />
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
