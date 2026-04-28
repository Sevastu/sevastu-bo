"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Search, Plus, MoreVertical, MapPin, Phone, Calendar, TrendingUp, Users, UserCheck, DollarSign, Eye } from "lucide-react";
import { fetchCustomers, fetchCustomerAnalytics, updateCustomerStatus } from "@/features/customers/api";
import { DataTable } from "@/components/DataTable";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./components/StatusBadge";
import { CustomerProfileDrawer } from "./components/CustomerProfileDrawer";

interface CustomerAnalytics {
    totalCustomers: number;
    activeCustomers: number;
    inactiveCustomers: number;
    retentionRate: number;
    averageLifetimeValue: number;
}

type StatusFilter = 'all' | 'active' | 'inactive';

export default function CustomersPage() {
    const [data, setData] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [viewStatus, setViewStatus] = useState<StatusFilter>('all');
    const [analytics, setAnalytics] = useState<CustomerAnalytics | null>(null);
    const [dateRange, setDateRange] = useState<{ from?: string; to?: string } | undefined>(undefined);
    const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const loadCustomers = async () => {
        setLoading(true);
        try {
            const result = await fetchCustomers({ search, status: viewStatus === 'all' ? undefined : viewStatus, page, limit: 10, dateRange });
            setData(result.data);
            setTotal(result.pagination?.total || 0);
        } catch (error) {
            console.error("Error fetching customers:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadAnalytics = async () => {
        try {
            const data = await fetchCustomerAnalytics();
            setAnalytics(data);
        } catch (error) {
            console.error("Error fetching customer analytics:", error);
        }
    };

    useEffect(() => {
        loadCustomers();
        loadAnalytics();
    }, [search, viewStatus, page, dateRange]);

    const handleStatusChange = async (id: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
            await updateCustomerStatus(id, newStatus);
            loadCustomers();
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const handleRowClick = (customer: any) => {
        setSelectedCustomerId(customer._id);
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
        setSelectedCustomerId(null);
    };

    const columns = useMemo(() => [
        {
            key: "name",
            label: "Name",
            render: (customer: any) => (
                <div 
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => handleRowClick(customer)}
                >
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                        {customer.avatarUrl ? (
                            <img 
                                src={customer.avatarUrl} 
                                alt={customer.name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">
                                    {customer.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                    </div>
                </div>
            ),
        },
        {
            key: "phone",
            label: "Phone",
            render: (customer: any) => (
                <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {customer.phone || '—'}
                </div>
            ),
        },
        {
            key: "location",
            label: "Location",
            render: (customer: any) => (
                <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {customer.location || '—'}
                </div>
            ),
        },
        {
            key: "status",
            label: "Status",
            render: (customer: any) => <StatusBadge status={customer.status} />,
        },
        {
            key: "joinedDate",
            label: "Joined Date",
            render: (customer: any) => (
                <div className="text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 inline" />
                    {new Date(customer.joinedDate).toLocaleDateString()}
                </div>
            ),
        },
        {
            key: "actions",
            label: "Actions",
            render: (customer: any) => (
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={() => handleRowClick(customer)}
                        className="text-blue-600 hover:text-blue-800 transition-colors p-1 rounded hover:bg-blue-50"
                        title="View Customer Details"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded hover:bg-gray-50">
                        <MoreVertical className="w-4 h-4" />
                    </button>
                </div>
            ),
        },
    ], []);

    return (
        <AppLayout>
            <div className="p-6 bg-card rounded-xl min-h-screen">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-primary">Customers</h1>
                            <p className="text-gray-600 mt-2">Manage and monitor your user base activity...</p>
                        </div>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Customer
                        </Button>
                    </div>

                    {/* Search and Filters */}
                    <div className="flex flex-col lg:flex-row gap-4 items-start">
                        <div className="relative flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search customers..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                                />
                            </div>
                        </div>
                        
                        <div className="flex gap-2 flex-wrap">
                            <Button
                                variant={viewStatus === 'all' ? 'default' : 'outline'}
                                onClick={() => setViewStatus('all')}
                                className="px-4 py-2"
                            >
                                All Activity
                            </Button>
                            <Button
                                variant={viewStatus === 'active' ? 'default' : 'outline'}
                                onClick={() => setViewStatus('active')}
                                className="px-4 py-2"
                            >
                                Active
                            </Button>
                            <Button
                                variant={viewStatus === 'inactive' ? 'default' : 'outline'}
                                onClick={() => setViewStatus('inactive')}
                                className="px-4 py-2"
                            >
                                Inactive
                            </Button>
                        </div>
                    </div>

                    {/* Date Range Filter */}
                    <div className="flex flex-col lg:flex-row gap-4 items-start mt-4">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700">From:</label>
                            <input
                                type="date"
                                value={dateRange?.from || ''}
                                onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700">To:</label>
                            <input
                                type="date"
                                value={dateRange?.to || ''}
                                onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <Button
                            onClick={() => setDateRange(undefined)}
                            variant="outline"
                            className="px-4 py-2"
                        >
                            Clear Dates
                        </Button>
                    </div>
                </div>

                {/* Analytics Cards */}
                {analytics && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Active Now</h3>
                                <Users className="w-5 h-5 text-blue-500" />
                            </div>
                            <div className="text-2xl font-bold text-blue-600">{analytics.activeCustomers}</div>
                            <p className="text-sm text-gray-600">Currently active</p>
                        </div>

                        <div className="bg-white rounded-lg p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Retention Rate</h3>
                                <TrendingUp className="w-5 h-5 text-green-500" />
                            </div>
                            <div className="text-2xl font-bold text-green-600">{analytics.retentionRate}%</div>
                            <p className="text-sm text-gray-600">Monthly retention</p>
                        </div>

                        <div className="bg-white rounded-lg p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Avg. Lifetime Value</h3>
                                <DollarSign className="w-5 h-5 text-purple-500" />
                            </div>
                            <div className="text-2xl font-bold text-purple-600">${analytics.averageLifetimeValue.toFixed(2)}</div>
                            <p className="text-sm text-gray-600">Per customer</p>
                        </div>

                        <div className="bg-white rounded-lg p-6 border border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900">Total Customers</h3>
                                <UserCheck className="w-5 h-5 text-gray-500" />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{analytics.totalCustomers}</div>
                            <p className="text-sm text-gray-600">All time</p>
                        </div>
                    </div>
                )}

                {/* Data Table */}
                <DataTable
                    data={data}
                    columns={columns}
                    total={total}
                    page={page}
                    limit={10}
                    onPageChange={setPage}
                    onSearch={(s) => { setSearch(s); setPage(1); }}
                    isLoading={loading}
                />
            </div>
            
            {/* Customer Profile Drawer */}
            <CustomerProfileDrawer
                customerId={selectedCustomerId}
                isOpen={isDrawerOpen}
                onClose={handleDrawerClose}
            />
        </AppLayout>
    );
}
