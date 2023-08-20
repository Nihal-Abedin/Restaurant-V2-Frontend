import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import Cookies from 'js-cookie';

const getToken = () => {
    const token = Cookies.get("JWT_TOKEN")
    return token
}
// Create a custom Axios instance
const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BASE_URL, // Set your API base URL
    headers: { "Content-Type": "application/json" }
    // Other configuration options...
});

// Optional: You can also customize default request headers, interceptors, etc.
// axiosInstance.defaults.headers.common['Authorization'] = 'Bearer your-token';

// Optional: Add interceptors for request/response
instance.interceptors.request.use((config) => {

    const token = getToken()
    if (token) {

        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, (error: AxiosError) => {

    // Handle request error
    return Promise.reject(error.response);
});

instance.interceptors.response.use((response: AxiosResponse) => {
    const res: any = {
        data: response.data,
        code: response.status,
    }
    // Modify response data if needed
    return res;
}, (error: AxiosError) => {

    // Handle response error
    return Promise.reject(error.response?.data);
});

export default instance;