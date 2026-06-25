export const STATUS_COLORS = {
  verified: "bg-emerald-100 text-emerald-800 border-emerald-200",
  APPROVED: "bg-emerald-100 text-emerald-800 border-emerald-200",
  under_review: "bg-amber-100 text-amber-800 border-amber-200",
  kyc_pending: "bg-amber-100 text-amber-800 border-amber-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  draft: "bg-slate-100 text-slate-800 border-slate-200",
  default: "bg-slate-100 text-slate-800 border-slate-200",
} as const;

export const KYC_STATUS_COLORS = {
  approved: "text-emerald-500",
  rejected: "text-red-500",
  pending: "border-amber-500",
  default: "text-slate-400",
} as const;
