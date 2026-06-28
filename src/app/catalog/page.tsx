"use client";

import { useMemo, useState, useEffect } from "react";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ModernCatalogTree } from "@/features/catalog/components/ModernCatalogTree";
import { CatalogDashboardCards } from "@/features/catalog/components/CatalogDashboardCards";
import { MarketplaceDetailsPanel } from "@/features/catalog/components/MarketplaceDetailsPanel";
import { CategoryFormDialog } from "@/features/catalog/components/CategoryFormDialog";
import { ServiceFormDialog } from "@/features/catalog/components/ServiceFormDialog";
import { SubServiceFormDialog } from "@/features/catalog/components/SubServiceFormDialog";
import { DeleteConfirmDialog } from "@/features/catalog/components/DeleteConfirmDialog";
import { useCatalogAdmin, CatalogTreeNode, ServiceTreeNode, SubServiceTreeNode } from "@/features/catalog/hooks/useCatalogAdmin";
import type { CatalogEntityType, Category, Service, SubService, CategoryFormValues, ServiceFormValues, SubServiceFormValues } from "@/features/services/types";
import { getUser } from "@/lib/auth";
import { FolderTree, Loader2, Plus, RefreshCw, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import apiClient from "@/lib/apiClient";

type DialogState =
    | { kind: "category"; mode: "create" | "edit"; category?: Category }
    | { kind: "service"; mode: "create" | "edit"; service?: Service; defaultCategoryId?: string }
    | { kind: "subService"; mode: "create" | "edit"; subService?: SubService; defaultServiceId?: string }
    | null;

type DeleteState = {
    type: CatalogEntityType;
    id: string;
    name: string;
} | null;

interface SelectedNodeState {
    type: CatalogEntityType | null;
    node: CatalogTreeNode | ServiceTreeNode | SubServiceTreeNode | null;
}

const getEndpoint = (type: CatalogEntityType) => type === 'category' ? 'categories' : type === 'service' ? 'services' : 'sub-services';

// Reusable Debounce Hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    
    return debouncedValue;
}

// Helper to find fresh node inside the loaded tree without stale closures
function findNodeInTree(tree: CatalogTreeNode[], type: CatalogEntityType | null, id: string): CatalogTreeNode | ServiceTreeNode | SubServiceTreeNode | null {
    if (!type || !tree) return null;
    
    if (type === 'category') {
        return tree.find(c => c._id === id) || null;
    }
    
    for (const cat of tree) {
        if (type === 'service') {
            const srv = cat.services?.find(s => s._id === id);
            if (srv) return srv;
        }
        
        if (type === 'subService') {
            for (const srv of cat.services || []) {
                const sub = srv.subServices?.find(ss => ss._id === id);
                if (sub) return sub;
            }
        }
    }
    return null;
}

