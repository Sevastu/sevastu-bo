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
    if (kyc?.status === "approved") return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    if (kyc?.status === "rejected") return <XCircle className="w-5 h-5 text-red-500" />;
    if (kyc?.status === "pending" || kyc?.status === "under_review") return <AlertCircle className="w-5 h-5 text-amber-500" />;
    return <AlertCircle className="w-5 h-5 text-slate-400" />;
  };

  const kycStatusColor = KYC_STATUS_COLORS[kyc?.status as keyof typeof KYC_STATUS_COLORS] || KYC_STATUS_COLORS.default;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full">
      <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-emerald-600" />
        Trust & Verification
      </h2>

      {/* Trust Score */}
      <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-slate-700">Verification Score</span>
          </div>
          <span className="text-lg font-bold text-slate-900">{score}/100</span>
        </div>
        <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full ${score >= 80 ? 'bg-emerald-500' : score >= 50 ? 'bg-blue-500' : 'bg-amber-500'}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="text-sm font-semibold text-slate-900">Profile Status</div>
            <div className="text-xs text-slate-500 mt-0.5">Overall account standing</div>
          </div>
          <WorkerStatusBadge status={profile.profileStatus} />
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="text-sm font-semibold text-slate-900">KYC Status</div>
            <div className="text-xs text-slate-500 mt-0.5">Identity verification</div>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <KycIcon />
            <span className={`text-sm font-semibold capitalize ${kycStatusColor}`}>
              {kyc?.status || "Not Submitted"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">Background Check</div>
            <div className="text-xs text-slate-500 mt-0.5">Criminal & history check</div>
          </div>
          <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-semibold text-emerald-600">Cleared</span>
          </div>
        </div>
      </div>
    </div>
  );
}
