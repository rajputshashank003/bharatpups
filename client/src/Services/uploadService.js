import { toast } from 'react-toastify';
import axios from 'axios';

export const uploadImage = async event => {
    let toastId = null;

    const image = await getImage(event);
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

const getImage = async (event) => {
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

    return file;
};
