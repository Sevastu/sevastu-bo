export function parseOcrScore(score: number | undefined): string {
    if (score === undefined || score === null) return 'N/A';
    return `${(score * 100).toFixed(0)}%`;
}

export function getRiskLevel(ocrScore: number | undefined): { level: string; color: string; bg: string } {
    if (ocrScore === undefined || ocrScore === null) return { level: 'Unknown', color: 'text-slate-500', bg: 'bg-slate-100' };
    
    if (ocrScore >= 0.8) return { level: 'Low Risk', color: 'text-emerald-700', bg: 'bg-emerald-50' };
    if (ocrScore >= 0.5) return { level: 'Medium Risk', color: 'text-amber-700', bg: 'bg-amber-50' };
    return { level: 'High Risk', color: 'text-rose-700', bg: 'bg-rose-50' };
}
