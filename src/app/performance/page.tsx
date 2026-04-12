"use client";

import React, { useEffect, useState, useCallback } from "react";
import { fetchWorkerPerformance, WorkerPerformance } from "@/features/dashboard/api";
import { DataTable } from "@/components/DataTable";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hammer, Trophy, TrendingDown, IndianRupee, Filter, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WorkerPerformancePage() {
    const [data, setData] = useState<WorkerPerformance[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetchWorkerPerformance();
            setData(res);
        } catch (err: any) {
            console.error("Failed to fetch performance data", err);
            setError("Failed to load worker performance metrics. Restricted to Administrators only.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const columns: any[] = [
        {
            key: "rank",
            label: "#",
            render: (_: any, index: number) => (
                <span className={cn(
                    "font-bold w-6 h-6 flex items-center justify-center rounded-full text-[10px]",
                    index === 0 ? "bg-amber-500 text-white" : 
                    index === 1 ? "bg-slate-300 text-slate-700" :
                    index === 2 ? "bg-amber-700 text-white" : "bg-muted text-muted-foreground"
                )}>
                    {index + 1}
                </span>
            )
        },
        { 
            key: "worker", 
            label: "Professional",
            render: (item: WorkerPerformance) => (
                <div className="flex flex-col">
                    <span className="font-bold text-sm text-foreground">{item.name}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-tight">{item.email}</span>
                </div>
            )
        },
        { 
            key: "totalJobs", 
            label: "Assigned",
            render: (item: WorkerPerformance) => <span className="font-medium">{item.totalJobs}</span>
        },
        { 
            key: "completed", 
            label: "Completed",
            render: (item: WorkerPerformance) => (
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20 shadow-none font-bold">
                    {item.completedJobs}
                </Badge>
            )
        },
        { 
            key: "acceptance", 
            label: "Success Rate",
            render: (item: WorkerPerformance) => {
                const rate = item.acceptanceRate;
                return (
                    <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                            <div 
                                className={cn("h-full transition-all duration-500", rate > 80 ? "bg-green-500" : rate > 50 ? "bg-amber-500" : "bg-red-500")} 
                                style={{ width: `${rate}%` }} 
                            />
                        </div>
                        <span className="text-xs font-bold">{rate.toFixed(1)}%</span>
                    </div>
                );
            }
        },
        { 
            key: "earnings", 
            label: "Total Revenue",
            render: (item: WorkerPerformance) => (
                <div className="flex items-center font-extrabold text-foreground italic underline decoration-primary/30 underline-offset-4">
                    <IndianRupee className="w-3 h-3 mr-0.5" />
                    {item.totalEarnings.toLocaleString()}
                </div>
            )
        }
    ];

    return (
        <AppLayout>
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
                            <Trophy className="w-8 h-8 text-amber-500" />
                            Worker Leaderboard
                        </h2>
                        <p className="text-muted-foreground text-sm font-medium">Rankings based on completion volume and customer success rates.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="rounded-xl gap-2 font-bold border-border/50 shadow-none">
                            <Download className="w-4 h-4" /> Export
                        </Button>
                        <Button className="rounded-xl gap-2 font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
                            <Filter className="w-4 h-4" /> Filter Metrics
                        </Button>
                    </div>
                </div>

                {error ? (
                    <div className="p-8 rounded-3xl bg-destructive/5 border border-destructive/10 text-center">
                        <TrendingDown className="w-12 h-12 text-destructive mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-bold text-foreground mb-2">Access Restricted</h3>
                        <p className="text-muted-foreground">{error}</p>
                    </div>
                ) : (
                    <div className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden">
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
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
