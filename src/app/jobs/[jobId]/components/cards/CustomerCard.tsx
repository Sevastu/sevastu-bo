import React from 'react';
import SectionCard from '@/components/common/SectionCard';
import { User, Phone, Mail, MapPin } from 'lucide-react';

interface CustomerCardProps {
  customer?: { _id: string; name?: string; phone?: string; email?: string };
  address?: string;
}

export default function CustomerCard({ customer, address }: CustomerCardProps) {
  if (!customer) {
    return (
      <SectionCard title="Customer Information">
        <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground border border-dashed rounded-lg">
          <User className="w-8 h-8 mb-2 opacity-20" />
          <p className="text-sm">No customer assigned to this job.</p>
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Customer Information">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
          <User className="w-8 h-8" />
        </div>
        <div className="space-y-3 flex-1 pt-1">
          <div>
            <h4 className="font-semibold text-lg">{customer.name || 'Unknown Customer'}</h4>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">ID: {customer._id}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span>{customer.phone || 'No phone provided'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span>{customer.email || 'No email provided'}</span>
            </div>
            <div className="flex items-start gap-2 md:col-span-2">
              <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <span>{address || 'No address provided'}</span>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
