import React, { memo } from 'react';
import { User } from 'lucide-react';

interface WorkerAvatarProps {
  photoUrl?: string;
  name?: string;
}

export const WorkerAvatar = memo(function WorkerAvatar({ photoUrl, name }: WorkerAvatarProps) {
  return (
    <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={name || 'Worker'}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.currentTarget as any).style.display = "none";
            (e.currentTarget.nextSibling as any).style.display = "flex";
          }}
        />
      ) : null}
      <div 
        className="w-full h-full flex items-center justify-center"
        style={{ display: photoUrl ? 'none' : 'flex' }}
      >
        <User size={32} className="text-slate-400" />
      </div>
    </div>
  );
});
