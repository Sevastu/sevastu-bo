"use client";

import { useEffect, useState } from "react";
import { getUser, User } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, TrendingUp } from "lucide-react";
import { fetchDashboardStats, DashboardStats } from "@/features/dashboard/api";

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [stats, setStats] = useState<DashboardStats | null>(null);

    useEffect(() => {
        setUser(getUser());
        fetchDashboardStats()
            .then(data => setStats(data))
            .catch(err => console.error("Could not fetch stats:", err));
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-1">
                <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Welcome back, {user?.name || 'User'}! 👋
                </h2>
                <p className="text-muted-foreground">Here's a quick overview of Kaamsetu's performance.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-card-foreground">
                {/* Metric Cards */}
                <Card className="shadow-md border-none group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Total Users</CardTitle>
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                            <Users className="w-4 h-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold tracking-tight">{stats ? stats.totalUsers : "..."}</div>
                        <p className="text-xs text-success mt-2 flex items-center font-semibold bg-success/10 w-fit px-2 py-1 rounded-full">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +14% <span className="text-muted-foreground font-normal ml-1">vs last month</span>
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-md border-none group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Active Jobs</CardTitle>
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                            <Briefcase className="w-4 h-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold tracking-tight">{stats ? stats.activeJobs : "..."}</div>
                        <p className="text-xs text-success mt-2 flex items-center font-semibold bg-success/10 w-fit px-2 py-1 rounded-full">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +5% <span className="text-muted-foreground font-normal ml-1">vs last week</span>
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-md border-none group hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">New Leads</CardTitle>
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold tracking-tight">{stats ? stats.openLeads : "..."}</div>
                        <p className="text-xs text-success mt-2 flex items-center font-semibold bg-success/10 w-fit px-2 py-1 rounded-full">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +12 <span className="text-muted-foreground font-normal ml-1">new today</span>
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Chart Section Prototype */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4 shadow-md border-none min-h-[350px] flex items-center justify-center bg-muted/30 border border-dashed border-border group">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                        <TrendingUp className="w-8 h-8 opacity-20" />
                        <p className="font-semibold tracking-tight">Activity Analytics</p>
                        <p className="text-xs">Visualization coming soon</p>
                    </div>
                </Card>
                <Card className="col-span-3 shadow-md border-none min-h-[350px] flex items-center justify-center bg-muted/30 border border-dashed border-border group">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
                        <Users className="w-8 h-8 opacity-20" />
                        <p className="font-semibold tracking-tight">Recent Onboarding</p>
                        <p className="text-xs">User log coming soon</p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
