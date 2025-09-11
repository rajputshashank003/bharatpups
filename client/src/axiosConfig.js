import axios from 'axios';

let real_api = import.meta.env.VITE_API;
let mock_api = import.meta.env.VITE_MOCK_API;

axios.defaults.baseURL = import.meta.env.VITE_MODE === 'development'
    ? 'http://localhost:8080'
    : mock_api;

const change_to_real = async () => {
    try {
        const res = await fetch(real_api, { method: "GET" });
        if (res.ok) {
            axios.defaults.baseURL = import.meta.env.VITE_MODE === 'development'
                ? 'http://localhost:8080'
                : real_api;
            return true;
        }
    } catch { }
    return false;
};

change_to_real().then((switched) => {
    if (!switched) {
        const interval = setInterval(() => {
            change_to_real().then((didSwitch) => {
                if (didSwitch) {
                    clearInterval(interval); // stop checking
                }
            });
        }, 6000);
    }
});
