import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Circle, Clock, XCircle } from 'lucide-react';

const WORKFLOW_STAGES = [
  'CREATED',
  'MATCHING',
  'WAITING_FOR_WORKERS',
  'ASSIGNED',
  'SCHEDULED',
  'IN_PROGRESS',
  'COMPLETED'
];

interface WorkflowProgressProps {
  currentStatus?: string;
  isLoading: boolean;
}

export const WorkflowProgress: React.FC<WorkflowProgressProps> = ({ currentStatus = 'CREATED', isLoading }) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between animate-pulse">
            {[1, 2, 3, 4, 5, 6, 7].map(i => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const isCancelled = currentStatus === 'CANCELLED';
  const currentIndex = isCancelled ? -1 : WORKFLOW_STAGES.indexOf(currentStatus);

  return (
    <Card className="overflow-hidden border-t-4 border-t-indigo-600">
      <CardContent className="p-8">
        <div className="relative flex justify-between items-center w-full max-w-5xl mx-auto">
          
          {/* Connecting Line */}
          <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 -z-10 px-8">
            <div 
              className="h-full bg-indigo-500 transition-all duration-500 ease-in-out"
              style={{ width: isCancelled ? '0%' : `${(Math.max(0, currentIndex) / (WORKFLOW_STAGES.length - 1)) * 100}%` }}
            />
          </div>

          {WORKFLOW_STAGES.map((stage, index) => {
            let status = 'pending';
            if (isCancelled) {
              status = 'cancelled';
            } else if (index < currentIndex) {
              status = 'completed';
            } else if (index === currentIndex) {
              status = 'current';
            }

            return (
              <div key={stage} className="flex flex-col items-center gap-3 bg-white px-2">
                
                {/* Node Icon */}
                <div className={`
                  flex items-center justify-center w-9 h-9 rounded-full border-2 bg-white transition-colors
                  ${status === 'completed' ? 'border-indigo-600 text-indigo-600' : 
                    status === 'current' ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-4 ring-indigo-100' : 
                    status === 'cancelled' ? 'border-red-300 text-red-300' :
                    'border-gray-300 text-gray-300'}
                `}>
                  {status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : 
                   status === 'current' ? <Clock className="w-5 h-5" /> : 
                   status === 'cancelled' ? <XCircle className="w-5 h-5" /> :
                   <Circle className="w-3 h-3 fill-current" />}
                </div>

                {/* Node Label */}
                <span className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-center w-20
                  ${status === 'completed' ? 'text-gray-900' : 
                    status === 'current' ? 'text-indigo-700 font-bold' : 
                    status === 'cancelled' ? 'text-red-400' :
                    'text-gray-400'}
                `}>
                  {stage.replace(/_/g, ' ')}
                </span>
                
              </div>
            );
          })}
        </div>

        {isCancelled && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center gap-3 text-red-800 font-medium">
            <XCircle className="w-5 h-5" />
            This workflow was cancelled. Processing has been halted.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
