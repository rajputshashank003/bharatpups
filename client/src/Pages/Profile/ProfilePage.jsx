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

export default function ProfilePage () {
    const {user , updateProfile} = useAuth();
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
    return (
        <>
            <div className={classes.main}>
                <div 
                    style={{
                        backgroundImage: `url('https://t4.ftcdn.net/jpg/05/21/93/15/240_F_521931515_9KUfACTTx8XZrP9pnl2pG9lr8w2mijaL.jpg')`,
                        backgroundSize: 'cover', 
                    }} 
                    className="h-fit w-[20rem] md:w-[40rem] duration-300 overflow-hidden shadow-[0px_0px_8px] my-4 mb-6 shadow-black/40 rounded-3xl "
                >
                    <div className=" h-full py-8 relative px-8 w-full backdrop-blur-[2px] bg-white/40">
                        <div className="relative flex text-center justify-center items-center mb-4 font-semibold text-3xl  border-black">
                            Here’s Your Space to Shine!
                        </div>
                        <div className="relative flex text-center justify-center items-center my-4 font-semibold text-gray-800/50 text-sm  border-black">
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
                            />
                            <Form_Title 
                                name='name'
                                label="Name"
                                type='text'
                                variant="outlined"
                                formData={formData}
                                onChange={handleChange}
                                readOnly={false}
                            />
                            <Form_Title 
                                name='phone'
                                label="Phone No."
                                type='text'
                                variant="outlined"
                                formData={formData}
                                onChange={handleChange}
                                readOnly={false}
                            />
                            <Form_Title 
                                name='address'
                                label="Address"
                                type='text'
                                variant="outlined"
                                formData={formData}
                                onChange={handleChange}
                                readOnly={false}
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
                <form className={classes.details} >
                    {
                        user.is_verified &&
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
                <ChangePassword/>
            </div>
        </>
    );
}

const Form_Title = (props) => {
    return (
        <div className="relative w-full text-sm mb-2 font-bold text-slate-800">
            {props.label}
            <input 
                name={props.name}
                type={props.type} 
                onChange={(e) => props.onChange(e)} 
                className="h-fit p-2 mt-1 w-full font-normal focus:outline-none border rounded-lg" 
                value={props.formData[props.name]} 
                readOnly={props.readOnly}
            />
        </div>
    )
} 