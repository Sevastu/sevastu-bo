import { Badge } from "@/components/ui/badge";

interface WorkerAvailabilityBadgeProps {
  isAvailable: boolean;
}

export function WorkerAvailabilityBadge({ isAvailable }: WorkerAvailabilityBadgeProps) {
  if (isAvailable) {
    return (
      <Badge className="bg-emerald-100/80 text-emerald-700 hover:bg-emerald-100 border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
        Available for Hire
      </Badge>
    );
  }

  return (
    <Badge className="bg-slate-100/80 text-slate-600 hover:bg-slate-100 border-slate-200 px-2.5 py-0.5 rounded-full text-xs font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5" />
      Currently Unavailable
    </Badge>
  );
}
