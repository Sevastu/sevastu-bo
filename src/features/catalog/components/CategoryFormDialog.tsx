"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Category, CategoryFormValues } from "@/features/services/types";
import { ActiveStatusField } from "./ActiveStatusField";
import { ImageUpload } from "./ImageUpload";
import { Loader2 } from "lucide-react";

interface CategoryFormDialogProps {
    open: boolean;
    category?: Category | null;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: CategoryFormValues, category?: Category) => Promise<void>;
}

const emptyValues: CategoryFormValues = {
    name: "",
    description: "",
    iconUrl: "",
    isActive: true,
};

export function CategoryFormDialog({
    open,
    category,
    onOpenChange,
    onSubmit,
}: CategoryFormDialogProps) {
    const [values, setValues] = useState<CategoryFormValues>(emptyValues);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isEdit = Boolean(category);

    useEffect(() => {
        if (!open) return;
        setError(null);
        if (category) {
            setValues({
                name: category.name,
                description: category.description ?? "",
                iconUrl: category.iconUrl ?? "",
                isActive: category.isActive,
            });
        } else {
            setValues(emptyValues);
        }
    }, [open, category]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!values.name.trim()) {
            setError("Name is required.");
            return;
        }
        setSubmitting(true);
        setError(null);
        try {
            await onSubmit(values, category ?? undefined);
            onOpenChange(false);
        } catch {
            setError("Could not save category. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent onClose={() => onOpenChange(false)}>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit category" : "Create category"}</DialogTitle>
                        <DialogDescription>
                            Top-level grouping for services in the marketplace catalog.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="category-name">Name</Label>
                            <Input
                                id="category-name"
                                value={values.name}
                                onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                                placeholder="e.g. Home Services"
                                autoFocus
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category-description">Description</Label>
                            <Textarea
                                id="category-description"
                                value={values.description}
                                onChange={(e) =>
                                    setValues((v) => ({ ...v, description: e.target.value }))
                                }
                                placeholder="Brief description for admins"
                                rows={3}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Category Icon</Label>
                            <ImageUpload 
                                value={values.iconUrl} 
                                onChange={(url) => setValues(v => ({ ...v, iconUrl: url }))} 
                                label="Upload Icon"
                            />
                        </div>
                        <ActiveStatusField
                            checked={values.isActive}
                            onChange={(isActive) => setValues((v) => ({ ...v, isActive }))}
                        />
                        {error && <p className="text-sm text-destructive">{error}</p>}
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            disabled={submitting}
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={submitting}>
                            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isEdit ? "Save changes" : "Create category"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
