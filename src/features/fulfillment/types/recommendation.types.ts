export enum RecommendationStatus {
  PENDING = 'PENDING',
  INTERESTED = 'INTERESTED',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  EXPIRED = 'EXPIRED',
}

export interface Recommendation {
  id: string;
  jobId: string;
  workerId: string;
  workerName?: string;
  workerRating?: number;
  score: number;
  distance?: number;
  availability?: string;
  availabilityStatus?: 'AVAILABLE_NOW' | 'AVAILABLE_SOON';
  availableInMinutes?: number;
  estimatedAvailableAt?: string;
  status: RecommendationStatus;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}
