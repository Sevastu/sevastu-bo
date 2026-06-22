import { ReviewWorkerDetails } from "../types/workerReview.types";

export function formatWorkerValue(value: any, fallback = '—'): string {
    if (value === undefined || value === null || value === '') {
        return fallback;
    }
    return String(value);
}

export function formatBoolean(value: boolean | undefined): string {
    if (value === undefined) return '—';
    return value ? 'Yes' : 'No';
}

export function formatAddress(city?: string, state?: string, address?: string): string {
    const parts = [address, city, state].filter(Boolean);
    if (parts.length === 0) return '—';
    return parts.join(', ');
}
