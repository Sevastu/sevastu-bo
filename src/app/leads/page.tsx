"use client";

import React, { useEffect, useState } from "react";
import { fetchLeads, updateLeadStatus, Lead } from "@/features/leads/api";
import { DataTable } from "@/components/DataTable";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";

export default function LeadsPage() {
    const [data, setData] = useState<Lead[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const loadLeads = async () => {
        setLoading(true);
        try {
            const result = await fetchLeads(page, 10, search);
            if (result.success) {
                setData(result.data);
                setTotal(result.pagination.total);
            }
        } catch (err) {
            console.error("Failed to fetch leads", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadLeads();
    }, [page, search]);

    const handleStatusChange = async (id: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === "new" ? "contacted" : "new";
            await updateLeadStatus(id, newStatus);
            loadLeads();
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const columns: any[] = [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        {
            key: "status",
            label: "Status",
            render: (l: Lead) => (
                <Badge
                    className="cursor-pointer capitalize"
                    variant={l.status === "new" ? "default" : "secondary"}
                    onClick={() => handleStatusChange(l.id, l.status)}
                >
                    {l.status}
                </Badge>
            ),
        },
    ];

    return (
        <AppLayout>
            <div className="flex flex-col gap-1 mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Leads Management</h2>
                <p className="text-muted-foreground">Track and manage potential business leads and communication states.</p>
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
