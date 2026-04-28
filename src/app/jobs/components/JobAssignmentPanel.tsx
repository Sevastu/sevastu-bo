"use client";

import React, { useState, useEffect } from "react";
import { fetchBestWorkers, reassignJob } from "@/features/jobs/api";
import { MatchedWorker, JobStatus } from "@/features/jobs/types";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Loader2, UserPlus, MapPin, Trophy, ShieldCheck, UserCheck, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface JobAssignmentPanelProps {
    jobId: string;
    currentWorkerId: string;
    jobStatus: JobStatus;
    onAssigned: () => void;
}

export function JobAssignmentPanel({ jobId, currentWorkerId, jobStatus, onAssigned }: JobAssignmentPanelProps) {
    const [workers, setWorkers] = useState<MatchedWorker[]>([]);
    const [loading, setLoading] = useState(true);
    const [assigningId, setAssigningId] = useState<string | null>(null);

    useEffect(() => {
        const loadWorkers = async () => {
            try {
                const data = await fetchBestWorkers(jobId);
                console.log("API Response:", data); // Debug log
                if (Array.isArray(data)) {
                    setWorkers(data);
                } else {
                    console.error("API response is not an array:", data);
                    setWorkers([]);
                }
            } catch (err) {
                console.error("Failed to load best workers:", err);
                setWorkers([]);
            } finally {
                setLoading(false);
            }
        };
        
        // Load if job is open or if we want to allow force reassignment anytime
        if (jobStatus !== JobStatus.COMPLETED && jobStatus !== JobStatus.CANCELLED) {
            loadWorkers();
        } else {
            setLoading(false);
        }
    }, [jobId, jobStatus]);

    const handleAssign = async (workerId: string) => {
        if (!confirm("Are you sure you want to assign this professional?")) return;
        setAssigningId(workerId);
        try {
            await reassignJob(jobId, workerId);
            onAssigned();
        } catch (err) {
            console.error("Failed to assign job", err);
            alert("Failed to assign job. Please try again.");
        } finally {
            setAssigningId(null);
        }
    };

    if (jobStatus === JobStatus.COMPLETED || jobStatus === JobStatus.CANCELLED) {
        return null; // Don't show panel for finished jobs
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4 border border-border/50 rounded-2xl bg-muted/10">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Running Match Engine</p>
            </div>
        );
    }

    if (workers.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-4 border border-border/50 rounded-2xl bg-amber-500/5">
                <AlertTriangle className="w-8 h-8 text-amber-500 opacity-80" />
                <div className="flex flex-col items-center gap-1 text-center">
                    <p className="text-sm font-bold text-foreground">No matches found</p>
                    <p className="text-xs text-muted-foreground max-w-[200px]">There are no available professionals within range for this service.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-primary" /> Assignment Engine
                </h3>
                <Badge variant="outline" className="text-[10px] font-bold tracking-widest uppercase shadow-none border-primary/20 text-primary bg-primary/5">
                    {workers.length} Candidates
                </Badge>
            </div>

            <div className="grid gap-3">
                {workers.map((worker, index) => {
                    const isAssigned = worker.userId === currentWorkerId;
                    
                    return (
                        <div key={worker.userId} className={cn(
                            "flex flex-col p-4 rounded-2xl border transition-all relative overflow-hidden group",
                            isAssigned ? "bg-primary/5 border-primary/30 shadow-md" : "bg-card border-border/50 hover:bg-muted/30"
                        )}>
                            {index === 0 && !isAssigned && (
                                <div className="absolute top-0 right-0 px-3 py-1 bg-green-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-lg">
                                    Best Match
                                </div>
                            )}
                            
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-3 min-w-0">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex flex-col items-center justify-center shrink-0">
                                        <span className="text-[10px] font-black text-orange-500 leading-none mb-0.5">#{index + 1}</span>
                                        <span className="text-[8px] font-bold text-orange-500/70 uppercase">Rank</span>
                                    </div>
                                    <div className="flex flex-col gap-0.5 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="font-bold text-sm text-foreground truncate">{worker.name}</p>
                                            {isAssigned && <Badge className="bg-primary hover:bg-primary/90 text-[9px] h-4 px-1.5 shadow-none">ASSIGNED</Badge>}
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                            <span className="flex items-center gap-1 font-medium"><MapPin className="w-3 h-3 text-primary/70" /> {worker.distance} km</span>
                                            <span className="flex items-center gap-1 font-medium"><Trophy className="w-3 h-3 text-amber-500/70" /> {worker.successRate}</span>
                                        </div>
                                    </div>
                                </div>
                                <Button 
                                    size="sm" 
                                    variant={isAssigned ? "outline" : "default"}
                                    disabled={isAssigned || assigningId !== null}
                                    onClick={() => handleAssign(worker.userId)}
                                    className={cn(
                                        "shrink-0 h-9 rounded-lg font-bold text-[11px] uppercase tracking-wider px-4",
                                        isAssigned && "pointer-events-none opacity-50"
                                    )}
                                >
                                    {assigningId === worker.userId ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : isAssigned ? (
                                        <><UserCheck className="w-3.5 h-3.5 mr-1.5" /> Active</>
                                    ) : (
                                        <><UserPlus className="w-3.5 h-3.5 mr-1.5" /> Assign</>
                                    )}
                                </Button>
                            </div>

                            {/* Debug / Score Breakdown - only shown on hover or active */}
                            <div className="mt-4 pt-3 border-t border-border/50 grid grid-cols-4 gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase font-bold text-muted-foreground">Proximity Score</span>
                                    <span className="text-[10px] font-mono font-medium text-foreground">{worker.scoreBreakdown?.distance || '0'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase font-bold text-muted-foreground">Reliability Score</span>
                                    <span className="text-[10px] font-mono font-medium text-foreground">{worker.scoreBreakdown?.performance || '0'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase font-bold text-muted-foreground">Expertise Score</span>
                                    <span className="text-[10px] font-mono font-medium text-foreground">{worker.scoreBreakdown?.experience || '0'}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase font-bold text-muted-foreground">Volume Score</span>
                                    <span className="text-[10px] font-mono font-medium text-foreground">{worker.scoreBreakdown?.volume || '0'}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
