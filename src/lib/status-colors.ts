import { JobStatus } from "@/features/fulfillment/types/job.types";
import { AssignmentStatus } from "@/features/fulfillment/types/assignment.types";
import { ScheduleStatus } from "@/features/fulfillment/types/schedule.types";
import { RecommendationStatus } from "@/features/fulfillment/types/recommendation.types";

// Job status colors
export const jobStatusColors: Record<JobStatus, string> = {
  [JobStatus.CREATED]: "bg-primary/10 text-primary border-primary/20",
  [JobStatus.MATCHING]: "bg-primary/10 text-primary border-primary/20",
  [JobStatus.WAITING_FOR_WORKERS]: "bg-warning/10 text-warning border-warning/20",
  [JobStatus.ASSIGNED]: "bg-primary/10 text-primary border-primary/20",
  [JobStatus.SCHEDULED]: "bg-primary/10 text-primary border-primary/20",
  [JobStatus.IN_PROGRESS]: "bg-warning/10 text-warning border-warning/20",
  [JobStatus.COMPLETED]: "bg-success/10 text-success border-success/20",
  [JobStatus.CANCELLED]: "bg-destructive/10 text-destructive border-destructive/20",
};

// Assignment status colors
export const assignmentStatusColors: Record<AssignmentStatus, string> = {
  [AssignmentStatus.ASSIGNED]: "bg-primary/10 text-primary border-primary/20",
  [AssignmentStatus.ACCEPTED]: "bg-success/10 text-success border-success/20",
  [AssignmentStatus.IN_PROGRESS]: "bg-warning/10 text-warning border-warning/20",
  [AssignmentStatus.COMPLETED]: "bg-success/10 text-success border-success/20",
  [AssignmentStatus.CANCELLED]: "bg-destructive/10 text-destructive border-destructive/20",
};

// Schedule status colors
export const scheduleStatusColors: Record<ScheduleStatus, string> = {
  [ScheduleStatus.PENDING]: "bg-primary/10 text-primary border-primary/20",
  [ScheduleStatus.CONFIRMED]: "bg-success/10 text-success border-success/20",
  [ScheduleStatus.RESCHEDULED]: "bg-warning/10 text-warning border-warning/20",
  [ScheduleStatus.CANCELLED]: "bg-destructive/10 text-destructive border-destructive/20",
};

// Recommendation status colors
export const recommendationStatusColors: Record<RecommendationStatus, string> = {
  [RecommendationStatus.PENDING]: "bg-primary/10 text-primary border-primary/20",
  [RecommendationStatus.INTERESTED]: "bg-primary/10 text-primary border-primary/20",
  [RecommendationStatus.ACCEPTED]: "bg-success/10 text-success border-success/20",
  [RecommendationStatus.DECLINED]: "bg-destructive/10 text-destructive border-destructive/20",
  [RecommendationStatus.EXPIRED]: "bg-muted/50 text-muted-foreground border-border",
};

// Metrics colors
export const metricsColors = {
  pendingMatching: "bg-primary/10 text-primary",
  pendingAssignment: "bg-warning/10 text-warning",
  scheduledJobs: "bg-primary/10 text-primary",
  inProgressJobs: "bg-warning/10 text-warning",
  completedToday: "bg-success/10 text-success",
  cancelledToday: "bg-destructive/10 text-destructive",
};