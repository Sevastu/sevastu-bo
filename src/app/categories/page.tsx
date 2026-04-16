"use client";

import React, { useEffect, useState, useCallback } from "react";
import { fetchCategories, createCategory, updateCategory } from "@/features/services/api";
import { Category } from "@/features/services/types";
import { DataTable } from "@/components/DataTable";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, CheckCircle, XCircle } from "lucide-react";
import { getUser } from "@/lib/auth";

export default function CategoriesPage() {
    const [data, setData] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const user = getUser();
    const isAdmin = user?.role === "admin";

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const categories = await fetchCategories();
            setData(categories);
        } catch (err) {
            console.error("Failed to fetch categories", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleToggleStatus = async (category: Category) => {
        if (!isAdmin) return;
        try {
            await updateCategory(category._id, { isActive: !category.isActive });
            loadData();
        } catch (err) {
            console.error("Failed to toggle status", err);
        }
    };

    const handleCreate = async () => {
        const name = prompt("Enter category name:");
        const icon = prompt("Enter icon name (e.g. Hammer, Home):") || "Box";
        if (!name) return;
        
        try {
            await createCategory({ name, icon });
            loadData();
        } catch (err) {
            console.error("Failed to create category", err);
        }
    };

    const columns: any[] = [
        { key: "name", label: "Name" },
        { key: "icon", label: "Icon" },
        {
            key: "isActive",
            label: "Status",
            render: (item: Category) => (
                <Badge
                    className={isAdmin ? "cursor-pointer" : ""}
                    variant={item.isActive ? "default" : "secondary"}
                    onClick={() => handleToggleStatus(item)}
                >
                    {item.isActive ? "Active" : "Inactive"}
                </Badge>
            ),
        },
        {
            key: "actions",
            label: "Actions",
            render: (item: Category) => (
                <div className="flex gap-2">
                    <Button 
                        size="sm" 
                        variant="ghost" 
                        disabled={!isAdmin}
                        onClick={() => {
                            const newName = prompt("New name:", item.name);
                            if (newName) updateCategory(item._id, { name: newName }).then(loadData);
                        }}
                    >
                        <Edit2 className="w-4 h-4" />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <AppLayout>
            <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Category Management</h2>
                    <p className="text-muted-foreground">Define top-level business categories for the platform.</p>
                </div>
                {isAdmin && (
                    <Button onClick={handleCreate} className="gap-2">
                        <Plus className="w-4 h-4" /> Add Category
                    </Button>
                )}
            </div>
            
            <DataTable
                data={data}
                columns={columns}
                isLoading={loading}
                total={data.length}
                page={1}
                limit={100}
                onPageChange={() => {}}
                onSearch={() => {}}
            />
        </AppLayout>
    );
}
