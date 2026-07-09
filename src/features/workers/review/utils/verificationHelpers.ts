export function parseOcrScore(score: number | undefined): string {
    if (score === undefined || score === null) return 'N/A';
    return `${(score * 100).toFixed(0)}%`;
}

export function getRiskLevel(ocrScore: number | undefined): { level: string; color: string; bg: string } {
    if (ocrScore === undefined || ocrScore === null) return { level: 'Unknown', color: 'text-muted-foreground', bg: 'bg-muted' };
    
    if (ocrScore >= 0.8) return { level: 'Low Risk', color: 'text-success', bg: 'bg-success/10' };
    if (ocrScore >= 0.5) return { level: 'Medium Risk', color: 'text-warning', bg: 'bg-warning/10' };
    return { level: 'High Risk', color: 'text-destructive', bg: 'bg-destructive/10' };
}
