import React, { useState, useMemo } from 'react';
import { 
  X, 
  User, 
  Star, 
  Map, 
  Award, 
  CheckCircle,
  Clock,
  Phone,
  Mail,
  AlertTriangle,
  Briefcase,
  Calendar,
  CheckSquare
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workerAvailabilityRepository } from '@/features/fulfillment/repositories/worker-availability.repository';
import { AssignmentRepository} from '@/features/fulfillment/repositories/assignment.repository';
import { WorkerAvailabilityProfile, WorkerAvailabilityStatus } from '@/features/fulfillment/types/worker-availability.types';
import { workerAvailabilityKeys, assignmentKeys, jobKeys, timelineKeys } from '@/features/fulfillment/api/queryKeys';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WorkerAssignmentPanelProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
}

type SortStrategy = 'RECOMMENDATION' | 'AVAILABILITY' | 'LEAST_BUSY' | 'RATING' | 'NEAREST' | 'EXPERIENCE';

const WorkerCard: React.FC<{ 
  worker: WorkerAvailabilityProfile; 
  isBest: boolean; 
  onSelect: () => void; 
  isAssigning: boolean;
}> = ({ worker, isBest, onSelect, isAssigning }) => {
  const getStatusConfig = (status: WorkerAvailabilityStatus) => {
    switch (status) {
      case WorkerAvailabilityStatus.AVAILABLE:
        return { color: 'text-green-600 bg-green-50 border-green-200', label: '🟢 Available' };
      case WorkerAvailabilityStatus.BUSY:
        return { color: 'text-amber-600 bg-amber-50 border-amber-200', label: '🟡 Busy' };
      case WorkerAvailabilityStatus.ON_LEAVE:
        return { color: 'text-red-600 bg-red-50 border-red-200', label: '🔴 On Leave' };
      case WorkerAvailabilityStatus.BLOCKED:
        return { color: 'text-slate-600 bg-slate-50 border-slate-200', label: '⚫ Blocked' };
    }
  };

  const statusConfig = getStatusConfig(worker.status);
  const hasConflicts = worker.conflicts.length > 0;

  return (
    <div className={`border rounded-lg p-4 transition-all ${
      isBest ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 hover:border-gray-300'
    } ${hasConflicts ? 'opacity-80' : ''}`}>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white border border-gray-200 shadow-sm rounded-full flex items-center justify-center">
            <User size={24} className="text-gray-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="font-semibold text-gray-900 text-lg">{worker.name}</div>
              {isBest && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-none px-1.5 py-0">
                  Best Match
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600 mt-0.5">
              <span className="flex items-center gap-1 font-medium"><Star size={14} className="text-amber-500 fill-amber-500" /> {worker.rating}</span>
              <span className="flex items-center gap-1"><Map size={14} /> {worker.distance}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Badge variant="outline" className={`font-medium ${statusConfig.color}`}>
            {statusConfig.label}
          </Badge>
          {worker.statusDetail && (
            <span className="text-xs text-gray-500 font-medium">{worker.statusDetail}</span>
          )}
        </div>
      </div>

      {/* Workload Indicators & Quick Insights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 bg-white/50 rounded-md p-3 text-sm">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 flex items-center gap-1"><Briefcase size={12}/> Jobs Today</span>
          <span className="font-semibold text-gray-900">{worker.workload.jobsToday} <span className="text-xs font-normal text-gray-500">({worker.workload.activeJobs} Active)</span></span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 flex items-center gap-1"><CheckSquare size={12}/> Acceptance</span>
          <span className="font-semibold text-gray-900">{worker.workload.acceptanceRate}%</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 flex items-center gap-1"><Award size={12}/> Experience</span>
          <span className="font-semibold text-gray-900">{worker.experience}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 flex items-center gap-1"><Clock size={12}/> Avg. Response</span>
          <span className="font-semibold text-gray-900">{worker.workload.averageResponseTime}</span>
        </div>
      </div>

      {/* Next Available */}
      {worker.nextAvailableSlot && (
        <div className="flex items-center gap-2 mb-3 bg-blue-50/50 text-blue-800 text-sm px-3 py-2 rounded-md border border-blue-100">
          <Calendar size={14} className="text-blue-600" />
          <span className="font-medium">Next Available:</span>
          <span>{worker.nextAvailableSlot.label} • {worker.nextAvailableSlot.time}</span>
        </div>
      )}

      {/* Conflicts */}
      {hasConflicts && (
        <div className="mb-4 space-y-2">
          {worker.conflicts.map((conflict, idx) => (
            <div key={idx} className="bg-red-50 border border-red-200 rounded-md p-3 text-sm flex gap-3 items-start">
              <AlertTriangle size={16} className="text-red-600 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-red-800">{conflict.title}</div>
                <div className="text-red-600 mt-0.5 leading-relaxed">{conflict.reason}</div>
                {conflict.resolution && (
                  <div className="text-red-700 mt-1.5 font-medium text-xs bg-red-100/50 inline-block px-2 py-1 rounded">
                    Tip: {conflict.resolution}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action / Contact */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
        <div className="flex gap-4 text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1.5 hover:text-gray-900 cursor-pointer"><Phone size={14} /> {worker.phone}</span>
          <span className="flex items-center gap-1.5 hover:text-gray-900 cursor-pointer"><Mail size={14} /> Email</span>
        </div>
        <Button 
          onClick={onSelect} 
          disabled={hasConflicts || isAssigning}
          variant={hasConflicts ? 'secondary' : 'default'}
          className={hasConflicts ? 'opacity-50' : ''}
        >
          {isAssigning ? 'Assigning...' : 'Assign Worker'}
        </Button>
      </div>
    </div>
  );
};

export default function WorkerAssignmentPanel({ isOpen, onClose, jobId }: WorkerAssignmentPanelProps) {
  const [sortStrategy, setSortStrategy] = useState<SortStrategy>('RECOMMENDATION');
  const queryClient = useQueryClient();
  const assignmentRepository = new AssignmentRepository();

  const { data: workersResponse, isLoading, isError } = useQuery({
    queryKey: workerAvailabilityKeys.list(jobId),
    queryFn: () => workerAvailabilityRepository.getAvailableWorkersForJob(jobId),
    enabled: isOpen,
  });

  const assignMutation = useMutation({
    mutationFn: (workerId: string) => assignmentRepository.assignWorker(jobId, workerId),
    onSuccess: () => {
      // Invalidate relevant queries automatically
      queryClient.invalidateQueries({ queryKey: workerAvailabilityKeys.all });
      queryClient.invalidateQueries({ queryKey: assignmentKeys.all });
      queryClient.invalidateQueries({ queryKey: jobKeys.all });
      queryClient.invalidateQueries({ queryKey: timelineKeys.all });
      onClose();
    }
  });

  const sortedWorkers = useMemo(() => {
    if (!workersResponse?.data) return [];
    
    const workers = [...workersResponse.data];
    
    // Status Weights: Available (4) > Busy (3) > Leave (2) > Blocked (1)
    const statusWeight = (s: WorkerAvailabilityStatus) => {
      switch(s) {
        case WorkerAvailabilityStatus.AVAILABLE: return 4;
        case WorkerAvailabilityStatus.BUSY: return 3;
        case WorkerAvailabilityStatus.ON_LEAVE: return 2;
        case WorkerAvailabilityStatus.BLOCKED: return 1;
        default: return 0;
      }
    };

    return workers.sort((a, b) => {
      // 1. Primary Sort by Status ALWAYS
      const weightDiff = statusWeight(b.status) - statusWeight(a.status);
      if (weightDiff !== 0) return weightDiff;

      // 2. Secondary Sort by Strategy
      switch (sortStrategy) {
        case 'RECOMMENDATION':
          return b.recommendationScore - a.recommendationScore;
        case 'LEAST_BUSY':
          return a.workload.activeJobs - b.workload.activeJobs;
        case 'RATING':
          return b.rating - a.rating;
        case 'NEAREST':
          return parseFloat(a.distance) - parseFloat(b.distance);
        case 'EXPERIENCE':
          return parseInt(b.experience) - parseInt(a.experience);
        default:
          return b.recommendationScore - a.recommendationScore;
      }
    });
  }, [workersResponse, sortStrategy]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="relative w-full max-w-2xl h-full bg-slate-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-6 bg-white border-b sticky top-0 z-10 shadow-sm">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Assign Worker</h2>
            <p className="text-sm text-gray-500 mt-1">Live Operations View • Select best available worker</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            
            {/* Toolbar */}
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-gray-700">
                {isLoading ? 'Searching...' : `${sortedWorkers.length} workers found`}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 font-medium">Sort by:</span>
                <Select value={sortStrategy} onValueChange={(v) => setSortStrategy(v as SortStrategy)}>
                  <SelectTrigger className="w-[180px] bg-white h-9 text-sm">
                    <SelectValue placeholder="Sort strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RECOMMENDATION">Recommendation Score</SelectItem>
                    <SelectItem value="LEAST_BUSY">Least Busy</SelectItem>
                    <SelectItem value="RATING">Highest Rated</SelectItem>
                    <SelectItem value="NEAREST">Nearest Distance</SelectItem>
                    <SelectItem value="EXPERIENCE">Most Experienced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* List */}
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-48 bg-white/60 animate-pulse rounded-lg border border-gray-100" />
                ))}
              </div>
            ) : isError ? (
              <div className="p-8 text-center bg-red-50 rounded-lg border border-red-100 text-red-600">
                <AlertTriangle className="w-10 h-10 mx-auto mb-3 opacity-80" />
                <h3 className="font-semibold text-lg">Failed to load availability</h3>
                <p className="text-sm mt-1 opacity-80">Please check your connection and try again.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedWorkers.map((worker, index) => (
                  <WorkerCard 
                    key={worker.id}
                    worker={worker}
                    isBest={index === 0 && worker.status === WorkerAvailabilityStatus.AVAILABLE}
                    onSelect={() => assignMutation.mutate(worker.id)}
                    isAssigning={assignMutation.isPending && assignMutation.variables === worker.id}
                  />
                ))}
                {sortedWorkers.length === 0 && (
                  <div className="text-center p-8 text-gray-500 bg-white rounded-lg border border-gray-200">
                    No workers available for this job right now.
                  </div>
                )}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
