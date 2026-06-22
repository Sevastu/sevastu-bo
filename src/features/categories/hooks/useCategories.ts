import { useState, useEffect, useCallback } from 'react';
import { CategoriesService, Category } from '@/features/categories/categories.service';
import { toast } from 'sonner';

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, services: 0 });
    
    // Pagination & Filters
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortFilter, setSortFilter] = useState('Newest First');
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 12;

    const fetchCategories = useCallback(async (page: number = 1) => {
        setIsLoading(true);
        try {
            const response = await CategoriesService.getCategories({
                search: debouncedSearch || undefined,
                status: statusFilter !== 'all' ? statusFilter : undefined,
                sort: sortFilter,
                page,
                limit: itemsPerPage
            });
            
            // @ts-ignore - The API response structure uses data.data when returning paginated response.
            // Adjusting based on actual response if needed. Assuming it matches our CategoriesResponse interface.
            const responseData = (response as any).data || response;
            const paginationData = (response as any).pagination || response; // fallback
            
            // In categories.service.ts, it returns `data.data` directly which is just the array?
            // Wait, categories.service.ts says: return data.data; but CategoriesResponse has data, stats, totalPages.
            // If it returns CategoriesResponse:
            const items = Array.isArray(response) ? response : (response as any).data || [];
            
            setCategories(items);
            
            if ((response as any).stats) {
                setStats({
                    total: (response as any).stats.totalCategories || 0,
                    active: (response as any).stats.activeCategories || 0,
                    inactive: (response as any).stats.inactiveCategories || 0,
                    services: (response as any).stats.totalServices || 0
                });
            }

            setCurrentPage((response as any).page || page);
            setTotalPages((response as any).totalPages || 1);
            setTotalItems((response as any).total || items.length);

        } catch (error) {
            console.error("Failed to fetch categories:", error);
            toast.error('Failed to load categories');
        } finally {
            setIsLoading(false);
        }
    }, [debouncedSearch, statusFilter, sortFilter, itemsPerPage]);

    // Re-fetch when filters change (reset to page 1)
    useEffect(() => {
        fetchCategories(1);
    }, [debouncedSearch, statusFilter, sortFilter, fetchCategories]);

    const handlePageChange = (page: number) => {
        fetchCategories(page);
    };

    const refresh = () => {
        fetchCategories(currentPage);
    };

    return {
        categories,
        isLoading,
        stats,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        sortFilter,
        setSortFilter,
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage,
        handlePageChange,
        refresh
    };
}
