import axios from 'axios';
const sourceURL = "http://192.168.43.206:8000";

const axiosInstance = axios.create({
    baseURL: sourceURL,
    headers: {
        "Content-Type": "application/json",
    },
})

axiosInstance.interceptors.request.use(
    function (config) {
        const access_token = sessionStorage.getItem("access_token");
        if (access_token) {
            config.headers.common["Authorization"] = `Bearer ${access_token.replace(/"/g, '')}`;
        }

        // config.headers.common["Authorization"] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwdyI6InF3ZXIiLCJpZCI6ImxlZSIsImlzQWRtaW4iOmZhbHNlfQ.nHm7Nfogep7dz_-vvVZ-B2vmBhYzFd5hZWf4kTpdHe0';
        return config;
    },

    function (err) {
        return Promise.reject(err);
    }
)

export {
    axiosInstance
};