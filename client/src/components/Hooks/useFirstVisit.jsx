import { useEffect, useState } from "react";

function useFirstVisit() {
    const [isFirstVisit, setIsFirstVisit] = useState(false);

    useEffect(() => {
        const referrer = document.referrer;
        const hostname = window.location.hostname;

        if (!referrer || !referrer.includes(hostname)) {
            setIsFirstVisit(true);
        } else {
            setIsFirstVisit(false);
        }
    }, []);

    return isFirstVisit;
}

export default useFirstVisit;
