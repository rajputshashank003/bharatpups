import React from 'react';

const Thumbnail_v2_Skeleton = () => {
    return (
        <div className="w-full max-w-xs bg-white rounded-lg shadow-md overflow-hidden">

            {/* Image Placeholder */}
            <div className="relative">
                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                {/* Heart Icon Placeholder */}
                <div className="absolute top-2 right-2 w-10 h-10 bg-gray-300 rounded-md animate-pulse"></div>
            </div>

            {/* Content Section */}
            <div className="p-4">
                {/* Top row with Title and Rating */}
                <div className="flex justify-between items-center mb-4">
                    {/* Product Name Placeholder */}
                    <div className="w-3/5 h-6 bg-gray-200 rounded animate-pulse"></div>
                    {/* Rating Placeholder */}
                    <div className="w-1/5 h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>

                {/* Bottom row with Price and Add to Cart Button */}
                <div className="flex justify-between items-center">
                    {/* Price Placeholder */}
                    <div className="w-1/4 h-8 bg-gray-200 rounded animate-pulse"></div>
                    {/* Button Placeholder */}
                    <div className="w-1/3 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};
export default Thumbnail_v2_Skeleton;

