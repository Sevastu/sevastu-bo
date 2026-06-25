// import React from 'react';
import { Notification } from '@/components/ui/notification';
import { DarkModeToggle } from '@/components/auth/DarkModeToggle';
import { HeaderUserMenu } from '@/components/layout/HeaderUserMenu';
import { User } from '@/lib/auth';

interface HeaderActionsProps {
    user: User | null;
    onLogout: () => void;
}

export function HeaderActions({ user, onLogout }: HeaderActionsProps) {
    return (
        <div className="flex items-center gap-2 lg:gap-4 shrink-0">
            <Notification />
            <DarkModeToggle />
            <HeaderUserMenu user={user} onLogout={onLogout} />
        </div>
    );
}
