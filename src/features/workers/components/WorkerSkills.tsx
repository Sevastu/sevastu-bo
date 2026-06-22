import React from 'react';

export function WorkerSkills({ skills }: { skills?: string[] }) {
    const safeSkills = skills || [];
    if (safeSkills.length === 0) return <span className="text-slate-400 text-sm">—</span>;

    return (
        <div className="flex flex-wrap gap-1.5">
            {safeSkills.slice(0, 3).map((skill, index) => (
                <span 
                    key={index}
                    className="px-2 py-0.5 bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-medium rounded-full"
                >
                    {skill}
                </span>
            ))}
            {safeSkills.length > 3 && (
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-medium rounded-full">
                    +{safeSkills.length - 3}
                </span>
            )}
        </div>
    );
}
