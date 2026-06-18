import apiClient from '@/lib/apiClient';

const API_URL = '/categories'; // Using apiClient which has the correct base URL

export interface Category {
  _id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  icon?: string;
  iconKey?: string;
  status: 'active' | 'inactive';
  serviceCount: number;
  subServiceCount: number;
  activeServiceCount: number;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  data: Category[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  stats: {
    totalCategories: number;
    activeCategories: number;
    inactiveCategories: number;
    totalServices: number;
  };
}

export const CategoriesService = {
  async getCategories(params?: { search?: string; status?: string; sort?: string; page?: number; limit?: number }) {
    const { data } = await apiClient.get<{ success: boolean; data: CategoriesResponse }>(API_URL, { params });
    return data.data;
  },

  async getCategory(id: string) {
    const { data } = await apiClient.get<{ success: boolean; data: Category }>(`${API_URL}/${id}`);
    return data.data;
  },

  async createCategory(categoryData: Partial<Category>) {
    const { data } = await apiClient.post<{ success: boolean; data: Category }>(API_URL, categoryData);
    return data.data;
  },

  async updateCategory(id: string, categoryData: Partial<Category>) {
    const { data } = await apiClient.patch<{ success: boolean; data: Category }>(`${API_URL}/${id}`, categoryData);
    return data.data;
  },

  async deleteCategory(id: string) {
    const { data } = await apiClient.delete<{ success: boolean; data: any }>(`${API_URL}/${id}`);
    return data.data;
  }
};
