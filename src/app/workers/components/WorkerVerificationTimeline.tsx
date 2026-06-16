"use client";

import React from "react";
import { CheckCircle2, Circle, Clock, XCircle, UserPlus, FileText, Fingerprint, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/date-utils";

interface VerificationEvent {
    type: 'worker_created' | 'documents_uploaded' | 'ocr_completed' | 'submitted' | 'approved' | 'rejected';
    timestamp: string;
    context?: string;
}

interface WorkerVerificationTimelineProps {
    events: VerificationEvent[];
    currentStatus: string;
}

const statusConfig: Record<string, { icon: any, color: string, label: string }> = {
    worker_created: { icon: UserPlus, color: "text-blue-500", label: "Worker Created" },
    documents_uploaded: { icon: FileText, color: "text-purple-500", label: "Documents Uploaded" },
    ocr_completed: { icon: Fingerprint, color: "text-orange-500", label: "OCR Completed" },
    submitted: { icon: Send, color: "text-cyan-500", label: "Submitted for Review" },
    approved: { icon: CheckCircle2, color: "text-green-500", label: "Approved" },
    rejected: { icon: XCircle, color: "text-red-500", label: "Rejected" },
};

export function WorkerVerificationTimeline({ events, currentStatus }: WorkerVerificationTimelineProps) {
    // Sort events by timestamp
    const sortedEvents = [...events].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    return (
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border/50 before:to-transparent">
            {sortedEvents.map((event, index) => {
                const config = statusConfig[event.type] || { icon: Circle, color: "text-muted-foreground", label: event.type };
                const Icon = config.icon;
                const isLast = index === sortedEvents.length - 1;

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
                                    {formatDate(new Date(event.timestamp), "hh:mm a")}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {event.context || `Worker verification event: ${event.type.replace('_', ' ')}.`}
                            </p>
                            <span className="text-xs text-muted-foreground/60 font-medium">
                                {formatDate(new Date(event.timestamp), "MMM dd, yyyy")}
                            </span>
                        </div>
                    </div>
                );
            })}

            {/* If no events yet, show current status as start */}
            {sortedEvents.length === 0 && (
                <div className="relative flex items-start gap-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <Clock className="w-5 h-5" />
                    </div>
                    <div className="pt-0.5">
                        <p className="font-bold text-foreground">Waiting for verification updates...</p>
                        <p className="text-sm text-muted-foreground">Current status: {currentStatus}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
