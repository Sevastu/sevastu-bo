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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { Category, Service, ServiceFormValues } from "@/features/services/types";
import { ActiveStatusField } from "./ActiveStatusField";
import { Loader2 } from "lucide-react";

interface ServiceFormDialogProps {
    open: boolean;
    service?: Service | null;
    categories: Category[];
    defaultCategoryId?: string;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: ServiceFormValues, service?: Service) => Promise<void>;
}

const emptyValues: ServiceFormValues = {
    categoryId: "",
    name: "",
    description: "",
    isActive: true,
};

export function ServiceFormDialog({
    open,
    service,
    categories,
    defaultCategoryId,
    onOpenChange,
    onSubmit,
}: ServiceFormDialogProps) {
    const [values, setValues] = useState<ServiceFormValues>(emptyValues);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isEdit = Boolean(service);

    useEffect(() => {
        if (!open) return;
        setError(null);
        if (service) {
            const categoryId =
                typeof service.categoryId === "string"
                    ? service.categoryId
                    : service.categoryId._id;
            setValues({
                categoryId,
                name: service.name,
                description: service.description ?? "",
                isActive: service.isActive,
            });
        } else {
            setValues({
                ...emptyValues,
                categoryId: defaultCategoryId ?? categories[0]?._id ?? "",
            });
        }
    }, [open, service, defaultCategoryId, categories]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!values.name.trim()) {
            setError("Name is required.");
            return;
        }
        if (!values.categoryId) {
            setError("Please select a category.");
            return;
        }
        setSubmitting(true);
        setError(null);
        try {
            await onSubmit(values, service ?? undefined);
            onOpenChange(false);
        } catch {
            setError("Could not save service. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent onClose={() => onOpenChange(false)}>
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit service" : "Create service"}</DialogTitle>
                        <DialogDescription>
                            Services belong to a category and contain sub-services.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <Select
                                value={values.categoryId}
                                onValueChange={(categoryId) =>
                                    setValues((v) => ({ ...v, categoryId }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((cat) => (
                                        <SelectItem key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="service-name">Name</Label>
                            <Input
                                id="service-name"
                                value={values.name}
                                onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                                placeholder="e.g. Electrical"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="service-description">Description</Label>
                            <Textarea
                                id="service-description"
                                value={values.description}
                                onChange={(e) =>
                                    setValues((v) => ({ ...v, description: e.target.value }))
                                }
                                placeholder="Brief description for admins"
                                rows={3}
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
                            {isEdit ? "Save changes" : "Create service"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
