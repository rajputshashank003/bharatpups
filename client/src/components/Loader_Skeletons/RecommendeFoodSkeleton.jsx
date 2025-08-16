import React from 'react';

const RecommendedFoodSkeleton = () => {
    return (
        <div className="w-36 h-40 bg-gray-100 rounded-xl p-2 shadow-md animate-pulse">
            {/* Image placeholder */}
            <div className="w-full h-24 bg-gray-200 rounded-lg mb-2"></div>

            {/* Title placeholder */}
            <div className="w-3/4 h-4 bg-gray-200 rounded mb-1"></div>

            {/* Time placeholder */}
            <div className="w-1/4 h-3 bg-gray-200 rounded"></div>
        </div>
    );
};

export default RecommendedFoodSkeleton;
