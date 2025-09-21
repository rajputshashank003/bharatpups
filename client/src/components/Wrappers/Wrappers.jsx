import { GoogleOAuthProvider } from '@react-oauth/google'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../Hooks/useAuth'
import CartProvider from '../Hooks/useCart'
import App from '../../App'
import { ToastContainer } from 'react-toastify'
import { WelcomeModalProvider } from '../Hooks/useWelcomeModal'
const clientId = import.meta.env.VITE_GOOGLE_SIGNIN_ID;

const Wrappers = () => {
    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className=' min-h-svh main_file w-screen bg-[#171717]'>
                <BrowserRouter >
                    <AuthProvider>
                        <CartProvider>
                            <WelcomeModalProvider>
                                <App />
                                <ToastContainer
                                    position='bottom-right' autoClose={5000} hideProgressBar={false}
                                    newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable
                                    pauseOnHover theme='light'
                                />
                            </WelcomeModalProvider>
                        </CartProvider>
                    </AuthProvider>
                </BrowserRouter>
            </div>
        </GoogleOAuthProvider>
    )
}

export default Wrappers