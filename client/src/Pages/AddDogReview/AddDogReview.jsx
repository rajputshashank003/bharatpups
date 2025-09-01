import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { uploadImage } from '../../Services/uploadService';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';
import { useAuth } from '../../components/Hooks/useAuth';
import Loader from '../../components_v2/Loader/Loader';

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export default function AddDogReview() {
    const [imageUrl, setImageUrl] = useState(null);
    const [image_id, set_image_id] = useState(null);
    const [dog_id, set_dog_id] = useState(null);
    const [rating, set_rating] = useState(5);
    const [uploading_image, set_uploading_image] = useState(false);
    const [uploading, set_uploading] = useState(false);
    const saved_ref = useRef(false);

    const auth = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        if (!auth?.user?.name) {
            navigate('/');
        }

        if (location?.state?.dog_id) {
            set_dog_id(location.state.dog_id);
        } else {
            navigate(-1);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (!saved_ref.current && image_id) {
                axios.delete('/api/upload', { data: { image_id } })
                    .then(() => console.log("Deleted unused image:", image_id))
                    .catch(err => console.error("Failed to delete image:", err));
            }
        }
    }, [image_id]);

    const [formData, setFormData] = useState({
        image: null,
        comment: '',
        rating: 5,
    });

    const [imagePreview, setImagePreview] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prevState => ({
                ...prevState,
                image: file
            }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const any_one_is_empty = () => {
        console.log(formData.comment);
        return (
            !imagePreview | !formData.comment
        )
    }

    const handleAddClick = async (e) => {
        e.preventDefault();
        if (!dog_id || uploading || uploading_image) return ;

        if (any_one_is_empty()) {
            toast.error('Fill all the fields');
            return;
        }
        try {
            set_uploading(true);
            const promise = await axios.post('/api/add/review', {
                image: imageUrl,
                comment: formData.comment,
                rating: formData.rating,
                image_id,
                dog: dog_id,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            saved_ref.current = true;
            navigate(`/dog/${dog_id}`);
        } catch (err) {

        } finally {
            set_uploading(false);
        }
    };

    const upload = async event => {
        if (!dog_id) return ;
        try {
            set_uploading_image(true);
            handleImageChange(event);
            if (image_id) {
                axios.delete('/api/upload', { data: { image_id } })
                    .then(() => console.log("Deleted unused image:", image_id))
                    .catch(err => console.error("Failed to delete image:", err));
            }

            setImageUrl(null);
            const { imageUrl, publicId } = await uploadImage(event);
            setImageUrl(imageUrl);
            set_image_id(publicId);
        } catch (err) {
            
        } finally {
            set_uploading_image(false);
        }
    };

    return (
        <div className=" min-h-screen flex items-start justify-center p-4 font-sans">
            <div className="w-full max-w-lg mx-auto bg-[#1C1C1E] shadow-[0px_0px_1px] shadow-neutral-400  p-8 rounded-2xl">
                <h1 style={{ fontFamily: 'cdg, serif' }} className="text-3xl font-bold text-white mb-8 text-center">Add New Review</h1>
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-neutral-300 mb-2">Image</label>
                        <div className="mt-1 flex justify-center py-2 border-2 border-neutral-600 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <div className="flex text-sm text-neutral-400">
                                    <label htmlFor="file-upload" className="relative cursor-pointer flex flex-row justify-center items-center gap-[12px] bg-neutral-700 rounded-md font-medium text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-neutral-800 focus-within:ring-blue-500 px-2">
                                        <UploadIcon />
                                        <span>Upload a file</span>
                                        <input id="file-upload" onChange={upload} name="image" type="file" className="sr-only" accept="image/*" />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {imagePreview && (
                        <img src={imagePreview} alt="Dog preview" className="w-full rounded-lg h-[200px] object-contain shadow-[0px_0px_1px] shadow-neutral-400" />
                    )}
                    
                    <div>
                        <label htmlFor="Rating" className="block text-sm font-medium text-neutral-300">Rating</label>
                        <Rating
                            name="read-only"
                            value={rating}
                            onChange={(e) => set_rating(e.target.value)}
                            sx={{
                                "& .MuiRating-iconEmpty": {
                                    color: "white",   
                                    opacity: 0.7,
                                },
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-neutral-300">Comment</label>
                        <textarea id="comment" name="comment" rows={5} value={formData.comment} onChange={handleInputChange} className="mt-1 block w-full bg-neutral-700 border-neutral-600 rounded-md shadow-sm text-white py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
                    </div>

                    <div>
                        <button
                            style={{ cursor: uploading_image || uploading ? 'default' : 'pointer' }}
                            type="submit"
                            onClick={handleAddClick}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-black bg-white hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-white transition-colors"
                        >
                            {uploading_image || uploading ?
                                <Loader color='white' height={2} width={2} />
                                :
                                <>Add</>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
