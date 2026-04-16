"use client";

import React, { useEffect, useState, useCallback } from "react";
import { fetchSubServices, createSubService, updateSubService, fetchServices } from "@/features/services/api";
import { SubService, Service } from "@/features/services/types";
import { DataTable } from "@/components/DataTable";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit2, Filter, IndianRupee } from "lucide-react";
import { getUser } from "@/lib/auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

export default function SubServicesPage() {
    const [data, setData] = useState<SubService[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<string>("all");
    const [loading, setLoading] = useState(false);
    const user = getUser();
    const isAdmin = user?.role === "admin";

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const [subServices, srvs] = await Promise.all([
                fetchSubServices(selectedService === "all" ? undefined : selectedService),
                fetchServices()
            ]);
            setData(subServices);
            setServices(srvs);
        } catch (err) {
            console.error("Failed to fetch sub-services", err);
        } finally {
            setLoading(false);
        }
    }, [selectedService]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleCreate = async () => {
        const name = prompt("Enter sub-service name:");
        const basePrice = Number(prompt("Enter base price (INR):"));
        const priceType = prompt("Price type ('fixed' or 'range'):") as 'fixed' | 'range' || 'fixed';
        
        if (!name || isNaN(basePrice) || selectedService === "all") {
             if (selectedService === "all") alert("Please select a service first.");
             return;
        }
        
        try {
            await createSubService({ name, basePrice, priceType, serviceId: selectedService });
            loadData();
        } catch (err) {
            console.error("Failed to create sub-service", err);
        }
    };

    const columns: any[] = [
        { key: "name", label: "Name" },
        { 
            key: "serviceId", 
            label: "Parent Service",
            render: (item: SubService) => typeof item.serviceId === 'string' ? item.serviceId : (item.serviceId as Service).name
        },
        { 
            key: "basePrice", 
            label: "Base Price",
            render: (item: SubService) => (
                <div className="flex items-center font-semibold text-primary">
                    <IndianRupee className="w-3 h-3 mr-0.5" />
                    {item.basePrice}
                    {item.priceType === 'range' && <span className="text-[10px] ml-1 opacity-70">Onwards</span>}
                </div>
            )
        },
        {
            key: "isActive",
            label: "Status",
            render: (item: SubService) => (
                <Badge
                    className={isAdmin ? "cursor-pointer" : ""}
                    variant={item.isActive ? "default" : "secondary"}
                    onClick={async () => {
                        if (!isAdmin) return;
                        await updateSubService(item._id, { isActive: !item.isActive });
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
            render: (item: SubService) => (
                <div className="flex gap-2">
                    <Button 
                        size="sm" 
                        variant="ghost" 
                        disabled={!isAdmin}
                        onClick={() => {
                            const newName = prompt("New name:", item.name);
                            if (newName) updateSubService(item._id, { name: newName }).then(loadData);
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
                    <h2 className="text-3xl font-bold tracking-tight text-primary">Sub-Service Management</h2>
                    <p className="text-muted-foreground">Manage granular service offerings and pricing models.</p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center w-full md:w-auto">
                    <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-xl ring-1 ring-border/50">
                        <Filter className="w-4 h-4 ml-2 text-muted-foreground" />
                        <Select value={selectedService} onValueChange={setSelectedService}>
                            <SelectTrigger className="w-[200px] border-none bg-transparent shadow-none focus:ring-0">
                                <SelectValue placeholder="Filter by Service" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Services</SelectItem>
                                {services.map((srv) => (
                                    <SelectItem key={srv._id} value={srv._id}>{srv.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {isAdmin && (
                        <Button 
                            onClick={handleCreate} 
                            disabled={selectedService === "all"}
                            className="gap-2 shrink-0"
                        >
                            <Plus className="w-4 h-4" /> Add Sub-Service
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
