import React, { useState } from 'react';
import { 
  X, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Star,
  Map,
  Award,
  Briefcase
} from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge';
import { WorkerAssignmentPanel } from './WorkerAssignmentPanel';

interface Job {
  id: string;
  customer: string;
  service: string;
  status: 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  date: string;
  price: string;
  worker?: string;
  customerInfo?: {
    email: string;
    phone: string;
    address: string;
  };
  workerInfo?: {
    name: string;
    email: string;
    phone: string;
    rating: number;
    experience: string;
  };
}

interface JobDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

const timelineSteps = [
  { id: 'open', label: 'Open', icon: <AlertCircle size={16} /> },
  { id: 'assigned', label: 'Assigned', icon: <User size={16} /> },
  { id: 'in_progress', label: 'In Progress', icon: <Clock size={16} /> },
  { id: 'completed', label: 'Completed', icon: <CheckCircle size={16} /> },
];

export const JobDetailDrawer: React.FC<JobDetailDrawerProps> = ({ isOpen, onClose, job }) => {
  const [showAssignmentPanel, setShowAssignmentPanel] = useState(false);

  if (!job) return null;

  const getCurrentStepIndex = () => {
    const statusOrder = ['open', 'assigned', 'in_progress', 'completed'];
    return statusOrder.indexOf(job.status);
  };

  const currentStepIndex = getCurrentStepIndex();

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-[var(--color-overlay)] bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-2xl bg-[var(--color-card)] shadow-xl transform transition-transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
          <div>
            <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Job Details</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">{job.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-muted)] rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Job Info */}
          <div className="bg-[var(--color-muted)] rounded-lg p-4">
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Job Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium text-[var(--color-text-secondary)]">Service</div>
                <div className="font-medium text-[var(--color-text)]">{job.service}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--color-text-secondary)]">Price</div>
                <div className="font-medium text-[var(--color-text)]">{job.price}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--color-text-secondary)]">Date</div>
                <div className="font-medium text-[var(--color-text)]">{job.date}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--color-text-secondary)]">Status</div>
                <div className="font-medium text-[var(--color-text)]">
                  <StatusBadge status={job.status} />
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Timeline</h3>
            <div className="flex items-center justify-between">
              {timelineSteps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      index <= currentStepIndex
                        ? 'bg-[var(--color-primary)] text-white'
                        : 'bg-[var(--color-muted)] text-[var(--color-text-secondary)]'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-[var(--color-text)]">{step.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Info */}
          {job.customerInfo && (
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Customer Information</h3>
              <div className="bg-[var(--color-muted)] rounded-lg p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-[var(--color-muted)] rounded-full flex items-center justify-center">
                    <User size={24} className="text-[var(--color-text-secondary)]" />
                  </div>
                  <div>
                    <div className="font-medium text-[var(--color-text)]">{job.customer}</div>
                    <div className="text-sm text-[var(--color-text-secondary)]">Customer</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-[var(--color-text-secondary)]" />
                    <span className="text-sm text-[var(--color-text)]">{job.customerInfo?.email || 'customer@example.com'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone size={16} className="text-[var(--color-text-secondary)]" />
                    <span className="text-sm text-[var(--color-text)]">{job.customerInfo?.phone || '+1234567890'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin size={16} className="text-[var(--color-text-secondary)]" />
                    <span className="text-sm text-[var(--color-text)]">{job.customerInfo?.address || '123 Main St, City, State'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Worker Info */}
          {job.worker && (
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Worker Information</h3>
              <div className="bg-[var(--color-muted)] rounded-lg p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[var(--color-muted)] rounded-full flex items-center justify-center">
                      <User size={24} className="text-[var(--color-text-secondary)]" />
                    </div>
                    <div>
                      <div className="font-medium text-[var(--color-text)]">{job.worker}</div>
                      <div className="text-sm text-[var(--color-text-secondary)]">Service Provider</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Star size={16} className="text-[var(--color-warning)]" />
                    <span className="text-sm text-[var(--color-text-secondary)]">{job.workerInfo?.rating || 4.8}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-[var(--color-text-secondary)]">Rating</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail size={16} className="text-[var(--color-text-secondary)]" />
                    <span className="text-sm text-[var(--color-text)]">{job.workerInfo?.email || 'worker@example.com'}</span>
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)]">Email</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Worker Assignment Panel */}
          {job.status === 'open' && (
            <WorkerAssignmentPanel
              isOpen={showAssignmentPanel}
              onClose={() => setShowAssignmentPanel(false)}
              jobId={job.id}
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="border-t border-[var(--color-border)] p-6">
          <div className="flex gap-3">
            {job.status === 'open' && (
              <>
                <button
                  onClick={() => {
                    // TODO: Implement worker assignment logic
                    console.log('Assign worker to job:', job.id);
                  }}
                  className="flex-1 bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-primary)] transition-colors font-medium"
                >
                  Assign Worker
                </button>
                <button className="px-4 py-2 border border-[var(--color-border)] text-[var(--color-text)] rounded-lg hover:bg-[var(--color-muted)] transition-colors font-medium">
                  Cancel Job
                </button>
              </>
            )}
            {job.status === 'assigned' && (
              <button className="flex-1 bg-[var(--color-warning)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-warning)] transition-colors font-medium">
                Start Job
              </button>
            )}
            {job.status === 'in_progress' && (
              <button className="flex-1 bg-[var(--color-success)] text-white px-4 py-2 rounded-lg hover:bg-[var(--color-success)] transition-colors font-medium">
                Complete Job
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
