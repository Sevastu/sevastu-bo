import * as LucideIcons from 'lucide-react';
import React from 'react';

export const FALLBACK_IMAGE = 'https://placehold.co/600x400/f8fafc/94a3b8?text=No+Image';

export function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    return Math.floor(seconds) + ' seconds ago';
}

export const renderIcon = (iconName?: string, className: string = "w-5 h-5 text-blue-600") => {
    if (!iconName) return React.createElement(LucideIcons.Briefcase, { className });
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? React.createElement(Icon, { className }) : React.createElement(LucideIcons.Briefcase, { className });
};
