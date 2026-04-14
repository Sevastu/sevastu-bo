"use client";

import React, { useEffect, useState } from "react";
import { fetchUsers, updateUserStatus, User } from "@/features/users/api";
import { UserRole, UserStatus, WorkerProfileStatus } from "@/lib/enums";
import { fetchWorkersByStatus, approveWorker, rejectWorker } from "@/features/workers/api";
import { DataTable } from "@/components/DataTable";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, XCircle } from "lucide-react";

export default function WorkersPage() {
    const [data, setData] = useState<User[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [viewStatus, setViewStatus] = useState<WorkerProfileStatus | "all">("all");

    const loadWorkers = async () => {
        setLoading(true);
        try {
            let result;
            if (viewStatus === "all") {
                result = await fetchUsers(page, 10, search, UserRole.WORKER);
            } else {
                // Simplified for this view, assuming fetchWorkersByStatus returns a similar structure
                const workers = await fetchWorkersByStatus(viewStatus as WorkerProfileStatus);
                result = { success: true, data: workers, pagination: { total: workers.length } };
            }

            if (result.success) {
                setData(result.data);
                setTotal(result.pagination.total);
            }
        } catch (err) {
            console.error("Failed to fetch workers", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadWorkers();
    }, [page, search, viewStatus]);

    const handleApprove = async (id: string) => {
        if (!confirm("Are you sure you want to verify this worker?")) return;
        try {
            await approveWorker(id);
            loadWorkers();
        } catch (err) {
            console.error("Failed to approve worker", err);
        }
    };

    const handleReject = async (id: string) => {
        const reason = prompt("Please enter a rejection reason:");
        if (!reason) return;
        try {
            await rejectWorker(id, reason);
            loadWorkers();
        } catch (err) {
            console.error("Failed to reject worker", err);
        }
    };

    const columns: any[] = [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { 
            key: "profileStatus", 
            label: "Verification",
            render: (u: any) => {
                const status = (u as any).profileStatus || "N/A";
                let variant: any = "outline";
                if (status === WorkerProfileStatus.VERIFIED) variant = "default";
                if (status === WorkerProfileStatus.UNDER_REVIEW) variant = "secondary";
                if (status === WorkerProfileStatus.REJECTED) variant = "destructive";
                
                return <Badge variant={variant}>{status}</Badge>;
            }
        },
        { key: "phone", label: "Phone" },
        {
            key: "actions",
            label: "Actions",
            render: (u: User) => {
                const status = (u as any).profileStatus;
                return (
                    <div className="flex gap-2">
                        {status === WorkerProfileStatus.UNDER_REVIEW && (
                            <>
                                <Button size="sm" variant="default" onClick={() => handleApprove(u.id)} className="h-8 gap-1">
                                    <CheckCircle className="w-4 h-4" /> Approve
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleReject(u.id)} className="h-8 gap-1">
                                    <XCircle className="w-4 h-4" /> Reject
                                </Button>
                            </>
                        )}
                        <Button size="sm" variant="outline" className="h-8">
                            <Eye className="w-4 h-4" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Worker Management</h2>
                    <p className="text-muted-foreground">Approve and manage service providers.</p>
                </div>
                
                <div className="flex gap-2 bg-muted p-1 rounded-lg">
                    <Button 
                        size="sm" 
                        variant={viewStatus === "all" ? "default" : "ghost"}
                        onClick={() => setViewStatus("all")}
                    >
                        All
                    </Button>
                    <Button 
                        size="sm" 
                        variant={viewStatus === WorkerProfileStatus.UNDER_REVIEW ? "default" : "ghost"}
                        onClick={() => setViewStatus(WorkerProfileStatus.UNDER_REVIEW)}
                    >
                        Pending Review
                    </Button>
                </div>
            </div>

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
        </AppLayout>
    );
}
