import { toast } from "react-toastify";

export const copy_phone = (str = import.meta.env.VITE_PHONE) => {
    navigator.clipboard.writeText(str);
    toast.success("Phone no. copied");
}

export const whatsapp_message = (breed) => {
    return `Hi, Bharatpups!! I would like to enquire about ${breed ?? 'dogs'}`;
}
export const open_whatsapp = (breed) => {
    window.open(`https://wa.me/${import.meta.env.VITE_PHONE}?text=${whatsapp_message(breed)}`, "_blank");
}

export const call_us = () => {
    window.open(`tel:${import.meta.env.VITE_PHONE}`);
    copy_phone(import.meta.env.VITE_PHONE);
}

export const BREEDS_KEY = "BREEDS_KEY";
export const BREEDS_EXPIRY_DAYS = 2;
export const MAX_BREEDS_USES = 5;