"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { CatalogTreeCategory } from "@/features/services/types";
import { CatalogItemMenu } from "./CatalogItemMenu";
import { cn } from "@/lib/utils";
import {
    ChevronDown,
    ChevronRight,
    FolderTree,
    IndianRupee,
    Layers,
    Wrench,
} from "lucide-react";

interface CatalogTreeProps {
    tree: CatalogTreeCategory[];
    isAdmin: boolean;
    expandedCategories: Record<string, boolean>;
    expandedServices: Record<string, boolean>;
    onToggleCategory: (id: string) => void;
    onToggleService: (id: string) => void;
    onEditCategory: (id: string) => void;
    onDeleteCategory: (id: string) => void;
    onAddService: (categoryId: string) => void;
    onEditService: (id: string) => void;
    onDeleteService: (id: string) => void;
    onAddSubService: (serviceId: string) => void;
    onEditSubService: (id: string) => void;
    onDeleteSubService: (id: string) => void;
}

export function CatalogTree({
    tree,
    isAdmin,
    expandedCategories,
    expandedServices,
    onToggleCategory,
    onToggleService,
    onEditCategory,
    onDeleteCategory,
    onAddService,
    onEditService,
    onDeleteService,
    onAddSubService,
    onEditSubService,
    onDeleteSubService,
}: CatalogTreeProps) {
    if (tree.length === 0) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                    <FolderTree className="h-10 w-10 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                        No categories yet. Create your first category to build the catalog tree.
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-3">
            {tree.map(({ category, services }) => {
                const catExpanded = expandedCategories[category._id] ?? true;
                return (
                    <Card key={category._id} className="overflow-hidden py-0">
                        <div className="flex items-start gap-2 border-b border-border/60 bg-muted/20 px-4 py-3">
                            <button
                                type="button"
                                className="mt-0.5 rounded-md p-0.5 text-muted-foreground hover:bg-muted"
                                onClick={() => onToggleCategory(category._id)}
                                aria-expanded={catExpanded}
                            >
                                {catExpanded ? (
                                    <ChevronDown className="h-4 w-4" />
                                ) : (
                                    <ChevronRight className="h-4 w-4" />
                                )}
                            </button>
                            <Layers className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="font-semibold text-foreground">{category.name}</span>
                                    <StatusBadge active={category.isActive} />
                                    <span className="text-xs text-muted-foreground">
                                        {services.length} service{services.length === 1 ? "" : "s"}
                                    </span>
                                </div>
                                {category.description && (
                                    <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">
                                        {category.description}
                                    </p>
                                )}
                            </div>
                            <CatalogItemMenu
                                disabled={!isAdmin}
                                actions={["edit", "add-service", "delete"]}
                                onAction={(action) => {
                                    if (action === "edit") onEditCategory(category._id);
                                    if (action === "delete") onDeleteCategory(category._id);
                                    if (action === "add-service") onAddService(category._id);
                                }}
                            />
                        </div>

                        {catExpanded && (
                            <CardContent className="space-y-2 px-4 py-3">
                                {services.length === 0 ? (
                                    <p className="py-2 pl-8 text-sm text-muted-foreground">
                                        No services in this category.
                                    </p>
                                ) : (
                                    services.map(({ service, subServices }) => {
                                        const srvExpanded = expandedServices[service._id] ?? true;
                                        return (
                                            <div
                                                key={service._id}
                                                className="rounded-lg border border-border/60 bg-card"
                                            >
                                                <div className="flex items-start gap-2 px-3 py-2.5">
                                                    <button
                                                        type="button"
                                                        className="mt-0.5 rounded-md p-0.5 text-muted-foreground hover:bg-muted"
                                                        onClick={() => onToggleService(service._id)}
                                                        aria-expanded={srvExpanded}
                                                    >
                                                        {srvExpanded ? (
                                                            <ChevronDown className="h-4 w-4" />
                                                        ) : (
                                                            <ChevronRight className="h-4 w-4" />
                                                        )}
                                                    </button>
                                                    <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <span className="font-medium">{service.name}</span>
                                                            <StatusBadge active={service.isActive} />
                                                            <span className="text-xs text-muted-foreground">
                                                                {subServices.length} sub-service
                                                                {subServices.length === 1 ? "" : "s"}
                                                            </span>
                                                        </div>
                                                        {service.description && (
                                                            <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                                                                {service.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <CatalogItemMenu
                                                        disabled={!isAdmin}
                                                        actions={["edit", "add-sub-service", "delete"]}
                                                        onAction={(action) => {
                                                            if (action === "edit") onEditService(service._id);
                                                            if (action === "delete") onDeleteService(service._id);
                                                            if (action === "add-sub-service")
                                                                onAddSubService(service._id);
                                                        }}
                                                    />
                                                </div>

                                                {srvExpanded && (
                                                    <ul className="space-y-1 border-t border-border/40 px-3 py-2 pl-12">
                                                        {subServices.length === 0 ? (
                                                            <li className="py-1 text-sm text-muted-foreground">
                                                                No sub-services yet.
                                                            </li>
                                                        ) : (
                                                            subServices.map((sub) => (
                                                                <li
                                                                    key={sub._id}
                                                                    className={cn(
                                                                        "flex items-center justify-between gap-2 rounded-md px-2 py-1.5 hover:bg-muted/40"
                                                                    )}
                                                                >
                                                                    <div className="min-w-0">
                                                                        <div className="flex flex-wrap items-center gap-2">
                                                                            <span className="text-sm font-medium">
                                                                                {sub.name}
                                                                            </span>
                                                                            <StatusBadge active={sub.isActive} />
                                                                            <span className="flex items-center text-xs font-medium text-primary">
                                                                                <IndianRupee className="h-3 w-3" />
                                                                                {sub.basePrice}
                                                                                {sub.priceType === "range" && (
                                                                                    <span className="ml-0.5 opacity-70">
                                                                                        onwards
                                                                                    </span>
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                        {sub.description && (
                                                                            <p className="text-xs text-muted-foreground line-clamp-1">
                                                                                {sub.description}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                    <CatalogItemMenu
                                                                        disabled={!isAdmin}
                                                                        actions={["edit", "delete"]}
                                                                        onAction={(action) => {
                                                                            if (action === "edit")
                                                                                onEditSubService(sub._id);
                                                                            if (action === "delete")
                                                                                onDeleteSubService(sub._id);
                                                                        }}
                                                                    />
                                                                </li>
                                                            ))
                                                        )}
                                                    </ul>
                                                )}
                                            </div>
                                        );
                                    })
                                )}
                            </CardContent>
                        )}
                    </Card>
                );
            })}
        </div>
    );
}

function StatusBadge({ active }: { active: boolean }) {
    return (
        <Badge variant={active ? "default" : "secondary"} className="text-[10px] uppercase">
            {active ? "Active" : "Inactive"}
        </Badge>
    );
}
