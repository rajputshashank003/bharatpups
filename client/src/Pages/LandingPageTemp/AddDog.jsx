import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { uploadImage } from '../../Services/uploadService';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);

export default function AddDog() {
    const [imageUrl, setImageUrl] = useState(null);
    const [image_id, set_image_id] = useState(null);
    const [loading, set_loading] = useState(false);
    const [uploading_image, set_uploading_image] = useState(false);
    const [image_updated, set_image_updated] = useState(false);
    const saved_ref = useRef(false);

    const [formData, setFormData] = useState({
        image: null,
        name: '',
        breed: '',
        age: '',
        gender: 'Male',
        description: '',
        in_stock: true,
    });
    const [imagePreview, setImagePreview] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        return () => {
            if (!saved_ref.current && image_id && image_updated) {
                axios.delete('/api/upload', { data: { image_id } })
                    .then(() => console.log("Deleted unused image:", image_id))
                    .catch(err => console.error("Failed to delete image:", err));
            }
        };
    }, [image_id, image_updated]);

    useEffect(() => {
        async function fetchDog() {
            try {
                set_loading(true);
                const { data } = await axios.get(`/api/dog/id/${id}`);
                if (data?.dog) {
                    const dog = data.dog;
                    setFormData({
                        image: dog.image || null,
                        name: dog.name || '',
                        breed: dog.breed || '',
                        age: dog.age || '',
                        gender: dog.gender || 'Male',
                        description: dog.description || '',
                        in_stock: dog.in_stock || true,
                        delete_image: dog?.image_id
                    });
                    if (dog.image) {
                        setImagePreview(dog.image);
                        setImageUrl(dog.image);
                        set_image_id(dog.image_id);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch dog:", err);
            } finally {
                set_loading(false);
            }
        }
        if ( id ) {
            fetchDog();
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === "checkbox" ? checked : value,
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
        return (
            !imagePreview |
            !formData.name | !formData.age |
            !formData.breed | !formData.description |
            !formData.gender
        )
    }

    const handleAddClick = async (e) => {
        e.preventDefault();
        if( uploading_image ) {
            toast.error('uploading image!');
            return ;
        }
        if ( any_one_is_empty() ) {
            toast.error('Fill all the fields');
            return ;
        }
        const data = {
            image: imageUrl,
            name: formData.name,
            breed: formData.breed,
            age: formData.age,
            gender: formData.gender,
            description: formData.description,
            delete_image: formData.delete_image,
            in_stock: formData.in_stock,
            image_id,
        };
        try {
            if ( id ) {
                const promise = await axios.put(`/api/dog/${id}`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                const promise = await axios.post('/api/add', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
            saved_ref.current = true;
            navigate("/explore");
        } catch (err)  {

        }
    };

    const upload = async event => {
        try {
            set_uploading_image(true);
            handleImageChange(event);
            setImageUrl(null);
            const { imageUrl, publicId } = await uploadImage(event);
            setImageUrl(imageUrl);
            set_image_id(publicId);
            set_image_updated(true);
            setFormData(prev => ({
                ...prev,
                delete_image: image_id
            }));
        } catch (err) {

        } finally {
            set_uploading_image(false);
        }
    };

    return (
        <div className=" min-h-screen flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-lg mx-auto bg-[#1C1C1E] shadow-[0px_0px_1px] shadow-neutral-400  p-8 rounded-2xl">
                <h1 style={{ fontFamily: 'cdg, serif'}} className="text-3xl font-bold text-white mb-8 text-center">
                    { id ? 'Update dog' : 'Add a New Dog'}
                </h1>
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-neutral-300">Name</label>
                            <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full bg-neutral-700 border-neutral-600 rounded-md shadow-sm text-white py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>

                        <div>
                            <label htmlFor="breed" className="block text-sm font-medium text-neutral-300">Breed</label>
                            <input type="text" name="breed" id="breed" value={formData.breed} onChange={handleInputChange} className="mt-1 block w-full bg-neutral-700 border-neutral-600 rounded-md shadow-sm text-white py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>

                        <div>
                            <label htmlFor="age" className="block text-sm font-medium text-neutral-300">Age</label>
                            <input type="number" name="age" id="age" value={formData.age} onChange={handleInputChange} className="mt-1 block w-full bg-neutral-700 border-neutral-600 rounded-md shadow-sm text-white py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="gender" className="block text-sm font-medium text-neutral-300">Gender</label>
                            <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-neutral-700 border-neutral-600 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                <option className='bg-neutral-900' >Male</option>
                                <option className='bg-neutral-900'>Female</option>
                            </select>
                        </div>
                        <div class="flex items-center">
                            <input name='in_stock' onChange={handleInputChange} id="in_stock" type="checkbox" checked={formData.in_stock} class="w-4 h-4 text-blue-600 rounded-sm  ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"/>
                            <label for="in_stock" class="ms-2 text-sm font-medium text-gray-200">In Stock</label>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-neutral-300">Description</label>
                        <textarea id="description" name="description" rows={4} value={formData.description} onChange={handleInputChange} className="mt-1 block w-full bg-neutral-700 border-neutral-600 rounded-md shadow-sm text-white py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
                    </div>

                    <div>
                        <button
                            disabled={uploading_image}
                            type="submit"
                            onClick={handleAddClick}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-black bg-white hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800 focus:ring-white transition-colors"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
