import axios from 'axios';
import { 
  GlobalKPIs, 
  RevenueAnalytics, 
  JobAnalytics, 
  WorkforceAnalytics, 
  CustomerAnalytics, 
  ServiceAnalytics, 
  RegionalAnalytics, 
  TimelineAnalytics, 
  AutomationAnalytics, 
  SLAStat, 
  Anomaly, 
  ForecastDataPoint,
  AnalyticsFilter
} from '../types/analytics.types';

// Mock interceptor configuration for development
// In a real scenario, this would be handled by MSW or the backend itself
const MOCK_API_DELAY = 800;

export class AnalyticsApi {
  private static baseURL = '/api/v1/analytics';

  private static async fetchWithMock<T>(url: string, params?: AnalyticsFilter): Promise<T> {
    try {
      // Attempt real API call
      const response = await axios.get<T>(url, { params });
      return response.data;
    } catch (error) {
      // Fallback to empty/mock data if endpoint doesn't exist
      console.warn(`[Analytics API] Endpoint ${url} not available. Returning default data.`);
      return this.getMockDataForEndpoint<T>(url);
    }
  }

  static async getGlobalKPIs(filter: AnalyticsFilter): Promise<GlobalKPIs> {
    return this.fetchWithMock<GlobalKPIs>(`${this.baseURL}/kpi`, filter);
  }

  static async getRevenueAnalytics(filter: AnalyticsFilter): Promise<RevenueAnalytics> {
    return this.fetchWithMock<RevenueAnalytics>(`${this.baseURL}/revenue`, filter);
  }

  static async getJobAnalytics(filter: AnalyticsFilter): Promise<JobAnalytics> {
    return this.fetchWithMock<JobAnalytics>(`${this.baseURL}/jobs`, filter);
  }

  static async getWorkforceAnalytics(filter: AnalyticsFilter): Promise<WorkforceAnalytics> {
    return this.fetchWithMock<WorkforceAnalytics>(`${this.baseURL}/workforce`, filter);
  }

  static async getCustomerAnalytics(filter: AnalyticsFilter): Promise<CustomerAnalytics> {
    return this.fetchWithMock<CustomerAnalytics>(`${this.baseURL}/customers`, filter);
  }

  static async getServiceAnalytics(filter: AnalyticsFilter): Promise<ServiceAnalytics> {
    return this.fetchWithMock<ServiceAnalytics>(`${this.baseURL}/services`, filter);
  }

  static async getRegionalAnalytics(filter: AnalyticsFilter): Promise<RegionalAnalytics> {
    return this.fetchWithMock<RegionalAnalytics>(`${this.baseURL}/regional`, filter);
  }

  static async getTimelineAnalytics(filter: AnalyticsFilter): Promise<TimelineAnalytics> {
    return this.fetchWithMock<TimelineAnalytics>(`${this.baseURL}/timeline`, filter);
  }

  static async getAutomationAnalytics(filter: AnalyticsFilter): Promise<AutomationAnalytics> {
    return this.fetchWithMock<AutomationAnalytics>(`${this.baseURL}/automation`, filter);
  }

  static async getSLAMetrics(filter: AnalyticsFilter): Promise<SLAStat> {
    return this.fetchWithMock<SLAStat>(`${this.baseURL}/sla`, filter);
  }

  static async getAnomalies(filter: AnalyticsFilter): Promise<Anomaly[]> {
    return this.fetchWithMock<Anomaly[]>(`${this.baseURL}/anomalies`, filter);
  }

  static async getForecast(filter: AnalyticsFilter): Promise<ForecastDataPoint[]> {
    return this.fetchWithMock<ForecastDataPoint[]>(`${this.baseURL}/forecast`, filter);
  }

