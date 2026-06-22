import React, { memo } from 'react';
import { Eye, FileCheck, FileWarning } from 'lucide-react';
import { WORKER_VERIFICATION_CONSTANTS } from '../utils/workerVerificationConstants';

interface WorkerDocumentsPreviewProps {
  documents: {
    aadhaarFront: string;
    aadhaarBack: string;
    pan: string;
    experience: string;
  };
  onViewDocuments: () => void;
}

export const WorkerDocumentsPreview = memo(function WorkerDocumentsPreview({
  documents,
  onViewDocuments
}: WorkerDocumentsPreviewProps) {
  const requiredDocuments = [
    documents.aadhaarFront,
    documents.aadhaarBack,
  ];

  const missingCount = requiredDocuments.filter(v => !v).length;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold text-slate-700">Documents</div>
        {missingCount > 0 ? (
          <div className="flex items-center text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
            <FileWarning size={12} className="mr-1" />
            {missingCount} Missing
          </div>
        ) : (
          <div className="flex items-center text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
            <FileCheck size={12} className="mr-1" />
            Complete
          </div>
        )}
      </div>

      <button
        onClick={onViewDocuments}
        className="w-full text-left p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all group"
      >
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
            {WORKER_VERIFICATION_CONSTANTS.VIEW_ALL_DOCUMENTS}
          </span>
          <Eye size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
        </div>
        <div className="text-xs text-slate-500">
          {WORKER_VERIFICATION_CONSTANTS.DOCUMENTS_SUBTITLE}
        </div>
      </button>
    </div>
  );
});
