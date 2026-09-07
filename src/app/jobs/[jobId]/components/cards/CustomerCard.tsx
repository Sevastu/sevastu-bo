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
        <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground border-2 border-dashed border-border/50 rounded-xl bg-muted/20">
          <div className="p-4 rounded-full bg-muted/50 mb-3">
            <User className="w-8 h-8 opacity-40" />
          </div>
          <p className="text-sm font-medium">No customer assigned to this job.</p>
        </div>
      </SectionCard>
    );
  }

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: customer.phone || 'No phone provided' },
    { icon: Mail, label: 'Email', value: customer.email || 'No email provided' },
  ];

  return (
    <SectionCard title="Customer Information">
      <div className="flex flex-col sm:flex-row sm:items-start gap-5">
        <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 text-primary border border-primary/20 shadow-sm">
          <User className="w-10 h-10" />
        </div>
        <div className="space-y-4 flex-1 pt-1">
          <div>
            <h4 className="font-bold text-xl text-foreground">{customer.name || 'Unknown Customer'}</h4>
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-mono mt-1">
              ID: {customer._id?.slice(-8) || 'N/A'}
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
            
            <div className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/30 border border-border/50">
              <div className="p-2 rounded-lg bg-background text-muted-foreground shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                  Address
                </p>
                <p className="text-sm font-medium leading-relaxed">{address || 'No address provided'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}
