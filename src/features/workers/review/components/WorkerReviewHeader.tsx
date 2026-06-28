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
        <div className="bg-card flex flex-col rounded-lg">
            {/* Scrollable Hero Content */}
            <div className="p-4 flex flex-col lg:flex-row justify-center gap-8">
                {/* Left side: Photo & Details */}
                <div className="flex flex-col sm:flex-row gap-8 flex-1">
                    <div className="w-50 h-60 shrink-0 rounded-lg overflow-hidden bg-slate-100 shadow-[0_4px_14px_rgba(0,0,0,0.08)] flex items-center justify-center">
                        {profile?.photoUrl ? (
                            <img 
                                src={profile.photoUrl} 
                                alt={profile?.name || 'Worker Profile'} 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User className="w-16 h-16 text-slate-300" />
                        )}
                    </div>
                    
                    <div className="flex flex-col justify-center space-y-2">
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                            {profile?.name || 'Unknown Worker'}
                        </h1>
                        <p className="text-lg font-medium text-slate-500 uppercase tracking-wider">
                            {profile?.experience || 'Experience Not Listed'}
                        </p>
                        
                            <div className="flex items-center gap-1.5"><Hash className="w-4 h-4 text-slate-400"/> ID: {workerId}</div>
                        <div className="flex flex-wrap gap-4 text-sm font-medium text-slate-600 mt-1">
                            {profile?.email && <div className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-slate-400"/> {profile.email}</div>}
                            {profile?.phone && <div className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-slate-400"/> {profile.phone}</div>}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                            {isApproved ? (
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" /> Approved
                                </span>
                            ) : (
                                <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-200 flex items-center gap-1">
                                    <Activity className="w-3 h-3" /> {profile?.verificationStatus ? profile.verificationStatus.replace(/_/g, ' ') : 'Under Review'}
                                </span>
                            )}
                            
                            {isOcrCompleted && (
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-200 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> OCR Completed
                                </span>
                            )}
                            
                            {isAvailable ? (
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200 flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Available
                                </span>
                            ) : (
                                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg border border-slate-200 flex items-center gap-1">
                                    <div className="w-2 h-2 rounded-full bg-slate-400" /> Unavailable
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right side: Verification Summary Card */}
                <div className="w-full lg:w-80 shrink-0 bg-slate-50 rounded-xl border border-slate-200 p-5 shadow-inner">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 border-b border-slate-200 pb-2">Verification Summary</h3>
                    
                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500 font-medium">Profile Status</span>
                            <span className={`font-bold capitalize ${isApproved ? 'text-emerald-600' : 'text-amber-600'}`}>
                                {profile?.verificationStatus?.replace(/_/g, ' ')?.toLowerCase() || 'unknown'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500 font-medium">OCR Status</span>
                            <span className={`font-bold capitalize ${isOcrCompleted ? 'text-emerald-600' : (ocr?.status ? 'text-amber-600' : 'text-slate-500')}`}>
                                {ocr?.status?.toLowerCase() || 'pending'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500 font-medium">Availability</span>
                            <span className={`font-bold capitalize ${isAvailable ? 'text-emerald-600' : 'text-slate-600'}`}>
                                {isAvailable ? 'available' : 'offline'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
