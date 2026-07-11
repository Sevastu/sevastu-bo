export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: PaginationParams;
  message?: string;
}

export interface DateRange {
  startDate?: string;
  endDate?: string;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
