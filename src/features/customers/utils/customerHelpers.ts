import { CustomerUI } from "../types/customer-ui.types";

export function getCustomerLocation(location: any): string {
    if (!location) return "—";
    if (typeof location === "string") return location;
    if (location.city && location.state) return `${location.city}, ${location.state}`;
    if (location.address) return location.address;
    if (location.coordinates && Array.isArray(location.coordinates) && location.coordinates.length >= 2) {
        // [longitude, latitude]
        return `${location.coordinates[1].toFixed(4)}, ${location.coordinates[0].toFixed(4)}`;
    }
    return "—";
}

export function formatCurrency(amount?: number): string {
    if (amount === undefined || amount === null) return "$0.00";
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}
