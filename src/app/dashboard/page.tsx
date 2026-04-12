"use client";

import { useEffect, useState, useCallback } from "react";
import { getUser, User } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, TrendingUp, AlertCircle, RefreshCcw, Loader2, Hammer, UserCheck, DollarSign } from "lucide-react";
import { fetchDashboardStats, DashboardStats, fetchAnalytics, AnalyticsData } from "@/features/dashboard/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
                    <h2 className="text-4xl font-extrabold tracking-tighter bg-gradient-to-br from-foreground to-foreground/50 bg-clip-text text-transparent">
                        Dashboard Analytics
                    </h2>
                    <p className="text-muted-foreground font-medium text-lg">Real-time operational health and growth metrics.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-2xl border-border/50 bg-card hover:bg-muted font-bold h-12 shadow-sm" onClick={loadData}>
                        <RefreshCcw className={cn("w-4 h-4 mr-2", isLoading && "animate-spin")} />
                        Refresh Data
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {isLoading ? (
                    <>
                        <StatSkeleton />
                        <StatSkeleton />
                        <StatSkeleton />
                        <StatSkeleton />
                    </>
                ) : (
                    <>
                        <Card className="shadow-2xl border-none ring-1 ring-border/50 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-xs font-black text-muted-foreground uppercase tracking-widest">Active Scale</CardTitle>
                                <Users className="w-4 h-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-black tracking-tighter">{stats?.totalUsers ?? 0}</div>
                                <div className="mt-4 flex flex-col gap-1">
                                    <div className="flex justify-between text-[10px] font-bold">
                                        <span className="text-blue-500 uppercase">{stats?.totalCustomers} Clients</span>
                                        <span className="text-purple-500 uppercase">{stats?.totalWorkers} Pros</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-muted rounded-full flex overflow-hidden">
                                        <div className="bg-blue-500 h-full" style={{ width: `${(stats?.totalCustomers || 0) / (stats?.totalUsers || 1) * 100}%` }} />
                                        <div className="bg-purple-500 h-full" style={{ width: `${(stats?.totalWorkers || 0) / (stats?.totalUsers || 1) * 100}%` }} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-2xl border-none ring-1 ring-border/50 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-green-500/10 transition-colors" />
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-xs font-black text-muted-foreground uppercase tracking-widest">Volume Today</CardTitle>
                                <TrendingUp className="w-4 h-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-black tracking-tighter">{stats?.jobsToday ?? 0}</div>
                                <div className="mt-4 flex items-center gap-2">
                                    <Badge className="bg-green-500/10 text-green-600 border-none shadow-none font-black text-[10px]">
                                        {stats?.completedToday} RESOLVED
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="shadow-2xl border-none ring-1 ring-border/50 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-amber-500/10 transition-colors" />
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-xs font-black text-muted-foreground uppercase tracking-widest">Live Operations</CardTitle>
                                <Briefcase className="w-4 h-4 text-amber-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-black tracking-tighter">{stats?.activeJobs ?? 0}</div>
                                <p className="text-[10px] font-bold text-muted-foreground mt-4 uppercase tracking-tighter italic">In-progress or assigned jobs</p>
                            </CardContent>
                        </Card>

                        <Card className="shadow-2xl border-none ring-1 ring-border/50 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-indigo-500/10 transition-colors" />
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-xs font-black text-muted-foreground uppercase tracking-widest">Gross Revenue</CardTitle>
                                <DollarSign className="w-4 h-4 text-indigo-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-4xl font-black tracking-tighter italic text-foreground/90 underline decoration-primary/20 underline-offset-8 decoration-4">{stats?.revenue ?? "₹0"}</div>
                                <p className="text-[10px] font-bold text-indigo-500 mt-6 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                                    CONSOLIDATED PLATFORM EARNINGS
                                </p>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 shadow-2xl border-none ring-1 ring-border/50 rounded-3xl p-6 bg-card">
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                Growth Trajectory
                            </h3>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Last 30 days job volume</p>
                        </div>
                    </div>
                    <div className="h-[300px] w-full flex items-end justify-between gap-1 px-2 mb-4">
                        {analytics.length === 0 ? (
                            <div className="h-full w-full flex items-center justify-center text-muted-foreground/30 font-black italic border-2 border-dashed border-border/50 rounded-2xl">
                                NO ANALYTICS DATA RECORDED
                            </div>
                        ) : (
                            analytics.map((day, idx) => (
                                <div key={day._id} className="group relative flex flex-col items-center flex-1 max-w-[40px]">
                                    <div 
                                        className="w-full bg-primary/20 group-hover:bg-primary transition-all duration-500 rounded-t-sm group-hover:rounded-t-md relative"
                                        style={{ height: `${(day.count / maxAnalyticsCount) * 100}%` }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-foreground text-background text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
                                            {day.count} JOBS
                                        </div>
                                    </div>
                                    {idx % 5 === 0 && (
                                        <span className="text-[8px] font-black text-muted-foreground mt-2 rotate-45 origin-left">
                                            {day._id.split('-').slice(1).join('/')}
                                        </span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </Card>

                <Card className="col-span-3 shadow-2xl border-none ring-1 ring-border/50 rounded-3xl p-6 flex flex-col bg-card">
                    <div className="flex flex-col gap-1 mb-8">
                        <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-purple-500" />
                            System Health
                        </h3>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Resource utilization & demand</p>
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-6">
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider">
                                <span>Worker Utilization</span>
                                <span className="text-primary font-black italic">84%</span>
                            </div>
                            <div className="h-4 w-full bg-muted rounded-full overflow-hidden p-1 border border-border/50">
                                <div className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full" style={{ width: '84%' }} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider">
                                <span>Customer Conversion</span>
                                <span className="text-green-500 font-black italic">62%</span>
                            </div>
                            <div className="h-4 w-full bg-muted rounded-full overflow-hidden p-1 border border-border/50">
                                <div className="h-full bg-gradient-to-r from-green-500/50 to-green-500 rounded-full" style={{ width: '62%' }} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-xs font-black uppercase tracking-wider">
                                <span>Lead Fulfillment</span>
                                <span className="text-amber-500 font-black italic">41%</span>
                            </div>
                            <div className="h-4 w-full bg-muted rounded-full overflow-hidden p-1 border border-border/50">
                                <div className="h-full bg-gradient-to-r from-amber-500/50 to-amber-500 rounded-full" style={{ width: '41%' }} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-border/50">
                        <Button className="w-full h-12 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-lg shadow-primary/20" variant="default">
                            View Deep Analytics Report
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}

