import React, { memo } from 'react';
import { Star } from 'lucide-react';
import { WorkerVerificationUI } from '../types/workerVerification.types';
import { WorkerAvatar } from './WorkerAvatar';
import { VerificationStatusBadge } from './VerificationStatusBadge';
import { WorkerContactInfo } from './WorkerContactInfo';
import { WorkerServices } from './WorkerServices';
import { WorkerDocumentsPreview } from './WorkerDocumentsPreview';
import { WorkerQuickActions } from './WorkerQuickActions';

interface WorkerVerificationCardProps {
  worker: WorkerVerificationUI;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onViewDocuments: (worker: WorkerVerificationUI) => void;
}

export const WorkerVerificationCard = memo(function WorkerVerificationCard({
  worker,
  onApprove,
  onReject,
  onViewDocuments
}: WorkerVerificationCardProps) {
  return (
    <div className="bg-card rounded-2xl p-6 border border-slate-200 shadow-sm transition-all hover:shadow-md flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <WorkerAvatar photoUrl={worker.photoUrl} name={worker.name} />
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">{worker.name}</h3>
            <p className="text-xs text-slate-500 font-mono mt-0.5 mb-2">ID: {worker.id}</p>
            <VerificationStatusBadge status={worker.verificationStatus} />
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1 text-sm font-bold text-slate-700 bg-amber-50 px-2 py-1 rounded-lg">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            {worker.rating}
          </div>
          <div className="text-xs font-semibold text-slate-500 mt-2 uppercase tracking-wider">{worker.experience}</div>
        </div>
      </div>

      <div className="flex-1">
        <WorkerContactInfo 
          email={worker.email} 
          phone={worker.phoneNumber} 
          address={worker.address} 
          registrationDate={worker.registrationDate} 
        />
        <WorkerServices services={worker.services} />
        <WorkerDocumentsPreview 
          documents={worker.documents} 
          onViewDocuments={() => onViewDocuments(worker)} 
        />
      </div>

      <WorkerQuickActions 
        status={worker.verificationStatus} 
        onApprove={() => onApprove(worker.id)} 
        onReject={() => onReject(worker.id)} 
        onViewDocuments={() => onViewDocuments(worker)} 
      />
    </div>
  );
});
