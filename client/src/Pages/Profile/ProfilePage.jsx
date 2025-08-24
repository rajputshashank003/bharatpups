import React , {useEffect, useState} from "react";
import classes from "./ProfilePage.module.css";
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useAuth } from "../../components/Hooks/useAuth";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import * as userService from "../../Services/userService.js";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ProfilePage () {
    const {user , updateProfile} = useAuth();
    const auth = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        phone : '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(formData);
    }
    useEffect ( ()=> {
        setFormData(user);
    }, [user])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value
        });
    };

    const sendEmailVerification = async () => {
        const {data} = await userService.sendEmailVerification(user.id);
        toast.success(data.msg);
    }
    const logout = () => {
        auth.logout();
        navigate('/login');
    }

    return (
        <>
            <div className={classes.main}>
                <div 
                    // style={{
                    //     backgroundImage: `url('https://images.unsplash.com/photo-1603388360090-41084c4f4b86?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                    //     backgroundSize: 'cover', 
                    // }} 
                    className="h-fit w-[20rem] md:w-[40rem] duration-300 overflow-hidden shadow-[0px_0px_8px] my-4 mb-6 shadow-black/40 rounded-3xl "
                >
                    <div className=" h-full py-8 relative px-8 w-full backdrop-blur-[2px] bg-neutral-800">
                        <div className="relative flex text-white text-center justify-center items-center mb-4 font-semibold text-3xl  border-black">
                            Here’s Your Space to Shine!
                        </div>
                        <div className="relative flex text-neutral-300 text-center justify-center items-center my-4 font-semibold text-gray-800/50 text-sm  border-black">
                            Personalize and Customize Your Experience.
                        </div>
                        <form className="w-full flex justify-center items-center flex-col" onSubmit={handleSubmit} >
                            <Form_Title 
                                name='email'
                                label="E-mail"
                                type='text'
                                variant="outlined"
                                formData={formData}
                                onChange={handleChange}
                                readOnly={true}
                                className='text-white'
                            />
                            <Form_Title 
                                name='name'
                                label="Name"
                                type='text'
                                variant="outlined"
                                formData={formData}
                                onChange={handleChange}
                                readOnly={false}
                                className='text-white'
                            />
                            <motion.button 
                                whileTap={{
                                    scale : 0.7
                                }}
                                type="submit" className="bg-[#D32F2F] duration-300  text-2xl mt-2 p-2 rounded-xl flex justify-center items-center text-neutral-200"
                            >
                                Submit
                            </motion.button>
                        </form>
                    </div>
                </div>
                {/* <form className={classes.details} >
                    {
                        user?.is_verified &&
                        <Alert 
                            severity="success"
                            sx={{
                                width : "100%",
                            }}
                        >
                            Email Verified
                        </Alert>
                    }
                    {
                        !user.is_verified &&
                        <div className={classes.hover_container}>
                            <Alert 
                                onClick={sendEmailVerification} 
                                variant="outlined" 
                                severity="error" 
                                sx={{
                                    cursor: "pointer",
                                    width: "100%",
                                    color: "red",
                                }}
                            >
                                click to verify your email
                            </Alert>
                        </div>
    
                    }
                </form>
                <ChangePassword/> */}
                <div className="flex flex-wrap gap-[12px] ">
                    {
                        user?.name && user?.isAdmin &&
                        <div style={{ fontFamily: 'cdg, serif' }} onClick={() => navigate('/admin/users')} className="bg-neutral-600 rounded-[12px] cursor-pointer text-white p-2 ">
                            All Users
                        </div>
                    }
                    {
                        user?.name &&
                        <div style={{ fontFamily: 'cdg, serif' }} onClick={logout} className="bg-neutral-600 rounded-[12px] cursor-pointer text-white p-2 ">
                            Logout
                        </div>
                    }
                </div>
            </div>
        </>
    );
}

const Form_Title = (props) => {
    return (
        <div className={`${props?.className} relative w-full text-sm mb-2 font-bold text-slate-800`}>
            {props.label}
            <input 
                name={props.name}
                type={props.type} 
                onChange={(e) => props.onChange(e)} 
                className="h-fit p-2 text-black mt-1 w-full font-normal focus:outline-none border rounded-lg" 
                value={props.formData[props.name]} 
                readOnly={props.readOnly}
            />
        </div>
    )
} 