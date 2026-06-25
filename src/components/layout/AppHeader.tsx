import React from 'react';
import { Menu } from 'lucide-react';
import { User } from '@/lib/auth';
import { LAYOUT } from '@/utils/layoutConstants';
import { cn } from '@/lib/utils';
import { PageHeader } from './PageHeader';
import { Breadcrumbs } from './Breadcrumbs';
import { HeaderActions } from './HeaderActions';

interface AppHeaderProps {
    user: User | null;
    onToggleSidebar: () => void;
    onLogout: () => void;
}

export function AppHeader({ user, onToggleSidebar, onLogout }: AppHeaderProps) {
    return (
        <header
            className={cn(
                "h-16",
                "mx-4 mt-4",
                "rounded-full",
                "px-6",
                "bg-white/90 dark:bg-card/90",
                "backdrop-blur-xl",
                "border-2 border-primary/50",
                "shadow-[0_10px_35px_rgba(37,99,235,0.18)]",
                LAYOUT.Z_INDEX.HEADER
            )}
        >
            <div className="flex h-full items-center justify-between gap-4">

                {/* Left Side */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                    <button
                        onClick={onToggleSidebar}
                        className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                        aria-label="Open Sidebar"
                    >
                        <Menu className="w-4 h-4" />
                    </button>

                    <div className="flex flex-col min-w-0">
                        {/* <Breadcrumbs /> */}
                        <PageHeader />
                    </div>
                </div>

                {/* Right Side */}
                <HeaderActions user={user} onLogout={onLogout} />

            </div>
        </header>
    );
}
