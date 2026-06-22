import { useState, useEffect, useCallback } from 'react';
import { fetchWorkers, fetchWorkersByStatus } from '@/features/workers/api';
import { WorkerUI } from '../types/worker-ui.types';
import { WorkerProfileStatus } from '@/lib/enums';
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

export type StatusFilter = 'all' | 'verified' | 'pending' | 'rejected';

export function useWorkers() {
    const [allWorkers, setAllWorkers] = useState<WorkerUI[]>([]);
    const [pagedWorkers, setPagedWorkers] = useState<WorkerUI[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Filters
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
    
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 12;

    const loadWorkers = useCallback(async () => {
        setIsLoading(true);
        try {
            let workersData: Record<string, unknown>[] = [];
            if (statusFilter === "all") {
                workersData = await fetchWorkers();
            } else {
                const statusParam = 
                    statusFilter === 'verified' ? WorkerProfileStatus.VERIFIED : 
                    statusFilter === 'pending' ? WorkerProfileStatus.UNDER_REVIEW : 
                    WorkerProfileStatus.REJECTED;
                workersData = await fetchWorkersByStatus(statusParam);
            }
            setAllWorkers(workersData as WorkerUI[]);
        } catch (error) {
            console.error("Failed to fetch workers:", error);
            toast.error('Failed to load workers');
            setAllWorkers([]);
        } finally {
            setIsLoading(false);
        }
    }, [statusFilter]);

    // Re-fetch when status filter changes
    useEffect(() => {
        loadWorkers();
    }, [loadWorkers]);

    // Apply search and pagination client-side
    useEffect(() => {
        let filtered = allWorkers;
        
        if (debouncedSearch) {
            const normalized = debouncedSearch.trim().toLowerCase();
            filtered = allWorkers.filter((w) =>
                String(w.name ?? "").toLowerCase().includes(normalized) ||
                String(w.email ?? "").toLowerCase().includes(normalized) ||
                String(w.city ?? "").toLowerCase().includes(normalized) ||
                String(w.userId ?? "").toLowerCase().includes(normalized)
            );
        }

        setTotalItems(filtered.length);
        
        const maxPage = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
        const safePage = Math.min(currentPage, maxPage);
        if (safePage !== currentPage) {
            setCurrentPage(safePage);
        }

        const start = (safePage - 1) * itemsPerPage;
        setPagedWorkers(filtered.slice(start, start + itemsPerPage));

    }, [allWorkers, debouncedSearch, currentPage, itemsPerPage]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const refresh = () => {
        loadWorkers();
    };

    return {
        workers: pagedWorkers,
        allWorkers,
        isLoading,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        currentPage,
        totalPages: Math.max(1, Math.ceil(totalItems / itemsPerPage)),
        totalItems,
        itemsPerPage,
        handlePageChange,
        refresh
    };
}
