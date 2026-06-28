import { WorkerProfileStatus } from "@/lib/enums";

// Base type that matches the API response
export interface ReviewWorkerDetails {
    _id: string;
    userId: string;
    name?: string;
    phone?: string;
    email?: string;
    age?: number;
    gender?: string;
    address?: string;
    city?: string;
    state?: string;
    experience?: string;
    rating?: number;
    travelDistance?: number;
    availability?: boolean;
    skills?: string[];
    createdAt?: string;
    updatedAt?: string;
    completedJobs?: number;
    verificationStatus?: string;
    photoUrl?: string;
    idProof?: {
        frontKey?: string;
        backKey?: string;
        uploadedAt?: string;
    };
}

export interface ReviewWorkerKyc {
    _id?: string;
    documentType?: string;
    frontImage?: string;
    backImage?: string;
    status?: string;
    rejectionReason?: string;
    lastUpdated?: string;
    panProof?: {
        key?: string;
    };
    experienceProof?: {
        key?: string;
    };
}

export interface ReviewWorkerOcr {
    _id?: string;
    status?: string;
    aadhaarLast4?: string;
    confidence?: number;
    extractedName?: string;
    extractedDob?: string;
    extractedAddress?: string;
    nameMatch?: boolean;
    nameMatchScore?: number;
    idProofAnalysis?: any;
    panAnalysis?: any;
    createdAt?: string;
    updatedAt?: string;
}
