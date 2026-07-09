import { Badge } from "@/components/ui/badge";

interface WorkerAvailabilityBadgeProps {
  isAvailable: boolean;
}

export function WorkerAvailabilityBadge({ isAvailable }: WorkerAvailabilityBadgeProps) {
  if (isAvailable) {
    return (
      <Badge className="bg-success/10 text-success hover:bg-success/20 border-success/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-success mr-1.5 animate-pulse" />
        Available for Hire
      </Badge>
    );
  }

  return (
    <Badge className="bg-muted text-muted-foreground hover:bg-muted/80 border-border px-2.5 py-0.5 rounded-full text-xs font-medium">
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-1.5" />
      Currently Unavailable
    </Badge>
  );
}
