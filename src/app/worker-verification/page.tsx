"use client"
import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { WorkerReviewPanel } from '../workers/components/WorkerReviewSheet';
import { useWorkerVerification } from '@/features/worker-verification/hooks/useWorkerVerification';
import { useWorkerVerificationStats } from '@/features/worker-verification/hooks/useWorkerVerificationStats';
import { WorkerVerificationHeader } from '@/features/worker-verification/components/WorkerVerificationHeader';
import { WorkerVerificationStats } from '@/features/worker-verification/components/WorkerVerificationStats';
import { WorkerVerificationFilters } from '@/features/worker-verification/components/WorkerVerificationFilters';
import { WorkerVerificationCard } from '@/features/worker-verification/components/WorkerVerificationCard';
import { WorkerVerificationPagination } from '@/features/worker-verification/components/WorkerVerificationPagination';
import { WorkerVerificationEmptyState } from '@/features/worker-verification/components/WorkerVerificationEmptyState';
import { WorkerVerificationError } from '@/features/worker-verification/components/WorkerVerificationError';
import { WorkerVerificationCardSkeleton } from '@/features/worker-verification/components/WorkerVerificationCardSkeleton';
import { WorkerVerificationUI } from '@/features/worker-verification/types/workerVerification.types';

const WorkerVerification: React.FC = () => {
  const {
    allWorkers,
    workers,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    handleApprove,
    handleReject,
    refresh
  } = useWorkerVerification();

  const stats = useWorkerVerificationStats(allWorkers);

  const [selectedWorkerUserId, setSelectedWorkerUserId] = useState<string | null>(null);
  const [selectedRowStatus, setSelectedRowStatus] = useState<string | undefined>(undefined);
  const [isViewingPanel, setIsViewingPanel] = useState(false);

  const handleViewDocuments = (worker: WorkerVerificationUI) => {
    setSelectedWorkerUserId(worker.id);
    setSelectedRowStatus(worker.verificationStatus);
    setIsViewingPanel(true);
  };

  const handlePanelBack = () => {
    setIsViewingPanel(false);
    setSelectedWorkerUserId(null);
    setSelectedRowStatus(undefined);
    setTimeout(() => refresh(), 100);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
  };

  return (
    <AppLayout>
      {isViewingPanel && selectedWorkerUserId ? (
        <WorkerReviewPanel
          workerUserId={selectedWorkerUserId}
          initialProfileStatus={selectedRowStatus}
          onAfterChange={handlePanelBack}
          onBack={handlePanelBack}
        />
      ) : (
        <div className="space-y-6 font-manrope">
          <WorkerVerificationHeader />

          <WorkerVerificationStats stats={stats} />

          <WorkerVerificationFilters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
          />

          {isLoading ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <WorkerVerificationCardSkeleton key={i} />
              ))}
            </div>
          ) : error ? (
            <WorkerVerificationError message={error} onRetry={refresh} />
          ) : workers.length === 0 ? (
            <WorkerVerificationEmptyState onClearFilters={handleClearFilters} />
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {workers.map((worker) => (
                  <WorkerVerificationCard
                    key={worker.id}
                    worker={worker}
                    onApprove={handleApprove}
                    onReject={handleReject}
                    onViewDocuments={handleViewDocuments}
                  />
                ))}
              </div>

              <WorkerVerificationPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
};

export default WorkerVerification;
