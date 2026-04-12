"use client";

import React, { useState } from "react";
import { Job, JobStatus } from "@/features/jobs/types";
import { cancelJob } from "@/features/jobs/api";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../../../components/ui/sheet";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import { JobTimeline } from "./JobTimeline";
import { JobAssignmentPanel } from "./JobAssignmentPanel";
import { User, Hammer, MapPin, Calendar, Clock, CreditCard, XCircle, Info, Phone, UserPlus } from "lucide-react";
import { formatDate } from "@/lib/date-utils";
import { cn } from "@/lib/utils";

interface JobDetailsSheetProps {
    job: Job | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onUpdate: () => void;
    isAdmin: boolean;
}

export function JobDetailsSheet({ job, open, onOpenChange, onUpdate, isAdmin }: JobDetailsSheetProps) {
    const [isCancelling, setIsCancelling] = useState(false);

    if (!job) return null;

    const handleCancel = async () => {
        const reason = prompt("Reason for cancellation:");
        if (!reason) return;

        setIsCancelling(true);
        try {
            await cancelJob(job.id, reason);
            onUpdate();
        } catch (err) {
            console.error("Failed to cancel job", err);
        } finally {
            setIsCancelling(false);
        }
    };

    const statusColors: Record<string, string> = {
        [JobStatus.OPEN]: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        [JobStatus.ASSIGNED]: "bg-purple-500/10 text-purple-500 border-purple-500/20",
        [JobStatus.IN_PROGRESS]: "bg-orange-500/10 text-orange-500 border-orange-500/20",
        [JobStatus.COMPLETED]: "bg-green-500/10 text-green-500 border-green-500/20",
        [JobStatus.CANCELLED]: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-xl w-full h-full p-0 flex flex-col gap-0 border-l border-border/50 bg-card overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
                
                <div className="flex-1 overflow-y-auto px-8 py-8 space-y-10 scrollbar-thin scrollbar-thumb-muted">
                    <SheetHeader className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Badge className={cn("px-4 py-1.5 rounded-full font-bold uppercase tracking-widest text-[10px] border shadow-sm", statusColors[job.status])}>
                                {job.status.replace('_', ' ')}
                            </Badge>
                            <span className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded-md">ID: {job.id.slice(-8).toUpperCase()}</span>
                        </div>
                        <div>
                            <SheetTitle className="text-3xl font-extrabold tracking-tight text-foreground">{job.service}</SheetTitle>
                            <SheetDescription className="text-base font-medium text-muted-foreground mt-1">
                                {job.subService} • Scheduled for {formatDate(new Date(job.scheduledAt), "MMMM dd, hh:mm a")}
                            </SheetDescription>
                        </div>
                    </SheetHeader>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col p-4 rounded-2xl bg-muted/30 border border-border/50 gap-3">
                           <div className="flex items-center gap-2 text-muted-foreground">
                               <User className="w-4 h-4" />
                               <span className="text-xs font-bold uppercase tracking-wider">Customer</span>
                           </div>
                           <div className="flex flex-col gap-0.5">
                               <p className="font-bold text-foreground truncate">{job.customerId}</p>
                               <p className="text-xs text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" /> +91 XXXXX XXXXX</p>
                           </div>
                        </div>

                        <div className="flex flex-col p-4 rounded-2xl bg-muted/30 border border-border/50 gap-3">
                           <div className="flex items-center gap-2 text-muted-foreground">
                               <Hammer className="w-4 h-4" />
                               <span className="text-xs font-bold uppercase tracking-wider">Professional</span>
                           </div>
                           <div className="flex flex-col gap-0.5">
                               <p className="font-bold text-foreground truncate">{job.workerId || "Unassigned"}</p>
                               {job.workerId && <p className="text-xs text-muted-foreground flex items-center gap-1 text-green-500 font-bold">Verified Provider</p>}
                           </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-muted border border-border/50 flex items-center justify-center text-muted-foreground">
                                <MapPin className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Service Location</p>
                                <p className="text-sm font-semibold text-foreground leading-relaxed line-clamp-2">{job.address}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-muted border border-border/50 flex items-center justify-center text-muted-foreground">
                                <CreditCard className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-0.5">Pricing Details</p>
                                <p className="text-sm font-extrabold text-foreground">₹ {job.price.toLocaleString('en-IN')}</p>
                            </div>
                        </div>
                    </div>

                    <Separator className="bg-border/50" />
                    
                    {/* Job Assignment Panel */}
                    {(isAdmin && (job.status === JobStatus.OPEN || job.status === JobStatus.ASSIGNED)) && (
                        <>
                            <JobAssignmentPanel 
                                jobId={job.id} 
                                currentWorkerId={job.workerId} 
                                jobStatus={job.status} 
                                onAssigned={onUpdate} 
                            />
                            <Separator className="bg-border/50" />
                        </>
                    )}

                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary" /> Job Timeline
                            </h3>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> Live Status
                            </div>
                        </div>
                        <JobTimeline history={job.history} currentStatus={job.status} />
                    </div>
                </div>

                <div className="p-8 bg-muted/20 border-t border-border/50 space-y-4">
                    <div className="flex gap-4">
                        <Button 
                            variant="destructive" 
                            className="flex-1 h-12 rounded-xl font-bold gap-2 shadow-sm active:scale-95 transition-all"
                            disabled={!isAdmin || job.status === JobStatus.CANCELLED || job.status === JobStatus.COMPLETED || isCancelling}
                            onClick={handleCancel}
                        >
                            <XCircle className="w-4 h-4" /> Cancel Job
                        </Button>
                    </div>
                    {!isAdmin && (
                        <div className="flex items-center justify-center gap-2 text-muted-foreground bg-muted/50 py-2 rounded-lg border border-border/50">
                            <Info className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Read-only Access for Staff</span>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
