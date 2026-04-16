"use client";

import React, { useEffect, useState } from "react";
import { fetchUsers, updateUserStatus, User } from "@/features/users/api";
import { UserRole, UserStatus } from "@/lib/enums";
import { DataTable } from "@/components/DataTable";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";

export default function CustomersPage() {
    const [data, setData] = useState<User[]>([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const result = await fetchUsers(page, 10, search, UserRole.CUSTOMER);
            if (result.success) {
                setData(result.data);
                setTotal(result.pagination.total);
            }
        } catch (err) {
            console.error("Failed to fetch customers", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, [page, search]);

    const handleStatusChange = async (id: string, currentStatus: string) => {
        try {
            const newStatus = currentStatus === UserStatus.ACTIVE ? UserStatus.BLOCKED : UserStatus.ACTIVE;
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
        { key: "phone", label: "Phone" },
        {
            key: "status",
            label: "Status",
            render: (u: User) => (
                <Badge
                    className="cursor-pointer"
                    variant={u.status === UserStatus.ACTIVE ? "default" : "secondary"}
                    onClick={() => handleStatusChange(u.id, u.status)}
                >
                    {u.status}
                </Badge>
            ),
        },
    ];

    return (
        <AppLayout>
            <div className="flex flex-col gap-1 mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-primary">Customer Management</h2>
                <p className="text-muted-foreground">Monitor and manage all registered customers on the platform.</p>
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
