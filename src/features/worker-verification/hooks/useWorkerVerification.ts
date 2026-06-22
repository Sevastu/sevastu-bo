import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchWorkers, approveWorker, rejectWorker } from '@/features/workers/api';
import { WorkerVerificationUI } from '../types/workerVerification.types';
import { WorkerProfileStatus } from '@/lib/enums';
import { mapWorkerResponse } from '../utils/workerVerificationHelpers';
import { useDebounce } from './useDebounce';

export function useWorkerVerification() {
  const [allWorkers, setAllWorkers] = useState<WorkerVerificationUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [statusFilter, setStatusFilter] = useState<WorkerProfileStatus | 'all'>('all');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const loadWorkers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWorkers();
      const mapped = mapWorkerResponse(data);
      setAllWorkers(mapped);
    } catch (err) {
      setError('Failed to load workers for verification.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWorkers();
  }, [loadWorkers]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter]);

  const filteredWorkers = useMemo(() => {
    return allWorkers.filter(worker => {
      const searchStr = debouncedSearch.toLowerCase();
      const matchesSearch = 
        worker.name.toLowerCase().includes(searchStr) ||
        worker.email.toLowerCase().includes(searchStr) ||
        worker.id.toLowerCase().includes(searchStr);
      
      const matchesStatus = statusFilter === 'all' || worker.verificationStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [allWorkers, debouncedSearch, statusFilter]);

  const paginatedWorkers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredWorkers.slice(start, start + itemsPerPage);
  }, [filteredWorkers, currentPage, itemsPerPage]);

  const totalPages = Math.max(1, Math.ceil(filteredWorkers.length / itemsPerPage));

  const handleApprove = useCallback(async (workerId: string) => {
    try {
      await approveWorker(workerId);
      await loadWorkers();
    } catch (err) {
      console.error('Error approving worker:', err);
      setError('Failed to approve worker');
    }
  }, [loadWorkers]);

  const handleReject = useCallback(async (workerId: string) => {
    try {
      await rejectWorker(workerId, 'Rejected via quick action');
      await loadWorkers();
    } catch (err) {
      console.error('Error rejecting worker:', err);
      setError('Failed to reject worker');
    }
  }, [loadWorkers]);

  return {
    allWorkers,
    workers: paginatedWorkers,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems: filteredWorkers.length,
    itemsPerPage,
    handleApprove,
    handleReject,
    refresh: loadWorkers
  };
}
