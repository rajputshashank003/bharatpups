import axios from 'axios';

let currentLink = import.meta.env.VITE_API;

axios.defaults.baseURL = import.meta.env.VITE_MODE === 'development' ? 'http://localhost:8080' : currentLink;