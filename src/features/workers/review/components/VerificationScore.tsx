import React, { memo } from 'react';
import { Target, CheckCircle2 } from 'lucide-react';
import { useVerificationScore } from '../hooks/useVerificationScore';
import { ReviewWorkerKyc, ReviewWorkerOcr } from '../types/workerReview.types';
import { getRiskLevel } from '../utils/verificationHelpers';

interface VerificationScoreProps {
    kyc: ReviewWorkerKyc | null;
    ocr: ReviewWorkerOcr | null;
}

export const VerificationScore = memo(function VerificationScore({ kyc, ocr }: VerificationScoreProps) {
    const { totalScore, maxScore, points } = useVerificationScore(kyc, ocr);
    
    // Using risk level as an overall text indicator for the score section
    const risk = getRiskLevel(ocr?.nameMatchScore);
    const progressPercent = Math.min((totalScore / maxScore) * 100, 100);

    const scoreItems = [
        { label: 'Aadhaar Front Verified', points: points.idFront, active: points.idFront > 0 },
        { label: 'Aadhaar Back Verified', points: points.idBack, active: points.idBack > 0 },
        { label: 'Name Match', points: points.ocrNameMatch, active: points.ocrNameMatch > 0 },
        { label: 'Confidence > 40%', points: points.ocrHighConfidence, active: points.ocrHighConfidence > 0 },
    ];

    return (
        <div className="bg-slate-900 rounded-2xl p-6 shadow-md text-white relative overflow-hidden">
            {/* Background design */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                    <div>
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Target className="w-5 h-5 text-blue-400" />
                            Verification Score
                        </h3>
                        <p className="text-slate-400 text-sm mt-1">System computed trust level</p>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-black">
                            {totalScore}<span className="text-slate-500 text-xl">/{maxScore}</span>
                        </div>
                        <div className={`text-xs font-bold px-2 py-1 rounded mt-2 inline-block ${risk.bg} ${risk.color}`}>
                            {risk.level}
                        </div>
                    </div>
                </div>

                <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-bold text-slate-400">
                        <span>Progress</span>
                        <span>{progressPercent}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    {scoreItems.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className={`w-4 h-4 ${item.active ? 'text-emerald-400' : 'text-slate-600'}`} />
                                <span className={item.active ? 'text-slate-200' : 'text-slate-500'}>{item.label}</span>
                            </div>
                            <span className={`font-mono ${item.active ? 'text-blue-400' : 'text-slate-600'}`}>
                                +{item.active ? item.points : 0} pts
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});
