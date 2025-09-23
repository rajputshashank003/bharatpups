import axios from 'axios';

const is_dev_mode = import.meta.env.VITE_MODE === 'development';

let real_api = is_dev_mode ? 'http://localhost:8080/' : import.meta.env.VITE_API;
let mock_api = is_dev_mode ? 'http://localhost:8008/' : import.meta.env.VITE_MOCK_API;

axios.defaults.baseURL = mock_api;

const change_to_real = async () => {
    try {
        const res = await fetch(real_api, { method: "GET" });
        if (res.ok) {
            axios.defaults.baseURL = real_api;
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
        }, 3000);
    }
});
