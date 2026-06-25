import React from "react";
import { FileText, Eye, CheckCircle2, XCircle, AlertCircle, FileImage } from "lucide-react";
import { WorkerProfileData } from "../hooks/useWorkerProfile";

interface WorkerDocumentsCardProps {
  kyc: WorkerProfileData["kyc"];
}

export function WorkerDocumentsCard({ kyc }: WorkerDocumentsCardProps) {
  if (!kyc) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col items-center justify-center py-12 text-center h-full">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <FileImage className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">No Documents</h3>
        <p className="text-sm text-slate-500 max-w-[200px]">Worker hasn't uploaded any verification documents yet.</p>
      </div>
    );
  }

  const getStatusIcon = () => {
    if (kyc.status === 'approved') return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    if (kyc.status === 'rejected') return <XCircle className="w-5 h-5 text-red-500" />;
    return <AlertCircle className="w-5 h-5 text-amber-500" />;
  };

  const getStatusBadgeClass = () => {
    if (kyc.status === 'approved') return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (kyc.status === 'rejected') return "bg-red-50 text-red-700 border-red-200";
    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full flex flex-col">
      <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
        <FileText className="w-5 h-5 text-blue-600" />
        Submitted Documents
      </h2>

      <div className="flex-1 space-y-4">
        {/* Document Item */}
        <div className="group border border-slate-200 hover:border-blue-200 rounded-xl p-4 transition-all duration-300 bg-white hover:shadow-md">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-slate-900 leading-none mb-1.5">{kyc.documentType}</p>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Government ID</p>
              </div>
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold capitalize ${getStatusBadgeClass()}`}>
              {getStatusIcon()}
              {kyc.status}
            </div>
          </div>

          {kyc.rejectionReason && (
            <div className="mb-4 p-3 bg-red-50/50 rounded-lg border border-red-100 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-xs text-red-800 font-medium">
                <span className="font-bold">Reason:</span> {kyc.rejectionReason}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
            <button className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg transition-colors border border-slate-200">
              <Eye className="w-4 h-4" />
              View Front
            </button>
            {kyc.backImage && (
              <button className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm font-semibold rounded-lg transition-colors border border-slate-200">
                <Eye className="w-4 h-4" />
                View Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
