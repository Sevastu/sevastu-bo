import { useState, useEffect, useCallback } from 'react';
import { fetchCustomers, updateCustomerStatus } from '@/features/customers/api';
import { CustomerUI } from '../types/customer-ui.types';
import { useDebounce } from './useDebounce';

export type StatusFilter = 'all' | 'active' | 'inactive';

export function useCustomers() {
    const [customers, setCustomers] = useState<CustomerUI[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    const [dateRange, setDateRange] = useState<{ from?: string; to?: string } | undefined>(undefined);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10;

    const loadCustomers = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await fetchCustomers({
                search: debouncedSearch,
                status: statusFilter === 'all' ? undefined : statusFilter,
                page: currentPage,
                limit: itemsPerPage,
                dateRange
            });
            setCustomers(result.data as CustomerUI[]);
            setTotalItems(result.pagination?.total || 0);
        } catch (error) {
            console.error("Failed to fetch customers:", error);
            setCustomers([]);
        } finally {
            setIsLoading(false);
        }
    }, [debouncedSearch, statusFilter, currentPage, itemsPerPage, dateRange]);

    useEffect(() => {
        loadCustomers();
    }, [loadCustomers]);

    // Reset to page 1 on filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch, statusFilter, dateRange]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const toggleCustomerStatus = async (id: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
            await updateCustomerStatus(id, newStatus);
            await loadCustomers();
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const refresh = () => {
        loadCustomers();
    };

    return {
        customers,
        isLoading,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        dateRange,
        setDateRange,
        currentPage,
        totalPages: Math.max(1, Math.ceil(totalItems / itemsPerPage)),
        totalItems,
        itemsPerPage,
        handlePageChange,
        toggleCustomerStatus,
        refresh
    };
}
