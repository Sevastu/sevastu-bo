import React, { memo } from 'react';
import { CheckSquare, XSquare, MessageSquare, Loader2 } from 'lucide-react';
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
    
    const isCompleted = status === 'VERIFIED' || status === 'REJECTED';
    const isProcessing = isApproving || isRejecting;

    return (
        <div className="bg-card border-t rounded-xl border-slate-200 p-4 sm:p-6 bottom-0 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <div className="max-w-7xl mx-auto flex flex-col gap-4">
                {!isCompleted ? (
                    <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <textarea 
                            value={note || ''}
                            onChange={(e) => onNoteChange?.(e.target.value)}
                            placeholder="Add an optional verification note or rejection reason..."
                            className="w-full pl-9 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-slate-50 text-sm resize-none min-h-[80px]"
                            disabled={isProcessing}
                        />
                    </div>
                ) : (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                        <p className="text-sm font-semibold text-slate-600">
                            This profile has already been processed (Current Status: <span className="text-slate-900">{status}</span>).
                        </p>
                    </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                        onClick={onReject}
                        disabled={isProcessing || isCompleted}
                        className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 shadow-sm rounded-xl text-base font-bold"
                    >
                        {isRejecting ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <XSquare className="w-5 h-5 mr-2" />}
                        {isRejecting ? 'Rejecting...' : 'Reject Profile'}
                    </Button>
                    <Button 
                        onClick={onApprove}
                        disabled={isProcessing || isCompleted}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm rounded-xl text-base font-bold"
                    >
                        {isApproving ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <CheckSquare className="w-5 h-5 mr-2" />}
                        {isApproving ? 'Approving...' : 'Approve Profile'}
                    </Button>
                </div>
            </div>
        </div>
    );
});
