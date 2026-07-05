import { JobStatus } from "@/features/fulfillment/types/job.types";
import { AssignmentStatus } from "@/features/fulfillment/types/assignment.types";
import { ScheduleStatus } from "@/features/fulfillment/types/schedule.types";
import { RecommendationStatus } from "@/features/fulfillment/types/recommendation.types";

// Job status colors
export const jobStatusColors: Record<JobStatus, string> = {
  [JobStatus.CREATED]: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  [JobStatus.MATCHING]: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  [JobStatus.WAITING_FOR_WORKERS]: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  [JobStatus.ASSIGNED]: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  [JobStatus.SCHEDULED]: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  [JobStatus.IN_PROGRESS]: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  [JobStatus.COMPLETED]: "bg-green-500/10 text-green-500 border-green-500/20",
  [JobStatus.CANCELLED]: "bg-red-500/10 text-red-500 border-red-500/20",
};

// Assignment status colors
export const assignmentStatusColors: Record<AssignmentStatus, string> = {
  [AssignmentStatus.ASSIGNED]: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  [AssignmentStatus.ACCEPTED]: "bg-green-500/10 text-green-500 border-green-500/20",
  [AssignmentStatus.IN_PROGRESS]: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  [AssignmentStatus.COMPLETED]: "bg-green-500/10 text-green-500 border-green-500/20",
  [AssignmentStatus.CANCELLED]: "bg-red-500/10 text-red-500 border-red-500/20",
};

// Schedule status colors
export const scheduleStatusColors: Record<ScheduleStatus, string> = {
  [ScheduleStatus.PENDING]: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  [ScheduleStatus.CONFIRMED]: "bg-green-500/10 text-green-500 border-green-500/20",
  [ScheduleStatus.RESCHEDULED]: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  [ScheduleStatus.CANCELLED]: "bg-red-500/10 text-red-500 border-red-500/20",
};

// Recommendation status colors
export const recommendationStatusColors: Record<RecommendationStatus, string> = {
  [RecommendationStatus.PENDING]: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  [RecommendationStatus.INTERESTED]: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  [RecommendationStatus.ACCEPTED]: "bg-green-500/10 text-green-500 border-green-500/20",
  [RecommendationStatus.DECLINED]: "bg-red-500/10 text-red-500 border-red-500/20",
  [RecommendationStatus.EXPIRED]: "bg-gray-500/10 text-gray-500 border-gray-500/20",
};

// Metrics colors
export const metricsColors = {
  pendingMatching: "bg-purple-500/10 text-purple-500",
  pendingAssignment: "bg-yellow-500/10 text-yellow-500",
  scheduledJobs: "bg-cyan-500/10 text-cyan-500",
  inProgressJobs: "bg-orange-500/10 text-orange-500",
  completedToday: "bg-green-500/10 text-green-500",
  cancelledToday: "bg-red-500/10 text-red-500",
};