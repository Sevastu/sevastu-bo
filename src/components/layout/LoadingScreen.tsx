import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingScreen() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 animate-in fade-in duration-500">
            <div className="relative">
                <div className="w-16 h-16 rounded-full animate-pulse bg-muted/30" />
                <Loader2 className="w-8 h-8 text-primary animate-spin absolute inset-0 m-auto" />
            </div>
            <div className="flex flex-col items-center gap-1">
                <h2 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Sevastu
                </h2>
                <p className="text-xs text-muted-foreground font-medium animate-pulse">
                    Authenticating access...
                </p>
            </div>
        </div>
    );
}