export default function CatalogPage() {
    const user = getUser();
    const isAdmin = user?.role === "admin";

    const {
        tree,
        categories,
        services,
        subServices,
        stats,
        loading,
        error,
        expandedCategories,
        expandedServices,
        toggleCategory,
        toggleService,
        loadCatalog,
        saveCategory,
        saveService,
        saveSubService,
        removeCategory,
        removeService,
        removeSubService,
        reorderItem,
    } = useCatalogAdmin();

    const [dialog, setDialog] = useState<DialogState>(null);
    const [deleteTarget, setDeleteTarget] = useState<DeleteState>(null);
    const [deleting, setDeleting] = useState(false);

    // Filters & Debounce Search
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 300);
    
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
    const [marketplaceFilter, setMarketplaceFilter] = useState<"all" | "featured" | "popular" | "searchable">("all");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");

    // Node selection for Drawer (Strongly Typed)
    const [selectedNode, setSelectedNode] = useState<SelectedNodeState>({ type: null, node: null });

    // Memoize Lookup Maps for Performance
    const categoryById = useMemo(() => new Map(categories.map((c) => [c._id, c])), [categories]);
    const serviceById = useMemo(() => new Map(services.map((s) => [s._id, s])), [services]);
    const subServiceById = useMemo(() => new Map(subServices.map((s) => [s._id, s])), [subServices]);

    // State Synchronization Helper: Refreshes the selected node using the latest fetched tree
    const refreshSelectedNode = (freshTree: CatalogTreeNode[]) => {
        if (!selectedNode.type || !selectedNode.node) return;
        
        const freshNode = findNodeInTree(freshTree, selectedNode.type, selectedNode.node._id);
        if (freshNode) {
            setSelectedNode({ type: selectedNode.type, node: freshNode });
        } else {
            setSelectedNode({ type: null, node: null }); // Unselect if deleted
        }
    };

    const handleEdit = (type: CatalogEntityType, id: string) => {
        const map = type === 'category' ? categoryById : type === 'service' ? serviceById : subServiceById;
        const item = map.get(id);
        if (item) setDialog({ kind: type, mode: "edit", [type]: item } as any);
    };

    const handleDelete = (type: CatalogEntityType, id: string) => {
        const map = type === 'category' ? categoryById : type === 'service' ? serviceById : subServiceById;
        const item = map.get(id);
        if (item) setDeleteTarget({ type, id, name: item.name });
    };

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            let freshTree: CatalogTreeNode[] | null = null;
            if (deleteTarget.type === "category") freshTree = await removeCategory(deleteTarget.id);
            if (deleteTarget.type === "service") freshTree = await removeService(deleteTarget.id);
            if (deleteTarget.type === "subService") freshTree = await removeSubService(deleteTarget.id);
            
            setDeleteTarget(null);
            toast.success(`${deleteTarget.name} deleted successfully.`);
            
            if (selectedNode.node?._id === deleteTarget.id) {
                setSelectedNode({ type: null, node: null });
            } else if (freshTree) {
                refreshSelectedNode(freshTree);
            }
        } catch (err) {
            console.error("Failed to delete", err);
            toast.error("Failed to delete item.");
        } finally {
            setDeleting(false);
        }
    };

    const handlePanelUpdate = async (type: CatalogEntityType, id: string, payload: any) => {
        try {
            // No manual merge payload! Reload catalog instead.
            await apiClient.patch(`/${getEndpoint(type)}/${id}`, payload);
            const freshTree = await loadCatalog();
            if (freshTree) {
                refreshSelectedNode(freshTree);
            }
            toast.success("Settings updated successfully.");
        } catch (err) {
            console.error("Failed to update item", err);
            toast.error("Failed to update settings.");
        }
    };

    const handleReorder = async (type: CatalogEntityType, ids: string[]) => {
        try {
            const freshTree = await reorderItem(type, ids);
            if (freshTree) refreshSelectedNode(freshTree);
            toast.success("Reordered successfully.");
        } catch (err) {
            console.error("Failed to reorder", err);
            toast.error("Failed to reorder items.");
        }
    };

    const handleSaveCategory = async (values: CategoryFormValues, editing?: Category) => {
        try {
            const freshTree = await saveCategory(values, editing);
            if (freshTree) refreshSelectedNode(freshTree);
            toast.success(editing ? "Category updated." : "Category created.");
            setDialog(null);
        } catch (err) {
            console.error(err);
            toast.error("Failed to save category.");
        }
    };

    const handleSaveService = async (values: ServiceFormValues, editing?: Service) => {
        try {
            const freshTree = await saveService(values, editing);
            if (freshTree) refreshSelectedNode(freshTree);
            toast.success(editing ? "Service updated." : "Service created.");
            setDialog(null);
        } catch (err) {
            console.error(err);
            toast.error("Failed to save service.");
        }
    };

    const handleSaveSubService = async (values: SubServiceFormValues, editing?: SubService) => {
        try {
            const freshTree = await saveSubService(values, editing);
            if (freshTree) refreshSelectedNode(freshTree);
            toast.success(editing ? "Sub-service updated." : "Sub-service created.");
            setDialog(null);
        } catch (err) {
            console.error(err);
            toast.error("Failed to save sub-service.");
        }
    };

    const editingCategory = dialog?.kind === "category" && dialog.mode === "edit" ? dialog.category : undefined;
    const editingService = dialog?.kind === "service" && dialog.mode === "edit" ? dialog.service : undefined;
    const editingSubService = dialog?.kind === "subService" && dialog.mode === "edit" ? dialog.subService : undefined;

    // Memoize Breadcrumbs Calculations
    const breadcrumbs = useMemo(() => {
        if (!selectedNode.node || !selectedNode.type) return [];

        for (const category of tree) {
            if (selectedNode.type === "category" && category._id === selectedNode.node._id) {
                return [category.name];
            }

            for (const service of category.services) {
                if (selectedNode.type === "service" && service._id === selectedNode.node._id) {
                    return [category.name, service.name];
                }

                for (const sub of service.subServices) {
                    if (selectedNode.type === "subService" && sub._id === selectedNode.node._id) {
                        return [category.name, service.name, sub.name];
                    }
                }
            }
        }
        return [];
    }, [tree, selectedNode]);

    // Optimize Filtering: Preserve object references and avoid unnecessary clones
    const filteredTree = useMemo(() => {
        let result = tree;

        if (categoryFilter !== "all") {
            result = result.filter(category => category._id === categoryFilter);
        }

        const filterTreeStructure = (
            currentTree: CatalogTreeNode[],
            categoryCondition: (c: CatalogTreeNode) => boolean,
            serviceCondition: (s: ServiceTreeNode) => boolean,
            subServiceCondition: (ss: SubServiceTreeNode) => boolean
        ): CatalogTreeNode[] => {
            let treeChanged = false;

            const newTree = currentTree.map(category => {
                let servicesChanged = false;

                const filteredServices = category.services.map((service) => {
                    const filteredSubs = service.subServices.filter(subServiceCondition);
                    const subsChanged = filteredSubs.length !== service.subServices.length;

                    if (serviceCondition(service) || filteredSubs.length > 0) {
                        // Preserve reference if nothing changed inside
                        if (subsChanged) {
                            servicesChanged = true;
                            return { ...service, subServices: filteredSubs };
                        }
                        return service;
                    }
                    servicesChanged = true;
                    return null;
                }).filter(Boolean) as ServiceTreeNode[];

                if (categoryCondition(category) || filteredServices.length > 0) {
                    // Preserve category reference if services didn't change
                    if (servicesChanged || filteredServices.length !== category.services.length) {
                        treeChanged = true;
                        return { ...category, services: filteredServices };
                    }
                    return category;
                }
                
                treeChanged = true;
                return null;
            }).filter(Boolean) as CatalogTreeNode[];
            
            // Only return new array if modifications actually occurred
            return treeChanged ? newTree : currentTree;
        };

        if (statusFilter !== "all") {
            const isActive = statusFilter === "active";
            result = filterTreeStructure(
                result,
                c => c.isActive === isActive,
                s => s.isActive === isActive,
                ss => ss.isActive === isActive
            );
        }

        if (marketplaceFilter !== "all") {
            result = filterTreeStructure(
                result,
                () => false,
                () => false,
                ss => {
                    if (marketplaceFilter === "featured") return !!ss.marketplace?.featured;
                    if (marketplaceFilter === "popular") return !!ss.marketplace?.popular;
                    if (marketplaceFilter === "searchable") return !!ss.marketplace?.searchable;
                    return true;
                }
            );
        }

        if (debouncedSearchQuery.trim()) {
            const q = debouncedSearchQuery.toLowerCase();
            result = filterTreeStructure(
                result,
                c => c.name.toLowerCase().includes(q),
                s => s.name.toLowerCase().includes(q),
                ss => ss.name.toLowerCase().includes(q)
            );
        }

        return result;
    }, [tree, statusFilter, marketplaceFilter, categoryFilter, debouncedSearchQuery]);

    return (
        <AppLayout>
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <FolderTree className="h-8 w-8 text-muted-foreground" />
                        <h2 className="text-3xl font-bold tracking-tight text-muted-foreground">
                            Marketplace Catalog
                        </h2>
                    </div>
                    <p className="text-muted-foreground">
                        Manage marketplace categories, services, pricing, and visibility.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => void loadCatalog()} disabled={loading}>
                        <RefreshCw className={cnRefresh(loading)} />
                        Refresh
                    </Button>
                    {isAdmin && (
                        <Button type="button" className="gap-2" onClick={() => setDialog({ kind: "category", mode: "create" })}>
                            <Plus className="h-4 w-4" />
                            Add category
                        </Button>
                    )}
                </div>
            </div>

            {error && (
                <Alert variant="destructive" className="mb-6">
                    <AlertTitle>Could not load catalog</AlertTitle>
                    <AlertDescription className="flex flex-wrap items-center gap-3">
                        {error}
                        <Button type="button" variant="outline" size="sm" onClick={() => void loadCatalog()}>Retry</Button>
                    </AlertDescription>
                </Alert>
            )}
            
            <div className="mb-8 flex">
                {!loading && (
                    <CatalogDashboardCards stats={stats}/>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT PANEL (70%) */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-12 items-center bg-card p-4 rounded-lg">
                        <div className="relative w-full">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search catalog..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8 pr-4 py-4 bg-slate-100"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={(val: any) => setStatusFilter(val)}>
                            <SelectTrigger className="w-full sm:w-[150px] bg-slate-100 border-slate-200">
                                <SelectValue placeholder="All Status">
                                    {statusFilter === "all" ? "All Status" : statusFilter === "active" ? "Active" : "Inactive"}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={marketplaceFilter} onValueChange={(val: any) => setMarketplaceFilter(val)}>
                            <SelectTrigger className="w-full sm:w-[160px] bg-slate-100 border-slate-200">
                                <SelectValue placeholder="Marketplace">
                                    {marketplaceFilter === "all" ? "All Features" : marketplaceFilter === "featured" ? "Featured" : marketplaceFilter === "popular" ? "Popular" : "Searchable"}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Features</SelectItem>
                                <SelectItem value="featured">Featured</SelectItem>
                                <SelectItem value="popular">Popular</SelectItem>
                                <SelectItem value="searchable">Searchable</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={categoryFilter} onValueChange={(val: string) => setCategoryFilter(val)}>
                            <SelectTrigger className="w-full sm:w-[160px] bg-slate-100 border-slate-200">
                                <SelectValue placeholder="Category">
                                    {categoryFilter === "all" ? "All Categories" : categories.find(c => c._id === categoryFilter)?.name || "Category"}
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {categories.map(cat => (
                                    <SelectItem key={cat._id} value={cat._id}>{cat.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center gap-2 py-24 text-muted-foreground bg-card rounded-xl border">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            Loading catalog…
                        </div>
                    ) : (
                        <ModernCatalogTree
                            tree={filteredTree}
                            isAdmin={isAdmin}
                            expandedCategories={expandedCategories}
                            expandedServices={expandedServices}
                            onToggleCategory={toggleCategory}
                            onToggleService={toggleService}
                            onEditCategory={(id) => handleEdit('category', id)}
                            onDeleteCategory={(id) => handleDelete('category', id)}
                            onAddService={(categoryId) => setDialog({ kind: "service", mode: "create", defaultCategoryId: categoryId })}
                            onEditService={(id) => handleEdit('service', id)}
                            onDeleteService={(id) => handleDelete('service', id)}
                            onAddSubService={(serviceId) => setDialog({ kind: "subService", mode: "create", defaultServiceId: serviceId })}
                            onEditSubService={(id) => handleEdit('subService', id)}
                            onDeleteSubService={(id) => handleDelete('subService', id)}
                            onSelectNode={(type, node) => setSelectedNode({ type, node })}
                            onReorder={handleReorder}
                            searchQuery={debouncedSearchQuery}
                        />
                    )}
                </div>

                {/* RIGHT PANEL (30%) */}
                <div className="lg:col-span-4 relative">
                    <MarketplaceDetailsPanel
                        type={selectedNode.type}
                        node={selectedNode.node}
                        breadcrumbs={breadcrumbs}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onUpdate={handlePanelUpdate}
                    />
                </div>
            </div>

            <CategoryFormDialog
                open={dialog?.kind === "category"}
                category={editingCategory ?? null}
                onOpenChange={(open) => !open && setDialog(null)}
                onSubmit={handleSaveCategory}
            />

            <ServiceFormDialog
                open={dialog?.kind === "service"}
                service={editingService ?? null}
                categories={categories}
                defaultCategoryId={dialog?.kind === "service" ? dialog.defaultCategoryId : undefined}
                onOpenChange={(open) => !open && setDialog(null)}
                onSubmit={handleSaveService}
            />

            <SubServiceFormDialog
                open={dialog?.kind === "subService"}
                subService={editingSubService ?? null}
                services={services}
                categories={categories}
                defaultServiceId={dialog?.kind === "subService" ? dialog.defaultServiceId : undefined}
                onOpenChange={(open) => !open && setDialog(null)}
                onSubmit={handleSaveSubService}
            />

            <DeleteConfirmDialog
                open={Boolean(deleteTarget)}
                itemLabel={deleteTarget?.name ?? "item"}
                loading={deleting}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
                onConfirm={handleDeleteConfirm}
            />
        </AppLayout>
    );
}

function cnRefresh(loading: boolean) {
    return `h-4 w-4 ${loading ? "animate-spin" : ""}`;
}
