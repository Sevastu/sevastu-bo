"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Search, Plus, MoreVertical, Star, MapPin, Edit, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { WorkerProfileStatus } from "@/lib/enums";
import { fetchWorkers, fetchWorkersByStatus } from "@/features/workers/api";
import { DataTable } from "@/components/DataTable";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { WorkerReviewSheet } from "./components/WorkerReviewSheet";
import { WorkerDetailsDrawer } from "./components/WorkerDetailsDrawer";

function resolveWorkerUserId(row: Record<string, unknown>): string {
    return String(row.userId ?? row.id ?? "");
}

type StatusFilter = 'all' | 'verified' | 'pending' | 'rejected';

export default function WorkersPage() {
    const router = useRouter();
    const [data, setData] = useState<Record<string, unknown>[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [viewStatus, setViewStatus] = useState<StatusFilter>('all');
    const [sheetOpen, setSheetOpen] = useState(false);
    const [selectedWorkerUserId, setSelectedWorkerUserId] = useState<string | null>(null);
    const [selectedRowStatus, setSelectedRowStatus] = useState<string | undefined>(undefined);
    const [detailsDrawerOpen, setDetailsDrawerOpen] = useState(false);
    const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);

    const loadWorkers = async () => {
        setLoading(true);
        try {
            let workers: Record<string, unknown>[] = [];
            if (viewStatus === "all") {
                workers = await fetchWorkers();
            } else {
                const statusParam = 
                    viewStatus === 'verified' ? WorkerProfileStatus.VERIFIED : 
                    viewStatus === 'pending' ? WorkerProfileStatus.UNDER_REVIEW : 
                    WorkerProfileStatus.REJECTED;
                workers = await fetchWorkersByStatus(statusParam);
            }

            const normalizedSearch = search.trim().toLowerCase();
            const filtered = normalizedSearch
                ? workers.filter((w) =>
                      String(w.name ?? "")
                          .toLowerCase()
                          .includes(normalizedSearch) ||
                      String(w.email ?? "")
                          .toLowerCase()
                          .includes(normalizedSearch) ||
                      String(w.city ?? "")
                          .toLowerCase()
                          .includes(normalizedSearch) ||
                      String(w.userId ?? "")
                          .toLowerCase()
                          .includes(normalizedSearch),
                  )
                : workers;

            const start = (page - 1) * 10;
            const paged = filtered.slice(start, start + 10);
            setData(paged);
            setTotal(filtered.length);
        } catch (err) {
            console.error("Failed to fetch workers", err);
            setData([]);
            setTotal(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadWorkers();
    }, [page, search, viewStatus]);

    const openReview = (row: Record<string, unknown>) => {
        const uid = resolveWorkerUserId(row);
        if (!uid) return;
        setSelectedWorkerUserId(uid);
        setSelectedRowStatus(String(row.profileStatus ?? ""));
        setSheetOpen(true);
    };

    const openWorkerDetails = (row: Record<string, unknown>) => {
        const workerId = resolveWorkerUserId(row);
        if (!workerId) return;
        setSelectedWorkerId(workerId);
        setDetailsDrawerOpen(true);
    };

    const openExternalView = (row: Record<string, unknown>) => {
        const workerId = resolveWorkerUserId(row);
        if (!workerId) return;
        
        // Open worker profile in same tab using Next.js router (faster client-side navigation)
        router.push(`/workers/profile/${workerId}`);
    };

    // Status badge component
    const StatusBadge = ({ status }: { status: string }) => {
        const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
        
        switch (status) {
            case 'verified':
            case 'APPROVED':
                return <span className={`${baseClasses} bg-green-100 text-green-800 border border-green-200`}>Verified</span>;
            case 'under_review':
            case 'kyc_pending':
                return <span className={`${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`}>Pending</span>;
            case 'rejected':
                return <span className={`${baseClasses} bg-red-100 text-red-800 border border-red-200`}>Rejected</span>;
            case 'draft':
                return <span className={`${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`}>Draft</span>;
            default:
                return <span className={`${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`}>{status}</span>;
        }
    };

    // Star rating component
    const StarRating = ({ rating }: { rating: number }) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<Star key={i} className="w-4 h-4 fill-yellow-200 text-yellow-400" />);
            } else {
                stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
            }
        }
        
        return (
            <div className="flex items-center gap-1">
                {stars}
                <span className="text-sm text-gray-600 ml-1">{rating.toFixed(1)}</span>
            </div>
        );
    };

    const columns: any[] = [
        {
            key: "name",
            label: "Worker Name",
            render: (u: Record<string, unknown>) => {
                const worker = u as any;
                return (
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            {worker.photoUrl ? (
                                <img 
                                    src={worker.photoUrl} 
                                    alt={worker.name}
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-500 font-medium">
                                    {worker.name?.charAt(0).toUpperCase() || 'W'}
                                </span>
                            )}
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-900">{worker.name || '—'}</div>
                            <div className="text-sm text-gray-500">{worker.email || '—'}</div>
                        </div>
                    </div>
                );
            },
        },
        {
            key: "skills",
            label: "Primary Skills",
            render: (u: Record<string, unknown>) => {
                const worker = u as any;
                const skills = worker.skills || [];
                return (
                    <div className="flex flex-wrap gap-1">
                        {skills.slice(0, 3).map((skill: string, index: number) => (
                            <span 
                                key={index}
                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                                {skill}
                            </span>
                        ))}
                        {skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{skills.length - 3}
                            </span>
                        )}
                    </div>
                );
            },
        },
        {
            key: "location",
            label: "Location",
            render: (u: Record<string, unknown>) => {
                const worker = u as any;
                return (
                    <div className="flex items-center text-sm text-gray-900">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        {worker.city && worker.state ? `${worker.city}, ${worker.state}` : '—'}
                    </div>
                );
            },
        },
        {
            key: "profileStatus", 
            label: "Status",
            render: (u: any) => {
                const status = u.profileStatus || "N/A";
                return <StatusBadge status={status} />;
            }
        },
        {
            key: "rating",
            label: "Rating",
            render: (u: Record<string, unknown>) => {
                const worker = u as any;
                return <StarRating rating={worker.rating || 0} />;
            },
        },
        {
            // key: "actions",
            // label: "Actions",
            render: (u: Record<string, unknown>) => {
                // return (
                //     <div className="flex items-center justify-end gap-2">
                //         {/* <button 
                //             className="text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors p-2 rounded-md font-medium"
                //             onClick={() => openExternalView(u)}
                //             title="View Profile in New Window"
                //         >
                //             <Eye className="w-4 h-4" />
                //         </button> */}
                //         {/* <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded">
                //             <Edit className="w-4 h-4" />
                //         </button> */}
                //         {/* <button className="text-gray-400 hover:text-gray-600 transition-colors">
                //             <MoreVertical className="w-4 h-4" />
                //         </button> */}
                //     </div>
                // );
            },
        },
    ];

    return (
        <AppLayout>
            <div className="p-6 bg-card min-h-screen rounded-lg">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-primary mb-2">Worker Management</h1>
                            <p className="text-gray-600">Manage and monitor service providers</p>
                        </div>
                        
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                            <Plus className="w-5 h-5" />
                            Onboard Worker
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search workers..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-white w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Status Tabs */}
                <div className="flex gap-1 mb-6 bg-white p-1 rounded-lg border border-gray-200 w-fit">
                    {[
                        { key: 'all', label: 'All Workers' },
                        { key: 'verified', label: 'Verified' },
                        { key: 'pending', label: 'Pending' },
                        { key: 'rejected', label: 'Rejected' }
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setViewStatus(tab.key as StatusFilter)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                                viewStatus === tab.key
                                    ? 'bg-blue-600 text-white'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Credentialing Status</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Verified</span>
                                <span className="text-sm font-medium text-green-600">
                                    {data.filter(w => (w as any).profileStatus === 'verified' || (w as any).profileStatus === 'APPROVED').length}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Pending</span>
                                <span className="text-sm font-medium text-yellow-600">
                                    {data.filter(w => (w as any).profileStatus === 'under_review' || (w as any).profileStatus === 'kyc_pending').length}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Rejected</span>
                                <span className="text-sm font-medium text-red-600">
                                    {data.filter(w => (w as any).profileStatus === 'rejected').length}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Growth</h3>
                        <div className="text-2xl font-bold text-blue-600">+12.5%</div>
                        <p className="text-sm text-gray-600">23 new workers this month</p>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Workers</h3>
                        <div className="text-2xl font-bold text-gray-900">
                            {data.filter(w => (w as any).isAvailable).length}
                        </div>
                        <p className="text-sm text-gray-600">Currently available</p>
                    </div>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Worker Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Primary Skills
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rating
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            Loading workers...
                                        </td>
                                    </tr>
                                ) : data.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            No workers found
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((worker) => (
                                        <tr 
                                            key={resolveWorkerUserId(worker)}
                                            className="hover:bg-gray-50 transition-colors cursor-pointer"
                                            onClick={() => openWorkerDetails(worker)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                                        {(worker as any).photoUrl ? (
                                                            <img 
                                                                src={(worker as any).photoUrl} 
                                                                alt={(worker as any).name}
                                                                className="w-10 h-10 rounded-full object-cover"
                                                            />
                                                        ) : (
                                                            <span className="text-gray-500 font-medium">
                                                                {(worker as any).name?.charAt(0).toUpperCase() || 'W'}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{(worker as any).name || '—'}</div>
                                                        <div className="text-sm text-gray-500">{(worker as any).email || '—'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex flex-wrap gap-1">
                                                    {((worker as any).skills || []).slice(0, 3).map((skill: string, index: number) => (
                                                        <span 
                                                            key={index}
                                                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                    {((worker as any).skills || []).length > 3 && (
                                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                            +{((worker as any).skills || []).length - 3}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-gray-900">
                                                    <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                                                    {(worker as any).city && (worker as any).state ? `${(worker as any).city}, ${(worker as any).state}` : '—'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={(worker as any).profileStatus || 'N/A'} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StarRating rating={(worker as any).rating || 0} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    {/* <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                                        <Edit className="w-4 h-4" />
                                                    </button> */}
                                                    <button 
                                                        className="text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors p-2 rounded-md font-medium"
                                                        onClick={() => openExternalView(worker)}
                                                        title="View Profile in New Window"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button className="text-gray-400 hover:text-gray-600 transition-colors">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                {total > 10 && (
                    <div className="flex items-center justify-between mt-6">
                        <div className="text-sm text-gray-700">
                            Showing {((page - 1) * 10) + 1} to {Math.min(page * 10, total)} of {total} results
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage(page + 1)}
                                disabled={page * 10 >= total}
                                className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <WorkerReviewSheet
                open={sheetOpen}
                onOpenChange={setSheetOpen}
                workerUserId={selectedWorkerUserId}
                initialProfileStatus={selectedRowStatus}
                onAfterChange={loadWorkers}
            />

            <WorkerDetailsDrawer
                isOpen={detailsDrawerOpen}
                onClose={() => setDetailsDrawerOpen(false)}
                workerId={selectedWorkerId}
                onWorkerUpdate={loadWorkers}
            />
        </AppLayout>
    );
}
