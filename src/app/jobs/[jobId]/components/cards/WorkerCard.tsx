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

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: assignment.workerId?.phone || 'No phone' },
    { icon: Mail, label: 'Email', value: assignment.workerId?.email || 'No email' },
  ];

  return (
    <SectionCard title="Assigned Worker">
      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 flex items-center justify-center flex-shrink-0 text-blue-500 border border-blue-500/20 shadow-sm relative">
          <User className="w-10 h-10" />
          <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1 shadow-sm">
            <BadgeCheck className="w-5 h-5 text-blue-500" />
          </div>
        </div>
        <div className="space-y-4 flex-1 pt-1">
          <div>
            <h4 className="font-bold text-xl text-foreground">{assignment.workerId?.name || 'Unknown Worker'}</h4>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mt-1">
              ID: {assignment.workerId?._id?.slice(-8) || 'N/A'}
            </p>
          </div>
          
          <div className="space-y-3">
            {contactInfo.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/50">
                  <div className="p-2 rounded-lg bg-background text-muted-foreground">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-sm font-medium truncate">{item.value}</p>
                  </div>
                </div>
              );
            })}
            
            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <div className="p-2 rounded-lg bg-background text-yellow-500">
                <Star className="w-4 h-4 fill-yellow-500" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-semibold text-yellow-600 uppercase tracking-wider mb-0.5">
                  Rating
                </p>
                <p className="text-sm font-bold text-yellow-700">4.8 (120+ jobs)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
