"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    approveWorker,
    fetchPrivateSignedUrl,
    fetchWorkerDetails,
    rejectWorker,
    type WorkerDetails,
    type WorkerKyc,
} from "@/features/workers/api";
import { WorkerProfileStatus } from "@/lib/enums";
import { Loader2, X } from "lucide-react";

function SignedIdImage({ objectKey, label }: { objectKey: string | undefined; label: string }) {
    const [url, setUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);
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
            <p className="text-sm font-medium text-foreground">{label}</p>
            <div className="relative flex min-h-[180px] items-center justify-center overflow-hidden rounded-lg border bg-muted/30">
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
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={url}
                        alt={label}
                        className="max-h-56 w-full object-contain"
                        onError={onImgError}
                    />
                )}
                {!loading && !url && !err && <span className="text-sm text-muted-foreground">No image</span>}
            </div>
        </div>
    );
}

export type WorkerReviewSheetProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    workerUserId: string | null;
    initialProfileStatus?: string;
    onAfterChange?: () => void;
};

export function WorkerReviewSheet({
    open,
    onOpenChange,
    workerUserId,
    initialProfileStatus,
    onAfterChange,
}: WorkerReviewSheetProps) {
    const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
    const [kyc, setKyc] = useState<WorkerKyc | null>(null);
    const [loading, setLoading] = useState(false);
    const [rejectReason, setRejectReason] = useState("");
    const [approveLoading, setApproveLoading] = useState(false);
    const [rejectLoading, setRejectLoading] = useState(false);

    useEffect(() => {
        if (!open || !workerUserId) {
            setProfile(null);
            setKyc(null);
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
                }
            } catch {
                if (!cancelled) {
                    setProfile(null);
                    setKyc(null);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [open, workerUserId]);

    const status = (profile?.profileStatus as string | undefined) ?? initialProfileStatus;
    const showActions = status === WorkerProfileStatus.UNDER_REVIEW;
    const anyAction = approveLoading || rejectLoading;

    const handleApprove = async () => {
        if (!workerUserId) return;
        setApproveLoading(true);
        try {
            await approveWorker(workerUserId);
            onAfterChange?.();
            onOpenChange(false);
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
            await rejectWorker(workerUserId, rejectReason.trim());
            onAfterChange?.();
            onOpenChange(false);
            setRejectReason("");
        } catch (e) {
            console.error(e);
        } finally {
            setRejectLoading(false);
        }
    };

    const idProof = profile?.idProof as { frontKey?: string; backKey?: string } | undefined;
    const updatedAt = profile?.updatedAt as string | undefined;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="flex w-full max-w-xl flex-col p-0 sm:max-w-xl">
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <SheetTitle className="text-base">Worker review</SheetTitle>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => onOpenChange(false)} disabled={anyAction}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex flex-1 flex-col space-y-6 overflow-y-auto p-4">
                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        </div>
                    ) : (
                        <>
                            <div className="space-y-1 text-left text-sm text-muted-foreground">
                                <p>
                                    <span className="font-medium text-foreground">Name:</span>{" "}
                                    {(profile?.name as string) ?? "—"}
                                </p>
                                <p>
                                    <span className="font-medium text-foreground">User ID:</span> {workerUserId}
                                </p>
                                <p>
                                    <span className="font-medium text-foreground">Profile status:</span> {status ?? "—"}
                                </p>
                                <p>
                                    <span className="font-medium text-foreground">Verification:</span>{" "}
                                    {(profile?.verificationStatus as string) ?? "—"}
                                </p>
                                {updatedAt && (
                                    <p>
                                        <span className="font-medium text-foreground">Profile updated:</span>{" "}
                                        {new Date(updatedAt).toLocaleString()}
                                    </p>
                                )}
                            </div>

                            {(kyc?.rejectionReason || kyc?.status) && (
                                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm dark:border-amber-900 dark:bg-amber-950/40">
                                    <p className="font-medium text-foreground">Verification history (KYC record)</p>
                                    {kyc?.status && (
                                        <p className="mt-1 text-muted-foreground">
                                            Status: <span className="text-foreground">{kyc.status}</span>
                                        </p>
                                    )}
                                    {kyc?.rejectionReason ? (
                                        <p className="mt-1 text-destructive">Last rejection reason: {kyc.rejectionReason}</p>
                                    ) : null}
                                </div>
                            )}

                            <div>
                                <p className="mb-2 text-sm font-medium">Profile photo</p>
                                {profile?.photoUrl ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={String(profile.photoUrl)}
                                        alt="Worker"
                                        className="max-h-48 rounded-lg border object-contain"
                                    />
                                ) : (
                                    <p className="text-sm text-muted-foreground">No photo on file.</p>
                                )}
                            </div>

                            <div>
                                <p className="mb-3 text-sm font-medium">ID proof (side by side)</p>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <SignedIdImage objectKey={idProof?.frontKey} label="Front" />
                                    <SignedIdImage objectKey={idProof?.backKey} label="Back" />
                                </div>
                            </div>

                            {showActions && (
                                <div className="space-y-4 border-t pt-4">
                                    <div className="flex flex-wrap gap-2">
                                        <Button onClick={handleApprove} disabled={anyAction}>
                                            {approveLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                            Approve
                                        </Button>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="reject-reason">Rejection reason</Label>
                                        <textarea
                                            id="reject-reason"
                                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-lg border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                            placeholder="Required for rejection"
                                            value={rejectReason}
                                            disabled={anyAction}
                                            onChange={(e) => setRejectReason(e.target.value)}
                                        />
                                        <Button
                                            variant="destructive"
                                            onClick={handleReject}
                                            disabled={anyAction || !rejectReason.trim()}
                                        >
                                            {rejectLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
