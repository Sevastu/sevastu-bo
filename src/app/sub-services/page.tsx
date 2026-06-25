"use client";

import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { getUser } from "@/lib/auth";
import { SubService } from "@/features/services/types";

// Hooks
import { useSubServices } from "@/features/sub-services/hooks/useSubServices";
import { useSubServiceStats } from "@/features/sub-services/hooks/useSubServiceStats";

// Components
import { SubServiceHeader } from "@/features/sub-services/components/SubServiceHeader";
import { SubServiceStats } from "@/features/sub-services/components/SubServiceStats";
import { SubServiceFilters } from "@/features/sub-services/components/SubServiceFilters";
import { SubServiceTable } from "@/features/sub-services/components/SubServiceTable";
import { SubServiceCard } from "@/features/sub-services/components/SubServiceCard";
import { SubServicePagination } from "@/features/sub-services/components/SubServicePagination";
import { SubServiceModal } from "@/features/sub-services/components/SubServiceModal";
import { SubServiceSkeleton } from "@/features/sub-services/components/SubServiceSkeleton";
import { SubServiceEmptyState } from "@/features/sub-services/components/SubServiceEmptyState";

export default function SubServicesPage() {
    const user = getUser();
    const isAdmin = user?.role === "admin";

    const {
        subServices,
        allSubServices,
        services,
        loading,
        page,
        setPage,
        limit,
        setLimit,
        totalItems,
        filters,
        setFilters,
        handleCreateSubService,
        handleUpdateSubService,
        toggleStatus,
    } = useSubServices();

    const stats = useSubServiceStats(allSubServices);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSubService, setEditingSubService] = useState<SubService | null>(null);

    const handleOpenCreateModal = () => {
        setEditingSubService(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (subService: SubService) => {
        setEditingSubService(subService);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (data: Partial<SubService>) => {
        if (editingSubService) {
            await handleUpdateSubService(editingSubService._id, data);
        } else {
            await handleCreateSubService(data);
        }
    };

    const hasActiveFilters = filters.search !== '' || filters.parentService !== 'all' || filters.status !== 'all' || filters.priceType !== 'all';

    return (
        <AppLayout>
            <div className="max-w-[1400px] mx-auto w-full pb-12 animate-in fade-in duration-500">
                <SubServiceHeader 
                    onCreateSubService={handleOpenCreateModal} 
                    isAdmin={isAdmin} 
                />

                {loading && allSubServices.length === 0 ? (
                    <SubServiceSkeleton />
                ) : (
                    <>
                        <SubServiceStats stats={stats} />
                        
                        <SubServiceFilters 
                            filters={filters} 
                            setFilters={setFilters} 
                            services={services} 
                        />

                        {subServices.length === 0 ? (
                            <SubServiceEmptyState 
                                isFiltered={hasActiveFilters}
                                onClearFilters={() => setFilters({ search: '', parentService: 'all', status: 'all', priceType: 'all' })}
                                onCreateSubService={handleOpenCreateModal}
                                isAdmin={isAdmin}
                            />
                        ) : (
                            <>
                                <SubServiceTable 
                                    data={subServices} 
                                    onEdit={handleOpenEditModal} 
                                    onToggleStatus={toggleStatus} 
                                    isAdmin={isAdmin} 
                                />

                                {/* Mobile/Tablet Card View */}
                                <div className="lg:hidden space-y-4">
                                    {subServices.map(subService => (
                                        <SubServiceCard 
                                            key={subService._id} 
                                            subService={subService} 
                                            onEdit={handleOpenEditModal} 
                                            onToggleStatus={toggleStatus} 
                                            isAdmin={isAdmin} 
                                        />
                                    ))}
                                </div>

                                <SubServicePagination 
                                    currentPage={page}
                                    totalPages={Math.ceil(totalItems / limit)}
                                    limit={limit}
                                    totalItems={totalItems}
                                    onPageChange={setPage}
                                    onLimitChange={setLimit}
                                />
                            </>
                        )}
                    </>
                )}
            </div>

            <SubServiceModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                services={services}
                initialData={editingSubService}
            />
        </AppLayout>
    );
}
