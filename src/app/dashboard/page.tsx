"use client";

import { useEffect, useState, useCallback } from "react";
import { getUser, User } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, TrendingUp, AlertCircle, RefreshCcw, Loader2 } from "lucide-react";
import { fetchDashboardStats, DashboardStats } from "@/features/dashboard/api";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadStats = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchDashboardStats();
            setStats(data);
        } catch (err: any) {
            console.error("Could not fetch stats:", err);
            setError(err?.response?.data?.message || err?.message || "Failed to load dashboard statistics. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        setUser(getUser());
        loadStats();
    }, [loadStats]);

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
                    onClick={loadStats} 
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

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Welcome back, {user?.name || 'User'}! 👋
                    </h2>
                    <p className="text-muted-foreground font-medium">Here's a quick overview of sevastu's performance.</p>
                </div>
                {isLoading && <Loader2 className="w-5 h-5 text-primary animate-spin" />}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-card-foreground">
                {isLoading ? (
                    <>
                        <StatSkeleton />
                        <StatSkeleton />
                        <StatSkeleton />
                    </>
                ) : (
                    <>
                        {/* Metric Cards */}
                        <Card className="shadow-md border-none group hover:shadow-lg transition-all duration-300 overflow-hidden ring-1 ring-border/50">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Total Users</CardTitle>
                                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                                    <Users className="w-4 h-4" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold tracking-tight">{stats?.totalUsers ?? 0}</div>
                                <p className="text-xs text-success mt-2 flex items-center font-semibold bg-success/10 w-fit px-2 py-1 rounded-full">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    +14% <span className="text-muted-foreground font-normal ml-1">vs last month</span>
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="shadow-md border-none group hover:shadow-lg transition-all duration-300 overflow-hidden ring-1 ring-border/50">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Active Jobs</CardTitle>
                                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                                    <Briefcase className="w-4 h-4" />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold tracking-tight">{stats?.activeJobs ?? 0}</div>
                                <p className="text-xs text-success mt-2 flex items-center font-semibold bg-success/10 w-fit px-2 py-1 rounded-full">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    +5% <span className="text-muted-foreground font-normal ml-1">vs last week</span>
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="shadow-md border-none group hover:shadow-lg transition-all duration-300 overflow-hidden ring-1 ring-border/50">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">New Leads</CardTitle>
                                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-bold tracking-tight">{stats?.openLeads ?? 0}</div>
                                <p className="text-xs text-success mt-2 flex items-center font-semibold bg-success/10 w-fit px-2 py-1 rounded-full">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    +12 <span className="text-muted-foreground font-normal ml-1">new today</span>
                                </p>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>

            {/* Chart Section Prototype */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 shadow-md border-none min-h-[350px] flex items-center justify-center bg-muted/30 border border-dashed border-border group hover:bg-muted/40 transition-colors">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                        <TrendingUp className="w-8 h-8 opacity-20" />
                        <p className="font-semibold tracking-tight text-lg">Activity Analytics</p>
                        <p className="text-xs">Visualization coming soon</p>
                    </div>
                </Card>
                <Card className="col-span-3 shadow-md border-none min-h-[350px] flex items-center justify-center bg-muted/30 border border-dashed border-border group hover:bg-muted/40 transition-colors">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                        <Users className="w-8 h-8 opacity-20" />
                        <p className="font-semibold tracking-tight text-lg">Recent Onboarding</p>
                        <p className="text-xs">User log coming soon</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}

