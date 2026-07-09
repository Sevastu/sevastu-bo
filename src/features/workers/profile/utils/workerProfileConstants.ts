export const STATUS_COLORS = {
  verified: "bg-success/10 text-success border-success/20",
  APPROVED: "bg-success/10 text-success border-success/20",
  under_review: "bg-warning/10 text-warning border-warning/20",
  kyc_pending: "bg-warning/10 text-warning border-warning/20",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
  draft: "bg-muted text-foreground border-border",
  default: "bg-muted text-foreground border-border",
} as const;

export const KYC_STATUS_COLORS = {
  approved: "text-success",
  rejected: "text-destructive",
  pending: "text-warning",
  default: "text-muted-foreground",
} as const;
