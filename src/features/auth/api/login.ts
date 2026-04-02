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
    console.log("Raw login response data:", response.data);
    let access_token, user;
    if ((response.data as any).data && (response.data as any).data.access_token) {
        access_token = (response.data as any).data.access_token;
        user = (response.data as any).data.user;
    } else {
        access_token = (response.data as any).access_token;
        user = (response.data as any).user;
    }
    console.log("Extracted token:", access_token);
    console.log("Extracted user:", user);

    setToken(access_token);
    setUser(user);

    return response.data;
};
