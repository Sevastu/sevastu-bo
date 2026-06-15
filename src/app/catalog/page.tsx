"use client";

import { useMemo, useState } from "react";
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
import { useCatalogAdmin } from "@/features/catalog/hooks/useCatalogAdmin";
import type { CatalogEntityType, Category, Service, SubService } from "@/features/services/types";
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

export default function CatalogPage() {
    const user = getUser();
    const isAdmin = user?.role === "admin";

    const {
        tree,
        categories,
        services,
        subServices,
        stats,
        overview,
        loading,
        error,
        expandedCategories,
        expandedServices,
        toggleCategory,
        toggleService,
        loadCatalog,
        handleSearch,
        saveCategory,
        saveService,
        saveSubService,
        removeCategory,
        removeService,
        removeSubService,
    } = useCatalogAdmin();

    const [dialog, setDialog] = useState<DialogState>(null);
    const [deleteTarget, setDeleteTarget] = useState<DeleteState>(null);
    const [deleting, setDeleting] = useState(false);

    // Filters
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
    const [marketplaceFilter, setMarketplaceFilter] = useState<"all" | "featured" | "popular" | "searchable">("all");
    const [categoryFilter, setCategoryFilter] = useState<string>("all");

    // Node selection for Drawer
    const [selectedNode, setSelectedNode] = useState<{ type: CatalogEntityType | null, node: any }>({ type: null, node: null });

    const categoryById = useMemo(() => new Map(categories.map((c) => [c._id, c])), [categories]);
    const serviceById = useMemo(() => new Map(services.map((s) => [s._id, s])), [services]);
    const subServiceById = useMemo(() => new Map(subServices.map((s) => [s._id, s])), [subServices]);

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            if (deleteTarget.type === "category") await removeCategory(deleteTarget.id);
            if (deleteTarget.type === "service") await removeService(deleteTarget.id);
            if (deleteTarget.type === "subService") await removeSubService(deleteTarget.id);
            setDeleteTarget(null);
            if (selectedNode.node?._id === deleteTarget.id) setSelectedNode({ type: null, node: null });
        } catch {
            // keep dialog open
        } finally {
            setDeleting(false);
        }
    };

    const handlePanelUpdate = async (type: CatalogEntityType, id: string, payload: any) => {
        try {
            const endpoint = type === 'category' ? 'categories' : type === 'service' ? 'services' : 'sub-services';
            await apiClient.patch(`/${endpoint}/${id}`, payload);

            await loadCatalog();

            setSelectedNode(prev => {
                if (prev.node && prev.node._id === id) {
                    const updateNested = (obj: any, updates: any): any => {
                        const out = { ...obj };
                        for (const key in updates) {
                            if (typeof updates[key] === 'object' && updates[key] !== null && !Array.isArray(updates[key])) {
                                out[key] = updateNested(out[key] || {}, updates[key]);
                            } else {
                                out[key] = updates[key];
                            }
                        }
                        return out;
                    };
                    return { ...prev, node: updateNested(prev.node, payload) };
                }
                return prev;
            });
        } catch (err) {
            console.error("Failed to update item", err);
        }
    };

    const handleReorder = async (type: CatalogEntityType, ids: string[]) => {
        try {
            let endpoint = '';
            if (type === 'category') endpoint = '/categories/reorder';
            if (type === 'service') endpoint = '/services/reorder';
            if (type === 'subService') endpoint = '/sub-services/reorder';
            await apiClient.patch(endpoint, { ids });
            await loadCatalog();
        } catch (err) {
            console.error("Failed to reorder", err);
        }
    };

    const editingCategory = dialog?.kind === "category" && dialog.mode === "edit" ? dialog.category : undefined;
    const editingService = dialog?.kind === "service" && dialog.mode === "edit" ? dialog.service : undefined;
    const editingSubService = dialog?.kind === "subService" && dialog.mode === "edit" ? dialog.subService : undefined;

    const getBreadcrumbs = () => {
        if (!selectedNode.node || !selectedNode.type) return [];

        for (const category of tree) {
            if (
                selectedNode.type === "category" &&
                category._id === selectedNode.node._id
            ) {
                return [category.name];
            }

            for (const service of category.services) {
                if (
                    selectedNode.type === "service" &&
                    service._id === selectedNode.node._id
                ) {
                    return [
                        category.name,
                        service.name,
                    ];
                }

                for (const sub of service.subServices) {
                    if (
                        selectedNode.type === "subService" &&
                        sub._id === selectedNode.node._id
                    ) {
                        return [
                            category.name,
                            service.name,
                            sub.name,
                        ];
                    }
                }
            }
        }

        return [];
    };

    const filteredTree = useMemo(() => {
        let result = tree;

        // Apply category filter
        if (categoryFilter !== "all") {
            result = result.filter(category => category._id === categoryFilter);
        }

        // Apply status filter
        if (statusFilter !== "all") {
            const isActiveFilter = statusFilter === "active";
            result = result.map(category => {
                const filteredServices = category.services.map(service => {
                    const filteredSubs = service.subServices.filter(sub => sub.isActive === isActiveFilter);
                    if (service.isActive === isActiveFilter || filteredSubs.length > 0) {
                        return { ...service, subServices: filteredSubs };
                    }
                    return null;
                }).filter(Boolean) as any[];

                if (category.isActive === isActiveFilter || filteredServices.length > 0) {
                    return { ...category, services: filteredServices };
                }
                return null;
            }).filter(Boolean) as any[];
        }

        // Apply marketplace filter
        if (marketplaceFilter !== "all") {
            result = result.map(category => {
                const filteredServices = category.services.map(service => {
                    const filteredSubs = service.subServices.filter(sub => {
                        if (marketplaceFilter === "featured") return sub.marketplace?.featured;
                        if (marketplaceFilter === "popular") return sub.marketplace?.popular;
                        if (marketplaceFilter === "searchable") return sub.marketplace?.searchable;
                        return true;
                    });
                    
                    if (filteredSubs.length > 0) {
                        return { ...service, subServices: filteredSubs };
                    }
                    return null;
                }).filter(Boolean) as any[];

                if (filteredServices.length > 0) {
                    return { ...category, services: filteredServices };
                }
                return null;
            }).filter(Boolean) as any[];
        }

        // Apply search filter
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.map(category => {
                const catMatch = category.name.toLowerCase().includes(q);

                const filteredServices = category.services.map(service => {
                    const srvMatch = service.name.toLowerCase().includes(q);
                    const filteredSubs = service.subServices.filter(sub =>
                        sub.name.toLowerCase().includes(q)
                    );

                    if (srvMatch || filteredSubs.length > 0) {
                        return { ...service, subServices: filteredSubs.length > 0 ? filteredSubs : service.subServices };
                    }
                    return null;
                }).filter(Boolean) as any[];

                if (catMatch || filteredServices.length > 0) {
                    return { ...category, services: filteredServices.length > 0 ? filteredServices : category.services };
                }
                return null;
            }).filter(Boolean) as any[];
        }

        return result;
    }, [tree, statusFilter, marketplaceFilter, categoryFilter, searchQuery]);

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
            <div className=" mb-8 flex">
                {!loading && overview && (
                    <CatalogDashboardCards stats={stats} />
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LEFT PANEL (70%) */}
                <div className="lg:col-span-8 flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-12 items-center bg-card/80 p-4 rounded-lg">
                        <div className="relative w-full">
                            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search catalog..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-8 pr-4 py-4 bg-background"
                            />
                        </div>
                        <Select value={statusFilter} onValueChange={(val: any) => setStatusFilter(val)}>
                            <SelectTrigger className="w-full sm:w-[150px] bg-background">
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
                            <SelectTrigger className="w-full sm:w-[160px] bg-background">
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
                            <SelectTrigger className="w-full sm:w-[160px] bg-background">
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
                            onEditCategory={(id) => {
                                const category = categoryById.get(id);
                                if (category) setDialog({ kind: "category", mode: "edit", category });
                            }}
                            onDeleteCategory={(id) => {
                                const category = categoryById.get(id);
                                if (category) setDeleteTarget({ type: "category", id, name: category.name });
                            }}
                            onAddService={(categoryId) => setDialog({ kind: "service", mode: "create", defaultCategoryId: categoryId })}
                            onEditService={(id) => {
                                const service = serviceById.get(id);
                                if (service) setDialog({ kind: "service", mode: "edit", service });
                            }}
                            onDeleteService={(id) => {
                                const service = serviceById.get(id);
                                if (service) setDeleteTarget({ type: "service", id, name: service.name });
                            }}
                            onAddSubService={(serviceId) => setDialog({ kind: "subService", mode: "create", defaultServiceId: serviceId })}
                            onEditSubService={(id) => {
                                const sub = subServiceById.get(id);
                                if (sub) setDialog({ kind: "subService", mode: "edit", subService: sub });
                            }}
                            onDeleteSubService={(id) => {
                                const sub = subServiceById.get(id);
                                if (sub) setDeleteTarget({ type: "subService", id, name: sub.name });
                            }}
                            onSelectNode={(type, node) => setSelectedNode({ type, node })}
                            onReorder={handleReorder}
                            searchQuery={searchQuery}
                        />
                    )}
                </div>

                {/* RIGHT PANEL (30%) */}
                <div className="lg:col-span-4 h-full relative">
                    <MarketplaceDetailsPanel
                        type={selectedNode.type}
                        node={selectedNode.node}
                        breadcrumbs={getBreadcrumbs()}
                        onEdit={(type, id) => {
                            const map = type === 'category' ? categoryById : type === 'service' ? serviceById : subServiceById;
                            const item = map.get(id);
                            if (item) setDialog({ kind: type, mode: "edit", [type]: item } as any);
                        }}
                        onDelete={(type, id) => {
                            const map = type === 'category' ? categoryById : type === 'service' ? serviceById : subServiceById;
                            const item = map.get(id);
                            if (item) setDeleteTarget({ type, id, name: item.name });
                        }}
                        onUpdate={handlePanelUpdate}
                    />
                </div>
            </div>

            <CategoryFormDialog
                open={dialog?.kind === "category"}
                category={editingCategory ?? null}
                onOpenChange={(open) => !open && setDialog(null)}
                onSubmit={saveCategory}
            />

            <ServiceFormDialog
                open={dialog?.kind === "service"}
                service={editingService ?? null}
                categories={categories}
                defaultCategoryId={dialog?.kind === "service" ? dialog.defaultCategoryId : undefined}
                onOpenChange={(open) => !open && setDialog(null)}
                onSubmit={saveService}
            />

            <SubServiceFormDialog
                open={dialog?.kind === "subService"}
                subService={editingSubService ?? null}
                services={services}
                categories={categories}
                defaultServiceId={dialog?.kind === "subService" ? dialog.defaultServiceId : undefined}
                onOpenChange={(open) => !open && setDialog(null)}
                onSubmit={saveSubService}
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
