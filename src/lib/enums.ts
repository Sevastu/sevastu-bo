export enum UserRole {
    ADMIN = 'admin',
    STAFF = 'staff',
    WORKER = 'worker',
    CUSTOMER = 'customer',
}

export enum UserStatus {
    ACTIVE = 'active',
    BLOCKED = 'blocked',
}

export enum WorkerProfileStatus {
    DRAFT = 'draft',
    KYC_PENDING = 'kyc_pending',
    UNDER_REVIEW = 'under_review',
    VERIFIED = 'verified',
    REJECTED = 'rejected',
}

export enum KycStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    REJECTED = 'rejected',
}
