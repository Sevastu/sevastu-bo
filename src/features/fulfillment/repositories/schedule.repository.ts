import apiClient from '@/lib/apiClient';
import { ApiResponse } from '@/types/common.types';
import { Schedule } from '@/features/fulfillment/types/schedule.types';

export class ScheduleRepository {
  async getScheduleByJob(jobId: string): Promise<ApiResponse<Schedule>> {
    const { data } = await apiClient.get(`/jobs/${jobId}/schedule`);
    return { data: data.data || data, success: true };
  }

  async createSchedule(jobId: string, payload: { workerId: string; scheduledStart: Date; scheduledEnd: Date }): Promise<ApiResponse<any>> {
    const { data } = await apiClient.post(`/jobs/${jobId}/schedule`, payload);
    return data;
  }

  async reschedule(scheduleId: string, payload: { scheduledStart: Date; scheduledEnd: Date }): Promise<ApiResponse<any>> {
    const { data } = await apiClient.post(`/jobs/schedules/${scheduleId}/reschedule`, payload);
    return data;
  }

  async confirmSchedule(scheduleId: string): Promise<ApiResponse<any>> {
    const { data } = await apiClient.post(`/jobs/schedules/${scheduleId}/confirm`);
    return data;
  }

  async cancelSchedule(scheduleId: string): Promise<ApiResponse<any>> {
    const { data } = await apiClient.post(`/jobs/schedules/${scheduleId}/cancel`);
    return data;
  }

  async setReplacementWorker(scheduleId: string, payload: { replacementWorkerId: string }): Promise<ApiResponse<any>> {
    const { data } = await apiClient.post(`/jobs/schedules/${scheduleId}/replacement`, payload);
    return data;
  }
}

export const scheduleRepository = new ScheduleRepository();
