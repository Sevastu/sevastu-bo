export interface CustomerUI {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    location?: {
        coordinates?: [number, number]; // [longitude, latitude]
        address?: string;
        city?: string;
        state?: string;
    } | string;
    avatarUrl?: string;
    status: 'active' | 'inactive';
    joinedDate: string;
    totalOrders?: number;
    totalSpent?: number;
    lastActiveDate?: string;
}
