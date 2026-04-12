export const TOKEN_KEY = 'sevastu_access_token';
export const USER_KEY = 'sevastu_user';

import { UserRole, UserStatus } from './enums';

export interface User {
    id: string;
    name: string;
    email?: string;
    role: UserRole;
    status: UserStatus;
}

export const setToken = (token: string) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(TOKEN_KEY, token);
        // Also set as a cookie so middleware.ts can access it for protected routes
        document.cookie = `${TOKEN_KEY}=${token}; path=/; max-age=86400; SameSite=Strict`;
    }
};

export const getToken = (): string | null => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem(TOKEN_KEY);
    }
    return null;
};

export const removeToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(TOKEN_KEY);
        document.cookie = `${TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
    }
};

export const setUser = (user: User) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
};

export const getUser = (): User | null => {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem(USER_KEY);
        if (!user || user === 'undefined') return null;
        try {
            return JSON.parse(user);
        } catch (e) {
            console.warn('Failed to parse user from localStorage', e);
            localStorage.removeItem(USER_KEY);
            return null;
        }
    }
    return null;
};

export const removeUser = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(USER_KEY);
    }
};

export const clearAuth = () => {
    removeToken();
    removeUser();
};
