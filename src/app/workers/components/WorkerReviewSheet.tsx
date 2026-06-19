"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
    approveWorker,
    fetchPrivateSignedUrl,
    fetchWorkerDetails,
    rejectWorker,
    triggerWorkerOcr,
    type WorkerDetails,
    type WorkerKyc,
    type WorkerOcr,
} from "@/features/workers/api";
import { WorkerProfileStatus } from "@/lib/enums";
import { Loader2, ArrowLeft, Fingerprint, AlertCircle, CheckCircle, RefreshCw, Maximize2, ZoomIn, Shield, ShieldCheck, Clock, User, FileText, Activity, TrendingUp, Calendar, History } from "lucide-react";

function SignedIdImage({ objectKey, label, showActions = true }: { objectKey: string | undefined; label: string; showActions?: boolean }) {
    const [url, setUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const imgErrorAttempts = useRef(0);
    const load = useCallback(async () => {
        if (!objectKey) {
            setUrl(null);
            setErr("No file on record.");
            return;
        }
        setLoading(true);
        setErr(null);
        imgErrorAttempts.current = 0;
        try {
            const signed = await fetchPrivateSignedUrl(objectKey);
            setUrl(signed.url);
        } catch {
            setErr("Could not load a secure view link.");
            setUrl(null);
        } finally {
            setLoading(false);
        }
    }, [objectKey]);

    useEffect(() => {
        load();
    }, [load]);

    /** Max 2 automatic re-fetches after broken image (expired URL). */
    const onImgError = () => {
        if (imgErrorAttempts.current >= 2) {
            setErr("Image failed to load after retries. Use Retry.");
            setUrl(null);
            return;
        }
        imgErrorAttempts.current += 1;
        setUrl(null);
        window.setTimeout(() => {
            load();
        }, 400);
    };

    return (
        <div className="space-y-2">
            <div className="group relative flex min-h-[200px] items-center justify-center overflow-hidden rounded-lg border bg-muted/30 transition-all duration-200 hover:shadow-lg">
                {loading && <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />}
                {!loading && err && (
                    <div className="max-w-xs p-4 text-center text-sm text-destructive">
                        {err}
                        <div className="mt-2">
                            <Button type="button" variant="outline" size="sm" onClick={load}>
                                Retry
                            </Button>
                        </div>
                    </div>
                )}
                {!loading && url && !err && (
                    <>
                        <div className="relative w-full">
                            <img
                                src={url}
                                alt={label}
                                className={`aspect-[9/6] w-full object-contain transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
                                onError={onImgError}
                                onClick={() => setIsZoomed(!isZoomed)}
                            />
                            {showActions && (
                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        onClick={() => setIsZoomed(!isZoomed)}
                                    >
                                        <ZoomIn className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        className="h-8 w-8 p-0"
                                        onClick={() => setIsFullscreen(true)}
                                    >
                                        <Maximize2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </>
                )}
                {!loading && !url && !err && <span className="text-sm text-muted-foreground">No image</span>}
            </div>
            {isFullscreen && url && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={() => setIsFullscreen(false)}>
                    <img src={url} alt={label} className="max-h-[90vh] max-w-[90vw] object-contain" />
                </div>
            )}
        </div>
    );
}

export type WorkerReviewPanelProps = {
    workerUserId: string;
    initialProfileStatus?: string;
    onAfterChange?: () => void;
    onBack: () => void;
};

export function WorkerReviewPanel({
    workerUserId,
    initialProfileStatus,
    onAfterChange,
    onBack,
}: WorkerReviewPanelProps) {
    const router = useRouter();
    const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
    const [kyc, setKyc] = useState<WorkerKyc | null>(null);
    const [ocr, setOcr] = useState<WorkerOcr | null>(null);
    const [loading, setLoading] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [rejectReasonType, setRejectReasonType] = useState("");
    const [approveLoading, setApproveLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);
    const [ocrTriggerLoading, setOcrTriggerLoading] = useState(false);

    useEffect(() => {
        if (!workerUserId) {
            setProfile(null);
            setKyc(null);
            setOcr(null);
            return;
        }
        let cancelled = false;
        (async () => {
            setLoading(true);
            try {
                const details: WorkerDetails = await fetchWorkerDetails(workerUserId);
                if (!cancelled) {
                    setProfile((details.profile as Record<string, unknown>) ?? null);
                    setKyc(details.kyc ?? null);
                    setOcr(details.ocr ?? null);
                }
            } catch {
                if (!cancelled) {
                    setProfile(null);
                    setKyc(null);
                    setOcr(null);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [workerUserId]);

    const status = (profile?.profileStatus as string | undefined) ?? initialProfileStatus;
    // const showActions = status === WorkerProfileStatus.UNDER_REVIEW;
    const reviewableStatuses = [
        WorkerProfileStatus.KYC_PENDING,
        WorkerProfileStatus.UNDER_REVIEW,
    ];

    const showActions = reviewableStatuses.includes(
        status as WorkerProfileStatus,
    );
    const anyAction = approveLoading || rejectLoading;

    const handleApprove = async () => {
        if (!workerUserId) return;
        setApproveLoading(true);
        try {
            await approveWorker(workerUserId);
            onAfterChange?.();
            onBack?.();
        } catch (e) {
            console.error(e);
        } finally {
            setApproveLoading(false);
        }
    };

    const handleReject = async () => {
        if (!workerUserId || !rejectReason.trim()) return;
        setRejectLoading(true);
        try {
            await rejectWorker(workerUserId, rejectReason.trim(), rejectReasonType || undefined);
            onAfterChange?.();
            onBack?.();
            setRejectReason("");
            setRejectReasonType("");
        } catch (e) {
            console.error(e);
        } finally {
            setRejectLoading(false);
        }
    };

    const handleTriggerOcr = async () => {
        if (!workerUserId) return;
        setOcrTriggerLoading(true);
        try {
            await triggerWorkerOcr(workerUserId);
            // Refresh worker details to get updated OCR data
            const details: WorkerDetails = await fetchWorkerDetails(workerUserId);
            setProfile((details.profile as Record<string, unknown>) ?? null);
            setKyc(details.kyc ?? null);
            setOcr(details.ocr ?? null);
        } catch (e) {
            console.error(e);
        } finally {
            setOcrTriggerLoading(false);
        }
    };

    const idProof = profile?.idProof as { frontKey?: string; backKey?: string } | undefined;
    const updatedAt = profile?.updatedAt as string | undefined;
    const createdAt = profile?.createdAt as string | undefined;

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur rounded-md supports-[backdrop-filter]:bg-white/80">
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-10 w-10 rounded-xl border border-slate-200 bg-white shadow-sm hover:bg-slate-50 hover:shadow-md transition-all"
                            onClick={onBack}
                            disabled={anyAction}
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>

                        <div>
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50">
                                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                                </div>

                                <div>
                                    <h1 className="text-xl font-semibold tracking-tight text-slate-900">
                                        Worker Verification Review
                                    </h1>

                                    <p className="text-sm text-slate-500">
                                        Review identity documents, OCR results and verification status
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                            Under Review
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto py-6 space-y-6">
                {loading ? (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : (
                    <>
                        <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50">
                                            <ShieldCheck className="h-6 w-6 text-blue-600" />
                                        </div>

                                        <div>
                                            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                                                {String(profile?.name || "Unknown Worker")}
                                            </h2>

                                            <p className="text-sm text-slate-500">
                                                Worker ID: {workerUserId}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    <Badge
                                        className="rounded-full px-3 py-1 text-xs font-medium"
                                    >
                                        {status}
                                    </Badge>

                                    {ocr?.status && (
                                        <Badge
                                            variant="outline"
                                            className="rounded-full px-3 py-1 text-xs"
                                        >
                                            OCR {ocr.status}
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-5">
                                <div className="flex flex-col justify-between rounded-xl shadow-md hover:shadow-lg transition transition-duration-300 bg-slate-50 p-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Documents Status
                                    </p>

                                    <div className="flex items-center gap-2">
                                        {idProof?.frontKey && idProof?.backKey ? (
                                            <>
                                                <div className="h-2 w-2 rounded-full bg-green-500" />
                                                <span className="text-lg font-semibold text-slate-900">
                                                    Valid
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <div className="h-2 w-2 rounded-full bg-red-500" />
                                                <span className="text-lg font-semibold text-slate-900">
                                                    Missing
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    <p className="text-xs text-slate-500">
                                        {idProof?.frontKey && idProof?.backKey
                                            ? "Front & back documents uploaded"
                                            : "Required documents missing"}
                                    </p>
                                </div>
                                <div className="flex flex-col justify-between rounded-xl shadow-md hover:shadow-lg transition transition-duration-300 bg-slate-50 p-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Profile Status
                                    </p>

                                    <p className="text-lg font-semibold text-slate-900">
                                        {String(profile?.profileStatus || "N/A")}
                                    </p>
                                </div>

                                <div className="flex flex-col justify-between rounded-xl shadow-md hover:shadow-lg transition transition-duration-300 bg-slate-50 p-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Verification
                                    </p>

                                    <p className="text-lg font-semibold text-slate-900">
                                        {status || "Pending"}
                                    </p>
                                </div>

                                <div className="flex flex-col justify-between rounded-xl shadow-md hover:shadow-lg transition transition-duration-300 bg-slate-50 p-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        OCR Status
                                    </p>

                                    <p className="text-lg font-semibold text-slate-900">
                                        {ocr?.status || "Not Available"}
                                    </p>
                                </div>

                                <div className="flex flex-col justify-between rounded-xl shadow-md hover:shadow-lg transition transition-duration-300 bg-slate-50 p-4">
                                    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                        Last Updated
                                    </p>

                                    <p className="text-lg font-semibold text-slate-900">
                                        {updatedAt
                                            ? new Date(String(updatedAt)).toLocaleDateString()
                                            : "—"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2 & 3: Document Verification Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
                            {/* <div className="space-y-6"> */}
                            {/* LEFT */}
                            <div className="space-y-6">
                                {/* Profile Photo */}
                                <div className="flex flex-col overflow-hidden rounded-2xl border-t-2 border-primary bg-white shadow-sm transition-all duration-200 hover:shadow-md">
                                    <div className="px-4 pt-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <User className="h-4 w-4 text-slate-600" />
                                                <h3 className="text-sm font-semibold text-slate-900">
                                                    Profile Verification
                                                </h3>
                                            </div>

                                            <span
                                                className={`rounded-full px-4 py-1 text-xs font-medium ${profile?.photoUrl
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-red-50 text-red-700"
                                                    }`}
                                            >
                                                {profile?.photoUrl ? "Available" : "Missing"}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex flex-1 flex-col p-4">
                                        {profile?.photoUrl ? (
                                            <>
                                                <div className="overflow-hidden rounded-lg bg-slate-50">
                                                    <img
                                                        src={String(profile.photoUrl)}
                                                        alt="Worker Profile"
                                                        className="aspect-[4/5] w-full rounded-lg object-cover transition-transform duration-300 hover:scale-105 mb-4"
                                                    />
                                                </div>

                                                <div className="mt-auto flex items-center justify-between">
                                                    <div>
                                                        <p className="text-xs text-slate-500">
                                                            Face Verification
                                                        </p>

                                                        <p className="text-sm font-medium text-green-600">
                                                            Uploaded
                                                        </p>
                                                    </div>

                                                    <Button size="sm" variant="outline">
                                                        View Full
                                                    </Button>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="flex h-[390px] flex-col items-center justify-center rounded-xl border border-dashed bg-slate-50">
                                                <User className="mb-3 h-10 w-10 text-slate-400" />
                                                <p className="text-sm font-medium text-slate-600">
                                                    No Profile Photo
                                                </p>
                                                <p className="mt-1 text-xs text-slate-400">
                                                    Worker has not uploaded a profile image
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* SECTION 5: Verification History */}
                                <div className="rounded-2xl bg-white p-6 shadow-sm">
                                    <div className="mb-6 flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                                            <History className="h-5 w-5 text-blue-600" />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-slate-900">
                                                Verification Timeline
                                            </h3>
                                            <p className="text-xs text-slate-500">
                                                Worker verification activity
                                            </p>
                                        </div>
                                    </div>

                                    <div className="relative ml-2 border-l border-slate-200 pl-6 space-y-8">
                                        {/* Created */}
                                        <div className="relative">
                                            <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-4 border-white bg-blue-500 shadow" />

                                            <p className="font-medium text-slate-900">
                                                Worker Profile Submitted
                                            </p>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Worker completed registration and uploaded documents.
                                            </p>

                                            {createdAt && (
                                                <p className="mt-1 text-xs text-slate-400">
                                                    {new Date(createdAt).toLocaleString()}
                                                </p>
                                            )}
                                        </div>

                                        {/* Current Status */}
                                        <div className="relative">
                                            <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-4 border-white bg-amber-500 shadow" />

                                            <p className="font-medium text-slate-900">
                                                Current Verification Status
                                            </p>

                                            <div className="mt-2 inline-flex rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                                                {String(profile?.profileStatus || "Pending")}
                                            </div>

                                            {profile?.updatedAt ? (
                                                <p className="mt-1 text-xs text-slate-400">
                                                    {new Date(String(profile.updatedAt)).toLocaleString()}
                                                </p>
                                            ) : null}
                                        </div>

                                        {/* OCR */}
                                        {ocr && (
                                            <div className="relative">
                                                <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-4 border-white bg-green-500 shadow" />

                                                <p className="font-medium text-slate-900">
                                                    OCR Analysis Completed
                                                </p>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    Confidence: {ocr.confidence ? Math.round(ocr.confidence * 100) : 0}%
                                                </p>

                                                <p className="text-xs text-slate-400">
                                                    Status: {ocr.status}
                                                </p>
                                            </div>
                                        )}

                                        {/* KYC */}
                                        {kyc?.status && (
                                            <div className="relative">
                                                <div
                                                    className={`absolute -left-[31px] top-1 h-4 w-4 rounded-full border-4 border-white shadow ${kyc.status === "approved"
                                                        ? "bg-green-500"
                                                        : kyc.status === "rejected"
                                                            ? "bg-red-500"
                                                            : "bg-blue-500"
                                                        }`}
                                                />

                                                <p className="font-medium text-slate-900">
                                                    KYC Status Updated
                                                </p>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    {kyc.status}
                                                </p>

                                                {kyc.lastUpdated && (
                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {new Date(String(kyc.lastUpdated)).toLocaleString()}
                                                    </p>
                                                )}
                                            </div>
                                        )}

                                        {/* Rejection */}
                                        {kyc?.rejectionReason && (
                                            <div className="relative">
                                                <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full border-4 border-white bg-red-500 shadow" />

                                                <p className="font-medium text-red-700">
                                                    Verification Rejected
                                                </p>

                                                <p className="mt-1 text-sm text-red-600">
                                                    {kyc.rejectionReason}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>

                            {/* RIGHT */}
                            <div className="space-y-6">
                                <div className="flex flex-row gap-2">

                                    {/* Aadhaar Front */}
                                    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-200 hover:shadow-md">
                                        <div className="px-4 pt-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-slate-600" />
                                                    <h3 className="text-sm font-semibold text-slate-900">
                                                        Aadhaar Front
                                                    </h3>
                                                </div>

                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs font-medium ${idProof?.frontKey
                                                        ? "bg-green-50 text-green-700"
                                                        : "bg-red-50 text-red-700"
                                                        }`}
                                                >
                                                    {idProof?.frontKey ? "Uploaded" : "Missing"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <SignedIdImage
                                                objectKey={idProof?.frontKey}
                                                label="Front"
                                                showActions={true}
                                            />

                                            <div className="mt-3 flex items-center justify-between">
                                                <span className="text-xs text-slate-500">
                                                    Front Side
                                                </span>

                                                <span className="text-xs font-medium text-slate-700">
                                                    Identity Document
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Aadhaar Back */}
                                    <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-200 hover:shadow-md">
                                        <div className="px-4 pt-4">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <FileText className="h-4 w-4 text-slate-600" />
                                                    <h3 className="text-sm font-semibold text-slate-900">
                                                        Aadhaar Back
                                                    </h3>
                                                </div>

                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs font-medium ${idProof?.backKey
                                                        ? "bg-green-50 text-green-700"
                                                        : "bg-red-50 text-red-700"
                                                        }`}
                                                >
                                                    {idProof?.backKey ? "Uploaded" : "Missing"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-4">
                                            <SignedIdImage
                                                objectKey={idProof?.backKey}
                                                label="Back"
                                                showActions={true}
                                            />

                                            <div className="mt-3 flex items-center justify-between">
                                                <span className="text-xs text-slate-500">
                                                    Back Side
                                                </span>

                                                <span className="text-xs font-medium text-slate-700">
                                                    Identity Document
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* SECTION 4: OCR Intelligence Dashboard */}
                                {ocr && (
                                    <div className="rounded-xl bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                                    <Fingerprint className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-semibold text-slate-900">OCR Intelligence Dashboard</h3>
                                                    <p className="text-xs text-slate-500">Document analysis results</p>
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={handleTriggerOcr}
                                                disabled={ocrTriggerLoading || anyAction}
                                                className="h-8"
                                            >
                                                {ocrTriggerLoading ? (
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                ) : (
                                                    <RefreshCw className="mr-2 h-4 w-4" />
                                                )}
                                                Re-run OCR
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 py-3">
                                            <div className="rounded-lg bg-white p-3 shadow-sm">
                                                <p className="text-xs text-slate-500 mb-1">Extracted Name</p>
                                                <p className="text-sm font-semibold text-slate-900 truncate">{ocr.extractedName || 'N/A'}</p>
                                            </div>
                                            <div className="rounded-lg bg-white p-3 shadow-sm">
                                                <p className="text-xs text-slate-500 mb-1">Name Match</p>
                                                <div className="flex items-center gap-1">
                                                    {ocr.nameMatch !== undefined ? (
                                                        ocr.nameMatch ? (
                                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                                        ) : (
                                                            <AlertCircle className="h-4 w-4 text-amber-600" />
                                                        )
                                                    ) : null}
                                                    <p className="text-sm font-semibold text-slate-900">
                                                        {ocr.nameMatch !== undefined ? (ocr.nameMatch ? 'Matched' : 'Mismatch') : 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="rounded-lg bg-white p-3 shadow-sm">
                                                <p className="text-xs text-slate-500 mb-1">DOB</p>
                                                <p className="text-sm font-semibold text-slate-900">{ocr.extractedDob || 'N/A'}</p>
                                            </div>
                                            <div className="rounded-lg bg-white p-3 shadow-sm">
                                                <p className="text-xs text-slate-500 mb-1">Aadhaar Last 4</p>
                                                <p className="text-sm font-semibold text-slate-900">{ocr.aadhaarLast4 || 'N/A'}</p>
                                            </div>
                                            <div className="rounded-lg bg-white p-3 shadow-sm">
                                                <p className="text-xs text-slate-500 mb-1">Confidence</p>
                                                <p className="text-sm font-semibold text-slate-900">
                                                    {ocr.confidence !== undefined ? `${Math.round(ocr.confidence * 100)}%` : 'N/A'}
                                                </p>
                                            </div>
                                            <div className="rounded-lg bg-white p-3 shadow-sm">
                                                <p className="text-xs text-slate-500 mb-1">Status</p>
                                                <p className={`text-sm font-semibold ${ocr.status === 'COMPLETED' ? 'text-green-600' :
                                                    ocr.status === 'FAILED' ? 'text-red-600' :
                                                        ocr.status === 'PROCESSING' ? 'text-blue-600' :
                                                            'text-gray-600'
                                                    }`}>{ocr.status}</p>
                                            </div>
                                            <div className="rounded-lg bg-white p-3 shadow-sm">
                                                <p className="text-xs text-slate-500 mb-1">Risk Level</p>
                                                <p className="text-sm font-semibold text-slate-900">{ocr.riskLevel || 'N/A'}</p>
                                            </div>
                                            <div className="rounded-lg bg-white p-3 shadow-sm">
                                                <p className="text-xs text-slate-500 mb-1">Document Pattern</p>
                                                <p className="text-sm font-semibold text-slate-900 truncate">{ocr.documentPattern || 'N/A'}</p>
                                            </div>
                                            <div className="rounded-lg bg-white p-3 shadow-sm">
                                                <p className="text-xs text-slate-500 mb-1">Geo Validation</p>
                                                <p className="text-sm font-semibold text-slate-900 truncate">{ocr.geoValidation || 'N/A'}</p>
                                            </div>
                                        </div>
                                             <div className="rounded-lg bg-white p-3 shadow-sm">
                                                <p className="text-xs text-slate-500 mb-1">Extracted Address</p>
                                                <p className="text-sm font-semibold text-slate-900 truncate">{ocr.extractedAddress || 'N/A'}</p>
                                            </div>
                                        {ocr.errorMessage && (
                                            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
                                                <p className="text-xs text-red-700">Error: {ocr.errorMessage}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {!ocr && idProof?.frontKey && idProof?.backKey && (
                            <div className="rounded-xl border bg-gradient-to-br from-amber-50 to-white p-6 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                                            <Fingerprint className="h-5 w-5 text-amber-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-slate-900">OCR Analysis</h3>
                                            <p className="text-xs text-slate-500">OCR has not been run on this worker's documents</p>
                                        </div>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={handleTriggerOcr}
                                        disabled={ocrTriggerLoading || anyAction}
                                        className="h-8"
                                    >
                                        {ocrTriggerLoading ? (
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        ) : (
                                            <RefreshCw className="mr-2 h-4 w-4" />
                                        )}
                                        Run OCR
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* SECTION 7: Sticky Verification Decision Panel */}
            {showActions && (
                <div className="border-t bg-white p-4 shadow-lg">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
                            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
                                <div>
                                    <Label htmlFor="reject-reason-type" className="text-sm font-medium">Rejection Reason</Label>
                                    <select
                                        id="reject-reason-type"
                                        className="mt-1 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-lg border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                        value={rejectReasonType}
                                        disabled={anyAction}
                                        onChange={(e) => setRejectReasonType(e.target.value)}
                                    >
                                        <option value="">Select a reason</option>
                                        <option value="DOCUMENT_BLURRY">Document Blurry</option>
                                        <option value="DOCUMENT_MISMATCH">Document Mismatch</option>
                                        <option value="INCOMPLETE_PROFILE">Incomplete Profile</option>
                                        <option value="INVALID_DOCUMENT">Invalid Document</option>
                                        <option value="DUPLICATE_ACCOUNT">Duplicate Account</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <Label htmlFor="reject-reason" className="text-sm font-medium">Additional Notes</Label>
                                    <textarea
                                        id="reject-reason"
                                        className="mt-1 border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[60px] w-full rounded-lg border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Optional additional notes"
                                        value={rejectReason}
                                        disabled={anyAction}
                                        onChange={(e) => setRejectReason(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 w-full lg:w-auto">
                                <Button
                                    onClick={handleApprove}
                                    disabled={anyAction}
                                    className="flex-1 lg:flex-none bg-green-600 hover:bg-green-700 text-white min-w-[120px]"
                                >
                                    {approveLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Approve
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={handleReject}
                                    disabled={anyAction || !rejectReasonType}
                                    className="flex-1 lg:flex-none min-w-[120px]"
                                >
                                    {rejectLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                    Reject
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
