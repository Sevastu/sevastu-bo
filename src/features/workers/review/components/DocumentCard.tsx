import React, { memo } from 'react';
import { SignedIdImage } from './SignedIdImage';

interface DocumentCardProps {
    title: string;
    objectKey: string | undefined;
    icon: React.ElementType;
}

export const DocumentCard = memo(function DocumentCard({ title, objectKey, icon: Icon }: DocumentCardProps) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                    <Icon className="w-4 h-4 text-slate-500" />
                </div>
                <h4 className="text-sm font-bold text-slate-800">{title}</h4>
            </div>
            <SignedIdImage objectKey={objectKey} label={title} />
        </div>
    );
});
