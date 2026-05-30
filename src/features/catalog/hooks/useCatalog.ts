"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
    createCategory,
    createService,
    createSubService,
    deleteCategory,
    deleteService,
    deleteSubService,
    fetchCatalogTree,
    updateCategory,
    updateService,
    updateSubService,
} from "@/features/services/api";
import type {
    CatalogTreeCategory,
    Category,
    CategoryFormValues,
    Service,
    ServiceFormValues,
    SubService,
    SubServiceFormValues,
} from "@/features/services/types";
import { buildCatalogTree, DEFAULT_SERVICE_IMAGE } from "@/features/catalog/utils";

export function useCatalog() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [subServices, setSubServices] = useState<SubService[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
    const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});

    const tree: CatalogTreeCategory[] = useMemo(
        () => buildCatalogTree(categories, services, subServices),
        [categories, services, subServices]
    );

    const loadCatalog = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchCatalogTree();
            setCategories(data.categories);
            setServices(data.services);
            setSubServices(data.subServices);
            setExpandedCategories((prev) => {
                const next = { ...prev };
                for (const cat of data.categories) {
                    if (next[cat._id] === undefined) next[cat._id] = true;
                }
                return next;
            });
        } catch {
            setError("Failed to load catalog. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCatalog();
    }, [loadCatalog]);

    const toggleCategory = (id: string) => {
        setExpandedCategories((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleService = (id: string) => {
        setExpandedServices((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const saveCategory = async (values: CategoryFormValues, editing?: Category) => {
        const payload = {
            name: values.name.trim(),
            description: values.description.trim() || undefined,
            isActive: values.isActive,
            ...(editing ? {} : { icon: "Layers" }),
        };
        if (editing) {
            await updateCategory(editing._id, payload);
        } else {
            await createCategory(payload);
        }
        await loadCatalog();
    };

    const saveService = async (values: ServiceFormValues, editing?: Service) => {
        const payload = {
            name: values.name.trim(),
            description: values.description.trim() || undefined,
            categoryId: values.categoryId,
            isActive: values.isActive,
            image: editing?.image ?? DEFAULT_SERVICE_IMAGE,
        };
        if (editing) {
            await updateService(editing._id, payload);
        } else {
            await createService(payload);
        }
        await loadCatalog();
    };

    const saveSubService = async (values: SubServiceFormValues, editing?: SubService) => {
        const payload = {
            name: values.name.trim(),
            description: values.description.trim() || undefined,
            serviceId: values.serviceId,
            isActive: values.isActive,
            basePrice: values.basePrice,
            priceType: values.priceType,
        };
        if (editing) {
            await updateSubService(editing._id, payload);
        } else {
            await createSubService(payload);
        }
        await loadCatalog();
    };

    const removeCategory = async (id: string) => {
        await deleteCategory(id);
        await loadCatalog();
    };

    const removeService = async (id: string) => {
        await deleteService(id);
        await loadCatalog();
    };

    const removeSubService = async (id: string) => {
        await deleteSubService(id);
        await loadCatalog();
    };

    return {
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
    };
}
