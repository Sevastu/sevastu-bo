export interface TimelineEvent {
  id: string;
  jobId: string;
  event: string;
  actorId?: string;
  actorType?: string;
  description?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface TimelineResponse {
  data: TimelineEvent[];
  pagination: {
    total: number;
    page?: number;
    limit?: number;
  };
}
