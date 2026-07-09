import React, { memo } from 'react';
import { ArrowLeft, RefreshCw, CheckCircle2, ShieldCheck, Activity, User, Mail, Phone, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReviewWorkerDetails, ReviewWorkerOcr } from '../types/workerReview.types';
import { WorkerProfileStatus } from '@/lib/enums';

interface WorkerReviewHeaderProps {
    onBack: () => void;
    onRefresh: () => void;
    workerId: string;
    isRefreshing?: boolean;
    profile: ReviewWorkerDetails | null;
    ocr: ReviewWorkerOcr | null;
}

export const WorkerReviewHeader = memo(function WorkerReviewHeader({
    onBack,
    onRefresh,
    workerId,
    isRefreshing,
    profile,
    ocr
}: WorkerReviewHeaderProps) {
    const isApproved = profile?.verificationStatus === WorkerProfileStatus.VERIFIED;
    const isOcrCompleted = ocr?.status?.toLowerCase() === 'completed';
    const isAvailable = profile?.availability;

    return (
        <div className="flex flex-col space-y-6">
            {/* Sticky Top Bar */}
            <div className="sticky top-0 z-30 bg-card backdrop-blur-md px-6 py-4 flex items-center justify-between border border-border shadow-sm rounded-2xl">
                <Button 
                    variant="ghost" 
                    onClick={onBack}
                    className="rounded-xl shadow-sm hover:bg-muted text-foreground bg-muted border border-border"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to List
                </Button>
                <div className='border border-border/20 p-2 rounded-lg bg-primary/10 shadow-sm'>
                    <h2 className='text-primary font-semibold text-center'>Worker Review Profile</h2>
                </div>
                <Button 
                    variant="outline" 
                    onClick={onRefresh}
                    disabled={isRefreshing}
                    className="rounded-xl border-border bg-card hover:bg-muted shadow-sm text-foreground font-medium"
                >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin text-primary' : 'text-muted-foreground'}`} />
                    Refresh Data
                </Button>
            </div>

            {/* Scrollable Hero Content */}
            <div className="bg-card flex flex-col rounded-lg border border-border/20 shadow-sm">
                <div className="p-6 flex flex-col lg:flex-row justify-center gap-8 items-center">
                {/* Left side: Photo & Details */}
                <div className="flex flex-col sm:flex-row gap-8 flex-1">
                    <div className="w-50 h-60 shrink-0 rounded-lg overflow-hidden bg-muted shadow-[0_4px_14px_rgba(0,0,0,0.08)] flex items-center justify-center">
                        {profile?.photoUrl ? (
                            <img 
                                src={profile.photoUrl} 
                                alt={profile?.name || 'Worker Profile'} 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User className="w-16 h-16 text-muted-foreground" />
                        )}
                    </div>
                    
                    <div className="flex flex-col justify-center space-y-2">
                        <h1 className="text-4xl font-bold text-foreground tracking-tight">
                            {profile?.name || 'Unknown Worker'}
                        </h1>
                        <p className="text-lg font-medium text-muted-foreground uppercase tracking-wider">
                            {`${profile?.experience} Years Experience` || 'Experience Not Listed'}
                        </p>
                        
                            <div className="flex items-center gap-1.5"><Hash className="w-4 h-4 text-muted-foreground"/> ID: {workerId}</div>
                        <div className="flex flex-wrap gap-4 text-sm font-medium text-foreground mt-1">
                            {profile?.email && <div className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-muted-foreground"/> {profile.email}</div>}
                            {profile?.phone && <div className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-muted-foreground"/> {profile.phone}</div>}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                            {isApproved ? (
                                <span className="px-3 py-1 bg-success/10 text-success text-xs font-bold rounded-lg border border-success/20 flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" /> Approved
                                </span>
                            ) : (
                                <span className="px-3 py-1 bg-warning/10 text-warning text-xs font-bold rounded-lg border border-warning/20 flex items-center gap-1">
                                    <Activity className="w-3 h-3" /> {profile?.verificationStatus ? profile.verificationStatus.replace(/_/g, ' ') : 'Under Review'}
                                </span>
                            )}
                            
                            {isOcrCompleted && (
                                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg border border-primary/20 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> OCR Completed
                                </span>
                            )}
                            
                            {isAvailable ? (
                                <span className="px-3 py-1 bg-success/10 text-success text-xs font-bold rounded-lg border border-success/20 flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" /> Available
                                </span>
                            ) : (
                                <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-bold rounded-lg border border-border flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-muted-foreground" /> Unavailable
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right side: Verification Summary Card */}
                <div className="w-full lg:w-80 shrink-0 bg-muted rounded-xl border border-border p-5 shadow-inner">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 border-b border-border pb-2">Verification Summary</h3>
                    
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground font-medium">Profile Status</span>
                            <span className={`font-bold capitalize ${isApproved ? 'text-success' : 'text-warning'}`}>
                                {profile?.verificationStatus?.replace(/_/g, ' ')?.toLowerCase() || 'unknown'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground font-medium">OCR Status</span>
                            <span className={`font-bold capitalize ${isOcrCompleted ? 'text-success' : (ocr?.status ? 'text-warning' : 'text-muted-foreground')}`}>
                                {ocr?.status?.toLowerCase() || 'pending'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground font-medium">Availability</span>
                            <span className={`font-bold capitalize ${isAvailable ? 'text-success' : 'text-muted-foreground'}`}>
                                {isAvailable ? 'available' : 'offline'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
});
