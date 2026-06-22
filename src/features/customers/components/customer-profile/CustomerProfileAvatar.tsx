import React, { memo } from 'react';

interface CustomerProfileAvatarProps {
    avatarUrl?: string;
    name?: string;
    isOnline?: boolean;
}

export const CustomerProfileAvatar = memo(function CustomerProfileAvatar({
    avatarUrl,
    name,
    isOnline
}: CustomerProfileAvatarProps) {
    const initials = name ? name.charAt(0).toUpperCase() : 'U';

    return (
        <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={name || 'Customer'}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            (e.currentTarget as any).style.display = 'none';
                            (e.currentTarget.nextSibling as any).style.display = 'flex';
                        }}
                    />
                ) : null}
                <div
                    className="w-full h-full bg-blue-600 flex items-center justify-center"
                    style={{ display: avatarUrl ? 'none' : 'flex' }}
                >
                    <span className="text-white font-bold text-xl">{initials}</span>
                </div>
            </div>
            <div
                className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                    isOnline ? 'bg-green-500' : 'bg-slate-400'
                }`}
            />
        </div>
    );
});
