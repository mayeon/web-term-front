import axios from 'axios';
const sourceURL = "http://117.20.197.141:8080";

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
        return config;
    },

    function (err) {
        return Promise.reject(err);
    }
)

export {
    axiosInstance
};