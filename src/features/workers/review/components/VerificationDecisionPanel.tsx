import React, { memo } from 'react';
import { CheckSquare, XSquare, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VerificationDecisionPanelProps {
    status: string | undefined;
    isApproving: boolean;
    isRejecting: boolean;
    onApprove: () => void;
    onReject: () => void;
    note?: string;
    onNoteChange?: (note: string) => void;
}

export const VerificationDecisionPanel = memo(function VerificationDecisionPanel({
    status,
    isApproving,
    isRejecting,
    onApprove,
    onReject,
    note,
    onNoteChange
}: VerificationDecisionPanelProps) {
    
    // Do not show action buttons if already verified or rejected
    // but maybe show a message instead. Based on original we just disable them or hide them.
    const isCompleted = status === 'VERIFIED' || status === 'REJECTED';

    return (
        <div className="bg-white border-t border-slate-200 p-4 sticky bottom-0 z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1 w-full sm:w-auto">
                    {!isCompleted ? (
                        <div className="relative">
                            <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                                type="text"
                                value={note || ''}
                                onChange={(e) => onNoteChange?.(e.target.value)}
                                placeholder="Add an optional verification note or rejection reason..."
                                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-slate-50 text-sm"
                            />
                        </div>
                    ) : (
                        <p className="text-sm font-semibold text-slate-500">
                            This profile has already been processed (Current Status: {status}).
                        </p>
                    )}
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button 
                        onClick={onReject}
                        disabled={isApproving || isRejecting || isCompleted}
                        className="flex-1 sm:flex-none bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 shadow-sm rounded-xl"
                    >
                        <XSquare className="w-4 h-4 mr-2" />
                        {isRejecting ? 'Rejecting...' : 'Reject Profile'}
                    </Button>
                    <Button 
                        onClick={onApprove}
                        disabled={isApproving || isRejecting || isCompleted}
                        className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm rounded-xl"
                    >
                        <CheckSquare className="w-4 h-4 mr-2" />
                        {isApproving ? 'Approving...' : 'Approve Profile'}
                    </Button>
                </div>
            </div>
        </div>
    );
});
