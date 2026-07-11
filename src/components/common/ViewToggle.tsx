"use client";

import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ViewMode = "table" | "cards" | "calendar" | "map" | "timeline";

interface ViewToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
  allowedModes?: ViewMode[];
  className?: string;
}

export default function ViewToggle({ mode, onChange, allowedModes = ["table", "cards"], className }: ViewToggleProps) {
  return (
    <div className={cn("flex items-center bg-muted p-1 rounded-md", className)}>
      {allowedModes.includes("table") && (
        <Button
          variant={mode === "table" ? "secondary" : "ghost"}
          size="sm"
          className="h-8 px-2"
          onClick={() => onChange("table")}
        >
          <List className="h-4 w-4" />
        </Button>
      )}
      {allowedModes.includes("cards") && (
        <Button
          variant={mode === "cards" ? "secondary" : "ghost"}
          size="sm"
          className="h-8 px-2"
          onClick={() => onChange("cards")}
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
      )}
      {/* Extend for calendar, map, etc. when needed */}
    </div>
  );
}
