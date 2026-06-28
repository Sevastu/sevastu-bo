import React, { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, ZoomIn, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchPrivateSignedUrl } from "@/features/workers/api";

interface SignedIdImageProps {
    objectKey?: string;
    label: string;
    showActions?: boolean;
}

export function SignedIdImage({ objectKey, label, showActions = true }: SignedIdImageProps) {
    const [url, setUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState<string | null>(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const imgErrorAttempts = useRef(0);

    const load = useCallback(async () => {
        if (!objectKey) {
            setUrl(null);
            setErr("No file on record.");
            return;
        }
        setLoading(true);
        setErr(null);
        imgErrorAttempts.current = 0;
        try {
            const signed = await fetchPrivateSignedUrl(objectKey);
            setUrl(signed.url);
        } catch {
            setErr("Could not load a secure view link.");
            setUrl(null);
        } finally {
            setLoading(false);
        }
    }, [objectKey]);

    useEffect(() => {
        load();
    }, [load]);

    const onImgError = () => {
        if (imgErrorAttempts.current >= 2) {
            setErr("Image failed to load after retries. Use Retry.");
            setUrl(null);
            return;
        }
        imgErrorAttempts.current += 1;
        setUrl(null);
        window.setTimeout(() => {
            load();
        }, 400);
    };

    return (
        <div className="space-y-2">
            <div className="group relative flex min-h-[200px] items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all duration-200 hover:shadow-md">
                {loading && <Loader2 className="h-8 w-8 animate-spin text-slate-400" />}
                {!loading && err && (
                    <div className="max-w-xs p-4 text-center text-sm text-rose-500 font-medium">
                        {err}
                        <div className="mt-3">
                            <Button type="button" variant="outline" size="sm" onClick={load} className="rounded-lg shadow-sm">
                                Retry
                            </Button>
                        </div>
                    </div>
                )}
                {!loading && url && !err && (
                    <>
                        <div className="relative w-full">
                            <img
                                src={url}
                                alt={label}
                                className={`aspect-[9/6] w-full object-contain transition-transform duration-300 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
                                onError={onImgError}
                                onClick={() => setIsZoomed(!isZoomed)}
                            />
                            {showActions && (
                                <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        className="h-8 w-8 p-0 rounded-lg shadow-sm bg-white hover:bg-slate-100 border border-slate-200"
                                        onClick={() => setIsZoomed(!isZoomed)}
                                        title={isZoomed ? "Zoom Out" : "Zoom In"}
                                    >
                                        <ZoomIn className="h-4 w-4 text-slate-700" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        className="h-8 w-8 p-0 rounded-lg shadow-sm bg-white hover:bg-slate-100 border border-slate-200"
                                        onClick={() => window.open(url, '_blank')}
                                        title="Open Full Image"
                                    >
                                        <ExternalLink className="h-4 w-4 text-slate-700" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
            <p className="text-xs text-center font-semibold text-slate-500 uppercase tracking-wider">{label}</p>
        </div>
    );
}
