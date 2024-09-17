import axios from "axios";
import { BASE_URL } from "../dev";
import { isLoggedIn, logout } from '../../utils/auth'

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${isLoggedIn()}`,
    }
})

// Add a request interceptor to set the Authorization header dynamically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = isLoggedIn(); // Get the latest token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    response => {
        // Return the response if it's successful
        return response;
    },
    error => {
        if (error.response && error.response.status === 403) {
            logout(); // Clear the token
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;