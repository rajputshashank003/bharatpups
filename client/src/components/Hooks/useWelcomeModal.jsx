import { createContext, useContext, useEffect, useState } from "react";
import useFirstVisit from "./useFirstVisit";

const WelcomeModalContext = createContext({
    isOpen: false,
    closeModal: () => { },
});

export const WelcomeModalProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isFirstVisit = useFirstVisit(); // 🔹 use your hook here

    useEffect(() => {
        // Show only if it's first visit AND not already shown this session
        if (isFirstVisit && !sessionStorage.getItem("welcome_shown")) {
            setIsOpen(true);
            sessionStorage.setItem("welcome_shown", "true");
        }
    }, [isFirstVisit]);

    const closeModal = () => setIsOpen(false);

    return (
        <WelcomeModalContext.Provider value={{ isOpen, closeModal }}>
            {children}
        </WelcomeModalContext.Provider>
    );
};

export const useWelcomeModal = () => useContext(WelcomeModalContext);
