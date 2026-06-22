import React, { memo } from 'react';
import { Mail, Phone, MapPin, Calendar } from 'lucide-react';

interface WorkerContactInfoProps {
  email: string;
  phone: string;
  address: string;
  registrationDate: string;
}

export const WorkerContactInfo = memo(function WorkerContactInfo({
  email,
  phone,
  address,
  registrationDate
}: WorkerContactInfoProps) {
  const formattedDate = registrationDate 
    ? new Date(registrationDate).toLocaleDateString() 
    : 'Unknown Date';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Mail size={14} className="shrink-0" />
          <span className="truncate" title={email}>{email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Phone size={14} className="shrink-0" />
          <span>{phone}</span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={14} className="shrink-0" />
          <span className="truncate" title={address}>{address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Calendar size={14} className="shrink-0" />
          <span>Registered: {formattedDate}</span>
        </div>
      </div>
    </div>
  );
});
