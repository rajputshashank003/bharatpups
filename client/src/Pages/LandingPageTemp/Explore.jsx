import React from 'react'
import SideBar from '../../components_v3/SideBar'
import Thumbnail_v2_Skeleton from '../../components/Loader_Skeletons/Thumbnail_v2_Skeleton'

const Explore = () => {
    const loading = true;
    return (
        <div className="min-h-screen relative text-gray-200 flex flex-row items-start justify-center font-sans p-[20px]">
            <SideBar />
            <div className="w-full max-w-2xl mx-auto flex flex-col items-start">
                <div className={"grid grid-cols-1 sm:grid-cols-2 w-full flex-wrap justify-start items-start gap-[24px] mb-4"}>
                    {
                        loading &&
                            [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4].map((val) => (
                                <div className="col-span-1 flex justify-center items-center">
                                    <Thumbnail_v2_Skeleton />
                                </div>
                            ))
                            
                    }
                </div>
            </div>
        </div>
    )
}

export default Explore