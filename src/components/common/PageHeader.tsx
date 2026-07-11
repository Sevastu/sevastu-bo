"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Download, Plus, Upload } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  icon,
  actions,
  breadcrumbs,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {breadcrumbs && (
        <div className="text-sm text-muted-foreground mb-2">
          {breadcrumbs}
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-4">
          {icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-card shadow-sm text-primary">
              {icon}
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h1>

            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex flex-wrap items-center gap-2">
            {actions}
          </div>
        )}

        {/* <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" className="rounded-xl border-border text-foreground bg-card hover:bg-muted shadow-sm hidden sm:flex">
            <Upload className="w-4 h-4 mr-2" /> Import
          </Button>
          <Button variant="outline" className="rounded-xl border-border text-foreground bg-card hover:bg-muted shadow-sm hidden sm:flex">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-sm transition-all duration-200 ease-out">
            <Plus className="w-4 h-4 mr-2" /> Add Customer
          </Button>
        </div> */}
      </div>
    </div>
  );
}