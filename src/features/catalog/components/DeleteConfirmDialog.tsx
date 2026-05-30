"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface DeleteConfirmDialogProps {
    open: boolean;
    itemLabel: string;
    loading?: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void | Promise<void>;
}

export function DeleteConfirmDialog({
    open,
    itemLabel,
    loading,
    onOpenChange,
    onConfirm,
}: DeleteConfirmDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent onClose={() => onOpenChange(false)} className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Delete {itemLabel}</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this item?
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        type="button"
                        variant="outline"
                        disabled={loading}
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        disabled={loading}
                        onClick={() => void onConfirm()}
                    >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
