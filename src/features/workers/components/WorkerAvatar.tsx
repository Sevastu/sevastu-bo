import React from 'react';

interface WorkerAvatarProps {
    photoUrl?: string;
    name?: string;
    className?: string;
}

export function WorkerAvatar({ photoUrl, name, className = "w-10 h-10" }: WorkerAvatarProps) {
    return (
        <div className={`${className} rounded-full bg-muted border border-border flex items-center justify-center shrink-0 overflow-hidden`}>
            {photoUrl ? (
                <img 
                    src={photoUrl} 
                    alt={name || 'Worker'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        (e.currentTarget as any).style.display = 'none';
                        (e.currentTarget.nextSibling as any).style.display = 'flex';
                    }}
                />
            ) : null}
            <span 
                className="text-muted-foreground font-semibold"
                style={{ display: photoUrl ? 'none' : 'flex' }}
            >
                {name?.charAt(0).toUpperCase() || 'W'}
            </span>
        </div>
    );
}
