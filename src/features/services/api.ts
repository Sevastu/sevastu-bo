import apiClient from '@/lib/apiClient';
import { Category, Service, SubService } from './types';

/** Nest `ResponseInterceptor` returns `{ success, data }`; list endpoints still expose the array on `.data`. */
function listFromResponse<T>(res: { data: unknown }): T[] {
    const body = res.data;
    if (Array.isArray(body)) return body as T[];
    if (body && typeof body === 'object' && Array.isArray((body as { data?: unknown }).data)) {
        return (body as { data: T[] }).data;
    }
    return [];
}

function entityFromResponse<T>(res: { data: unknown }): T {
    const body = res.data;
    if (body && typeof body === 'object' && body !== null && 'data' in body) {
        const inner = (body as { data: T }).data;
        if (inner !== undefined && inner !== null) return inner;
    }
    return body as T;
}

export const fetchCategories = async () => {
    const res = await apiClient.get('/categories');
    return listFromResponse<Category>(res);
};

export const createCategory = async (data: Partial<Category>) => {
    const res = await apiClient.post('/categories', data);
    return entityFromResponse<Category>(res);
};

export const updateCategory = async (id: string, data: Partial<Category>) => {
    const res = await apiClient.patch(`/categories/${id}`, data);
    return entityFromResponse<Category>(res);
};

export const fetchServices = async (categoryId?: string) => {
    const res = await apiClient.get('/services', { params: { categoryId } });
    return listFromResponse<Service>(res);
};

export const createService = async (data: Partial<Service>) => {
    const res = await apiClient.post('/services', data);
    return entityFromResponse<Service>(res);
};

export const updateService = async (id: string, data: Partial<Service>) => {
    const res = await apiClient.patch(`/services/${id}`, data);
    return entityFromResponse<Service>(res);
};

export const fetchSubServices = async (serviceId?: string) => {
    const res = await apiClient.get('/sub-services', { params: { serviceId } });
    return listFromResponse<SubService>(res);
};

export const createSubService = async (data: Partial<SubService>) => {
    const res = await apiClient.post('/sub-services', data);
    return entityFromResponse<SubService>(res);
};

export const updateSubService = async (id: string, data: Partial<SubService>) => {
    const res = await apiClient.patch(`/sub-services/${id}`, data);
    return entityFromResponse<SubService>(res);
};
