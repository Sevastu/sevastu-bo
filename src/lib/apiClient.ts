import axios from 'axios';
import { getToken, clearAuth } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sevastu-be.onrender.com';

/** Render and similar hosts often need 30–60s+ on cold start; 10s caused login timeouts. */
const API_TIMEOUT_MS = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS) || 60000;

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: API_TIMEOUT_MS,
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
            const method = error.config?.method?.toUpperCase();
            const url = error.config?.url;
            const isTimeout =
                error.code === 'ECONNABORTED' ||
                (typeof error.message === 'string' && error.message.toLowerCase().includes('timeout'));
            if (isTimeout) {
                console.error(
                    `API Error [${method}] ${url}: request timed out after ${API_TIMEOUT_MS}ms. ` +
                        'If the API is on a free tier host, wait for cold start and retry, or increase NEXT_PUBLIC_API_TIMEOUT_MS.',
                );
            } else if (error.response?.status === 404) {
                console.warn(`API [${method}] ${url}: 404 (route or resource not found)`);
            } else {
                console.error(`API Error [${method}] ${url}:`, error.response?.data || error.message);
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
