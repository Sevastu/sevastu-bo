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
        <div className="bg-card rounded-lg border border-border/20 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4 gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary/10 rounded-lg border border-primary/20">
                        <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-foreground">{title}</h4>
                        {uploadDate && (
                            <p className="text-xs text-muted-foreground font-medium mt-0.5 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {new Date(uploadDate).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                </div>
                {ocrStatus && (
                    <div className={`px-2 py-1 rounded-lg border text-xs font-bold flex items-center gap-1 ${
                        isCompleted ? 'bg-success/10 text-success border-success/20' : 'bg-muted text-muted-foreground border-border'
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
