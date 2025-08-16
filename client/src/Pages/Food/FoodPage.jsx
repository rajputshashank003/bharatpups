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

export default function FoodPage() {
    const { id } = useParams();
    const { addToCart, cart } = useCart();
    const navigate = useNavigate();
    const handleAddToCart = () => {
        addToCart(food);
        navigate("/cart");
    }

    const [food, setFood] = useState();
    const [reviews, setReviews] = useState([]);
    const [favoriteFood, setFavouriteFood] = useState(false);
    const [ratingValue, setRatingValue] = useState(1);
    const [comment, setComment] = useState("");
    const auth = useAuth();
    const [quantity, set_quantity] = useState(0);
    const [loading, set_loading] = useState(true);

    const find_quantity = () => {
        const result = cart.items.filter((f) => {
            if (f.food.id === id) {
                return true;
            }
            return false;
        });
        if (result[0]?.quantity) {
            set_quantity(result[0]?.quantity);
        }
    }

    useEffect(() => {
        async function find() {
            try {
                set_loading(true);
                const res = await foodById(id);
                setFood(res);
                setReviews(res.reviews);
            } catch (err) {
                console.log(err);
            } finally {
                set_loading(false);
            }
        }
        find();
        find_quantity();
    }, []);

    useEffect(() => {
        async function check() {
            if (food && userService.getUser() && userService.getUser().id) {
                const res2 = await isFavourite(food.id, userService.getUser().id);
                if (res2.success) {
                    setFavouriteFood(res2.data);
                }
            }
        }
        check();
    }, [food])

    const formattedCurrency = food ?
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'INR',
        }).format(food.price)
        : null;

    const handleRatingChange = (event, newValue) => {
        setRatingValue(newValue);
    };
    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };
    const onReviewSubmit = async () => {
        if (comment.length == 0) return;
        const res = await submitReview(ratingValue, comment, id, auth.user.email, auth.user.name);
        if (res.success) {
            setReviews(res.data.reviews);
            setFood(res.data);
        }
        setRatingValue(1);
        setComment("");
    }
    const onReviewDelete = async (reviewId) => {
        const res = await deleteReviewById(reviewId, id);
        if (res.success) {
            setReviews(res.data.reviews);
            setFood(res.data);
        }
    }
    const handleFavouriteFood = async (foodId) => {
        if (!userService.getUser()) {
            navigate("/login");
            toast.error("login before adding to favourite");
            return;
        }
        if (!favoriteFood) {
            const res = await addToFavourites(foodId, userService.getUser().id);
            setFavouriteFood((prev) => !prev);
        } else {
            const res = await removeFromFavourites(foodId, userService.getUser().id);
            setFavouriteFood((prev) => !prev);
        }
    }
    return (
        <>
            {loading ?
                <div className=' min-h-screen flex justify-center'>
                    <FoodPageSkeleton />
                </div>
                :
                food ?
                    <div className={classes.box + " px-4 flex justify-start items-start md:items-center "}>
                        <div className={classes.main + " justify-center gap-[22px]"}>
                            <img className={classes.img + " m-0 max-md:w-full  "} src={food.imageUrl} />
                            <div className={" flex flex-col gap-[12px] max-md:mt-[18px] "}>
                                <h1 className={classes.name_Favourite + " flex  justify-between gap-[12px] items-center"}>
                                    <div className='text-[38px] sm:text-[32px] font-semibold '  >
                                        {food.name}
                                    </div>
                                    <FavoriteIcon onClick={() => handleFavouriteFood(food._id)} sx={{ color: favoriteFood ? "red" : "grey", position: "relative", fontSize: "2rem", cursor: 'pointer' }} />
                                </h1>
                                <div style={{ fontFamily: "f5, sans-serif" }} className=' text-[22px] font-bold '>
                                    <Price price={food?.price} />
                                </div>
                                <Rating name="read-only" value={food.rating} size='large' readOnly />
                                <div className=' flex flex-wrap'>
                                    {
                                        food.tags.map((origin) => (
                                            <div className='mr-2'>
                                                <Chip key={origin} label={origin} />
                                            </div>
                                        ))
                                    }
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
                                            className={`bg-[${theme_color}] relative w-[40%] h-[32px] flex justify-center items-center text-white rounded-[8px]`}
                                        >
                                            <AddShoppingCartIcon />
                                        </motion.button>
                                        :
                                        <div className="w-[70%] max-w-[200px] h-[70%] ">
                                            <Counter curr={quantity} setCurr={set_quantity} foodId={food.id} min={0} />
                                        </div>
                                }
                            </div>
                        </div>
                        <div className={classes.allReviews + " flex justify-start"}>
                            {
                                userService.getUser() &&
                                <div className={classes.reviewBox}>
                                    <span className={classes.title}>
                                        Leave a review
                                    </span>
                                    <div className={classes.ratingBox}>
                                        <Rating name="size-large" onChange={handleRatingChange} value={ratingValue} defaultValue={1} size="large" />
                                    </div>
                                    <span className={classes.comment}>
                                        Comment
                                    </span>
                                    <div className={classes.textArea}>
                                        <Textarea onChange={handleCommentChange} value={comment} placeholder="Type your review here" />
                                    </div>
                                    <div className={classes.uploadButton}>
                                        <Button
                                            variant="contained"
                                            onClick={onReviewSubmit}
                                            sx={{
                                                backgroundColor: "red", // Change background color to red
                                                "&:hover": {
                                                    backgroundColor: "darkred", // Optional: Darker red on hover
                                                },
                                            }}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            }
                            {
                                reviews.map((review, ind) => (
                                    <div key={ind} className={classes.reviewBox}>
                                        <span className={classes.title}>
                                            {review.name}
                                        </span>
                                        <div className={classes.ratingBox}>
                                            <Rating name="size-large" readOnly onChange={handleRatingChange} defaultValue={review.rating} size="large" />
                                        </div>
                                        <span className={classes.comment}>
                                            Comment
                                        </span>
                                        <div className={classes.commentText}>
                                            {review.comment}
                                        </div>
                                        {auth.user && auth.user.email === review.email && <div className={classes.deleteButton}>
                                            <Button
                                                variant="contained"
                                                onClick={() => onReviewDelete(review._id)}
                                                sx={{
                                                    backgroundColor: "red",
                                                    height: "1.4rem",
                                                    "&:hover": {
                                                        backgroundColor: "darkred",
                                                    },
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </div>}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    :
                    <NotFound message="FoodPage Not Found ! " />
            }
        </>
    )
}