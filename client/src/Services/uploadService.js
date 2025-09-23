import { toast } from 'react-toastify';
import axios from 'axios';
import { review_image_name_key } from '../helpers/utils';

export const uploadImage = async event => {
    let toastId = null;

    const is_review_img = event.target.name === review_image_name_key;
    const image = await getImage(event, is_review_img);

    if (!image) return null;

    const formData = new FormData();
    formData.append('image', image, image.name);
    const response = await axios.post('api/upload', formData, {
        onUploadProgress: ({ progress }) => {
            if (toastId) toast.update(toastId, { progress });
            else toastId = toast.success('Uploading...', { progress });
        },
    });
    toast.dismiss(toastId);
    return response.data;
};

const getImage = async (event, compress = false) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
        toast.warning('No file selected!', { title: 'File Upload' });
        return null;
    }
    const file = files[0];
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        toast.error('Only JPG or PNG files are allowed!', { title: 'File Type Error' });
        return null;
    }

    if (compress) {
        return await compressImage(file);
    }

    return file;
};

const compressImage = (file) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target?.result;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                const maxWidth = 800;
                let width = img.width;
                let height = img.height;
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(
                    (blob) => {
                        if (!blob) return resolve(file);
                        resolve(new File([blob], file.name.replace(/\..+$/, ".jpg"), { type: "image/jpeg" }));
                    },
                    "image/jpeg",
                    0.5
                );
            };
        };
    });
};
