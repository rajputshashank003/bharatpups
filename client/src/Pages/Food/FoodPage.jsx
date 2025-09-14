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
import { call_us, copy_phone, open_whatsapp } from '../../helpers/utils.js';
import Loader from '../../components_v2/Loader/Loader.jsx';

export default function FoodPage() {
    const { id } = useParams();
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
    const [expanded_image, set_expanded_image] = useState(null);
    const [deleting_review, set_deleting_review] = useState(null);

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
                set_loading(true);
                const { data } = await axios.get(`/api/dog/id/${id}`);
                setFood(data?.dog);
                setReviews(data?.reviews);
            } catch (err) {
                console.error("Failed to fetch dog:", err);
            } finally {
                set_loading(false);
            }
        }
        fetchDog();
    }, [id]);

    const handle_add_review = () => {
        navigate('/add/review', {
            state: {
                dog_id : food?._id
            }
        });
    };

    const delete_review = async (id) => {
        try {
            set_deleting_review(id);
            const response = await axios.delete(`/api/dog/review/${id}`);
            if (response?.status === 200) {
                setReviews(prev => (
                    prev.filter(review => review?._id !== id)
                ));
            }
        } catch (err) {
            console.log(err.message);
        } finally {
            set_deleting_review(null);
        }
    }

    return (
        <div className="min-h-screen relative text-gray-200 flex flex-row items-start justify-center font-sans p-[20px]">
            { expanded_image && false && 
                <div className='fixed p-4 z-[9999] bg-black top-0 left-0 h-screen w-screen'>
                    <span onClick={() => set_expanded_image(null)} className='fixed bg-neutral-500 p-2 rounded-[12px] z-[9999] cursor-pointer top-[24px] right-[24px] text-black text-[24px] font-extrabold'>
                        X
                    </span>
                    <div className='relative h-[65%]'>
                        <img style={{ padding: 0, margin: 0, width: '100%' }} className='h-full z-[1] opacity-[0.6] object-cover blur-[12px] absolute top-0 left-0' src={expanded_image?.image} alt="" />
                        <img src={expanded_image?.image} style={{ padding: 0, margin: 0 }} className='h-full relative object-contain z-[2] rounded-[12px] w-full' alt="" />
                    </div>
                    <div className='w-full mt-4'>
                        <div className="w-fit px-2 rounded-[6px] bg-neutral-900 text-white">
                            Comment
                        </div>
                    </div>
                    <div className='h-[18%] z-[8888888] overflow-scroll m-4 bg-black/70'>
                        {expanded_image?.comment}
                    </div>
                    <div className='w-full flex justify-end'>
                        <div className="w-fit px-2 rounded-[12px] bg-neutral-800 text-white">
                            By {expanded_image?.created_by}
                        </div>
                    </div>
                </div>
            }
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
                                <img  style={{ padding: 0, margin: 0, width: '100%' }} className='h-full cursor-pointer z-[1] relative object-contain' src={food.image} alt="" />
                                <img style={{ padding: 0, margin: 0, width: '100%' }} className='h-full cursor-pointer z-[0] opacity-60 object-cover blur-[12px] absolute top-0 left-0' src={food.image} alt="" />
                            </div>
                            <div className={" flex flex-col gap-[12px] max-md:mt-[18px] "}>
                                <h1 className={classes.name_Favourite + " flex  justify-between gap-[12px] items-center"}>
                                    <div className='text-[38px] sm:text-[32px] font-semibold '  >
                                        {food.name}
                                    </div>
                                    <FavoriteIcon onClick={handleFavouriteFood} sx={{ color: favoriteFood ? "red" : "grey", position: "relative", fontSize: "2rem", cursor: 'pointer' }} />
                                </h1>
                                {/* <div style={{ fontFamily: "cdg, sans-serif" }} className=' text-[22px] font-bold '>
                                    Age : { food?.age} Y
                                </div> */}
                                <div className='bg-neutral-800 px-[12px] rounded-[6px] py-[8px] w-fit'>
                                    { food?.in_stock ? 'In stock' : 'Out of stock'} 
                                </div>
                                <div className='flex flex-wrap gap-[16px]'>
                                    <motion.button
                                        whileTap={{
                                            scale: 0.75
                                        }}
                                        transition={{
                                            duration: 0.2,
                                            ease: 'linear'
                                        }}
                                        onClick={call_us}
                                        className={`bg-[${theme_color}] relative h-fit w-fit px-[18px] py-[8px] flex justify-center items-center text-white rounded-[8px]`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-phone"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
                                    </motion.button>
                                    <motion.button
                                        whileTap={{
                                            scale: 0.75
                                        }}
                                        transition={{
                                            duration: 0.2,
                                            ease: 'linear'
                                        }}
                                        onClick={() => open_whatsapp(food?.breed)}
                                        className={`bg-[#25D366] relative h-fit w-fit px-[18px] py-[8px] flex justify-center items-center text-white rounded-[8px]`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-whatsapp"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg>
                                    </motion.button>
                                    { auth?.user?.isAdmin && <motion.button
                                        whileTap={{
                                            scale: 0.75
                                        }}
                                        transition={{
                                            duration: 0.2,
                                            ease: 'linear'
                                        }}
                                        onClick={() => navigate(`/admin/edit/${food?._id}`)}
                                        className={`bg-cyan-800 relative h-fit w-fit px-[18px] py-[8px] flex justify-center items-center text-white rounded-[8px]`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                    </motion.button>}
                                </div>
                            </div>
                            <div className="text-white">
                                {food?.description}
                            </div>
                        </div>
                        {auth?.user?.name && 
                            <div className='w-full '>
                                <div onClick={handle_add_review} className="addreview p-2 cursor-pointer w-fit px-4 bg-neutral-800 rounded-[12px]">
                                    Add Review
                                </div>
                            </div>
                        }
                        <div className="reviews w-full gap-[12px] flex flex-col mt-4">
                            { reviews?.length > 0 &&
                                reviews?.map((review) => (
                                    <div onClick={() => set_expanded_image({ image: review?.image, comment: review?.comment, created_by: review?.created_by?.name })} className='flex flex-col bg-neutral-800 cursor-pointer p-[8px] gap-[8px] rounded-[8px] '>
                                        <div className='flex flex-row gap-[12px]'>
                                            <img style={{ padding: 0, margin: 0}}  className='h-[54px] cursor-pointer object-cover md:rounded-[12px] w-[54px]' src={review.image} />
                                            <div className="line-clamp-3 overflow-hidden h-fit text-[12px] text-ellipsis">
                                                {review.comment}
                                            </div>
                                        </div>
                                        <div className="w-full bg-neutral-50/10 h-[0.5px]"></div>
                                        <div className='w-full flex px-[12px] text-[12px] items-center gap-[12px] justify-end h-[32px] '>
                                            {auth?.user?.isAdmin && <div onClick={() => delete_review(review?._id)} className="bg-red-700 px-2 flex justify-center items-center h-full rounded-[6px] ">
                                                {deleting_review === review?._id ?
                                                    <Loader color='white' height={12} width={12} />
                                                    :
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                                                }
                                            </div>}
                                            <div className={` ${auth?.user?.isAdmin ? 'h-full' : 'h-fit' } line-clamp-1 text-[12px] bg-neutral-600 px-2 rounded-[6px] shadow-[0px_0px_2px] shadow-neutral-900 justify-center items-center flex text-ellipsis`}>
                                                By {review?.created_by?.name}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    :
                    <NotFound message="Dog Not Found ! " />
            }
        </div>
    )
}