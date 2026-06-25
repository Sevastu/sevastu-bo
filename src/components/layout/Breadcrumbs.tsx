import React from 'react';
import NextLink from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Breadcrumbs() {
    const pathname = usePathname();
    const segments = pathname?.split('/').filter(Boolean) || [];

    if (segments.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb" className="hidden md:flex items-center space-x-1 text-sm text-muted-foreground">
            <NextLink 
                href="/dashboard" 
                className="hover:text-foreground transition-colors p-1"
                title="Home"
            >
                <Home className="w-4 h-4" />
            </NextLink>

            {segments.map((segment, index) => {
                const isLast = index === segments.length - 1;
                const path = `/${segments.slice(0, index + 1).join('/')}`;
                const title = segment.replace(/-/g, ' ');
                const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);

                return (
                    <div key={path} className="flex items-center space-x-1">
                        <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
                        {isLast ? (
                            <span className="font-medium text-foreground px-1" aria-current="page">
                                {capitalizedTitle}
                            </span>
                        ) : (
                            <NextLink 
                                href={path} 
                                className="hover:text-foreground transition-colors px-1"
                            >
                                {capitalizedTitle}
                            </NextLink>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
