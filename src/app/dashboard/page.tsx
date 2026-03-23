"use client";

import { useEffect, useState } from "react";
import { getUser, User } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, TrendingUp } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
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
        <AppLayout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back, {user?.name || 'User'}! 👋</h2>
                    <p className="text-gray-500 mt-2">Here's what's happening in Kaamsetu today.</p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Metric Cards */}
                    <Card className="shadow-sm border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
                            <Users className="w-4 h-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{stats ? stats.totalUsers : "..."}</div>
                            <p className="text-xs text-green-600 mt-1 flex items-center font-medium">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                +14% from last month
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">Active Jobs</CardTitle>
                            <Briefcase className="w-4 h-4 text-blue-600" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{stats ? stats.activeJobs : "..."}</div>
                            <p className="text-xs text-green-600 mt-1 flex items-center font-medium">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                +5% from last week
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm border-gray-200">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-gray-500">New Leads</CardTitle>
                            <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-gray-900">{stats ? stats.openLeads : "..."}</div>
                            <p className="text-xs text-green-600 mt-1 flex items-center font-medium">
                                <TrendingUp className="w-3 h-3 mr-1" />
                                +12 new today
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Chart Section Prototype */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4 shadow-sm border-gray-200 min-h-[300px] flex items-center justify-center bg-gray-50/50">
                        <p className="text-gray-400 font-medium">Activity Chart (Coming Soon)</p>
                    </Card>
                    <Card className="col-span-3 shadow-sm border-gray-200 min-h-[300px] flex items-center justify-center bg-gray-50/50">
                        <p className="text-gray-400 font-medium">Recent Signups (Coming Soon)</p>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
