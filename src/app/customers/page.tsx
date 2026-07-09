'use client';

import React, { useState, useEffect, useCallback } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { CustomerProfileDrawer } from "./components/CustomerProfileDrawer";

import { useCustomers } from "@/features/customers/hooks/useCustomers";
import { useCustomerAnalytics } from "@/features/customers/hooks/useCustomerAnalytics";

import { CustomerHeader } from "@/features/customers/components/CustomerHeader";
import { CustomerAnalyticsCards } from "@/features/customers/components/CustomerAnalyticsCards";
import { CustomerFilters } from "@/features/customers/components/CustomerFilters";
import { CustomerCard } from "@/features/customers/components/CustomerCard";
import { CustomerTable } from "@/features/customers/components/CustomerTable";
import { CustomerGridLoading } from "@/features/customers/components/CustomerGridLoading";
import { CustomerTableLoading } from "@/features/customers/components/CustomerTableLoading";
import { CustomerEmptyState } from "@/features/customers/components/CustomerEmptyState";
import { CustomerPagination } from "@/features/customers/components/CustomerPagination";
import { GRID_CLASSES } from "@/features/customers/constants/grid.constants";
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

    const { analytics, isLoading: isAnalyticsLoading } = useCustomerAnalytics();

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

    const handleViewModeChange = useCallback((mode: 'grid' | 'table') => {
        setViewMode(mode);
        localStorage.setItem('customersViewMode', mode);
    }, []);

    const handleClearFilters = useCallback(() => {
        setSearch('');
        setStatusFilter('all');
        setDateRange(undefined);
    }, [setSearch, setStatusFilter, setDateRange]);

    const openCustomerDetails = useCallback((customer: CustomerUI) => {
        setSelectedCustomerId(customer._id);
        setIsDrawerOpen(true);
    }, []);

    const handleDrawerClose = useCallback(() => {
        setIsDrawerOpen(false);
        setSelectedCustomerId(null);
        refresh(); // Refresh list after details might have been edited
    }, [refresh]);

    const hasActiveFilters = Boolean(search || statusFilter !== 'all' || dateRange?.from || dateRange?.to);

    const renderContent = useCallback(() => {
        if (isLoading) {
            return viewMode === 'grid' ? <CustomerGridLoading /> : <CustomerTableLoading />;
        }

        if (customers.length === 0) {
            return (
                <CustomerEmptyState
                    onClearFilters={handleClearFilters}
                    hasFilters={hasActiveFilters}
                />
            );
        }

        return (
            <>
                {viewMode === 'grid' ? (
                    <div className={GRID_CLASSES}>
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

                {totalPages > 1 && (
                    <CustomerPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        totalItems={totalItems}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                )}
            </>
        );
    }, [isLoading, viewMode, customers, handleClearFilters, hasActiveFilters, openCustomerDetails, currentPage, totalPages, totalItems, itemsPerPage, handlePageChange]);

    return (
        <AppLayout>
            <div className="min-h-screen bg-transparent font-manrope pb-12">
                <div className="max-w-[1600px] mx-auto">
                    <CustomerHeader />

                    <CustomerAnalyticsCards analytics={analytics} isLoading={isAnalyticsLoading} />

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
                        {renderContent()}
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
