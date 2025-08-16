import { React, useState, useEffect } from 'react';
import classes from "./HomePage.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import NotFound from '../../components/NotFound/NotFound.jsx';
import { getAll, getAllTags, searchFood, getAllByTag, saveSearchTerm } from '../../Services/services.js';
import { verifyToken, getUser } from "../../Services/userService.js";
import { useAuth } from "../../components/Hooks/useAuth";
import { toast } from 'react-toastify';
import * as userService from "../../Services/userService.js";
import Tags_v2 from '../../components_v2/Tags_v2/Tags_v2.jsx';
import Alert_v2 from '../../components_v2/Alert/Alert_v2.jsx';
import Thumbnails_v2 from '../../components_v2/Thumbnails_v2/Thumbnails_v2.jsx';
import GetShortName from '../../components/GetShortName/GetShortName.jsx';
import Thumbnail_v2_Skeleton from '../../components/Loader_Skeletons/Thumbnail_v2_Skeleton.jsx';
import RecommendedFoodSkeleton from '../../components/Loader_Skeletons/RecommendeFoodSkeleton.jsx';

export default function HomePage() {
    const [sample_foods, setSampleFoods] = useState([]);
    const [sample_tags, setSampleTags] = useState([]);
    const [loading, set_loading] = useState(true);
    const { searchTerm, tag } = useParams();
    const userData = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();
    const { user, updateProfile } = useAuth();

    useEffect(() => {
        const verify = async () => {
            if (!userData) return;
            const data = await verifyToken();
            if (!data.success) {
                localStorage.removeItem("user");
                navigate("/login");
            }
        }
        verify();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            set_loading(true);
            try {
                const userId = getUser() ? getUser().id : "";

                const responseTag = await getAllTags(userId);
                setSampleTags(responseTag.data);

                let responseFood;
                if (tag) {
                    responseFood = await getAllByTag(tag, userId);
                } else if (searchTerm) {
                    responseFood = await searchFood(searchTerm);
                    if (user && user?.id) {
                        await saveSearchTerm(user.id, searchTerm);
                    }
                } else {
                    responseFood = await getAll(userId);
                }

                setSampleFoods(responseFood.data);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                set_loading(false);
            }
        };

        fetchData();
    }, [searchTerm, tag]);

    const sendEmailVerification = async () => {
        const { data } = await userService.sendEmailVerification(user.id);
        toast.success(data.msg);
    }
    const load_next_5_foods = async (ind) => {
        ind += 2;
        if (ind < sample_foods.length - 1 || searchTerm || tag) {
            return;
        }
        const userId = getUser() ? getUser().id : "";
        let next_5 = await getAll(userId, sample_foods?.length);
        setSampleFoods((prev) => {
            return [...prev, ...next_5?.data]
        })
    }

    return (
        <div className='px-4'>
            {
                loading ?
                    <div className='flex flex-row gap-[12px] overflow-scroll md:mx-[20%] pt-4'>
                        {
                            [1, 2, 3, 4, 5].map((val) => (
                                <div className="inline-flex items-center px-3 py-1 rounded-[8px] bg-gray-300 animate-pulse">
                                    <div className="h-5 w-5 rounded-full bg-gray-400 mr-2"></div>
                                    <div className="h-6 w-24 rounded bg-gray-400"></div>
                                </div>
                            ))
                        }
                    </div> :
                    sample_tags && sample_tags.length > 0 &&
                    <div className={"flex flex-row overflow-scroll md:mx-[20%] pt-4"}>
                        <Tags_v2 tags={sample_tags} />
                    </div>
            }
            {
                user && !user.is_verified &&
                <Alert_v2 onClick={sendEmailVerification} alert={"Click to verify your email"} />
            }
            {
                (!loading && (!sample_foods || sample_foods.length === 0))
                    ?
                    <NotFound message="Reset Search" />
                    :
                    <div className='flex flex-col min-h-screen justify-start items-center mb-4 mt-2'>
                        {!searchTerm && !tag && sample_foods[0] && sample_foods[1] &&
                            <div className='flex flex-col justify-start w-full'>
                                <div className="text text-[20px] text-neutral-600 font-semibold w-full justify-start mb-2">Recomended Foods</div>
                                {loading ?
                                    <RecommendedFoodSkeleton />
                                    :
                                    <div className="two max-w-[350px] rounded-[12px] p-[11px] gap-[11px] grid bg-gray-300 grid-cols-2 h-fit w-full">
                                        <div onClick={() => navigate(`/food/${sample_foods[0]?.id}`)} className="left cursor-pointer relative col-span-1 flex flex-col gap-2">
                                            <img src={sample_foods[0]?.imageUrl} className="img h-[120px] rounded-[8px]  w-full bg-gray-500" />
                                            <div className="name text-[25px] font-semibold leading-[25px]">
                                                <GetShortName food_name={sample_foods[0]?.name} length={8} />
                                            </div>
                                        </div>
                                        <div onClick={() => navigate(`/food/${sample_foods[1]?.id}`)} className="left cursor-pointer col-span-1 flex flex-col gap-2">
                                            <img src={sample_foods[1]?.imageUrl} className="img h-[120px] rounded-[8px]  w-full bg-gray-500" />
                                            <div className="name text-[25px] font-semibold leading-[25px]">
                                                <GetShortName food_name={sample_foods[1]?.name} length={8} />
                                            </div>
                                        </div>
                                    </div>}
                            </div>
                        }
                        <div className="text text-[20px] text-neutral-600 font-semibold w-full mb-2 mt-4 justify-start">All Foods</div>
                        <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full flex-wrap justify-center items-center gap-4 mb-4"}>
                            {
                                loading ?
                                    [1, 2, 3, 4].map((val) => (
                                        <div className="col-span-1 flex justify-center items-center">
                                            <Thumbnail_v2_Skeleton />
                                        </div>
                                    ))
                                    :
                                    sample_foods.map((food, ind) => (
                                        <div className="col-span-1 flex justify-center items-center">
                                            <Thumbnails_v2 ind={ind} load_next_5_foods={load_next_5_foods} key={food._id + "" + ind} food={food} />
                                        </div>
                                    ))
                            }
                        </div>
                    </div>
            }
        </div>
    )
}