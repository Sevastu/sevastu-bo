import { apiClient } from '@/lib/apiClient';
import { setToken, setUser, User } from '@/lib/auth';

export interface LoginResponse {
    success: boolean;
    data: {
        access_token: string;
        user: User;
    }
}

export const loginApi = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/admin/auth/login', { email, password });
    
    // Standard response format from backend is { success: true, data: { accessToken, user } }
    const { access_token: accessToken, user } = response.data.data;

    if (accessToken && user) {
        setToken(accessToken);
        setUser(user);
    }

    return response.data;
};
