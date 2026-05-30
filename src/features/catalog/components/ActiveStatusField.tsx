"use client";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface ActiveStatusFieldProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

export function ActiveStatusField({ checked, onChange, disabled }: ActiveStatusFieldProps) {
    return (
        <div className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-3 py-2.5">
            <div className="space-y-0.5">
                <Label htmlFor="catalog-active">Active status</Label>
                <p className="text-xs text-muted-foreground">
                    Inactive items are hidden from customer browsing.
                </p>
            </div>
            <button
                id="catalog-active"
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={() => onChange(!checked)}
                className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                    checked ? "bg-primary" : "bg-muted"
                )}
            >
                <span
                    className={cn(
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform",
                        checked ? "translate-x-5" : "translate-x-0"
                    )}
                />
            </button>
        </div>
    );
}
