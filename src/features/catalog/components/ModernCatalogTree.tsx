"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { CatalogEntityType } from "@/features/services/types";
import { CatalogItemMenu } from "./CatalogItemMenu";
import { cn } from "@/lib/utils";
import {
    ChevronDown,
    ChevronRight,
    FolderTree,
    IndianRupee,
    Layers,
    Wrench,
    ArrowUp,
    ArrowDown,
    Clock,
    Tag,
    Star
} from "lucide-react";

interface CatalogTreeNode {
    _id: string;
    name: string;
    description?: string;
    iconKey?: string;
    iconUrl?: string;
    isActive: boolean;
    order: number;
    services: ServiceTreeNode[];
}

interface ServiceTreeNode {
    _id: string;
    name: string;
    description?: string;
    imageKey?: string;
    imageUrl?: string;
    categoryId: string;
    isActive: boolean;
    order: number;
    subServices: SubServiceTreeNode[];
}

interface SubServiceTreeNode {
    _id: string;
    name: string;
    slug?: string;
    description?: string;
    shortDescription?: string;
    serviceId: string;
    priceType: string;
    basePrice: number;
    pricing?: {
        minimumPrice?: number;
        maximumPrice?: number;
    };
    estimatedDurationMinutes?: number;
    marketplace?: {
        featured?: boolean;
        popular?: boolean;
        searchable?: boolean;
    };
    seo?: {
        metaTitle?: string;
        metaDescription?: string;
    };
    isActive: boolean;
    order: number;
}

interface ModernCatalogTreeProps {
    tree: CatalogTreeNode[];
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
    onSelectNode: (type: CatalogEntityType, node: any) => void;
    onReorder: (type: CatalogEntityType, ids: string[]) => void;
    searchQuery?: string;
}

