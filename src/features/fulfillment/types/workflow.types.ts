export enum PolicyType {
  CANCELLATION = 'CANCELLATION',
  ELIGIBILITY = 'ELIGIBILITY',
  PRICING = 'PRICING',
  REFUND = 'REFUND',
  ASSIGNMENT = 'ASSIGNMENT',
}

export interface WorkflowPolicy {
  id: string;
  type: PolicyType;
  name: string;
  description: string;
  config: Record<string, any>;
  isActive: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}