"use client";

import React, { useEffect, useState } from "react";
import { fetchJobs, updateJobStatus, Job } from "@/features/jobs/api";
import { DataTable } from "@/components/DataTable";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";

export default function JobsPage() {
    const [data, setData] = useState<Job[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const loadJobs = async () => {
        setLoading(true);
        try {
            const result = await fetchJobs(page, 10, search);
            if (result.success) {
                setData(result.data);
                setTotal(result.pagination.total);
            }
        } catch (err) {
            console.error("Failed to fetch jobs", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadJobs();
    }, [page, search]);

    const handleStatusChange = async (id: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === "open" ? "closed" : "open";
            await updateJobStatus(id, newStatus);
            loadJobs();
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const columns: any[] = [
        { key: "id", label: "ID" },
        { key: "title", label: "Title" },
        { key: "employer", label: "Employer" },
        {
            key: "status",
            label: "Status",
            render: (j: Job) => (
                <Badge
                    className="cursor-pointer"
                    variant={j.status === "open" ? "default" : "secondary"}
                    onClick={() => handleStatusChange(j.id, j.status)}
                >
                    {j.status}
                </Badge>
            ),
        },
    ];

    return (
        <AppLayout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Jobs Management</h2>
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
