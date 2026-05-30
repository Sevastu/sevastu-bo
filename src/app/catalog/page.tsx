"use client";

import { useMemo, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CatalogTree } from "@/features/catalog/components/CatalogTree";
import { CategoryFormDialog } from "@/features/catalog/components/CategoryFormDialog";
import { ServiceFormDialog } from "@/features/catalog/components/ServiceFormDialog";
import { SubServiceFormDialog } from "@/features/catalog/components/SubServiceFormDialog";
import { DeleteConfirmDialog } from "@/features/catalog/components/DeleteConfirmDialog";
import { useCatalog } from "@/features/catalog/hooks/useCatalog";
import type { CatalogEntityType, Category, Service, SubService } from "@/features/services/types";
import { getUser } from "@/lib/auth";
import { FolderTree, Loader2, Plus, RefreshCw } from "lucide-react";

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
    } = useCatalog();

    const [dialog, setDialog] = useState<DialogState>(null);
    const [deleteTarget, setDeleteTarget] = useState<DeleteState>(null);
    const [deleting, setDeleting] = useState(false);

    const categoryById = useMemo(
        () => new Map(categories.map((c) => [c._id, c])),
        [categories]
    );
    const serviceById = useMemo(
        () => new Map(services.map((s) => [s._id, s])),
        [services]
    );
    const subServiceById = useMemo(
        () => new Map(subServices.map((s) => [s._id, s])),
        [subServices]
    );

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            if (deleteTarget.type === "category") await removeCategory(deleteTarget.id);
            if (deleteTarget.type === "service") await removeService(deleteTarget.id);
            if (deleteTarget.type === "subService") await removeSubService(deleteTarget.id);
            setDeleteTarget(null);
        } catch {
            // keep dialog open; user can retry
        } finally {
            setDeleting(false);
        }
    };

    const editingCategory =
        dialog?.kind === "category" && dialog.mode === "edit" ? dialog.category : undefined;
    const editingService =
        dialog?.kind === "service" && dialog.mode === "edit" ? dialog.service : undefined;
    const editingSubService =
        dialog?.kind === "subService" && dialog.mode === "edit" ? dialog.subService : undefined;

    return (
        <AppLayout>
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <FolderTree className="h-8 w-8 text-primary" />
                        <h2 className="text-3xl font-bold tracking-tight text-primary">
                            Catalog Management
                        </h2>
                    </div>
                    <p className="text-muted-foreground">
                        Manage categories, services, and sub-services in a single hierarchy.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => void loadCatalog()}
                        disabled={loading}
                    >
                        <RefreshCw className={cnRefresh(loading)} />
                        Refresh
                    </Button>
                    {isAdmin && (
                        <Button
                            type="button"
                            className="gap-2"
                            onClick={() => setDialog({ kind: "category", mode: "create" })}
                        >
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
                        <Button type="button" variant="outline" size="sm" onClick={() => void loadCatalog()}>
                            Retry
                        </Button>
                    </AlertDescription>
                </Alert>
            )}

            {loading ? (
                <div className="flex items-center justify-center gap-2 py-24 text-muted-foreground">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    Loading catalog…
                </div>
            ) : (
                <CatalogTree
                    tree={tree}
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
                        if (category)
                            setDeleteTarget({
                                type: "category",
                                id,
                                name: category.name,
                            });
                    }}
                    onAddService={(categoryId) =>
                        setDialog({ kind: "service", mode: "create", defaultCategoryId: categoryId })
                    }
                    onEditService={(id) => {
                        const service = serviceById.get(id);
                        if (service) setDialog({ kind: "service", mode: "edit", service });
                    }}
                    onDeleteService={(id) => {
                        const service = serviceById.get(id);
                        if (service)
                            setDeleteTarget({ type: "service", id, name: service.name });
                    }}
                    onAddSubService={(serviceId) =>
                        setDialog({ kind: "subService", mode: "create", defaultServiceId: serviceId })
                    }
                    onEditSubService={(id) => {
                        const sub = subServiceById.get(id);
                        if (sub) setDialog({ kind: "subService", mode: "edit", subService: sub });
                    }}
                    onDeleteSubService={(id) => {
                        const sub = subServiceById.get(id);
                        if (sub)
                            setDeleteTarget({ type: "subService", id, name: sub.name });
                    }}
                />
            )}

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
                defaultCategoryId={
                    dialog?.kind === "service" ? dialog.defaultCategoryId : undefined
                }
                onOpenChange={(open) => !open && setDialog(null)}
                onSubmit={saveService}
            />

            <SubServiceFormDialog
                open={dialog?.kind === "subService"}
                subService={editingSubService ?? null}
                services={services}
                categories={categories}
                defaultServiceId={
                    dialog?.kind === "subService" ? dialog.defaultServiceId : undefined
                }
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
