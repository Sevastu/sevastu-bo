import apiClient from '@/lib/apiClient';
import { Schedule } from '../types/schedule.types';

export class ScheduleApi {
  // TODO: Backend endpoint /schedules not implemented
  // async getSchedules(params?: { jobId?: string; workerId?: string; status?: string; page?: number; limit?: number }): Promise<ScheduleListResponse> {
  //   const res = await apiClient.get<ScheduleListResponse>('/schedules', { params });
  //   return res.data;
  // }

  // TODO: Backend endpoint /schedules/{id} not implemented
  // async getSchedule(scheduleId: string): Promise<Schedule> {
  //   const res = await apiClient.get<Schedule>(`/schedules/${scheduleId}`);
  //   return res.data;
  // }

  async createSchedule(jobId: string, payload: { workerId: string; scheduledStart: string; scheduledEnd: string }): Promise<Schedule> {
    const res = await apiClient.post<Schedule>(`/jobs/${jobId}/schedule`, payload);
    return res.data;
  }

  // TODO: Backend endpoint PATCH /schedules/{id} not implemented
  // async updateSchedule(scheduleId: string, payload: { scheduledStart?: string; scheduledEnd?: string }): Promise<Schedule> {
  //   const res = await apiClient.patch<Schedule>(`/schedules/${scheduleId}`, payload);
  //   return res.data;
  // }

  async confirmSchedule(scheduleId: string): Promise<Schedule> {
    const res = await apiClient.post<Schedule>(`/schedules/${scheduleId}/confirm`);
    return res.data;
  }

  async reschedule(scheduleId: string, payload: { scheduledStart: string; scheduledEnd: string }): Promise<Schedule> {
    const res = await apiClient.post<Schedule>(`/schedules/${scheduleId}/reschedule`, payload);
    return res.data;
  }

  async cancelSchedule(scheduleId: string): Promise<Schedule> {
    const res = await apiClient.post<Schedule>(`/schedules/${scheduleId}/cancel`);
    return res.data;
  }

  // Backend endpoint: GET /jobs/:jobId/schedule
  async getScheduleByJob(jobId: string): Promise<Schedule> {
    const res = await apiClient.get<Schedule>(`/jobs/${jobId}/schedule`);
    return res.data;
  }

  // Backend endpoint: GET /workers/:workerId/schedules
  async getSchedulesByWorker(workerId: string): Promise<Schedule[]> {
    const res = await apiClient.get<Schedule[]>(`/workers/${workerId}/schedules`);
    return res.data;
  }
}