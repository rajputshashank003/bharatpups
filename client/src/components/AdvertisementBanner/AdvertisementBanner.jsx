import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function AdvertisementBanner() {
    const location = useLocation();
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        if (location.pathname === "/explore" && !sessionStorage.getItem("exploreBannerShown")) {
            setShowBanner(true);
            sessionStorage.setItem("exploreBannerShown", "true");
        }
    }, [location.pathname]);

    const closeModal = () => {
        setShowBanner(false);
    };

    const handle_advertisement_click = () => {
        console.log("Advertisement clicked!");
    };

    return (
        <>
            {showBanner && (
                <div className="fixed cursor-pointer inset-0 flex items-center justify-center bg-black/70 z-[9999999]">
                    <div className="bg-white rounded-xl p-[12px] shadow-lg relative w-[90%] max-w-[350px] h-[80%] max-h-[400px] flex items-center justify-center">
                        <button
                            className="absolute -top-[16px] -right-[12px] text-xl bg-neutral-300 p-[8px] py-[6px] hover:bg-neutral-400 duration-100 rounded-[12px] font-bold text-gray-700"
                            onClick={closeModal}
                        >
                            ✖
                        </button>
                        <img
                            onClick={handle_advertisement_click}
                            src="/AdvertisementImages/Bull15.png"
                            alt="Welcome"
                            className="rounded-lg h-full w-full object-contain"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
