export interface SubServiceFiltersState {
    search: string;
    parentService: string; // 'all' or serviceId
    status: string; // 'all', 'active', 'inactive'
    priceType: string; // 'all', 'fixed', 'range'
}

export type SortConfig = {
    key: string;
    direction: 'asc' | 'desc';
} | null;