export function ModernCatalogTree({
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
    onSelectNode,
    onReorder,
    searchQuery = ""
}: ModernCatalogTreeProps) {
    if (tree.length === 0) {
        return (
            <Card className="border-dashed border-2 bg-muted/20">
                <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                    <FolderTree className="h-10 w-10 text-muted-foreground opacity-50" />
                    <p className="text-sm text-muted-foreground">
                        No categories found. Create your first category to build the marketplace.
                    </p>
                </CardContent>
            </Card>
        );
    }

    const moveItem = (type: CatalogEntityType, list: any[], currentIndex: number, direction: 'up' | 'down') => {
        if (direction === 'up' && currentIndex > 0) {
            const newList = [...list];
            [newList[currentIndex - 1], newList[currentIndex]] = [newList[currentIndex], newList[currentIndex - 1]];
            onReorder(type, newList.map(item => item._id));
        } else if (direction === 'down' && currentIndex < list.length - 1) {
            const newList = [...list];
            [newList[currentIndex + 1], newList[currentIndex]] = [newList[currentIndex], newList[currentIndex + 1]];
            onReorder(type, newList.map(item => item._id));
        }
    };

    const isSearching = searchQuery.trim().length > 0;

    return (
        <div className="space-y-4">
            {tree.map((category, catIndex) => {
                const catExpanded = expandedCategories[category._id] ?? true;
                return (
                    <Card key={category._id} className="overflow-hidden shadow-sm bg-card rounded-lg">
                        <div
                            className="flex items-center gap-5 bg-muted/50 hover:bg-muted hover:shadow-md hover:shadow-blue-500 px-4 py-3 cursor-pointer transition-colors"
                            onClick={() => onSelectNode('category', category)}
                        >
                            <button
                                type="button"
                                className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                onClick={(e) => { e.stopPropagation(); onToggleCategory(category._id); }}
                            >
                                {catExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </button>
                            <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center shrink-0">
                                <Layers className="h-4 w-4 text-primary" />
                            </div>
                            <div className="min-w-0 flex-1 flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-foreground text-sm tracking-tight">{category.name}</span>
                                    <StatusBadge active={category.isActive} />
                                </div>
                                <span className="text-[11px] text-muted-foreground font-medium mt-0.5">
                                    {category.services.length} Service{category.services.length !== 1 ? 's' : ''}
                                </span>
                            </div>
                            
                            {isAdmin && !isSearching && (
                                <div className="flex gap-0.5" onClick={e => e.stopPropagation()}>
                                    <button onClick={() => moveItem('category', tree, catIndex, 'up')} disabled={catIndex === 0} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 rounded-md transition-colors"><ArrowUp className="w-3.5 h-3.5" /></button>
                                    <button onClick={() => moveItem('category', tree, catIndex, 'down')} disabled={catIndex === tree.length - 1} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 rounded-md transition-colors"><ArrowDown className="w-3.5 h-3.5" /></button>
                                </div>
                            )}
                            
                            <div onClick={e => e.stopPropagation()}>
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
                        </div>

                        {catExpanded && (
                            <div className="px-4 py-2 bg-card relative">
                                {/* Connector Line for Categories */}
                                <div className="absolute left-[33px] top-0 bottom-4 w-px" />
                                
                                {category.services.length === 0 ? (
                                    <p className="py-4 pl-10 text-sm text-muted-foreground italic">No services in this category.</p>
                                ) : (
                                    <div className="space-y-2 py-2 pl-6">
                                        {category.services.map((service, srvIndex) => {
                                            const srvExpanded = expandedServices[service._id] ?? true;
                                            return (
                                                <div key={service._id} className="relative rounded-lg bg-background shadow-sm hover:border-indigo-500/30 transition-colors">
                                                    {/* Horizontal branch for Service */}
                                                    <div className="absolute -left-6 top-6 w-6 h-px" />
                                                    
                                                    <div
                                                        className="flex items-center gap-3 px-3 py-3 cursor-pointer hover:bg-muted/10 rounded-t-lg transition-colors"
                                                        onClick={() => onSelectNode('service', service)}
                                                    >
                                                        <button
                                                            type="button"
                                                            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                                                            onClick={(e) => { e.stopPropagation(); onToggleService(service._id); }}
                                                        >
                                                            {srvExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                                        </button>
                                                        {service.imageUrl ? (
                                                            <img src={service.imageUrl} alt={service.name} className="h-8 w-8 rounded-md object-cover border" />
                                                        ) : (
                                                            <div className="h-8 w-8 rounded-md bg-indigo-100 flex items-center justify-center shrink-0">
                                                                <Wrench className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                                            </div>
                                                        )}
                                                        <div className="min-w-0 flex-1 flex flex-col">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium text-sm text-foreground">{service.name}</span>
                                                                <StatusBadge active={service.isActive} />
                                                            </div>
                                                            <span className="text-[11px] text-muted-foreground mt-0.5">
                                                                {service.subServices.length} Sub-service{service.subServices.length !== 1 ? 's' : ''}
                                                            </span>
                                                        </div>

                                                        {isAdmin && !isSearching && (
                                                            <div className="flex gap-0.5" onClick={e => e.stopPropagation()}>
                                                                <button onClick={() => moveItem('service', category.services, srvIndex, 'up')} disabled={srvIndex === 0} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 rounded-md transition-colors"><ArrowUp className="w-3 h-3" /></button>
                                                                <button onClick={() => moveItem('service', category.services, srvIndex, 'down')} disabled={srvIndex === category.services.length - 1} className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 rounded-md transition-colors"><ArrowDown className="w-3 h-3" /></button>
                                                            </div>
                                                        )}
                                                        
                                                        <div onClick={e => e.stopPropagation()}>
                                                            <CatalogItemMenu
                                                                disabled={!isAdmin}
                                                                actions={["edit", "add-sub-service", "delete"]}
                                                                onAction={(action) => {
                                                                    if (action === "edit") onEditService(service._id);
                                                                    if (action === "delete") onDeleteService(service._id);
                                                                    if (action === "add-sub-service") onAddSubService(service._id);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>

                                                    {srvExpanded && (
                                                        <div className="bg-muted/5 p-2 relative">
                                                            {/* Connector Line for SubServices */}
                                                            <div className="absolute left-[31px] top-0 bottom-4 w-px" />
                                                            
                                                            {service.subServices.length === 0 ? (
                                                                <p className="py-3 pl-12 text-xs text-muted-foreground italic">No sub-services available.</p>
                                                            ) : (
                                                                <div className="space-y-1.5 pl-9 py-1">
                                                                    {service.subServices.map((sub, subIndex) => (
                                                                        <div
                                                                            key={sub._id}
                                                                            className="relative flex items-center justify-between gap-2 rounded-md border border-border/40 bg-card p-2.5 hover:border-purple-500/30 hover:shadow-sm cursor-pointer transition-all group"
                                                                            onClick={() => onSelectNode('subService', sub)}
                                                                        >
                                                                            {/* Horizontal branch for SubService */}
                                                                            <div className="absolute -left-4 top-1/2 w-4 h-px" />
                                                                            
                                                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                                                <div className="h-6 w-6 rounded bg-purple-100 flex items-center justify-center shrink-0">
                                                                                    <Tag className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                                                                                </div>
                                                                                <div className="min-w-0 flex-1 flex flex-col">
                                                                                    <div className="flex items-center gap-2">
                                                                                        <span className="text-sm font-medium truncate">{sub.name}</span>
                                                                                        <StatusBadge active={sub.isActive} />
                                                                                    </div>
                                                                                    <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground">
                                                                                        <span className="flex items-center gap-1 font-mono text-primary font-medium">
                                                                                            <IndianRupee className="w-3 h-3" />
                                                                                            {sub.basePrice}
                                                                                        </span>
                                                                                        <span className="flex items-center gap-1">
                                                                                            <Clock className="w-3 h-3" />
                                                                                            {sub.estimatedDurationMinutes || 60}m
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="flex flex-col items-end gap-1 shrink-0 ml-2">
                                                                                <div className="flex items-center gap-1 h-5">
                                                                                    {sub.marketplace?.featured && <Badge variant="secondary" className="text-[9px] h-4 px-1.5 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-200">Featured</Badge>}
                                                                                    {sub.marketplace?.popular && <Badge variant="secondary" className="text-[9px] h-4 px-1.5 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-200">Popular</Badge>}
                                                                                </div>
                                                                                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => e.stopPropagation()}>
                                                                                    {isAdmin && !isSearching && (
                                                                                        <>
                                                                                            <button onClick={() => moveItem('subService', service.subServices, subIndex, 'up')} disabled={subIndex === 0} className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 rounded"><ArrowUp className="w-3 h-3" /></button>
                                                                                            <button onClick={() => moveItem('subService', service.subServices, subIndex, 'down')} disabled={subIndex === service.subServices.length - 1} className="p-1 text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-30 rounded"><ArrowDown className="w-3 h-3" /></button>
                                                                                        </>
                                                                                    )}
                                                                                    <CatalogItemMenu
                                                                                        disabled={!isAdmin}
                                                                                        actions={["edit", "delete"]}
                                                                                        onAction={(action) => {
                                                                                            if (action === "edit") onEditSubService(sub._id);
                                                                                            if (action === "delete") onDeleteSubService(sub._id);
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>
                );
            })}
        </div>
    );
}

function StatusBadge({ active }: { active: boolean }) {
    return (
        <span className={cn(
            "inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-medium border",
            active
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:text-emerald-400"
                : "border-rose-200 bg-rose-50 text-rose-700 dark:text-rose-400"
        )}>
            {active ? "Active" : "Inactive"}
        </span>
    );
}
