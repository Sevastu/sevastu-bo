import apiClient from '@/lib/apiClient';
import { Recommendation } from '../types/recommendation.types';

export class RecommendationApi {
  async getRecommendations(jobId: string): Promise<Recommendation[]> {
    const { data } = await apiClient.get(`/jobs/${jobId}/recommendations`);
    // Assuming backend returns an array directly, but sometimes wrapped in { data }
    return data.data ? data.data : data;
  }

  async acceptRecommendation(jobId: string, recommendationId: string): Promise<Recommendation> {
    // According to the recommendation.controller.ts, the endpoint is /worker/recommendations/:id/accept
    const { data } = await apiClient.post(`/worker/recommendations/${recommendationId}/accept`);
    return data.data ? data.data : data;
  }

  async declineRecommendation(jobId: string, recommendationId: string): Promise<Recommendation> {
    const { data } = await apiClient.post(`/worker/recommendations/${recommendationId}/decline`);
    return data.data ? data.data : data;
  }
}
