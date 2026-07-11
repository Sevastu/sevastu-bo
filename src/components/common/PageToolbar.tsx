"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PageToolbarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (val: string) => void;
  filters?: ReactNode;
  actions?: ReactNode;
  viewToggle?: ReactNode;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  className?: string;
}

export default function PageToolbar({
  searchPlaceholder = "Search...",
  searchValue,
  onSearchChange,
  filters,
  actions,
  viewToggle,
  onRefresh,
  isRefreshing,
  className,
}: PageToolbarProps) {
  return (
    <div className={cn("flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center", className)}>
      
      <div className="flex flex-1 items-center gap-2 w-full sm:w-auto">
        {onSearchChange && (
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2 h-6 w-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        )}
        
        {filters}
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {viewToggle}

        {onRefresh && (
          <Button variant="outline" size="icon" onClick={onRefresh} disabled={isRefreshing}>
            <RefreshCw className={cn("h-4 w-4", isRefreshing && "animate-spin")} />
          </Button>
        )}

        {actions}
      </div>
    </div>
  );
}
