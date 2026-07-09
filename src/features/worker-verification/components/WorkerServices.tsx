import React, { memo } from 'react';

interface WorkerServicesProps {
  services: string[];
}

export const WorkerServices = memo(function WorkerServices({ services }: WorkerServicesProps) {
  if (!services || services.length === 0) return null;

  return (
    <div className="mb-4">
      <div className="text-sm font-semibold text-foreground mb-2">Services</div>
      <div className="flex flex-wrap gap-2">
        {services.map((service, index) => (
          <span
            key={`${service}-${index}`}
            className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg border border-primary/20"
          >
            {service}
          </span>
        ))}
      </div>
    </div>
  );
});
