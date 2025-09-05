import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "./axiosConfig.js";
import { AuthProvider } from './components/Hooks/useAuth.jsx';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from 'react-router-dom'
import CartProvider from './components/Hooks/useCart.jsx'
import { LoadingProvider } from './components/Hooks/useLoading.jsx';
import "./components/Interceptors/AuthInterceptor.jsx";
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = import.meta.env.VITE_GOOGLE_SIGNIN_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <GoogleOAuthProvider clientId={clientId}>
            <div className=' min-h-svh main_file w-screen bg-[#171717]'>
                <BrowserRouter >
                    <AuthProvider>
                        <CartProvider>
                            <App />
                            <ToastContainer
                                position='bottom-right' autoClose={5000} hideProgressBar={false}
                                newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable
                                pauseOnHover theme='light'
                            />
                        </CartProvider>
                    </AuthProvider>
                </BrowserRouter>
            </div>
        </GoogleOAuthProvider>
    </>,
)
