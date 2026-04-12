"use client";

import React from "react";
import { JobHistory, JobStatus } from "@/features/jobs/types";
import { CheckCircle2, Circle, Clock, XCircle, PlayCircle, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/date-utils";

interface JobTimelineProps {
    history: JobHistory[];
    currentStatus: JobStatus;
}

const statusConfig: Record<string, { icon: any, color: string, label: string }> = {
    [JobStatus.OPEN]: { icon: Clock, color: "text-blue-500", label: "Job Created" },
    [JobStatus.ASSIGNED]: { icon: UserPlus, color: "text-purple-500", label: "Pro Assigned" },
    [JobStatus.IN_PROGRESS]: { icon: PlayCircle, color: "text-orange-500", label: "In Progress" },
    [JobStatus.COMPLETED]: { icon: CheckCircle2, color: "text-green-500", label: "Completed" },
    [JobStatus.CANCELLED]: { icon: XCircle, color: "text-red-500", label: "Cancelled" },
};

export function JobTimeline({ history, currentStatus }: JobTimelineProps) {
    // Sort history by timestamp
    const sortedHistory = [...history].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    return (
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border/50 before:to-transparent">
            {sortedHistory.map((item, index) => {
                const config = statusConfig[item.status] || { icon: Circle, color: "text-muted-foreground", label: item.status };
                const Icon = config.icon;
                const isLast = index === sortedHistory.length - 1;

                return (
                    <div key={index} className="relative flex items-start gap-6 group animate-in slide-in-from-left-2 duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                        <div className={cn(
                            "absolute left-0 w-10 h-10 rounded-xl bg-card border flex items-center justify-center transition-all group-hover:scale-110",
                            isLast ? "ring-4 ring-primary/10 border-primary" : "border-border"
                        )}>
                            <Icon className={cn("w-5 h-5", config.color)} />
                        </div>

                        <div className="ml-12 pt-0.5">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-foreground capitalize tracking-tight">
                                    {config.label}
                                </span>
                                <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full font-bold text-muted-foreground uppercase tracking-widest">
                                    {formatDate(new Date(item.timestamp), "hh:mm a")}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {item.context || `The job status was moved to ${item.status.replace('_', ' ')}.`}
                            </p>
                            <span className="text-xs text-muted-foreground/60 font-medium">
                                {formatDate(new Date(item.timestamp), "MMM dd, yyyy")}
                            </span>
                        </div>
                    </div>
                );
            })}

            {/* If no history yet, show current status as start */}
            {sortedHistory.length === 0 && (
                <div className="relative flex items-start gap-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div className="pt-0.5">
                        <p className="font-bold text-foreground">Waiting for updates...</p>
                        <p className="text-sm text-muted-foreground">This job is currently {currentStatus}.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
