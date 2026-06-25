'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { WorkerReviewPanel } from "./components/WorkerReviewSheet";
import { WorkerDetailsDrawer } from "./components/WorkerDetailsDrawer";
import { useWorkers } from "@/features/workers/hooks/useWorkers";
import { useWorkerStats } from "@/features/workers/hooks/useWorkerStats";
import { WorkerHeader } from "@/features/workers/components/WorkerHeader";
import { WorkerStats } from "@/features/workers/components/WorkerStats";
import { WorkerFilters } from "@/features/workers/components/WorkerFilters";
import { WorkerCard } from "@/features/workers/components/WorkerCard";
import { WorkerTable } from "@/features/workers/components/WorkerTable";
import { WorkerSkeleton } from "@/features/workers/components/WorkerSkeleton";
import { WorkerEmptyState } from "@/features/workers/components/WorkerEmptyState";
import { WorkerPagination } from "@/features/workers/components/WorkerPagination";
import { WorkerUI } from "@/features/workers/types/worker-ui.types";
import { resolveWorkerUserId } from "@/features/workers/utils/workerHelpers";
import { Users, UserCheck, UserMinus, UserX, UserPlus, Star } from "lucide-react";

export default function WorkersPage() {
    const router = useRouter();

    const {
        workers,
        allWorkers,
        isLoading,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage,
        handlePageChange,
        refresh
    } = useWorkers();

    const stats = useWorkerStats(allWorkers);

    const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
    const [selectedWorkerUserId, setSelectedWorkerUserId] = useState<string | null>(null);
    const [selectedRowStatus, setSelectedRowStatus] = useState<string | undefined>(undefined);
    const [isViewingPanel, setIsViewingPanel] = useState(false);
    const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
    const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

    // Initialize View Mode
    useEffect(() => {
        const savedView = localStorage.getItem('workersViewMode');
        if (savedView === 'grid' || savedView === 'table') {
            setViewMode(savedView);
        }
    }, []);

    const handleViewModeChange = (mode: 'grid' | 'table') => {
        setViewMode(mode);
        localStorage.setItem('workersViewMode', mode);
    };

    const handleClearFilters = () => {
        setSearch('');
        setStatusFilter('all');
    };

    const openReview = (worker: WorkerUI) => {
        const uid = resolveWorkerUserId(worker);
        if (!uid) return;
        setSelectedWorkerUserId(uid);
        setSelectedRowStatus(worker.profileStatus as string);
        setIsViewingPanel(true);
    };

    const handlePanelBack = () => {
        setIsViewingPanel(false);
        setSelectedWorkerUserId(null);
        setSelectedRowStatus(undefined);
        refresh();
    };

    const openWorkerDetails = (worker: WorkerUI) => {
        const workerId = resolveWorkerUserId(worker);
        if (!workerId) return;
        setSelectedWorkerId(workerId);
        setDetailsDrawerOpen(true);
    };

    const openExternalView = (worker: WorkerUI) => {
        const workerId = resolveWorkerUserId(worker);
        if (!workerId) return;
        router.push(`/workers/profile/${workerId}`);
    };

    const hasActiveFilters = Boolean(search || statusFilter !== 'all');

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
                <div className="min-h-screen bg-transparent font-manrope">
                    <div className="max-w-[1600px] mx-auto">
                        <WorkerHeader />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <WorkerStats
                                title="Total Workers"
                                value={stats.total}
                                icon={<Users className="w-5 h-5" />}
                                iconClassName="text-blue-600 bg-blue-50"
                            />
                            <WorkerStats
                                title="Available"
                                value={stats.available}
                                icon={<UserPlus className="w-5 h-5" />}
                                iconClassName="text-emerald-600 bg-emerald-50"
                            />
                            <WorkerStats
                                title="Verified"
                                value={stats.verified}
                                icon={<UserCheck className="w-5 h-5" />}
                                iconClassName="text-green-600 bg-green-50"
                            />
                            <WorkerStats
                                title="Pending Review"
                                value={stats.pending}
                                icon={<UserMinus className="w-5 h-5" />}
                                iconClassName="text-yellow-600 bg-yellow-50"
                            />
                            <WorkerStats
                                title="Rejected"
                                value={stats.rejected}
                                icon={<UserX className="w-5 h-5" />}
                                iconClassName="text-red-600 bg-red-50"
                            />
                            <WorkerStats
                                title="Avg Rating"
                                value={stats.avgRating}
                                icon={<Star className="w-5 h-5" />}
                                iconClassName="text-amber-600 bg-amber-50"
                            />
                        </div>

                        <WorkerFilters
                            searchQuery={search}
                            onSearchChange={setSearch}
                            statusFilter={statusFilter}
                            onStatusChange={setStatusFilter}
                            viewMode={viewMode}
                            onViewModeChange={handleViewModeChange}
                            onClearFilters={handleClearFilters}
                            hasActiveFilters={hasActiveFilters}
                        />

                        <div className="mt-2">
                            {isLoading ? (
                                viewMode === 'grid' ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {[...Array(8)].map((_, i) => <WorkerSkeleton key={i} />)}
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex justify-center">
                                        <div className="animate-pulse flex flex-col items-center gap-4">
                                            <div className="w-12 h-12 bg-slate-100 rounded-full"></div>
                                            <div className="h-4 w-32 bg-slate-100 rounded"></div>
                                        </div>
                                    </div>
                                )
                            ) : workers.length === 0 ? (
                                <WorkerEmptyState
                                    onClearFilters={handleClearFilters}
                                    hasFilters={hasActiveFilters}
                                />
                            ) : (
                                <>
                                    {viewMode === 'grid' ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                                            {workers.map(worker => (
                                                <WorkerCard
                                                    key={resolveWorkerUserId(worker)}
                                                    worker={worker}
                                                    onClick={openWorkerDetails}
                                                    onViewProfile={openExternalView}
                                                    onReview={openReview}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <WorkerTable
                                            workers={workers}
                                            onRowClick={openWorkerDetails}
                                            onViewProfile={openExternalView}
                                            onReview={openReview}
                                        />
                                    )}

                                    <WorkerPagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        totalItems={totalItems}
                                        itemsPerPage={itemsPerPage}
                                        onPageChange={handlePageChange}
                                    />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <WorkerDetailsDrawer
                isOpen={detailsDrawerOpen}
                onClose={() => setDetailsDrawerOpen(false)}
                workerId={selectedWorkerId}
                onWorkerUpdate={refresh}
            />
        </AppLayout>
    );
}
