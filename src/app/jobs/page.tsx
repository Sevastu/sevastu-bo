"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { fetchJobs } from "@/features/jobs/api";
import { Job, JobStatus, JobFilters } from "@/features/jobs/types";
import { DataTable } from "@/components/DataTable";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, Eye, Calendar, Search } from "lucide-react";
import { getUser } from "@/lib/auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { JobDetailsSheet } from "./components/JobDetailsSheet";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/date-utils";
import { Input } from "@/components/ui/input";

export default function JobsPage() {
    const [data, setData] = useState<Job[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [filters, setFilters] = useState<JobFilters>({
        status: 'all',
        serviceName: 'all',
    });
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const user = getUser();
    const isAdmin = user?.role === "admin";

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchJobs({ ...filters, page, limit });
            setData(res.data);
            setTotal(res.pagination.total);
        } catch (err) {
            console.error("Failed to fetch jobs", err);
        } finally {
            setLoading(false);
        }
    }, [filters, page, limit]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const statusColors: Record<string, string> = {
        [JobStatus.OPEN]: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        [JobStatus.ASSIGNED]: "bg-purple-500/10 text-purple-500 border-purple-500/20",
        [JobStatus.IN_PROGRESS]: "bg-orange-500/10 text-orange-500 border-orange-500/20",
        [JobStatus.COMPLETED]: "bg-green-500/10 text-green-500 border-green-500/20",
        [JobStatus.CANCELLED]: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    const columns: any[] = [
        { 
            key: "id", 
            label: "Job ID",
            render: (item: Job) => (
                <span className="font-mono text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded uppercase">
                    {item.id.slice(-8)}
                </span>
            )
        },
        { 
            key: "service", 
            label: "Service",
            render: (item: Job) => (
                <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-sm text-foreground">{item.service}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">{item.subService}</span>
                </div>
            )
        },
        { 
            key: "scheduledAt", 
            label: "Scheduled",
            render: (item: Job) => (
                <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
                    <Calendar className="w-3 h-3" />
                    {formatDate(new Date(item.scheduledAt), "dd MMM, hh:mm a")}
                </div>
            )
        },
        {
            key: "status",
            label: "Status",
            render: (item: Job) => (
                <Badge className={cn("px-3 py-1 rounded-full font-bold uppercase tracking-widest text-[9px] border shadow-none", statusColors[item.status])}>
                    {item.status.replace('_', ' ')}
                </Badge>
            ),
        },
        {
            key: "price",
            label: "Amount",
            render: (item: Job) => <span className="font-extrabold text-foreground tracking-tight italic">₹{item.price}</span>
        },
        {
            key: "actions",
            label: "Action",
            render: (item: Job) => (
                <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 w-8 p-0 rounded-lg hover:bg-primary/5 hover:text-primary transition-all active:scale-90"
                    onClick={() => {
                        setSelectedJob(item);
                        setIsDetailsOpen(true);
                    }}
                >
                    <Eye className="w-4 h-4" />
                </Button>
            )
        }
    ];

    return (
        <AppLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-3xl font-bold tracking-tight text-primary">Job Management</h2>
                        <p className="text-muted-foreground text-sm font-medium">Monitor and control all service requests across the network.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-3xl bg-muted/30 border border-border/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input 
                            placeholder="Search by ID, Service..." 
                            className="pl-10 h-11 bg-card border-border/50 rounded-xl focus-visible:ring-primary/20"
                            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                        />
                    </div>

                    <Select value={filters.status ?? 'all'} onValueChange={(val: string) => setFilters(prev => ({ ...prev, status: val as any }))}>
                        <SelectTrigger className="h-11 bg-card border-border/50 rounded-xl focus:ring-primary/20">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-border/50 shadow-xl overflow-hidden">
                            <SelectItem value="all">All Statuses</SelectItem>
                            {Object.values(JobStatus).map(s => (
                                <SelectItem key={s} value={s} className="capitalize">{s.replace('_', ' ')}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="flex items-center gap-2">
                        <Input 
                            type="date"
                            className="h-11 bg-card border-border/50 rounded-xl focus-visible:ring-primary/20"
                            onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                        />
                         <span className="text-muted-foreground font-bold">→</span>
                        <Input 
                            type="date"
                            className="h-11 bg-card border-border/50 rounded-xl focus-visible:ring-primary/20"
                            onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                        />
                    </div>

                    <Button variant="outline" className="h-11 rounded-xl gap-2 font-bold border-border/50 hover:bg-muted" onClick={() => setFilters({ status: 'all', serviceName: 'all' })}>
                       <Filter className="w-4 h-4" /> Reset
                    </Button>
                </div>
                
                <DataTable
                    data={data}
                    columns={columns}
                    isLoading={loading}
                    total={total}
                    page={page}
                    limit={limit}
                    onPageChange={setPage}
                    onSearch={() => {}}
                />
            </div>

            <JobDetailsSheet 
                job={selectedJob}
                open={isDetailsOpen}
                onOpenChange={setIsDetailsOpen}
                onUpdate={loadData}
                isAdmin={isAdmin}
            />
        </AppLayout>
    );
}
