import { WorkerUI } from "../types/worker-ui.types";

export function resolveWorkerUserId(worker: WorkerUI | Record<string, unknown>): string {
    return String((worker as any).userId ?? (worker as any).id ?? "");
}

export function getWorkerRating(worker: WorkerUI): number {
    return worker.averageRating || worker.rating || worker.reviewsAverage || 0;
}

export function timeAgo(dateString?: string): string {
    if (!dateString) return '—';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '—';
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    return Math.floor(seconds) + ' seconds ago';
}
