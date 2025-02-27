import axios, { AxiosInstance } from 'axios';

const NETWORK_TIMEOUT = 15000; // 15 seconds

const instance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: NETWORK_TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instance;

