import React, { useEffect, useState } from 'react'
import SideBar from '../../components_v3/SideBar'
import Thumbnail_v2_Skeleton from '../../components/Loader_Skeletons/Thumbnail_v2_Skeleton'
import Header_v2 from '../../components_v2/Header_v2/Header_v2';
import { useNavigate } from 'react-router-dom';
import Chip_v2 from '../../components_v2/Chip/Chip_v2';
import SignInCard from './SignInCard';
import axios from 'axios';
import Thumbnails_v2 from '../../components_v2/Thumbnails_v2/Thumbnails_v2';

const Explore = () => {
    const [loading, set_loading] = useState(true);
    const [data, set_data] = useState();
    const [breeds, set_breeds] = useState();
    const [render_sign_in_card, set_render_sign_in_card] = useState(false);
    const is_favorites = window.location.pathname.includes('/favorites');
    const is_logged_in = false;

    const fetchAllDogs = async () => {
        try {
            set_loading(true);
            const response = await axios.get('/api/dog');
            set_data(response.data.dogs);
            set_breeds(response.data.breeds);
            console.log(response.data);
        } catch (error) {
            console.error("Failed to fetch dog data:", error);
        } finally {
            set_loading(false);
        }
    };

    useEffect(() => {
        if ( is_favorites ) {
            if ( !is_logged_in) {
                set_render_sign_in_card(true);
            } else {
                fetchAllDogs();
            }
        } else {
            fetchAllDogs();
        }
    } ,[]);
    const navigate = useNavigate();

    return (
        <div className="min-h-screen relative text-gray-200 flex flex-row items-start justify-center gap-[32px] font-sans p-[20px]">
            <SideBar />
            <div className="w-full max-w-2xl mx-auto flex flex-col items-start">
               { 
                is_favorites ?
                is_logged_in ?
                <>
                    <div className='sticky top-[24px] bg-[#171717] border-[1px] border-t-0 border-l-0 border-r-0 border-b-neutral-700/60 pb-[42px] z-[99] w-full ' >
                        <div className="absolute bg-[#171717] h-[50px] w-full top-0 -translate-y-[100%] z-[9]"></div>
                        <Header_v2 />
                    </div>
                    <div className={"flex flex-row gap-[12px] lg:gap-[16px] my-[18px] w-full overflow-scroll"}>
                        {
                            loading &&
                            [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4].map((val) => (
                                <div onClick={() => navigate('/food/23423432')} className="col-span-1 flex justify-center items-center">
                                    <Chip_v2 tag={val} />
                                </div>
                            ))

                        }
                    </div>
                    <div className={"grid grid-cols-1 sm:grid-cols-2 w-full flex-wrap justify-start items-start gap-[24px] mb-4"}>
                        {
                            loading &&
                                [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4].map((val) => (
                                    <div onClick={() => navigate('/food/23423432')} className="col-span-1 flex justify-center items-center">
                                        <Thumbnail_v2_Skeleton />
                                    </div>
                                ))
                                
                        }
                    </div> 
                </> : 
                <div className='h-full w-full flex justify-center items-center'>
                    <SignInCard />
                </div> :
                <>
                    <div className='sticky top-[24px] bg-[#171717] border-[1px] border-t-0 border-l-0 border-r-0 border-b-neutral-700/60 pb-[42px] z-[99] w-full ' >
                        <div className="absolute bg-[#171717] h-[50px] w-full top-0 -translate-y-[100%] z-[9]"></div>
                        <Header_v2 />
                    </div>
                    <div className={"flex flex-row gap-[12px] lg:gap-[16px] my-[18px] w-full overflow-scroll"}>
                        {
                            loading ?
                            [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4].map((val) => (
                                <div onClick={() => navigate('/food/23423432')} className="col-span-1 flex justify-center items-center">
                                    <Chip_v2 tag={''} />
                                </div>
                            )) : 
                            breeds.map((val) => (
                                <div onClick={() => navigate('/food/23423432')} className="col-span-1 flex justify-center items-center">
                                    <Chip_v2 tag={val} />
                                </div>
                            ))
                        }
                    </div>
                    <div className={"grid grid-cols-1 sm:grid-cols-2 w-full flex-wrap justify-start items-start gap-[24px] mb-4"}>
                        {
                            loading ?
                            [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4].map((val) => (
                                <div onClick={() => navigate('/food/23423432')} className="col-span-1 flex justify-center items-center">
                                    <Thumbnail_v2_Skeleton />
                                </div>
                            )) :
                            data.map( (d, idx) => (
                                <Thumbnails_v2 food={d} load_next_5_foods={false} ind={idx} />
                            ))
                        }
                    </div>
                </>
                }
            </div>
        </div>
    )
}

export default Explore