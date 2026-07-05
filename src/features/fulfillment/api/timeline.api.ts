import apiClient from '@/lib/apiClient';
import { TimelineEvent, TimelineResponse } from '../types/timeline.types';

export class TimelineApi {
  async getTimeline(jobId: string): Promise<TimelineEvent[]> {
    const res = await apiClient.get<TimelineEvent[]>(`/jobs/${jobId}/timeline`);
    return res.data;
  }

  async getTimelineByPage(
    jobId: string,
    params?: { page?: number; limit?: number; sort?: string; order?: 'asc' | 'desc' }
  ): Promise<TimelineResponse> {
    const res = await apiClient.get<TimelineResponse>(`/jobs/${jobId}/timeline`, { params });
    return res.data;
  }
}