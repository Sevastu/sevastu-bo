"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewMode =
  | "table"
  | "cards"
  | "calendar"
  | "map"
  | "timeline";

interface ViewToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
  allowedModes?: ViewMode[];
  className?: string;
}

export default function ViewToggle({
  mode,
  onChange,
  allowedModes = ["table", "cards"],
  className,
}: ViewToggleProps) {
  return (
    <div
      className={cn(
        "flex items-center bg-muted p-1 rounded-xl",
        className
      )}
    >
      {allowedModes.includes("cards") && (
        <button
          onClick={() => onChange("cards")}
          aria-label="Card View"
          className={cn(
            "p-1.5 rounded-lg transition-all duration-200",
            mode === "cards"
              ? "bg-card shadow-sm text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
      )}

      {allowedModes.includes("table") && (
        <button
          onClick={() => onChange("table")}
          aria-label="Table View"
          className={cn(
            "p-1.5 rounded-lg transition-all duration-200",
            mode === "table"
              ? "bg-card shadow-sm text-primary"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <List className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}