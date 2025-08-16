import React from "react";

const FoodPageSkeleton = () => {
    return (
        <div className="w-full px-4 rounded-lg pt-[16px] flex flex-col md:flex-row md:mx-[16%] overflow-hidden p-2 animate-pulse">
            <div className="relative w-full h-[320px] bg-neutral-500 rounded-md"></div>
            <div className="p-4 space-y-3">
                <div className="h-4 bg-neutral-500 rounded w-3/4"></div>
                <div className="h-3 bg-neutral-500 rounded w-1/4"></div>
                <div className="flex space-x-2">
                    <div className="h-4 w-4 bg-neutral-500 rounded"></div>
                    <div className="h-4 w-4 bg-neutral-500 rounded"></div>
                    <div className="h-4 w-4 bg-neutral-500 rounded"></div>
                    <div className="h-4 w-4 bg-neutral-500 rounded"></div>
                    <div className="h-4 w-4 bg-neutral-500 rounded"></div>
                </div>
                <div className="flex space-x-2 mt-2">
                    <div className="h-6 w-20 bg-neutral-500 rounded-full"></div>
                    <div className="h-6 w-16 bg-neutral-500 rounded-full"></div>
                </div>
                <div className="mt-4 h-10 bg-neutral-500 rounded-md"></div>
            </div>
        </div>
    );
};

export default FoodPageSkeleton;
