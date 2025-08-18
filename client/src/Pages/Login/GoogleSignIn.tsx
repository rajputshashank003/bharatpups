import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "../../components/Hooks/useAuth";

const GoogleSignIn = () => {
    const navigate = useNavigate();
    const [waiting, setWaiting] = useState(false);
    const { setUser } = useAuth();

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log('login');
            
            setWaiting(true);
            try {
                // tokenResponse contains access_token, but not JWT directly
                const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                });
                const { data } = await axios.post("/api/users/v2/google/signin", {
                    userInfo,
                });
                console.log(data);
                localStorage.setItem("user", JSON.stringify(data));
                setUser(data);
                navigate("/");
            } catch (err) {
                console.log("err", err);
            }
            setWaiting(false);
        },
        onError: () => setWaiting(false),
    });

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, []);

    return (
        <button
            onClick={() => login()}
            disabled={waiting}
            className="w-full max-sm:text-[14px] flex gap-[12px] items-center justify-center py-3 px-4 bg-[#2c2c2e] hover:bg-[#3a3a3c] text-white font-semibold rounded-xl transition duration-300"
        >
            <img src="/google_logo.svg" className="h-[20px] w-[20px]" alt="" />
            <span style={{ fontFamily: "cdg, serif" }}>
                {waiting ? "Loading..." : "Continue with Google"}
            </span>
        </button>
    );
};

export default GoogleSignIn;
