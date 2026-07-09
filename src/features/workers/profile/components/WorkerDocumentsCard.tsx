import React from "react";
import { FileText, Eye, CheckCircle2, XCircle, AlertCircle, FileImage } from "lucide-react";
import { WorkerProfileData } from "../hooks/useWorkerProfile";

interface WorkerDocumentsCardProps {
  kyc: WorkerProfileData["kyc"];
}

export function WorkerDocumentsCard({ kyc }: WorkerDocumentsCardProps) {
  if (!kyc) {
    return (
      <div className="bg-card rounded-2xl p-6 border border-border shadow-sm flex flex-col items-center justify-center py-12 text-center h-full">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <FileImage className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-1">No Documents</h3>
        <p className="text-sm text-muted-foreground max-w-[200px]">Worker hasn't uploaded any verification documents yet.</p>
      </div>
    );
  }

  const getStatusIcon = () => {
    if (kyc.status === 'approved') return <CheckCircle2 className="w-5 h-5 text-success" />;
    if (kyc.status === 'rejected') return <XCircle className="w-5 h-5 text-destructive" />;
    return <AlertCircle className="w-5 h-5 text-warning" />;
  };

  const getStatusBadgeClass = () => {
    if (kyc.status === 'approved') return "bg-success/10 text-success border-success/20";
    if (kyc.status === 'rejected') return "bg-destructive/10 text-destructive border-destructive/20";
    return "bg-warning/10 text-warning border-warning/20";
  };

  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm h-full flex flex-col">
      <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary" />
        Submitted Documents
      </h2>

      <div className="flex-1 space-y-4">
        {/* Document Item */}
        <div className="group border border-border hover:border-primary/20 rounded-xl p-4 transition-all duration-300 bg-card hover:shadow-md">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-bold text-foreground leading-none mb-1.5">{kyc.documentType}</p>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Government ID</p>
              </div>
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold capitalize ${getStatusBadgeClass()}`}>
              {getStatusIcon()}
              {kyc.status}
            </div>
          </div>

          {kyc.rejectionReason && (
            <div className="mb-4 p-3 bg-destructive/10 rounded-lg border border-destructive/20 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-xs text-destructive font-medium">
                <span className="font-bold">Reason:</span> {kyc.rejectionReason}
              </p>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
            <button className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground text-sm font-semibold rounded-lg transition-colors border border-border">
              <Eye className="w-4 h-4" />
              View Front
            </button>
            {kyc.backImage && (
              <button className="flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground text-sm font-semibold rounded-lg transition-colors border border-border">
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
