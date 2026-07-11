import React from 'react';
import SectionCard from '@/components/common/SectionCard';
import { EmptyState } from '@/components/common/StateViews';
import { Assignment } from '@/features/fulfillment/types/assignment.types';
import { User, Phone, Mail, Star, BadgeCheck } from 'lucide-react';

interface WorkerCardProps {
  assignment: Assignment | null;
}

export default function WorkerCard({ assignment }: WorkerCardProps) {
  if (!assignment || !assignment.workerId) {
    return (
      <SectionCard title="Assigned Worker">
        <EmptyState 
          title="No Worker Assigned" 
          description="A worker has not been assigned to this job yet." 
          icon={<User />} 
          className="min-h-[150px] py-4"
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Assigned Worker">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="h-16 w-16 rounded-full bg-blue-500/10 flex items-center justify-center flex-shrink-0 text-blue-500 relative">
          <User className="w-8 h-8" />
          <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
            <BadgeCheck className="w-5 h-5 text-blue-500" />
          </div>
        </div>
        <div className="space-y-3 flex-1 pt-1">
          <div>
            <h4 className="font-semibold text-lg">{assignment.workerId?.name || 'Unknown Worker'}</h4>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">ID: {assignment.workerId?._id}</p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span>{assignment.workerId?.phone || 'No phone'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span>{assignment.workerId?.email || 'No email'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span>4.8 (120+ jobs)</span>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
