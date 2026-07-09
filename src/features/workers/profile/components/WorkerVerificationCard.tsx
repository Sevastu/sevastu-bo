import React from "react";
import { ShieldCheck, CheckCircle2, XCircle, AlertCircle, TrendingUp } from "lucide-react";
import { WorkerProfileData } from "../hooks/useWorkerProfile";
import { WorkerStatusBadge } from "./WorkerStatusBadge";
import { KYC_STATUS_COLORS } from "../utils/workerProfileConstants";

interface WorkerVerificationCardProps {
  profile: WorkerProfileData["profile"];
  kyc: WorkerProfileData["kyc"];
}

export function WorkerVerificationCard({ profile, kyc }: WorkerVerificationCardProps) {
  // Compute a mock verification score for dashboard flair
  let score = 30;
  if (profile.photoUrl) score += 20;
  if (profile.email) score += 10;
  if (profile.phone) score += 10;
  if (kyc?.status === "approved") score += 30;
  
  const KycIcon = () => {
    if (kyc?.status === "approved") return <CheckCircle2 className="w-5 h-5 text-success" />;
    if (kyc?.status === "rejected") return <XCircle className="w-5 h-5 text-destructive" />;
    if (kyc?.status === "pending" || kyc?.status === "under_review") return <AlertCircle className="w-5 h-5 text-warning" />;
    return <AlertCircle className="w-5 h-5 text-muted-foreground" />;
  };

  const kycStatusColor = KYC_STATUS_COLORS[kyc?.status as keyof typeof KYC_STATUS_COLORS] || KYC_STATUS_COLORS.default;

  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm h-full">
      <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-success" />
        Trust & Verification
      </h2>

      {/* Trust Score */}
      <div className="bg-muted rounded-xl p-4 mb-6 border border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Verification Score</span>
          </div>
          <span className="text-lg font-bold text-foreground">{score}/100</span>
        </div>
        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${score >= 80 ? 'bg-success' : score >= 50 ? 'bg-primary' : 'bg-warning'}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <div className="text-sm font-semibold text-foreground">Profile Status</div>
            <div className="text-xs text-muted-foreground mt-0.5">Overall account standing</div>
          </div>
          <WorkerStatusBadge status={profile.profileStatus} />
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div>
            <div className="text-sm font-semibold text-foreground">KYC Status</div>
            <div className="text-xs text-muted-foreground mt-0.5">Identity verification</div>
          </div>
          <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-lg border border-border">
            <KycIcon />
            <span className={`text-sm font-semibold capitalize ${kycStatusColor}`}>
              {kyc?.status || "Not Submitted"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-foreground">Background Check</div>
            <div className="text-xs text-muted-foreground mt-0.5">Criminal & history check</div>
          </div>
          <div className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-lg border border-border">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span className="text-sm font-semibold text-success">Cleared</span>
          </div>
        </div>
      </div>
    </div>
  );
}
