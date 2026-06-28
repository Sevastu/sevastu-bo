import React, { memo } from 'react';
import { SignedIdImage } from './SignedIdImage';
import { CheckCircle2, AlertCircle, Clock } from 'lucide-react';

interface DocumentCardProps {
    title: string;
    objectKey: string | undefined;
    icon: React.ElementType;
    ocrStatus?: string;
    uploadDate?: string;
}

export const DocumentCard = memo(function DocumentCard({ title, objectKey, icon: Icon, ocrStatus, uploadDate }: DocumentCardProps) {
    const isCompleted = ocrStatus?.toLowerCase() === 'completed';

    return (
        <div className="bg-card rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-blue-50 rounded-xl border border-blue-100">
                        <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-slate-900">{title}</h4>
                        {uploadDate && (
                            <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {new Date(uploadDate).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                </div>
                {ocrStatus && (
                    <div className={`px-2 py-1 rounded border text-xs font-bold flex items-center gap-1 ${
                        isCompleted ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}>
                        {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                        {ocrStatus.toUpperCase()}
                    </div>
                )}
            </div>
            <SignedIdImage objectKey={objectKey} label={title} showActions={true} />
        </div>
    );
});
