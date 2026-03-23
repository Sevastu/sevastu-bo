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
    const { access_token, user } = response.data.data;

    setToken(access_token);
    setUser(user);

    return response.data;
};
