import { useState, useCallback, useEffect } from 'react';
import { SubService, Service } from '@/features/services/types';
import { fetchSubServices, fetchServices, createSubService, updateSubService, deleteSubService } from '@/features/services/api';
import { SubServiceFiltersState, SortConfig } from '../types/subService-ui.types';
import { useDebounce } from './useDebounce';

export function useSubServices() {
    const [subServices, setSubServices] = useState<SubService[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(false);

    // Filters
    const [filters, setFilters] = useState<SubServiceFiltersState>({
        search: '',
        parentService: 'all',
        status: 'all',
        priceType: 'all',
    });

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState<SortConfig>(null);

    const debouncedSearch = useDebounce(filters.search, 300);

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const [fetchedSubServices, fetchedServices] = await Promise.all([
                fetchSubServices(),
                fetchServices()
            ]);
            setSubServices(fetchedSubServices);
            setServices(fetchedServices);
        } catch (err) {
            console.error("Failed to fetch sub-services or services", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleCreateSubService = async (data: Partial<SubService>) => {
        try {
            const newSubService = await createSubService(data);
            setSubServices(prev => [newSubService, ...prev]);
            return newSubService;
        } catch (err) {
            console.error("Failed to create sub-service", err);
            throw err;
        }
    };

    const handleUpdateSubService = async (id: string, data: Partial<SubService>) => {
        try {
            const updated = await updateSubService(id, data);
            setSubServices(prev => prev.map(s => s._id === id ? { ...s, ...updated } : s));
            return updated;
        } catch (err) {
            console.error("Failed to update sub-service", err);
            throw err;
        }
    };

    const handleDeleteSubService = async (id: string) => {
        try {
            await deleteSubService(id);
            setSubServices(prev => prev.filter(s => s._id !== id));
        } catch (err) {
            console.error("Failed to delete sub-service", err);
            throw err;
        }
    };

    const toggleStatus = async (id: string, currentStatus: boolean) => {
        return handleUpdateSubService(id, { isActive: !currentStatus });
    };

    // Derived State (Filtering and Sorting)
    const filteredSubServices = subServices.filter(s => {
        if (debouncedSearch && !s.name.toLowerCase().includes(debouncedSearch.toLowerCase())) {
            return false;
        }
        if (filters.parentService !== 'all') {
            const parentId = typeof s.serviceId === 'string' ? s.serviceId : s.serviceId?._id;
            if (parentId !== filters.parentService) return false;
        }
        if (filters.status !== 'all') {
            const isActive = filters.status === 'active';
            if (s.isActive !== isActive) return false;
        }
        if (filters.priceType !== 'all') {
            if (s.priceType !== filters.priceType) return false;
        }
        return true;
    });

    const sortedSubServices = [...filteredSubServices].sort((a, b) => {
        if (!sort) return 0;
        const valA = a[sort.key as keyof SubService];
        const valB = b[sort.key as keyof SubService];
        
        if (valA === undefined || valB === undefined) return 0;
        
        if (valA < valB) return sort.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sort.direction === 'asc' ? 1 : -1;
        return 0;
    });

    // Pagination
    const totalItems = sortedSubServices.length;
    const paginatedSubServices = sortedSubServices.slice((page - 1) * limit, page * limit);

    return {
        subServices: paginatedSubServices,
        allSubServices: subServices, // for stats
        services,
        loading,
        page,
        setPage,
        limit,
        setLimit,
        totalItems,
        filters,
        setFilters,
        sort,
        setSort,
        loadData,
        handleCreateSubService,
        handleUpdateSubService,
        handleDeleteSubService,
        toggleStatus,
    };
}
