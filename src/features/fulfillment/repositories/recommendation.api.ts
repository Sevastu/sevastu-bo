import apiClient from '@/lib/apiClient';
import { Recommendation } from '../types/recommendation.types';

export class RecommendationApi {
  async getRecommendations(jobId: string): Promise<Recommendation[]> {
    const { data } = await apiClient.get(`/jobs/${jobId}/recommendations`);
    const raw = data.data ? data.data : data;
    if (!Array.isArray(raw)) return [];
    return raw.map((item: any) => {
      const workerObj = typeof item.workerId === 'object' ? item.workerId : null;
      return {
        ...item,
        id: item.id || item._id,
        workerId: workerObj ? (workerObj._id || workerObj.id) : item.workerId,
        workerName: item.workerName || workerObj?.name || (item.workerId ? `Worker #${item.workerId.toString().slice(-4)}` : 'Worker'),
      };
    });
  }

  async generateRecommendations(jobId: string): Promise<Recommendation[]> {
    const { data } = await apiClient.post(`/jobs/${jobId}/recommend`);
    const raw = data.data ? data.data : data;
    if (!Array.isArray(raw)) return [];
    return raw.map((item: any) => ({
      ...item,
      id: item.id || item._id,
    }));
  }

  async acceptRecommendation(jobId: string, recommendationId: string): Promise<Recommendation> {
    const { data } = await apiClient.post(`/worker/recommendations/${recommendationId}/accept`);
    return data.data ? data.data : data;
  }

  async declineRecommendation(jobId: string, recommendationId: string): Promise<Recommendation> {
    const { data } = await apiClient.post(`/worker/recommendations/${recommendationId}/decline`);
    return data.data ? data.data : data;
  }
}

export const recommendationApi = new RecommendationApi();
