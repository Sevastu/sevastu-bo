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
import type { Category, Service, SubService, SubServiceFormValues } from "@/features/services/types";
import { getCategoryId } from "@/features/catalog/utils";
import { ActiveStatusField } from "./ActiveStatusField";
import { Loader2 } from "lucide-react";

interface SubServiceFormDialogProps {
    open: boolean;
    subService?: SubService | null;
    services: Service[];
    categories: Category[];
    defaultServiceId?: string;
    onOpenChange: (open: boolean) => void;
    onSubmit: (values: SubServiceFormValues, subService?: SubService) => Promise<void>;
}

const emptyValues: SubServiceFormValues = {
    serviceId: "",
    name: "",
    description: "",
    isActive: true,
    basePrice: 0,
    priceType: "fixed",
};

export function SubServiceFormDialog({
    open,
    subService,
    services,
    categories,
    defaultServiceId,
    onOpenChange,
    onSubmit,
}: SubServiceFormDialogProps) {
    const [values, setValues] = useState<SubServiceFormValues>(emptyValues);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isEdit = Boolean(subService);

    const categoryNameById = new Map(categories.map((c) => [c._id, c.name]));

    useEffect(() => {
        if (!open) return;
        setError(null);
        if (subService) {
            const serviceId =
                typeof subService.serviceId === "string"
                    ? subService.serviceId
                    : subService.serviceId._id;
            setValues({
                serviceId,
                name: subService.name,
                description: subService.description ?? "",
                isActive: subService.isActive,
                basePrice: subService.basePrice,
                priceType: subService.priceType,
            });
        } else {
            setValues({
                ...emptyValues,
                serviceId: defaultServiceId ?? services[0]?._id ?? "",
            });
        }
    }, [open, subService, defaultServiceId, services]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!values.name.trim()) {
            setError("Name is required.");
            return;
        }
        if (!values.serviceId) {
            setError("Please select a service.");
            return;
        }
        if (values.basePrice < 0 || Number.isNaN(values.basePrice)) {
            setError("Enter a valid base price.");
            return;
        }
        setSubmitting(true);
        setError(null);
        try {
            await onSubmit(values, subService ?? undefined);
            onOpenChange(false);
        } catch {
            setError("Could not save sub-service. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent onClose={() => onOpenChange(false)} className="max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{isEdit ? "Edit sub-service" : "Create sub-service"}</DialogTitle>
                        <DialogDescription>
                            Granular offerings customers book, with pricing for matching and analytics.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="mt-4 space-y-4">
                        <div className="space-y-2">
                            <Label>Service</Label>
                            <Select
                                value={values.serviceId}
                                onValueChange={(serviceId) =>
                                    setValues((v) => ({ ...v, serviceId }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select service" />
                                </SelectTrigger>
                                <SelectContent>
                                    {services.map((srv) => {
                                        const catName =
                                            categoryNameById.get(getCategoryId(srv.categoryId)) ??
                                            "Category";
                                        return (
                                            <SelectItem key={srv._id} value={srv._id}>
                                                {catName} → {srv.name}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subservice-name">Name</Label>
                            <Input
                                id="subservice-name"
                                value={values.name}
                                onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
                                placeholder="e.g. Fan Repair"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subservice-description">Description</Label>
                            <Textarea
                                id="subservice-description"
                                value={values.description}
                                onChange={(e) =>
                                    setValues((v) => ({ ...v, description: e.target.value }))
                                }
                                placeholder="Brief description for admins"
                                rows={3}
                            />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="subservice-price">Base price (INR)</Label>
                                <Input
                                    id="subservice-price"
                                    type="number"
                                    min={0}
                                    step={1}
                                    value={values.basePrice}
                                    onChange={(e) =>
                                        setValues((v) => ({
                                            ...v,
                                            basePrice: Number(e.target.value),
                                        }))
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Price type</Label>
                                <Select
                                    value={values.priceType}
                                    onValueChange={(priceType) => {
                                        if (priceType === "fixed" || priceType === "range") {
                                            setValues((v) => ({ ...v, priceType }));
                                        }
                                    }}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fixed">Fixed</SelectItem>
                                        <SelectItem value="range">Range (onwards)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
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
                            {isEdit ? "Save changes" : "Create sub-service"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
