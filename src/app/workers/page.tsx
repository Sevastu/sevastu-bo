"use client";

import React, { useEffect, useState } from "react";
import { WorkerProfileStatus } from "@/lib/enums";
import { fetchWorkers, fetchWorkersByStatus } from "@/features/workers/api";
import { DataTable } from "@/components/DataTable";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { WorkerReviewSheet } from "./components/WorkerReviewSheet";

function resolveWorkerUserId(row: Record<string, unknown>): string {
    return String(row.userId ?? row.id ?? "");
}

export default function WorkersPage() {
    const [data, setData] = useState<Record<string, unknown>[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [viewStatus, setViewStatus] = useState<WorkerProfileStatus | "all">("all");
    const [sheetOpen, setSheetOpen] = useState(false);
    const [selectedWorkerUserId, setSelectedWorkerUserId] = useState<string | null>(null);
    const [selectedRowStatus, setSelectedRowStatus] = useState<string | undefined>(undefined);

    const loadWorkers = async () => {
        setLoading(true);
        try {
            let workers: Record<string, unknown>[] = [];
            if (viewStatus === "all") {
                workers = await fetchWorkers();
            } else {
                workers = await fetchWorkersByStatus(viewStatus as WorkerProfileStatus);
            }

            const normalizedSearch = search.trim().toLowerCase();
            const filtered = normalizedSearch
                ? workers.filter((w) =>
                      String(w.name ?? "")
                          .toLowerCase()
                          .includes(normalizedSearch) ||
                      String(w.phone ?? "")
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

    const columns: any[] = [
        {
            key: "id",
            label: "User ID",
            render: (u: Record<string, unknown>) => String(u.userId ?? u.id ?? "—"),
        },
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
            render: (u: Record<string, unknown>) => {
                return (
                    <Button
                        size="sm"
                        variant="outline"
                        className="h-8 gap-1"
                        onClick={() => openReview(u)}
                    >
                        <Eye className="w-4 h-4" />
                        Review
                    </Button>
                );
            },
        },
    ];

    return (
        <AppLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">Worker Management</h2>
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

            <WorkerReviewSheet
                open={sheetOpen}
                onOpenChange={setSheetOpen}
                workerUserId={selectedWorkerUserId}
                initialProfileStatus={selectedRowStatus}
                onAfterChange={loadWorkers}
            />
        </AppLayout>
    );
}
