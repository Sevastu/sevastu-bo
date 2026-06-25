import React, { useState, useRef } from 'react';
import NextLink from 'next/link';
import { LogOut, User as UserIcon, Settings } from 'lucide-react';
import { User } from '@/lib/auth';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import { cn } from '@/lib/utils';

interface HeaderUserMenuProps {
    user: User | null;
    onLogout: () => void;
}

export function HeaderUserMenu({ user, onLogout }: HeaderUserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useOutsideClick(menuRef, () => setIsOpen(false));

    if (!user) return null;

    const initial = user.name?.charAt(0).toUpperCase() || 'U';

    return (
        <div className="relative border-l pl-2 lg:pl-4" ref={menuRef}>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 p-1 pr-3 rounded-full transition-colors"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <div className="h-9 w-9 lg:h-10 lg:w-10 rounded-full bg-primary text-white flex items-center justify-center font-semibold shrink-0 shadow-sm">
                    {initial}
                </div>
                <div className="hidden md:block text-left">
                    <p className="font-medium text-sm leading-tight text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">
                        {user.role}
                    </p>
                </div>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-card border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b bg-slate-50/50 dark:bg-slate-900/50">
                        <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email || 'Admin User'}</p>
                    </div>

                    <div className="p-2 space-y-1">
                        <NextLink
                            href="/profile"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <UserIcon className="w-4 h-4 shrink-0" />
                            My Profile
                        </NextLink>
                        
                        <NextLink
                            href="/settings"
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-foreground transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            <Settings className="w-4 h-4 shrink-0" />
                            Settings
                        </NextLink>
                    </div>

                    <div className="p-2 border-t">
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                onLogout();
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        >
                            <LogOut className="w-4 h-4 shrink-0" />
                            Sign out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
