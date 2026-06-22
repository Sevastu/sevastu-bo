"use client";

import React, { useState } from "react";
import { approveWorker, rejectWorker, triggerWorkerOcr } from "@/features/workers/api";

import { useWorkerReview } from "@/features/workers/review/hooks/useWorkerReview";
import { WorkerReviewHeader } from "@/features/workers/review/components/WorkerReviewHeader";
import { WorkerProfileSummary } from "@/features/workers/review/components/WorkerProfileSummary";
import { VerificationMetricsGrid } from "@/features/workers/review/components/VerificationMetricsGrid";
import { VerificationTimeline } from "@/features/workers/review/components/VerificationTimeline";
import { DocumentsSection } from "@/features/workers/review/components/DocumentsSection";
import { OCRDashboard } from "@/features/workers/review/components/OCRDashboard";
import { VerificationScore } from "@/features/workers/review/components/VerificationScore";
import { VerificationDecisionPanel } from "@/features/workers/review/components/VerificationDecisionPanel";
import { LoadingState } from "@/features/workers/review/components/LoadingState";
import { ErrorState } from "@/features/workers/review/components/ErrorState";

interface WorkerReviewPanelProps {
    workerUserId: string;
    onBack: () => void;
    onAfterChange: () => void;
    initialProfileStatus?: string;
}

export function WorkerReviewPanel({
    workerUserId,
    onBack,
    onAfterChange,
    initialProfileStatus,
}: WorkerReviewPanelProps) {
    
    const { profile, kyc, ocr, isLoading, error, refresh } = useWorkerReview(workerUserId);
    
    const [isApproving, setIsApproving] = useState(false);
    const [isRejecting, setIsRejecting] = useState(false);
    const [isTriggeringOcr, setIsTriggeringOcr] = useState(false);
    const [note, setNote] = useState("");

    const handleApprove = async () => {
        setIsApproving(true);
        try {
            await approveWorker(workerUserId);
            alert("Worker approved successfully.");
            onAfterChange();
        } catch (err: any) {
            console.error(err);
            const msg = err.response?.data?.message || err.message || "Failed to approve worker.";
            alert(msg);
        } finally {
            setIsApproving(false);
        }
    };

    const handleReject = async () => {
        if (!confirm("Are you sure you want to reject this worker?")) return;
        setIsRejecting(true);
        try {
            await rejectWorker(workerUserId, note || "Rejected from bo dashboard during manual review");
            alert("Worker rejected successfully.");
            onAfterChange();
        } catch (err: any) {
            console.error(err);
            const msg = err.response?.data?.message || err.message || "Failed to reject worker.";
            alert(msg);
        } finally {
            setIsRejecting(false);
        }
    };

    const handleTriggerOcr = async () => {
        setIsTriggeringOcr(true);
        try {
            await triggerWorkerOcr(workerUserId);
            alert("OCR triggered successfully. Please refresh the data shortly.");
            refresh();
        } catch (err: any) {
            console.error("Failed to trigger OCR:", err);
            const msg = err.response?.data?.message || err.message || "Failed to trigger OCR process.";
            alert(`Failed to trigger OCR: ${msg}`);
        } finally {
            setIsTriggeringOcr(false);
        }
    };

    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState message={error} onBack={onBack} />;
    }

    return (
        <div className="flex flex-col min-h-screen font-manrope">
            <WorkerReviewHeader 
                onBack={onBack} 
                onRefresh={refresh} 
                workerId={profile?._id || workerUserId} 
                isRefreshing={isLoading || isTriggeringOcr} 
            />

            <div className="flex-1 max-w-7xl mx-auto w-full pt-6 space-y-6">
                
                <VerificationMetricsGrid profile={profile} ocr={ocr} />

                <WorkerProfileSummary profile={profile} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-6">
                        <VerificationTimeline profile={profile} ocr={ocr} />
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                        <OCRDashboard 
                            ocr={ocr} 
                            profile={profile}
                            isTriggering={isTriggeringOcr} 
                            onTriggerOcr={handleTriggerOcr} 
                        />
                        <VerificationScore kyc={kyc} ocr={ocr} />
                        <DocumentsSection kyc={kyc} />
                    </div>
                    
                </div>


            </div>

            <VerificationDecisionPanel 
                status={profile?.verificationStatus || initialProfileStatus}
                isApproving={isApproving}
                isRejecting={isRejecting}
                onApprove={handleApprove}
                onReject={handleReject}
                note={note}
                onNoteChange={setNote}
            />
        </div>
    );
}
