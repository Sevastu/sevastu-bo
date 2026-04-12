export interface Category {
    _id: string;
    name: string;
    icon: string;
    isActive: boolean;
    createdAt: string;
}

export interface Service {
    _id: string;
    name: string;
    image: string;
    categoryId: string | Category;
    isActive: boolean;
    createdAt: string;
}

export interface SubService {
    _id: string;
    name: string;
    serviceId: string | Service;
    priceType: 'fixed' | 'range';
    basePrice: number;
    isActive: boolean;
    createdAt: string;
}
