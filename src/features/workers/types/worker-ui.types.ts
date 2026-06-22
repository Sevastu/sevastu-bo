import { WorkerProfileStatus } from "@/lib/enums";

export interface WorkerUI {
    id?: string;
    userId?: string;
    name?: string;
    email?: string;
    photoUrl?: string;
    skills?: string[];
    city?: string;
    state?: string;
    profileStatus?: WorkerProfileStatus | string;
    rating?: number;
    averageRating?: number;
    reviewsAverage?: number;
    isAvailable?: boolean;
    createdAt?: string;
    joinedAt?: string;
    lastActiveAt?: string;
    [key: string]: any; // fallback for unmapped properties
}
