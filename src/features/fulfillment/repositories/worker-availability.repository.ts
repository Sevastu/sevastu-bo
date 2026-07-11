import apiClient from '@/lib/apiClient';
import { ApiResponse } from '@/types/common.types';
import { WorkerAvailabilityProfile, WorkerAvailabilityStatus } from '../types/worker-availability.types';

export class WorkerAvailabilityRepository {
  async getAvailableWorkersForJob(jobId: string, params?: Record<string, any>): Promise<ApiResponse<WorkerAvailabilityProfile[]>> {
    // In a real implementation, this would hit:
    // const { data } = await apiClient.get(`/jobs/${jobId}/available-workers`, { params });
    // return data;
    
    // MOCK IMPLEMENTATION matching the sophisticated requirements
    await new Promise(resolve => setTimeout(resolve, 800));

    const mockWorkers: WorkerAvailabilityProfile[] = [
      {
        id: 'wkr_001',
        name: 'Mike Wilson',
        rating: 4.8,
        experience: '5 years',
        distance: '2.3 km',
        status: WorkerAvailabilityStatus.AVAILABLE,
        recommendationScore: 95,
        workload: {
          jobsToday: 2,
          activeJobs: 0,
          completedToday: 2,
          upcomingJobs: 1,
          averageResponseTime: "15 mins",
          acceptanceRate: 98,
          completionRate: 99
        },
        nextAvailableSlot: { label: "Today", time: "4:30 PM" },
        conflicts: [],
        email: 'mike@example.com',
        phone: '+1 234 567 8900',
        recentlyActive: new Date().toISOString()
      },
      {
        id: 'wkr_002',
        name: 'Sarah Davis',
        rating: 4.9,
        experience: '7 years',
        distance: '3.1 km',
        status: WorkerAvailabilityStatus.BUSY,
        statusDetail: "2 Active Jobs",
        recommendationScore: 88,
        workload: {
          jobsToday: 5,
          activeJobs: 2,
          completedToday: 3,
          upcomingJobs: 2,
          averageResponseTime: "22 mins",
          acceptanceRate: 95,
          completionRate: 97
        },
        nextAvailableSlot: { label: "Tomorrow", time: "9:00 AM" },
        conflicts: [
          {
            type: 'ALREADY_ASSIGNED',
            title: 'Currently Busy',
            reason: 'Worker is currently assigned to 2 other active jobs.',
            resolution: 'Wait until they finish or assign someone else.'
          }
        ],
        email: 'sarah@example.com',
        phone: '+1 987 654 3210',
        recentlyActive: new Date(Date.now() - 3600000).toISOString()
      },
      {
        id: 'wkr_003',
        name: 'Tom Harris',
        rating: 4.6,
        experience: '3 years',
        distance: '1.8 km',
        status: WorkerAvailabilityStatus.ON_LEAVE,
        statusDetail: "Today - Tomorrow",
        recommendationScore: 75,
        workload: {
          jobsToday: 0,
          activeJobs: 0,
          completedToday: 0,
          upcomingJobs: 0,
          averageResponseTime: "45 mins",
          acceptanceRate: 92,
          completionRate: 94
        },
        conflicts: [
          {
            type: 'ON_LEAVE',
            title: 'On Leave',
            reason: 'Worker is on approved leave today and tomorrow.',
          }
        ],
        email: 'tom@example.com',
        phone: '+1 112 233 4455',
        recentlyActive: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: 'wkr_004',
        name: 'Alex Johnson',
        rating: 4.7,
        experience: '4 years',
        distance: '5.2 km',
        status: WorkerAvailabilityStatus.BLOCKED,
        statusDetail: "Blocked 10:00 AM - 2:00 PM",
        recommendationScore: 70,
        workload: {
          jobsToday: 1,
          activeJobs: 0,
          completedToday: 1,
          upcomingJobs: 3,
          averageResponseTime: "18 mins",
          acceptanceRate: 90,
          completionRate: 95
        },
        nextAvailableSlot: { label: "Today", time: "2:30 PM" },
        conflicts: [
          {
            type: 'SCHEDULE_CONFLICT',
            title: 'Schedule Conflict',
            reason: 'Job overlaps with a blocked slot in the worker\'s schedule.',
          }
        ],
        email: 'alex@example.com',
        phone: '+1 555 444 3333',
        recentlyActive: new Date(Date.now() - 1800000).toISOString()
      }
    ];

    return {
      data: mockWorkers,
      message: 'Success',
      success: true
    };
  }
}

export const workerAvailabilityRepository = new WorkerAvailabilityRepository();
