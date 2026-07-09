import React from 'react';

export function WorkerSkills({ skills }: { skills?: string[] }) {
    const safeSkills = skills || [];
    if (safeSkills.length === 0) return <span className="text-muted-foreground text-sm">—</span>;;

    return (
        <div className="flex flex-wrap gap-1.5">
            {safeSkills.slice(0, 3).map((skill, index) => (
                <span 
                    key={index}
                    className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[11px] font-medium rounded-full"
                >
                    {skill}
                </span>
            ))}
            {safeSkills.length > 3 && (
                <span className="px-2 py-0.5 bg-muted border border-border text-muted-foreground text-[11px] font-medium rounded-full">
                    +{safeSkills.length - 3}
                </span>
            )}
        </div>
    );
}
