import React from 'react';
import { FALLBACK_AVATAR } from '../utils/customerConstants';

interface CustomerAvatarProps {
    photoUrl?: string;
    name?: string;
    className?: string;
}

export function CustomerAvatar({ photoUrl, name, className = "w-10 h-10" }: CustomerAvatarProps) {
    const initials = name ? name.charAt(0).toUpperCase() : 'C';

    return (
        <div className={`${className} rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden`}>
            {photoUrl ? (
                <img 
                    src={photoUrl} 
                    alt={name || 'Customer'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.currentTarget as any).style.display = 'none';
                        (e.currentTarget.nextSibling as any).style.display = 'flex';
                    }}
                />
            ) : null}
            <span 
                className="text-slate-500 font-semibold"
                style={{ display: photoUrl ? 'none' : 'flex' }}
            >
                {initials}
            </span>
        </div>
    );
}
