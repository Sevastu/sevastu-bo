import apiClient from '@/lib/apiClient';
import { ApiResponse } from '@/types/common.types';

export class AvailabilityRepository {
  async getAvailability(workerId: string, params?: Record<string, any>): Promise<ApiResponse<any>> {
    const { data } = await apiClient.get(`/workers/${workerId}/availability`, { params });
    return data;
  }

  async setWorkingHours(workerId: string, payload: { start: Date; end: Date; isRecurring?: boolean; recurringDays?: string[] }): Promise<ApiResponse<any>> {
    const { data } = await apiClient.post(`/workers/${workerId}/availability/working-hours`, payload);
    return data;
  }

  async blockSlot(workerId: string, payload: { start: Date; end: Date }): Promise<ApiResponse<any>> {
    const { data } = await apiClient.post(`/workers/${workerId}/availability/block-slot`, payload);
    return data;
  }

  async setLeave(workerId: string, payload: { start: Date; end: Date }): Promise<ApiResponse<any>> {
    const { data } = await apiClient.post(`/workers/${workerId}/availability/leave`, payload);
    return data;
  }

  async deleteAvailability(id: string): Promise<ApiResponse<any>> {
    const { data } = await apiClient.delete(`/workers/availability/${id}`);
    return data;
  }
}

export const availabilityRepository = new AvailabilityRepository();
