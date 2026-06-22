'use client';

import React, { useEffect, useState, Suspense, useMemo, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchServices, fetchCategories, deleteService } from '@/features/services/api';
import { Service, Category } from '@/features/services/types';
import { toast } from 'sonner';
import { Briefcase, CheckCircle, Layers, XCircle } from 'lucide-react';

import { AppLayout } from '@/components/layout/AppLayout';
import { ServiceModal } from '@/features/services/components/ServiceModal';
import { EmptyState } from '@/features/services/components/EmptyState';
import { ServiceCardSkeleton } from '@/features/services/components/ServiceCardSkeleton';
import { ServiceStatsCard } from '@/features/services/components/ServiceStatsCard';
import { ServicesHeader } from '@/features/services/components/ServicesHeader';
import { ServicesFilters } from '@/features/services/components/ServicesFilters';
import { ServiceCard } from '@/features/services/components/ServiceCard';
import { ServicesTable } from '@/features/services/components/ServicesTable';
import { ServicesPagination } from '@/features/services/components/ServicesPagination';

// Custom hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

function ServicesContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const urlCategoryId = searchParams?.get('categoryId') || null;
    
    // Data State
    const [categories, setCategories] = useState<Category[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>(urlCategoryId || 'all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortFilter, setSortFilter] = useState<string>('newest');

    // UI State
    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    
    // Pagination State
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);

    const isCategoryMode = !!urlCategoryId;

    // Initialize View Mode from LocalStorage
    useEffect(() => {
        const savedView = localStorage.getItem('servicesViewMode');
        if (savedView === 'grid' || savedView === 'table') {
            setViewMode(savedView);
        }
    }, []);

    const handleViewModeChange = (mode: 'grid' | 'table') => {
        setViewMode(mode);
        localStorage.setItem('servicesViewMode', mode);
    };

    // Load Data
    const loadData = async () => {
        setIsLoading(true);
        try {
            const cats = await fetchCategories();
            setCategories(cats);

            const filterId = isCategoryMode ? urlCategoryId : (selectedCategoryId !== 'all' ? selectedCategoryId : undefined);

            const srvs = await fetchServices({
                categoryId: filterId,
                search: debouncedSearch || undefined,
                status: statusFilter !== 'all' ? statusFilter : undefined,
                sort: sortFilter
            });
            setServices(srvs);
            setCurrentPage(1); // Reset to first page on filter change
        } catch (error) {
            console.error('Failed to fetch data', error);
            toast.error('Failed to load services');
        } finally {
            setIsLoading(false);
        }
    };

    // Reload when filters change
    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlCategoryId, selectedCategoryId, isCategoryMode, debouncedSearch, statusFilter, sortFilter]);

    // Derived Data with useMemo
    const activeCategory = useMemo(() => 
        categories.find(c => c._id === urlCategoryId),
    [categories, urlCategoryId]);

    const categoryMap = useMemo(() => 
        Object.fromEntries(categories.map(cat => [cat._id, cat])),
    [categories]);

    const stats = useMemo(() => {
        let active = 0;
        let inactive = 0;
        let subServices = 0;
        let workers = 0;

        services.forEach(s => {
            if (s.isActive) active++; else inactive++;
            subServices += s.subServiceCount || 0;
            workers += s.activeWorkerCount || 0;
        });

        return {
            total: services.length,
            active,
            inactive,
            subServices,
            workers
        };
    }, [services]);

    // Helpers
    const getCategoryName = useCallback((id: string | Category) => {
        if (typeof id === 'object') return id.name;
        const cat = categoryMap[id];
        return cat ? cat.name : 'Unknown Category';
    }, [categoryMap]);

    const openEditModal = useCallback((service: Service | null = null) => {
        setEditingService(service);
        setIsModalOpen(true);
    }, []);

    const handleClearFilters = useCallback(() => {
        setSearchQuery('');
        setSelectedCategoryId('all');
        setStatusFilter('all');
        setSortFilter('newest');
    }, []);

    const handleDelete = async (service: Service) => {
        if (window.confirm(`Are you sure you want to delete "${service.name}"?`)) {
            try {
                await deleteService(service._id);
                toast.success('Service deleted successfully');
                loadData();
            } catch (error) {
                toast.error('Failed to delete service');
            }
        }
    };

    const hasActiveFilters = Boolean(
        searchQuery || 
        (!isCategoryMode && selectedCategoryId !== 'all') || 
        statusFilter !== 'all' || 
        sortFilter !== 'newest'
    );

    // Client-side pagination logic
    const paginatedServices = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return services.slice(startIndex, startIndex + itemsPerPage);
    }, [services, currentPage, itemsPerPage]);

    return (
        <div className="min-h-screen bg-transparent">
            <div className="max-w-[1600px] mx-auto">
                {/* Breadcrumbs */}
                {isCategoryMode && (
                    <div className="text-sm text-slate-500 mb-6 flex items-center gap-2">
                        <span className="cursor-pointer hover:text-blue-600 transition-colors" onClick={() => router.push('/categories')}>Categories</span>
                        <span className="text-slate-300">/</span>
                        <span className="font-medium text-slate-700">{activeCategory ? activeCategory.name : '...'}</span>
                    </div>
                )}

                <ServicesHeader 
                    isCategoryMode={isCategoryMode} 
                    activeCategory={activeCategory} 
                    onCreateService={() => openEditModal(null)} 
                />

                {/* Analytics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 mb-4">
                    <ServiceStatsCard 
                        title="Total Services" 
                        value={stats.total} 
                        icon={<Briefcase className="w-5 h-5" />} 
                        iconClassName="text-blue-600 bg-blue-50"
                    />
                    <ServiceStatsCard 
                        title="Active Services" 
                        value={stats.active} 
                        icon={<CheckCircle className="w-5 h-5" />} 
                        iconClassName="text-emerald-600 bg-emerald-50"
                    />
                    <ServiceStatsCard 
                        title="Inactive Services" 
                        value={stats.inactive} 
                        icon={<XCircle className="w-5 h-5" />} 
                        iconClassName="text-rose-600 bg-rose-50"
                    />
                    <ServiceStatsCard 
                        title="Total Sub-services" 
                        value={stats.subServices} 
                        icon={<Layers className="w-5 h-5" />} 
                        iconClassName="text-indigo-600 bg-indigo-50"
                    />
                    <ServiceStatsCard 
                        title="Assigned Workers" 
                        value={stats.workers} 
                        icon={<Briefcase className="w-5 h-5" />} 
                        iconClassName="text-amber-600 bg-amber-50"
                    />
                </div>

                <ServicesFilters 
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    categories={categories}
                    selectedCategoryId={selectedCategoryId}
                    onCategoryChange={setSelectedCategoryId}
                    statusFilter={statusFilter}
                    onStatusChange={setStatusFilter}
                    sortFilter={sortFilter}
                    onSortChange={setSortFilter}
                    isCategoryMode={isCategoryMode}
                    viewMode={viewMode}
                    onViewModeChange={handleViewModeChange}
                    onClearFilters={handleClearFilters}
                    hasActiveFilters={hasActiveFilters}
                />

                {/* Main Content Area */}
                <div className="mt-2">
                    {isLoading ? (
                        viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {[...Array(8)].map((_, i) => <ServiceCardSkeleton key={i} />)}
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex justify-center">
                                <div className="animate-pulse flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 bg-slate-100 rounded-full"></div>
                                    <div className="h-4 w-32 bg-slate-100 rounded"></div>
                                </div>
                            </div>
                        )
                    ) : services.length === 0 ? (
                        <EmptyState 
                            onClearFilters={handleClearFilters} 
                            onCreateService={() => openEditModal(null)}
                            hasFilters={hasActiveFilters}
                        />
                    ) : (
                        <>
                            {viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {paginatedServices.map(service => (
                                        <ServiceCard 
                                            key={service._id} 
                                            service={service} 
                                            categoryName={getCategoryName(service.categoryId)}
                                            onEdit={openEditModal}
                                            onDelete={handleDelete}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <ServicesTable 
                                    services={paginatedServices}
                                    getCategoryName={getCategoryName}
                                    onEdit={openEditModal}
                                    onDelete={handleDelete}
                                />
                            )}
                            
                            <ServicesPagination 
                                currentPage={currentPage}
                                totalPages={Math.ceil(services.length / itemsPerPage)}
                                totalItems={services.length}
                                itemsPerPage={itemsPerPage}
                                onPageChange={setCurrentPage}
                            />
                        </>
                    )}
                </div>

                <ServiceModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSaved={loadData}
                    service={editingService}
                    categories={categories}
                    lockedCategoryId={isCategoryMode ? urlCategoryId : null}
                />
            </div>
        </div>
    );
}

export default function ServicesPage() {
    return (
        <AppLayout>
            <Suspense fallback={<div className="p-8 flex justify-center text-slate-500">Loading Services Dashboard...</div>}>
                <ServicesContent />
            </Suspense>
        </AppLayout>
    );
}
