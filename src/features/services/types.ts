export interface Category {
    _id: string;
    name: string;
    icon: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
}

export interface Service {
    _id: string;
    name: string;
    image: string;
    description?: string;
    categoryId: string | Category;
    isActive: boolean;
    createdAt: string;
}

export interface SubService {
    _id: string;
    name: string;
    description?: string;
    serviceId: string | Service;
    priceType: 'fixed' | 'range';
    basePrice: number;
    isActive: boolean;
    createdAt: string;
}

export type CatalogEntityType = 'category' | 'service' | 'subService';

export interface CategoryFormValues {
    name: string;
    description: string;
    isActive: boolean;
}

export interface ServiceFormValues {
    categoryId: string;
    name: string;
    description: string;
    isActive: boolean;
}

export interface SubServiceFormValues {
    serviceId: string;
    name: string;
    description: string;
    isActive: boolean;
    basePrice: number;
    priceType: 'fixed' | 'range';
}

export interface CatalogTreeCategory {
    category: Category;
    services: CatalogTreeService[];
}

export interface CatalogTreeService {
    service: Service;
    subServices: SubService[];
}
