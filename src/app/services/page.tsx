"use client";

import React, { useEffect, useState, useCallback } from "react";
import { fetchServices, createService, updateService, fetchCategories } from "@/features/services/api";
import { Service, Category } from "@/features/services/types";
import { DataTable } from "@/components/DataTable";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Filter } from "lucide-react";
import { getUser } from "@/lib/auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

export default function ServicesPage() {
    const [data, setData] = useState<Service[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [loading, setLoading] = useState(false);
    const user = getUser();
    const isAdmin = user?.role === "admin";

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const [services, cats] = await Promise.all([
                fetchServices(selectedCategory === "all" ? undefined : selectedCategory),
                fetchCategories()
            ]);
            setData(services);
            setCategories(cats);
        } catch (err) {
            console.error("Failed to fetch services", err);
        } finally {
            setLoading(false);
        }
    }, [selectedCategory]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleCreate = async () => {
        const name = prompt("Enter service name:");
        const image = prompt("Enter image URL:") || "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400";
        if (!name || selectedCategory === "all") {
             if (selectedCategory === "all") alert("Please select a category first.");
             return;
        }
        
        try {
            await createService({ name, image, categoryId: selectedCategory });
            loadData();
        } catch (err) {
            console.error("Failed to create service", err);
        }
    };

    const columns: any[] = [
        { key: "name", label: "Name" },
        { 
            key: "categoryId", 
            label: "Category",
            render: (item: Service) => typeof item.categoryId === 'string' ? item.categoryId : (item.categoryId as Category).name
        },
        {
            key: "isActive",
            label: "Status",
            render: (item: Service) => (
                <Badge
                    className={isAdmin ? "cursor-pointer" : ""}
                    variant={item.isActive ? "default" : "secondary"}
                    onClick={async () => {
                        if (!isAdmin) return;
                        await updateService(item._id, { isActive: !item.isActive });
                        loadData();
                    }}
                >
                    {item.isActive ? "Active" : "Inactive"}
                </Badge>
            ),
        },
        {
            key: "actions",
            label: "Actions",
            render: (item: Service) => (
                <div className="flex gap-2">
                    <Button 
                        size="sm" 
                        variant="ghost" 
                        disabled={!isAdmin}
                        onClick={() => {
                            const newName = prompt("New name:", item.name);
                            if (newName) updateService(item._id, { name: newName }).then(loadData);
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
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Service Management</h2>
                    <p className="text-muted-foreground">Manage individual service listings within categories.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
                    <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-xl ring-1 ring-border/50">
                        <Filter className="w-4 h-4 ml-2 text-muted-foreground" />
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-[200px] border-none bg-transparent shadow-none focus:ring-0">
                                <SelectValue placeholder="Filter by Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {categories.map((cat) => (
                                    <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {isAdmin && (
                        <Button 
                            onClick={handleCreate} 
                            disabled={selectedCategory === "all"}
                            className="gap-2 shrink-0"
                        >
                            <Plus className="w-4 h-4" /> Add Service
                        </Button>
                    )}
                </div>
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
