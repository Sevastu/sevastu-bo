import axios from 'axios';
import { getToken, clearAuth } from './auth';

const IS_DEV = process.env.NODE_ENV === 'development';
const API_BASE_URL = IS_DEV ? '/api' : (process.env.NEXT_PUBLIC_API_URL || 'https://sevastu-be.vercel.app');

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
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
