import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, UploadCloud, X } from "lucide-react";
import { uploadCatalogAsset } from "@/features/services/api";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
}

export function ImageUpload({ value, onChange, label = "Upload Image" }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setError(null);
        try {
            const { url } = await uploadCatalogAsset(file);
            onChange(url);
        } catch (err) {
            console.error("Upload failed", err);
            setError("Failed to upload image. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-4">
                {value ? (
                    <div className="relative border rounded-md p-1 bg-muted/20">
                        <img src={value} alt="Uploaded preview" className="h-16 w-16 object-cover rounded-sm" />
                        <button
                            type="button"
                            onClick={() => onChange("")}
                            className="absolute -top-2 -right-2 bg-destructive text-white rounded-full p-0.5 shadow-sm"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ) : (
                    <div className="h-16 w-16 border-2 border-dashed rounded-md flex flex-col items-center justify-center text-muted-foreground bg-muted/10">
                        <UploadCloud className="w-6 h-6 mb-1 opacity-50" />
                    </div>
                )}
                
                <div className="flex flex-col gap-1">
                    <label className="relative cursor-pointer">
                        <Button type="button" variant="outline" size="sm" disabled={uploading} asChild>
                            <span>
                                {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {value ? "Change Image" : label}
                            </span>
                        </Button>
                        <input
                            type="file"
                            className="hidden"
                            accept="image/png, image/jpeg"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />
                    </label>
                    {error && <span className="text-xs text-destructive">{error}</span>}
                    <span className="text-xs text-muted-foreground">PNG or JPG, max 5MB.</span>
                </div>
            </div>
        </div>
    );
}
