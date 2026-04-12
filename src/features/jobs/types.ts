export enum JobStatus {
    OPEN = 'open',
    ASSIGNED = 'assigned',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

export interface JobHistory {
    status: JobStatus;
    timestamp: string;
    context?: string;
}

export interface Job {
    id: string;
    customerId: string;
    workerId: string;
    service: string;
    subService: string;
    scheduledAt: string;
    address: string;
    latitude?: number;
    longitude?: number;
    price: number;
    status: JobStatus;
    history: JobHistory[];
    createdAt: string;
    updatedAt: string;
}

export interface JobFilters {
    status?: JobStatus | 'all';
    serviceName?: string | 'all';
    startDate?: string;
    endDate?: string;
    search?: string;
}

export interface MatchedWorker {
    userId: string;
    name: string;
    distance: string;
    successRate: string;
    experience: number;
    totalJobs: number;
    matchingScore: number;
    scoreBreakdown?: {
        distance: string;
        performance: string;
        experience: string;
        volume: string;
    };
}
