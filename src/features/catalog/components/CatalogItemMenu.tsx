"use client";

import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";

export type CatalogMenuAction =
    | { type: "edit" }
    | { type: "delete" }
    | { type: "add-service" }
    | { type: "add-sub-service" };

interface CatalogItemMenuProps {
    disabled?: boolean;
    actions: CatalogMenuAction["type"][];
    onAction: (action: CatalogMenuAction["type"]) => void;
}

const labels: Record<CatalogMenuAction["type"], { label: string; icon: typeof Pencil; destructive?: boolean }> = {
    edit: { label: "Edit", icon: Pencil },
    delete: { label: "Delete", icon: Trash2, destructive: true },
    "add-service": { label: "Add service", icon: Plus },
    "add-sub-service": { label: "Add sub-service", icon: Plus },
};

export function CatalogItemMenu({ disabled, actions, onAction }: CatalogItemMenuProps) {
    if (disabled) return null;

    return (
        <Dropdown
            trigger={
                <Button type="button" variant="ghost" size="icon" className="shrink-0">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                </Button>
            }
            className="w-44"
        >
            {actions.map((action) => {
                const meta = labels[action];
                const Icon = meta.icon;
                return (
                    <button
                        key={action}
                        type="button"
                        className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted ${
                            meta.destructive ? "text-destructive" : "text-foreground"
                        }`}
                        onClick={() => onAction(action)}
                    >
                        <Icon className="h-4 w-4" />
                        {meta.label}
                    </button>
                );
            })}
        </Dropdown>
    );
}
