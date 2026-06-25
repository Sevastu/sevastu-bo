'use client';

import React, { useState, useEffect } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { CategoriesService, Category } from '@/features/categories/categories.service';
import { CategoryModal } from '@/features/categories/components/CategoryModal';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { CategoriesHeader } from '@/features/categories/components/CategoriesHeader';
import { CategoryStatsCard } from '@/features/categories/components/CategoryStatsCard';
import { CategoryFilters } from '@/features/categories/components/CategoryFilters';
import { CategoryCard } from '@/features/categories/components/CategoryCard';
import { CategoriesTable } from '@/features/categories/components/CategoriesTable';
import { CategoryCardSkeleton } from '@/features/categories/components/CategoryCardSkeleton';
import { EmptyState } from '@/features/categories/components/EmptyState';
import { CategoriesPagination } from '@/features/categories/components/CategoriesPagination';
import { Layers, CheckCircle, XCircle, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

export default function CategoriesPage() {
    const {
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
    } = useCategories();

    const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    // Initialize View Mode from LocalStorage
    useEffect(() => {
        const savedView = localStorage.getItem('categoriesViewMode');
        if (savedView === 'grid' || savedView === 'table') {
            setViewMode(savedView);
        }
    }, []);

    const handleViewModeChange = (mode: 'grid' | 'table') => {
        setViewMode(mode);
        localStorage.setItem('categoriesViewMode', mode);
    };

    const handleAddClick = () => {
        setSelectedCategory(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (category: Category) => {
        setSelectedCategory(category);
        setIsModalOpen(true);
    };

    const handleDeleteClick = async (category: Category) => {
        if (category.activeServiceCount > 0) {
            toast.error('Cannot delete category with active services.');
            return;
        }
        
        if (window.confirm(`Are you sure you want to delete ${category.name}?`)) {
            try {
                await CategoriesService.deleteCategory(category._id);
                toast.success('Category deleted successfully');
                refresh();
            } catch (error) {
                console.error("Failed to delete category:", error);
                toast.error('Failed to delete category');
            }
        }
    };

    const handleClearFilters = () => {
        setSearch('');
        setStatusFilter('all');
        setSortFilter('Newest First');
    };

    const hasActiveFilters = Boolean(
        search || statusFilter !== 'all' || sortFilter !== 'Newest First'
    );

    return (
        <AppLayout>
            <div className="min-h-screen bg-transparent font-manrope">
                <div className="max-w-[1600px] mx-auto">
                    <CategoriesHeader onCreateCategory={handleAddClick} />

                    {/* Analytics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <CategoryStatsCard
                            title="Total Categories"
                            value={stats.total}
                            icon={<Layers className="w-6 h-6" />}
                            iconClassName="text-blue-600 bg-blue-50"
                        />
                        <CategoryStatsCard
                            title="Active Categories"
                            value={stats.active}
                            icon={<CheckCircle className="w-6 h-6" />}
                            iconClassName="text-emerald-600 bg-emerald-50"
                        />
                        <CategoryStatsCard
                            title="Inactive Categories"
                            value={stats.inactive}
                            icon={<XCircle className="w-6 h-6" />}
                            iconClassName="text-rose-600 bg-rose-50"
                        />
                        <CategoryStatsCard
                            title="Total Services"
                            value={stats.services}
                            icon={<Briefcase className="w-6 h-6" />}
                            iconClassName="text-indigo-600 bg-indigo-50"
                        />
                    </div>

                    <CategoryFilters
                        searchQuery={search}
                        onSearchChange={setSearch}
                        statusFilter={statusFilter}
                        onStatusChange={setStatusFilter}
                        sortFilter={sortFilter}
                        onSortChange={setSortFilter}
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
                                    {[...Array(8)].map((_, i) => <CategoryCardSkeleton key={i} />)}
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex justify-center">
                                    <div className="animate-pulse flex flex-col items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-100 rounded-full"></div>
                                        <div className="h-4 w-32 bg-slate-100 rounded"></div>
                                    </div>
                                </div>
                            )
                        ) : categories.length === 0 ? (
                            <EmptyState
                                onClearFilters={handleClearFilters}
                                onCreateCategory={handleAddClick}
                                hasFilters={hasActiveFilters}
                            />
                        ) : (
                            <>
                                {viewMode === 'grid' ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {categories.map(category => (
                                            <CategoryCard
                                                key={category._id}
                                                category={category}
                                                onEdit={handleEditClick}
                                                onDelete={handleDeleteClick}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <CategoriesTable
                                        categories={categories}
                                        onEdit={handleEditClick}
                                        onDelete={handleDeleteClick}
                                    />
                                )}

                                <CategoriesPagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    totalItems={totalItems}
                                    itemsPerPage={itemsPerPage}
                                    onPageChange={handlePageChange}
                                />
                            </>
                        )}
                    </div>

                    <CategoryModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSaved={refresh}
                        category={selectedCategory}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
