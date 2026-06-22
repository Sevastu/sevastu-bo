import React, { memo } from 'react';
import { Fingerprint, FileText } from 'lucide-react';
import { DocumentCard } from './DocumentCard';
import { ReviewWorkerKyc } from '../types/workerReview.types';

interface DocumentsSectionProps {
    kyc: ReviewWorkerKyc | null;
}

export const DocumentsSection = memo(function DocumentsSection({ kyc }: DocumentsSectionProps) {
    if (!kyc) return null;

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 px-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Submitted Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DocumentCard 
                    title="Aadhaar Front"
                    objectKey={kyc.idProof?.frontKey}
                    icon={Fingerprint}
                />
                <DocumentCard 
                    title="Aadhaar Back"
                    objectKey={kyc.idProof?.backKey}
                    icon={Fingerprint}
                />
                {/* Future Proofing: panProof, experienceProof */}
                {kyc.panProof?.key && (
                    <DocumentCard 
                        title="PAN Card"
                        objectKey={kyc.panProof.key}
                        icon={FileText}
                    />
                )}
            </div>
        </div>
    );
});
