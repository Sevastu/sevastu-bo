import axios from 'axios';
import { getToken, clearAuth } from './auth';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sevastu-be.onrender.com';
// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Auto logout if 401 response returned from api
            clearAuth();
            if (typeof window !== 'undefined') {
                window.location.href = '/login';
            }
        } else {
            // Log other errors for debugging
            console.error(`API Error [${error.config?.method?.toUpperCase()}] ${error.config?.url}:`, 
                error.response?.data || error.message);
        }
        return Promise.reject(error);
    }
);

export default apiClient;
