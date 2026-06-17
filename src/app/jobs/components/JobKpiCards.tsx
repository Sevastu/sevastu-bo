"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, XCircle, UserCheck, Loader2 } from "lucide-react";
import { JobStats } from "@/features/jobs/types";
import { cn } from "@/lib/utils";

interface KpiCardProps {
    label: string;
    value: number | undefined;
    icon: React.ReactNode;
    iconBg: string;
    valueColor: string;
    loading?: boolean;
}

function KpiCard({ label, value, icon, iconBg, valueColor, loading }: KpiCardProps) {
    return (
        <Card className="border-none bg-card rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-5">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-1 min-w-0">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest truncate">
                            {label}
                        </p>
                        {loading ? (
                            <div className="h-8 w-14 rounded-lg bg-muted/60 animate-pulse mt-1" />
                        ) : (
                            <h3 className={cn("text-3xl font-extrabold tracking-tight tabular-nums", valueColor)}>
                                {value ?? 0}
                            </h3>
                        )}
                    </div>
                    <div className={cn("shrink-0 p-3 rounded-2xl", iconBg)}>
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

interface JobKpiCardsProps {
    stats: JobStats | null;
    loading?: boolean;
}

export function JobKpiCards({ stats, loading }: JobKpiCardsProps) {
    const cards: KpiCardProps[] = [
        {
            label: "Total Jobs",
            value: stats?.total,
            icon: <Briefcase className="h-5 w-5 text-primary" />,
            iconBg: "bg-primary/10",
            valueColor: "text-foreground",
        },
        {
            label: "Assigned",
            value: stats?.assigned,
            icon: <UserCheck className="h-5 w-5 text-purple-500" />,
            iconBg: "bg-purple-500/10",
            valueColor: "text-purple-500",
        },
        {
            label: "In Progress",
            value: stats?.inProgress,
            icon: <Loader2 className="h-5 w-5 text-orange-500" />,
            iconBg: "bg-orange-500/10",
            valueColor: "text-orange-500",
        },
        {
            label: "Cancelled",
            value: stats?.cancelled,
            icon: <XCircle className="h-5 w-5 text-red-500" />,
            iconBg: "bg-red-500/10",
            valueColor: "text-red-500",
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cards.map((card) => (
                <KpiCard key={card.label} {...card} loading={loading} />
            ))}
        </div>
    );
}
