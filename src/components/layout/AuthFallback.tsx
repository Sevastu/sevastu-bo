import React from 'react';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AuthFallbackProps {
    pathname: string | null;
}

export function AuthFallback({ pathname }: AuthFallbackProps) {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 animate-in fade-in duration-500">
            <div className="relative">
                <div className="w-16 h-16 rounded-full animate-pulse bg-muted" />
                <Loader2 className="w-8 h-8 text-primary animate-spin absolute inset-0 m-auto" />
            </div>
            <div className="flex flex-col items-center gap-1">
                <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Sevastu
                </h2>
                <p className="text-xs text-muted-foreground font-medium animate-pulse">
                    {pathname === '/login'
                        ? 'Please sign in to continue...'
                        : 'Session expired. Redirecting to login...'}
                </p>
                {pathname !== '/login' && (
                    <button
                        onClick={() => router.replace('/login')}
                        className="mt-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
                    >
                        Go to Login
                    </button>
                )}
            </div>
        </div>
    );
}
