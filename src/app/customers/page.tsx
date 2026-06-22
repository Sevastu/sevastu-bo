'use client';

import React, { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { CustomerProfileDrawer } from "./components/CustomerProfileDrawer";

import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { useCustomerAnalytics } from "@/features/customers/hooks/useCustomerAnalytics";

import { CustomerHeader } from "@/features/customers/components/CustomerHeader";
import { CustomerAnalyticsCards } from "@/features/customers/components/CustomerAnalyticsCards";
import { CustomerFilters } from "@/features/customers/components/CustomerFilters";
import { CustomerCard } from "@/features/customers/components/CustomerCard";
import { CustomerTable } from "@/features/customers/components/CustomerTable";
import { CustomerSkeleton } from "@/features/customers/components/CustomerSkeleton";
import { CustomerEmptyState } from "@/features/customers/components/CustomerEmptyState";
import { CustomerPagination } from "@/features/customers/components/CustomerPagination";
import { CustomerUI } from "@/features/customers/types/customer-ui.types";

export default function CustomersPage() {
    const {
        customers,
        isLoading,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        dateRange,
        setDateRange,
        currentPage,
        totalPages,
        totalItems,
        itemsPerPage,
        handlePageChange,
        refresh
    } = useCustomers();

    const { analytics } = useCustomerAnalytics();

    const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Initialize View Mode
    useEffect(() => {
        const savedView = localStorage.getItem('customersViewMode');
        if (savedView === 'grid' || savedView === 'table') {
            setViewMode(savedView);
        }
    }, []);

    const handleViewModeChange = (mode: 'grid' | 'table') => {
        setViewMode(mode);
        localStorage.setItem('customersViewMode', mode);
    };

    const handleClearFilters = () => {
        setSearch('');
        setStatusFilter('all');
        setDateRange(undefined);
    };

    const openCustomerDetails = (customer: CustomerUI) => {
        setSelectedCustomerId(customer._id);
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        setSelectedCustomerId(null);
        refresh(); // Refresh list after details might have been edited
    };

    const hasActiveFilters = Boolean(search || statusFilter !== 'all' || dateRange?.from || dateRange?.to);

    return (
        <AppLayout>
            <div className="min-h-screen bg-transparent font-manrope pb-12">
                <div className="max-w-[1600px] mx-auto">
                    <CustomerHeader />

                    <CustomerAnalyticsCards analytics={analytics} />

                    <CustomerFilters
                        searchQuery={search}
                        onSearchChange={setSearch}
                        statusFilter={statusFilter}
                        onStatusChange={setStatusFilter}
                        dateRange={dateRange}
                        onDateRangeChange={setDateRange}
                        viewMode={viewMode}
                        onViewModeChange={handleViewModeChange}
                        onClearFilters={handleClearFilters}
                        hasActiveFilters={hasActiveFilters}
                    />

                    <div className="mt-2">
                        {isLoading ? (
                            viewMode === 'grid' ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {[...Array(8)].map((_, i) => <CustomerSkeleton key={i} />)}
                                </div>
                            ) : (
                                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex justify-center">
                                    <div className="animate-pulse flex flex-col items-center gap-4">
                                        <div className="w-12 h-12 bg-slate-100 rounded-full"></div>
                                        <div className="h-4 w-32 bg-slate-100 rounded"></div>
                                    </div>
                                </div>
                            )
                        ) : customers.length === 0 ? (
                            <CustomerEmptyState
                                onClearFilters={handleClearFilters}
                                hasFilters={hasActiveFilters}
                            />
                        ) : (
                            <>
                                {viewMode === 'grid' ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {customers.map(customer => (
                                            <CustomerCard
                                                key={customer._id}
                                                customer={customer}
                                                onClick={openCustomerDetails}
                                                onViewProfile={openCustomerDetails}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <CustomerTable
                                        customers={customers}
                                        onRowClick={openCustomerDetails}
                                        onViewProfile={openCustomerDetails}
                                    />
                                )}

                                <CustomerPagination
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

            <CustomerProfileDrawer
                customerId={selectedCustomerId}
                isOpen={isDrawerOpen}
                onClose={handleDrawerClose}
            />
        </AppLayout>
    );
}
