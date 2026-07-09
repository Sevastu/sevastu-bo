import React, { memo } from "react";
import { Fingerprint, FileText } from "lucide-react";
import { DocumentCard } from "./DocumentCard";
import {
    ReviewWorkerDetails,
    ReviewWorkerKyc,
    ReviewWorkerOcr,
} from "../types/workerReview.types";

interface DocumentsSectionProps {
    profile: ReviewWorkerDetails | null;
    kyc: ReviewWorkerKyc | null;
    ocr: ReviewWorkerOcr | null;
}

export const DocumentsSection = memo(function DocumentsSection({
    profile,
    kyc,
    ocr,
}: DocumentsSectionProps) {
    /**
     * Support both:
     * 1. New KYC structure
     * 2. Existing Profile.idProof structure
     */

    const frontKey =
        kyc?.frontImage ??
        profile?.idProof?.frontKey ??
        null;

    const backKey =
        kyc?.backImage ??
        profile?.idProof?.backKey ??
        null;

    const uploadDate =
        profile?.idProof?.uploadedAt ??
        ocr?.createdAt ??
        undefined;

    const hasDocuments = Boolean(frontKey || backKey);

    if (!hasDocuments) {
        return (
            <div className="rounded-lg border border-dashed border-border bg-destructive/10 p-10 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                    <FileText className="h-7 w-7 text-muted-foreground" />
                </div>

                <h3 className="text-lg font-semibold text-foreground">
                    No Documents Available
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                    This worker hasn't uploaded any identity documents yet.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-bold text-foreground">
                        Identity Documents
                    </h3>
                </div>

                <span className="rounded-lg bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {Number(Boolean(frontKey)) + Number(Boolean(backKey))} Documents
                </span>
            </div>

            {/* Documents */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {frontKey && (
                    <DocumentCard
                        title="Aadhaar Front"
                        objectKey={frontKey}
                        icon={Fingerprint}
                        ocrStatus={ocr?.status}
                        uploadDate={uploadDate}
                    />
                )}

                {backKey && (
                    <DocumentCard
                        title="Aadhaar Back"
                        objectKey={backKey}
                        icon={Fingerprint}
                        ocrStatus={ocr?.status}
                        uploadDate={uploadDate}
                    />
                )}

                {/*
                Future Support

                {kyc?.panProof?.key && (
                    <DocumentCard
                        title="PAN Card"
                        objectKey={kyc.panProof.key}
                        icon={CreditCard}
                    />
                )}

                {kyc?.experienceProof?.key && (
                    <DocumentCard
                        title="Experience Certificate"
                        objectKey={kyc.experienceProof.key}
                        icon={Briefcase}
                    />
                )}
                */}
            </div>
        </div>
    );
});