  // --- MOCK DATA GENERATOR ---
  private static getMockDataForEndpoint<T>(url: string): T {
    if (url.includes('/kpi')) {
      return {
        revenue: { value: 125430, formatted: '$125,430', trend: 18, trendType: 'increase' },
        jobs: { value: 2456, formatted: '2,456', trend: 8, trendType: 'increase' },
        workers: { value: 342, formatted: '342', trend: 5, trendType: 'increase' },
        customers: { value: 8234, formatted: '8,234', trend: 12, trendType: 'increase' },
        conversionRate: { value: 4.2, formatted: '4.2%', trend: -0.5, trendType: 'decrease' },
        growth: { value: 22, formatted: '22%', trend: 4, trendType: 'increase' },
        cancellationRate: { value: 2.1, formatted: '2.1%', trend: -0.2, trendType: 'decrease' },
        completionRate: { value: 94.5, formatted: '94.5%', trend: 1.2, trendType: 'increase' },
        averageRating: { value: 4.8, formatted: '4.8', trend: 0.1, trendType: 'increase' },
      } as any;
    }
    if (url.includes('/revenue')) {
      return {
        daily: [],
        weekly: [],
        monthly: [
          { date: 'Jan', revenue: 12000, refunds: 400, jobs: 180 },
          { date: 'Feb', revenue: 15000, refunds: 500, jobs: 220 },
          { date: 'Mar', revenue: 18000, refunds: 300, jobs: 280 },
          { date: 'Apr', revenue: 16000, refunds: 800, jobs: 250 },
          { date: 'May', revenue: 22000, refunds: 200, jobs: 320 },
          { date: 'Jun', revenue: 25000, refunds: 600, jobs: 380 },
        ],
        quarterly: [],
        yearly: [],
        totalRevenue: 108000,
        totalRefunds: 2800
      } as any;
    }
    if (url.includes('/jobs')) {
      return {
        created: 3500, assigned: 3400, scheduled: 3200, completed: 3100, cancelled: 100,
        avgCompletionTime: 120, avgWaitingTime: 45,
        statusDistribution: [
          { name: 'Completed', value: 3100 },
          { name: 'In Progress', value: 300 },
          { name: 'Cancelled', value: 100 }
        ]
      } as any;
    }
    if (url.includes('/workforce')) {
      return {
        available: 145, busy: 180, onLeave: 12, blocked: 5,
        acceptanceRate: 92, completionRate: 96, averageRating: 4.8, utilizationRate: 85,
        topPerformers: [
          { id: '1', name: 'Mike Wilson', jobsCompleted: 45, rating: 4.9 },
          { id: '2', name: 'Sarah Davis', jobsCompleted: 42, rating: 4.8 }
        ]
      } as any;
    }
    if (url.includes('/customers')) {
      return {
        newCustomers: 450, returningCustomers: 1200, retentionRate: 72, avgOrderValue: 85, lifetimeValue: 450,
        acquisitionTrend: [
          { date: 'Mon', new: 20, returning: 50 },
          { date: 'Tue', new: 25, returning: 60 },
          { date: 'Wed', new: 30, returning: 55 }
        ]
      } as any;
    }
    if (url.includes('/services')) {
      return {
        topCategories: [
          { categoryId: '1', categoryName: 'Home Cleaning', jobsCount: 450, revenue: 22000, cancellationRate: 2, averageRating: 4.7 },
          { categoryId: '2', categoryName: 'Plumbing', jobsCount: 280, revenue: 35000, cancellationRate: 3, averageRating: 4.6 }
        ],
        topServices: [], topSubServices: [], mostCancelled: [], highestRated: []
      } as any;
    }
    if (url.includes('/regional')) {
      return { data: [] } as any;
    }
    if (url.includes('/timeline')) {
      return { hourly: [] } as any;
    }
    if (url.includes('/automation')) {
      return { rulesTriggered: 15420, failures: 23, avgExecutionTime: 45, healthScore: 99.8, recentEvents: [] } as any;
    }
    if (url.includes('/sla')) {
      return { avgAssignmentTime: 12, avgSchedulingTime: 45, avgResolutionTime: 180, slaBreaches: 14, breachTrend: [] } as any;
    }
    if (url.includes('/anomalies')) {
      return [
        { id: '1', type: 'revenue_drop', severity: 'high', description: 'Unusual 15% drop in daily revenue in Mumbai region', timestamp: new Date().toISOString(), metric: 'revenue', expectedValue: 5000, actualValue: 4250 }
      ] as any;
    }
    if (url.includes('/forecast')) {
      return [
        { date: 'Next Mon', expectedRevenue: 15000, expectedDemand: 250, requiredWorkers: 80 }
      ] as any;
    }
    
    return {} as any;
  }
}
