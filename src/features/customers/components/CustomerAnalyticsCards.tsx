import React from 'react';
import { Users, UserCheck, TrendingUp, DollarSign } from 'lucide-react';

interface CustomerAnalytics {
    totalCustomers: number;
    activeCustomers: number;
    inactiveCustomers: number;
    retentionRate: number;
    averageLifetimeValue: number;
}

interface CustomerAnalyticsCardsProps {
    analytics: CustomerAnalytics | null;
    isLoading?: boolean;
}

export function CustomerAnalyticsCards({ analytics, isLoading }: CustomerAnalyticsCardsProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-card rounded-lg p-6 border border-border/20 shadow-sm animate-pulse">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-muted rounded-xl" />
                            <div className="flex-1">
                                <div className="h-4 bg-muted rounded w-20 mb-2" />
                                <div className="h-8 bg-muted rounded w-16 mb-2" />
                                <div className="h-3 bg-muted rounded w-24" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!analytics) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-card rounded-lg p-6 border border-border/20 shadow-sm flex transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 cursor-pointer">
                <div className="flex justify-around items-start mr-6">
                    <div className="p-3 rounded-xl text-primary bg-primary/10">
                        <UserCheck className="w-5 h-5" />
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Active Now</h3>
                    <div className="text-2xl font-bold text-foreground">{analytics.activeCustomers}</div>
                    <p className="text-xs text-muted-foreground mt-2">Currently active</p>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border/20 shadow-sm  flex transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 cursor-pointer">
                <div className="flex justify-around items-start mr-6">
                    <div className="p-3 rounded-xl text-success bg-success/10">
                        <TrendingUp className="w-5 h-5" />
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Retention Rate</h3>
                    <div className="text-2xl font-bold text-foreground">{analytics.retentionRate}%</div>
                    <p className="text-xs text-muted-foreground mt-2">Monthly retention</p>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border/20 shadow-sm  flex transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 cursor-pointer">
                <div className="flex justify-around items-start mr-6">
                    <div className="p-3 rounded-xl text-primary bg-primary/10">
                        <DollarSign className="w-5 h-5" />
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Avg. Lifetime Value</h3>
                    <div className="text-2xl font-bold text-foreground">${analytics.averageLifetimeValue}</div>
                    <p className="text-xs text-muted-foreground mt-2">Per customer</p>
                </div>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border/20 shadow-sm flex transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 cursor-pointer">
                <div className="flex justify-around items-start mr-6">
                    <div className="p-3 rounded-xl text-foreground bg-muted">
                        <Users className="w-5 h-5" />
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Total Customers</h3>
                    <div className="text-2xl font-bold text-foreground">{analytics.totalCustomers}</div>
                    <p className="text-xs text-muted-foreground mt-2">All time</p>
                </div>
            </div>
        </div>
    );
}
