import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import classes from "./FoodPage.module.css";
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useCart } from '../../components/Hooks/useCart.jsx';
import NotFound from '../../components/NotFound/NotFound.jsx';
import { foodById, getReviewsById, isFavourite, submitReview, deleteReviewById, addToFavourites, removeFromFavourites } from '../../Services/services.js';
import Textarea from '@mui/joy/Textarea';
import * as userService from "../../Services/userService.js"
import { toast } from "react-toastify";
import { useAuth } from "../../components/Hooks/useAuth.jsx";
import Price from '../../components/Price/Price.jsx';
import { motion } from 'framer-motion';
import { theme_color } from '../../constants/constants.js';
import Counter from '../../components/Counter/Counter.jsx';
import FoodPageSkeleton from '../../components/Loader_Skeletons/FoodPageSkeleton.jsx';
import SideBar from '../../components_v3/SideBar.jsx';
import axios from 'axios';
import { copy_phone } from '../../helpers/utils.js';

export default function FoodPage() {
    const { id } = useParams();
    const { addToCart, cart } = useCart();
    const navigate = useNavigate();
    
    const [food, setFood] = useState();
    const [reviews, setReviews] = useState([]);
    const [favoriteFood, setFavouriteFood] = useState(false);
    const [ratingValue, setRatingValue] = useState(1);
    const [comment, setComment] = useState("");
    const auth = useAuth();
    const [quantity, set_quantity] = useState(0);
    const [loading, set_loading] = useState(true);

    const [favorite, setFavorite] = useState(false);

    const handleFavouriteFood = async () => {
        if (!userService.getUser()) {
            navigate("/login");
            toast.error("login before adding to favourite");
            return;
        }
        if (!favoriteFood) {
            const res = await addToFavourites(food._id, userService.getUser().id);
            // await saveSearchTerm(userService.getUser().id, food.name);
            setFavouriteFood((prev) => !prev);
        } else {
            const res = await removeFromFavourites(food._id, userService.getUser().id);
            // await removeSearchTerm(userService.getUser().id, food.name);
            setFavouriteFood((prev) => !prev);
        }
    }

    useEffect(() => {
        async function fetchDog() {
            try {
                console.log('fetching ', id);
                set_loading(true);
                const { data } = await axios.get(`/api/dog/id/${id}`);
                console.log(data);
                setFood(data);
            } catch (err) {
                console.error("Failed to fetch dog:", err);
            } finally {
                set_loading(false);
            }
        }
        fetchDog();
    }, [id]);

    return (
        <div className="min-h-screen relative text-gray-200 flex flex-row items-start justify-center font-sans p-[20px]">
            <SideBar />
            {loading ?
                <div className=' min-h-screen w-full flex justify-center'>
                    <FoodPageSkeleton />
                </div>
                :
                food ?
                    <div className={classes.box + " px-4 flex justify-start items-start md:items-center "}>
                        <div className={classes.main + " justify-start gap-[22px]"}>
                            {/* <img className={classes.img + " m-0 max-md:w-full  "} src={food.image} /> */}
                            <div className={classes.img + " m-0 max-md:w-full overflow-hidden relative  "}>
                                <img onClick={() => navigate(`/dog/${food._id}`)} style={{ padding: 0, margin: 0, width: '100%' }} className='h-full cursor-pointer z-[1] relative object-contain' src={food.image} alt="" />
                                <img onClick={() => navigate(`/dog/${food._id}`)} style={{ padding: 0, margin: 0, width: '100%' }} className='h-full cursor-pointer z-[0] object-cover blur-[12px] absolute top-0 left-0' src={food.image} alt="" />
                            </div>
                            <div className={" flex flex-col gap-[12px] max-md:mt-[18px] "}>
                                <h1 className={classes.name_Favourite + " flex  justify-between gap-[12px] items-center"}>
                                    <div className='text-[38px] sm:text-[32px] font-semibold '  >
                                        {food.name}
                                    </div>
                                    <FavoriteIcon onClick={handleFavouriteFood} sx={{ color: favoriteFood ? "red" : "grey", position: "relative", fontSize: "2rem", cursor: 'pointer' }} />
                                </h1>
                                <div style={{ fontFamily: "cdg, sans-serif" }} className=' text-[22px] font-bold '>
                                    Age : { food?.age} Y
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
                                            onClick={() => copy_phone('asfasdf')}
                                            className={`bg-[${theme_color}] relative w-[40%] h-[70%] flex justify-center items-center text-white rounded-[8px]`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-phone"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
                                        </motion.button>
                                        :
                                        <div className="w-[70%] max-w-[200px] h-[70%] ">
                                            <Counter curr={quantity} setCurr={set_quantity} foodId={food.id} min={0} />
                                        </div>
                                }
                            </div>
                            <div className="text-white">
                                {food?.description}
                            </div>
                        </div>
                    </div>
                    :
                    <NotFound message="FoodPage Not Found ! " />
            }
        </div>
    )
}