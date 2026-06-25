import React from 'react';
import { usePathname } from 'next/navigation';

export function PageHeader() {
    const pathname = usePathname();

    const getPageTitle = () => {
        if (pathname?.startsWith("/workers/profile/")) {
            return "Worker Profile";
        }
        if (pathname?.startsWith("/worker-verification/")) {
            return "Worker Verification";
        }

        const title = pathname?.split("/")[1]?.replace(/-/g, " ");

        return title
            ? title.charAt(0).toUpperCase() + title.slice(1)
            : "Dashboard";
    };

    return (
        <h1 className="text-lg lg:text-xl font-semibold truncate text-primary/90">
            {getPageTitle()}
        </h1>
    );
}
