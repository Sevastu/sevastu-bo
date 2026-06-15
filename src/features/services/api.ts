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

export const deleteCategory = async (id: string) => {
    await apiClient.delete(`/categories/${id}`);
};

export const deleteService = async (id: string) => {
    await apiClient.delete(`/services/${id}`);
};

export const deleteSubService = async (id: string) => {
    await apiClient.delete(`/sub-services/${id}`);
};

/** Load full catalog hierarchy from optimized admin endpoint. */
export const fetchCatalogTree = async () => {
    const res = await apiClient.get('/admin/catalog/tree');
    return listFromResponse<any>(res);
};

/** Load catalog overview with counts. */
export const fetchCatalogOverview = async () => {
    const res = await apiClient.get('/admin/catalog/overview');
    return entityFromResponse<{
        categories: number;
        services: number;
        subServices: number;
        activeItems: number;
        inactiveItems: number;
    }>(res);
};

export const fetchCatalogStats = async () => {
    const res = await apiClient.get('/admin/catalog/stats');
    return entityFromResponse<{
        categoryCount: number;
        serviceCount: number;
        subServiceCount: number;
        activeCount: number;
        inactiveCount: number;
    }>(res);
};

/** Search across catalog entities. */
export const searchCatalog = async (query: string) => {
    const res = await apiClient.get('/admin/catalog/search', { params: { q: query } });
    return res.data;
};

/** Centralized reordering endpoint. */
export const reorderCatalog = async (entityType: 'category' | 'service' | 'subService', orderedIds: string[]) => {
    const res = await apiClient.patch('/admin/catalog/reorder', { entityType, orderedIds });
    return res.data;
};

/** Cascade status changes. */
export const cascadeCategoryStatus = async (categoryId: string, isActive: boolean) => {
    const res = await apiClient.patch(`/admin/catalog/category/${categoryId}/cascade-status`, { isActive });
    return res.data;
};

export const cascadeServiceStatus = async (serviceId: string, isActive: boolean) => {
    const res = await apiClient.patch(`/admin/catalog/service/${serviceId}/cascade-status`, { isActive });
    return res.data;
};

export const uploadCatalogAsset = async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return entityFromResponse<{ url: string }>(res);
};
