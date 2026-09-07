import React from 'react';
import SectionCard from '@/components/common/SectionCard';
import { Job } from '@/features/fulfillment/types/job.types';
import { formatDate } from '@/lib/date-utils';
import { FileText, Calendar, Tag, Layers, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OverviewCardProps {
  job: Job;
}

export default function OverviewCard({ job }: OverviewCardProps) {
  const infoItems = [
    {
      label: 'Job ID',
      value: job._id?.slice(-8) || 'N/A',
      icon: FileText,
      mono: true
    },
    {
      label: 'Created At',
      value: formatDate(new Date(job.createdAt), "dd MMM yyyy, hh:mm a"),
      icon: Clock
    },
    {
      label: 'Preferred Schedule',
      value: formatDate(new Date(job.preferredSchedule), "dd MMM yyyy, hh:mm a"),
      icon: Calendar
    },
    {
      label: 'Category',
      value: job.categoryId?.name || '-',
      icon: Tag
    },
    {
      label: 'Service',
      value: job.serviceId?.name || '-',
      icon: Layers
    },
    {
      label: 'Sub Service',
      value: job.subServiceIds?.map(s => s.name).join(', ') || '-',
      icon: Layers
    }
  ];

  return (
    <SectionCard title="Overview" description="High-level job details.">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
        {infoItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div 
              key={index} 
              className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
            >
              <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  {item.label}
                </p>
                <p className={cn(
                  "text-sm font-medium truncate",
                  item.mono && "font-mono"
                )}>
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}
