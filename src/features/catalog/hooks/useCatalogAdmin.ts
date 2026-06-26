"use client";

import { useCallback, useEffect, useState, useMemo } from "react";
import {
    createCategory,
    createService,
    createSubService,
    deleteCategory,
    deleteService,
    deleteSubService,
    fetchCatalogTree,
    fetchCatalogStats,
    fetchCatalogOverview,
    searchCatalog,
    reorderCatalog,
    updateCategory,
    updateService,
    updateSubService,
} from "@/features/services/api";
import type {
    Category,
    Service,
    SubService,
    CategoryFormValues,
    ServiceFormValues,
    SubServiceFormValues,
} from "@/features/services/types";

export interface CatalogTreeNode {
    _id: string;
    name: string;
    description?: string;
    iconKey?: string;
    iconUrl?: string;
    isActive: boolean;
    order: number;
    createdAt: string;
    updatedAt?: string;
    services: ServiceTreeNode[];
}

export interface ServiceTreeNode {
    _id: string;
    name: string;
    description?: string;
    imageKey?: string;
    imageUrl?: string;
    categoryId: string;
    isActive: boolean;
    order: number;
    createdAt: string;
    updatedAt?: string;
    subServices: SubServiceTreeNode[];
}

export interface SubServiceTreeNode {
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
    createdAt: string;
    updatedAt?: string;
}

export function useCatalogAdmin() {
    const [tree, setTree] = useState<CatalogTreeNode[]>([]);
    const categories = useMemo(() => {
        return tree.map(c => {
            const { services, ...rest } = c;
            return rest as unknown as Category;
        });
    }, [tree]);

    const services = useMemo(() => {
        return tree.flatMap(c => c.services.map(s => {
            const { subServices, ...rest } = s;
            return rest as unknown as Service;
        }));
    }, [tree]);

    const subServices = useMemo(() => {
        return tree.flatMap(c => c.services.flatMap(s => s.subServices as unknown as SubService));
    }, [tree]);
    const [stats, setStats] = useState<any>(null);
    const [overview, setOverview] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
    const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const loadCatalog = useCallback(async (): Promise<CatalogTreeNode[] | null> => {
        setLoading(true);
        setError(null);
        try {
            const [treeData, statsData, overviewData] = await Promise.all([
                fetchCatalogTree(),
                fetchCatalogStats(),
                fetchCatalogOverview()
            ]);
            setTree(treeData);
            setStats(statsData);
            setOverview(overviewData);
            return treeData;
        } catch (err) {
            console.error(err);
            setError("Failed to load catalog. Please try again.");
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadCatalog();
    }, [loadCatalog]);

    const handleSearch = useCallback(async (query: string) => {
        setSearchQuery(query);
        if (query.length < 2) {
            setSearchResults([]);
            return;
        }
        try {
            const results = await searchCatalog(query);
            setSearchResults(results);
        } catch (err) {
            console.error("Search failed", err);
        }
    }, []);

    const saveCategory = async (values: CategoryFormValues, editing?: Category): Promise<CatalogTreeNode[] | null> => {
        const payload = {
            name: values.name.trim(),
            description: values.description.trim() || undefined,
            isActive: values.isActive,
            iconUrl: values.iconUrl || undefined,
        };
        if (editing) {
            await updateCategory(editing._id, payload);
        } else {
            await createCategory(payload);
        }
        return await loadCatalog();
    };

    const saveService = async (values: ServiceFormValues, editing?: Service): Promise<CatalogTreeNode[] | null> => {
        const payload = {
            name: values.name.trim(),
            description: values.description.trim() || undefined,
            categoryId: values.categoryId,
            isActive: values.isActive,
            imageUrl: values.imageUrl || undefined,
        };
        if (editing) {
            await updateService(editing._id, payload);
        } else {
            await createService(payload);
        }
        return await loadCatalog();
    };

    const saveSubService = async (values: SubServiceFormValues, editing?: SubService): Promise<CatalogTreeNode[] | null> => {
        const payload = {
            name: values.name.trim(),
            description: values.description.trim() || undefined,
            serviceId: values.serviceId,
            isActive: values.isActive,
            basePrice: values.basePrice,
            priceType: values.priceType,
            slug: values.slug,
            shortDescription: values.shortDescription,
            pricing: values.pricing,
            estimatedDurationMinutes: values.estimatedDurationMinutes,
            marketplace: values.marketplace,
            seo: values.seo,
        };
        if (editing) {
            await updateSubService(editing._id, payload);
        } else {
            await createSubService(payload);
        }
        return await loadCatalog();
    };

    const removeCategory = async (id: string): Promise<CatalogTreeNode[] | null> => {
        await deleteCategory(id);
        return await loadCatalog();
    };

    const removeService = async (id: string): Promise<CatalogTreeNode[] | null> => {
        await deleteService(id);
        return await loadCatalog();
    };

    const removeSubService = async (id: string): Promise<CatalogTreeNode[] | null> => {
        await deleteSubService(id);
        return await loadCatalog();
    };

    const toggleCategory = (id: string) => {
        setExpandedCategories((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleService = (id: string) => {
        setExpandedServices((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const reorderItem = async (type: "category"|"service"|"subService", ids: string[]): Promise<CatalogTreeNode[] | null> => {
        try {
            await reorderCatalog(type, ids);
            return await loadCatalog();
        } catch(err) {
            console.error("Reorder failed", err);
            throw err;
        }
    };

    return {
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
        searchQuery,
        searchResults,
        toggleCategory,
        toggleService,
        reorderItem,
        loadCatalog,
        handleSearch,
        saveCategory,
        saveService,
        saveSubService,
        removeCategory,
        removeService,
        removeSubService,
    };
}
