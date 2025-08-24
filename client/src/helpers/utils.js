import { toast } from "react-toastify";

export const copy_phone = (str = '+91 99876363773') => {
    navigator.clipboard.writeText(str);
    toast.success("Phone no. copied");
}