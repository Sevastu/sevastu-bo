import { Badge } from "@/components/ui/badge";
import { STATUS_COLORS } from "../utils/workerProfileConstants";

interface WorkerStatusBadgeProps {
  status: string;
}

export function WorkerStatusBadge({ status }: WorkerStatusBadgeProps) {
  // Use a type-safe key or fallback to default
  const colorClass = STATUS_COLORS[status as keyof typeof STATUS_COLORS] || STATUS_COLORS.default;
  
  // Format text (e.g., "under_review" -> "Under Review")
  const formattedText = status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <Badge className={`${colorClass} px-3 py-1 rounded-full text-xs font-medium`}>
      {formattedText}
    </Badge>
  );
}
