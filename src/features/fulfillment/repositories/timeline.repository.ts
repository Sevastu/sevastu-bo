import { ApiResponse } from '@/types/common.types';
import apiClient from '@/lib/apiClient';
import { PaginationParams } from '@/types/common.types';

export class TimelineRepository {
  async getTimeline(jobId: string, query?: PaginationParams & Record<string, any>): Promise<ApiResponse<any>> {
    const { data } = await apiClient.get(`/jobs/${jobId}/timeline`, { params: query });
    return { 
      data: data.data || data, 
      success: true,
      pagination: data.pagination
    };
  }
}

export const timelineRepository = new TimelineRepository();
