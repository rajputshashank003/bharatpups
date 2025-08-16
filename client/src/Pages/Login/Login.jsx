import React, { useEffect, useState } from 'react';
import classes from "./Login.module.css";
import {Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from '../../components/Hooks/useAuth';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

export default function Login() {
    const {user, login} = useAuth();
    
    const [params] = useSearchParams();
    const [email , setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(false);
    const returnUrl = params.get("returnUrl");
    const navigate = useNavigate();
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [passwordType, setPasswordType] = useState(true);

    useEffect(() => {
        if(!user) return ;
        returnUrl ? navigate(returnUrl) : navigate("/");
    }, [user]);
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const password = e.target.password.value;
        if( !email || !password ) {
        toast.error("Invalid email or password")
        return;
        }
        if(!email.includes('@') ) {
        toast.error("Invalid email");
        return ;
        }
        await login(email , password);
    }
    const verifyEmail = (e) => {
        e.preventDefault();
        const email = e.target.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmail(email);
        if (emailRegex.test(email)) {
        setEmailIsValid(true);
        } else {
        setEmailIsValid(false);
        }
    };

    const verifyPassword = (e) => {
        e.preventDefault();
        setPassword(e.target.value);
    }
    return (
        <div className={" flex justify-center items-center flex-col max-sm:justify-start max-sm:top-10 max-sm:relative h-[90vh] p-2 max-sm:p-1"}>
            <div className='text-[30px] leading-tight text-[#D32F2F] font-bold '>
                Taste Awaits
            </div>
            <div className="text-[40px] mb-12 leading-[35px] text-zinc-800 font-semibold">
                Login to explore
            </div>
            <form className='flex flex-col gap-4 w-fit items-center' onSubmit={handleSubmit} noValidate>
                <div style={{ borderWidth: emailFocus ? '1px' : '0px'}} className='flex flex-row h-[50px] w-fit rounded-[12px] overflow-hidden border-[#D32F2F] p-2 bg-gray-200 justify-center items-center '>
                    <div className='text-gray-700 border- border-black w-[30px] h-[25px]' >
                    <svg xmlns="http://www.w3.org/2000/svg"  width="currentWidth"  height="currentHeight"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-mail"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z" /><path d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z" /></svg>
                    </div>
                    <input 
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        onChange={(e) => verifyEmail(e)}
                        type="text" 
                        name='email'
                        value={email}
                        className='focus:outline-none  border- border-red-600 text-[16px] bg-gray-200 px-4 flex justify-center items-center border- border-red-80 h-[46px] w-[260px] max-sm:w-full'
                    />
                    <div className=' text-[#D32F2F] border- border-black w-[46px] h-[40px]' >
                    {      
                        emailIsValid &&    
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="currentWidth"  height="currentHeight"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-circle-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" /></svg>
                    }          
                    </div>
                </div>
                <div style={{ borderWidth: passwordFocus ? '1px' : '0px'}} className='flex flex-row h-[50px] w-fit rounded-[12px] overflow-hidden border-[#D32F2F] p-2 bg-gray-200 justify-center items-center '>
                    <div className='text-gray-700 border- border-black w-[30px] h-[25px]' >
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="currentWidth"  height="currentHeight"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-lock"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" /><path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" /><path d="M8 11v-4a4 4 0 1 1 8 0v4" /></svg>
                    </div>
                    <input 
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        onChange={(e) => verifyPassword(e)}
                        type={passwordType ? 'password' : 'text'} 
                        name='password'
                        value={password}
                        className='focus:outline-none  border- border-red-600 text-[16px] bg-gray-200 px-4 flex justify-center items-center border- border-red-80 h-[46px] w-[260px] max-sm:w-full '
                    />
                    <div onClick={() => setPasswordType(prev => !prev)} className=' text-[#D32F2F] border- border-black w-[46px] h-[25px] cursor-pointer' >
                    {   
                        !passwordType ?
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="currentWidth"  height="currentHeight"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>   
                        :
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="currentWidth"  height="currentHeight"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" /><path d="M3 3l18 18" /></svg>
                    }          
                    </div>
                </div>
                <div className="forgot_pass text-[#D32F2F] cursor-pointer text-sm font-semibold w-full flex justify-end">
                    Forgot Password ?
                </div>
                <motion.button 
                    whileTap={{
                        scale: 0.8,
                    }}
                    transition={{
                        duration: 0.3,
                        ease: 'linear'
                    }}
                    type='submit' className='bg-[#D32F2F] text-white text-[25px] w-full rounded-[12px] h-[46px]'>
                    Submit
                </motion.button>
            </form>
            <div className={"absolute w-full flex justify-center bottom-0 max-sm:bottom-20 left-1/2 -translate-x-1/2 "}>
                New user? &nbsp;
                <Link className='m-0' to={`/register`}>
                    Register here
                </Link>
            </div>
        </div>
    )
}
