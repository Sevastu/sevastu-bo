export type TrendType = 'increase' | 'decrease' | 'neutral';

export interface KPIValue {
  value: number;
  formatted: string;
  trend: number; // percentage
  trendType: TrendType;
}

export interface GlobalKPIs {
  revenue: KPIValue;
  jobs: KPIValue;
  workers: KPIValue;
  customers: KPIValue;
  conversionRate: KPIValue;
  growth: KPIValue;
  cancellationRate: KPIValue;
  completionRate: KPIValue;
  averageRating: KPIValue;
}

export interface RevenueDataPoint {
  date: string;
  revenue: number;
  refunds: number;
  jobs: number;
}

export interface RevenueAnalytics {
  daily: RevenueDataPoint[];
  weekly: RevenueDataPoint[];
  monthly: RevenueDataPoint[];
  quarterly: RevenueDataPoint[];
  yearly: RevenueDataPoint[];
  totalRevenue: number;
  totalRefunds: number;
}

export interface JobAnalytics {
  created: number;
  assigned: number;
  scheduled: number;
  completed: number;
  cancelled: number;
  avgCompletionTime: number; // in minutes
  avgWaitingTime: number; // in minutes
  statusDistribution: Array<{ name: string; value: number }>;
}

export interface WorkforceAnalytics {
  available: number;
  busy: number;
  onLeave: number;
  blocked: number;
  acceptanceRate: number;
  completionRate: number;
  averageRating: number;
  utilizationRate: number;
  topPerformers: Array<{ id: string; name: string; jobsCompleted: number; rating: number }>;
}

export interface CustomerAnalytics {
  newCustomers: number;
  returningCustomers: number;
  retentionRate: number;
  avgOrderValue: number;
  lifetimeValue: number;
  acquisitionTrend: Array<{ date: string; new: number; returning: number }>;
}

export interface ServiceCategoryStat {
  categoryId: string;
  categoryName: string;
  jobsCount: number;
  revenue: number;
  cancellationRate: number;
  averageRating: number;
}

export interface ServiceAnalytics {
  topCategories: ServiceCategoryStat[];
  topServices: Array<{ name: string; count: number }>;
  topSubServices: Array<{ name: string; count: number }>;
  mostCancelled: Array<{ name: string; count: number }>;
  highestRated: Array<{ name: string; rating: number }>;
}

export interface RegionalData {
  region: string;
  city: string;
  jobsCount: number;
  activeWorkers: number;
  revenue: number;
  latitude: number;
  longitude: number;
}

export interface RegionalAnalytics {
  data: RegionalData[];
}

export interface TimelineDataPoint {
  hour: string;
  jobsCount: number;
  avgAssignmentDelay: number;
  avgSchedulingDelay: number;
  completionCount: number;
}

export interface TimelineAnalytics {
  hourly: TimelineDataPoint[];
}

export interface AutomationAnalytics {
  rulesTriggered: number;
  failures: number;
  avgExecutionTime: number; // in ms
  healthScore: number;
  recentEvents: Array<{ id: string; ruleName: string; status: 'success' | 'failure'; timestamp: string }>;
}

// Premium Features
export interface SLAStat {
  avgAssignmentTime: number;
  avgSchedulingTime: number;
  avgResolutionTime: number;
  slaBreaches: number;
  breachTrend: Array<{ date: string; breaches: number }>;
}

export interface Anomaly {
  id: string;
  type: 'cancellation_spike' | 'revenue_drop' | 'worker_shortage' | 'low_completion' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: string;
  metric: string;
  expectedValue: number;
  actualValue: number;
}

export interface ForecastDataPoint {
  date: string;
  expectedRevenue: number;
  expectedDemand: number;
  requiredWorkers: number;
}

export interface ExecutiveDashboardData {
  kpi: GlobalKPIs;
  revenue: RevenueAnalytics;
  jobs: JobAnalytics;
  workforce: WorkforceAnalytics;
  customers: CustomerAnalytics;
  services: ServiceAnalytics;
  regional: RegionalAnalytics;
  timeline: TimelineAnalytics;
  automation: AutomationAnalytics;
  sla: SLAStat;
  anomalies: Anomaly[];
  forecast: ForecastDataPoint[];
}

export interface AnalyticsFilter {
  dateRange: 'today' | '7d' | '30d' | '90d' | '1y' | 'all';
  startDate?: string;
  endDate?: string;
  regionId?: string;
  categoryId?: string;
  serviceId?: string;
}
