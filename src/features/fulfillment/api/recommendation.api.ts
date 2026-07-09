import apiClient from '@/lib/apiClient';
import { Recommendation } from '../types/recommendation.types';

export class RecommendationApi {
  async getRecommendations(jobId: string): Promise<Recommendation[]> {
    const res = await apiClient.get<Recommendation[]>(`/admin/jobs/${jobId}/recommendations`);
    return res.data;
  }

  // TODO: Backend endpoint /recommendations/{id} not implemented
  // async getRecommendation(recommendationId: string): Promise<Recommendation> {
  //   const res = await apiClient.get<Recommendation>(`/recommendations/${recommendationId}`);
  //   return res.data;
  // }

  async acceptRecommendation(jobId: string, recommendationId: string): Promise<Recommendation> {
    const res = await apiClient.post<Recommendation>(`/admin/jobs/${jobId}/recommendations/${recommendationId}/accept`);
    return res.data;
  }

  async declineRecommendation(jobId: string, recommendationId: string): Promise<Recommendation> {
    const res = await apiClient.post<Recommendation>(`/admin/jobs/${jobId}/recommendations/${recommendationId}/decline`);
    return res.data;
  }

  // TODO: Backend endpoint /recommendations not implemented
  // async getWorkerRecommendations(params?: { workerId?: string; status?: string; page?: number; limit?: number }): Promise<WorkerRecommendationListResponse> {
  //   const res = await apiClient.get<WorkerRecommendationListResponse>('/recommendations', { params });
  //   return res.data;
  // }
}