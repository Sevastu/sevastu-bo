import React from 'react';

interface FilterSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: { label: string; value: string | number }[];
    icon?: React.ReactNode;
}

export function FilterSelect({ options, icon, className = '', ...props }: FilterSelectProps) {
    return (
        <div className="relative w-full">
            {icon && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    {icon}
                </div>
            )}
            <select
                className={`w-full h-10 ${icon ? 'pl-10' : 'pl-3'} pr-8 py-2 rounded-xl border border-border bg-muted text-sm text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none cursor-pointer transition-colors hover:border-muted-foreground/30 ${className}`}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    );
}
