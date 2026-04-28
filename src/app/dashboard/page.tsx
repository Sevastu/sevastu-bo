"use client";

import { useEffect, useState, useCallback } from "react";
import { getUser, User } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, TrendingUp, AlertCircle, RefreshCcw, Loader2, Hammer, UserCheck, DollarSign, Clock, CheckCircle } from "lucide-react";
import { fetchDashboardStats, DashboardStats, fetchAnalytics, AnalyticsData } from "@/features/dashboard/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/ui/KPICard";
import { JobsChart } from "@/components/charts/JobsChart";
import { SystemHealth } from "@/components/ui/SystemHealth";
import { cn } from "@/lib/utils";
import { DataTable } from "@/components/DataTable";
import JobsPage from "../jobs/page";

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [statsData, analyticsData] = await Promise.all([
                fetchDashboardStats(),
                fetchAnalytics()
            ]);
            setStats(statsData);
            setAnalytics(analyticsData);
        } catch (err: any) {
            console.error("Could not fetch dashboard data:", err);
            setError(err?.response?.data?.message || err?.message || "Failed to load dashboard data.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        setUser(getUser());
        loadData();
    }, [loadData]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-8 bg-destructive/5 rounded-2xl border border-destructive/10 text-center animate-in fade-in zoom-in duration-300">
                <div className="p-4 bg-destructive/10 rounded-full text-destructive">
                    <AlertCircle className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground">Something went wrong</h3>
                    <p className="text-muted-foreground max-w-md">{error}</p>
                </div>
                <Button 
                    onClick={loadData} 
                    variant="outline" 
                    className="gap-2 hover:bg-destructive/5 hover:text-destructive border-destructive/20"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Try Again
                </Button>
            </div>
        );
    }

    const StatSkeleton = () => (
        <Card className="shadow-md border-none overflow-hidden animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="w-8 h-8 bg-muted rounded-lg" />
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="h-9 w-16 bg-muted rounded" />
                <div className="h-5 w-28 bg-muted/50 rounded-full" />
            </CardContent>
        </Card>
    );

    const maxAnalyticsCount = Math.max(...analytics.map(a => a.count), 1);

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-bold tracking-tight text-primary">Dashboard</h1>
                    <p className="text-muted-foreground font-medium text-lg">Overview of your service marketplace operations</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-2xl border-border/50 bg-card hover:bg-muted font-bold h-12 shadow-sm" onClick={loadData}>
                        <RefreshCcw className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")} />
                        Refresh Data
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <KPICard
                    title="Total Jobs"
                    value={String((stats?.activeJobs ?? 0) + (stats?.completedToday ?? 0))}
                    change="+12%"
                    changeType="increase"
                    icon={<Briefcase size={20} />}
                />
                <KPICard
                    title="Active Jobs"
                    value={String(stats?.activeJobs ?? 0)}
                    change="+5%"
                    changeType="increase"
                    icon={<Clock size={20}/>}
                />
                <KPICard
                    title="Completed Jobs"
                    value={String(stats?.completedToday ?? 0)}
                    change="+18%"
                    changeType="increase"
                    icon={<CheckCircle size={20} />}
                />
                <KPICard
                    title="Revenue"
                    value="$45,678"
                    change="+23%"
                    changeType="increase"
                    icon={<DollarSign size={20}/>}
                />
            </div>

            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Jobs Over Time Chart */}
                <div className="lg:col-span-2">
                    <JobsChart />
                </div>

                {/* System Health */}
                <div>
                    <SystemHealth />
                </div>
            </div>

            {/* Recent Activity */}
            <Card className="shadow-2xl border-none ring-1 ring-border/50 rounded-3xl p-6 bg-card">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-primary" />
                        Recent Activity
                    </h3>
                    <Button variant="outline" className="rounded-2xl border-border/50 bg-card hover:bg-muted font-bold h-10 shadow-sm">
                        View All
                    </Button>
                </div>
                
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl border border-border/30 hover:bg-muted transition-colors">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-foreground">New job assigned</div>
                                <div className="text-sm text-muted-foreground">Home Cleaning - John Doe</div>
                            </div>
                            <div className="text-sm text-muted-foreground font-medium">{item * 2} min ago</div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

