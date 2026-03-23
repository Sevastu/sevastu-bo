"use client";

import React, { useEffect, useState } from "react";
import { fetchUsers, updateUserStatus, User } from "@/features/users/api";
import { DataTable } from "@/components/DataTable";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
         

export default function UsersPage() {
    const [data, setData] = useState<User[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const result = await fetchUsers(page, 10, search);
            if (result.success) {
                setData(result.data);
                setTotal(result.pagination.total);
            }
        } catch (err) {
            console.error("Failed to fetch users", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, [page, search]);

    const handleStatusChange = async (id: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === "active" ? "inactive" : "active";
            await updateUserStatus(id, newStatus);
            loadUsers();
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const columns: any[] = [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role", render: (u: User) => <span className="capitalize">{u.role}</span> },
        {
            key: "status",
            label: "Status",
            render: (u: User) => (
                <Badge
                    className="cursor-pointer"
                    variant={u.status === "active" ? "default" : "secondary"}
                    onClick={() => handleStatusChange(u.id, u.status)}
                >
                    {u.status}
                </Badge>
            ),
        },
    ];

    return (
        <AppLayout>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Users Management</h2>
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
