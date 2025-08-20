import { toast } from "react-toastify";

export const copy_phone = (str) => {
    navigator.clipboard.writeText(str);
    toast.success("Phone no. copied");
}