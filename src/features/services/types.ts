export interface Category {
    _id: string;
    name: string;
    iconKey?: string;
    iconUrl?: string;
    description?: string;
    isActive: boolean;
    isDeleted: boolean;
    order: number;
    createdAt: string;
}

export interface Service {
    _id: string;
    name: string;
    imageKey?: string;
    imageUrl?: string;
    description?: string;
    categoryId: string | Category;
    categoryName?: string;
    icon?: string;
    slug?: string;
    subServiceCount?: number;
    activeWorkerCount?: number;
    isActive: boolean;
    isDeleted: boolean;
    order: number;
    createdAt: string;
    updatedAt?: string;
}

export interface SubService {
    _id: string;
    name: string;
    slug?: string;
    shortDescription?: string;
    description?: string;
    serviceId: string | Service;
    priceType: 'fixed' | 'range';
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
    isDeleted: boolean;
    order: number;
    createdAt: string;
}

export type CatalogEntityType = 'category' | 'service' | 'subService';

export interface CategoryFormValues {
    name: string;
    description: string;
    iconUrl?: string;
    isActive: boolean;
}

export interface ServiceFormValues {
    categoryId: string;
    name: string;
    description: string;
    isActive: boolean;
    imageUrl?: string;
}

export interface SubServiceFormValues {
    serviceId: string;
    name: string;
    slug?: string;
    shortDescription?: string;
    description: string;
    isActive: boolean;
    basePrice: number;
    priceType: 'fixed' | 'range';
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
}

export interface CatalogTreeCategory {
    category: Category;
    services: CatalogTreeService[];
}

export interface CatalogTreeService {
    service: Service;
    subServices: SubService[];
}
