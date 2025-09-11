import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import "./axiosConfig.js";
import "react-toastify/dist/ReactToastify.css";
import "./components/Interceptors/AuthInterceptor.jsx";
import Wrappers from './components/Wrappers/Wrappers.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Wrappers />,
)
