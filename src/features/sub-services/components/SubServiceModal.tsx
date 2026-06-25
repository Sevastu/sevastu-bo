import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SubService, Service } from '@/features/services/types';
import { Loader2 } from 'lucide-react';

type SubServiceForm = {
    name: string;
    serviceId: string;
    basePrice: number;
    priceType: "fixed" | "range";
    isActive: boolean;
};

const DEFAULT_FORM_STATE: SubServiceForm = {
    name: '',
    serviceId: '',
    basePrice: 0,
    priceType: 'fixed',
    isActive: true,
};

interface SubServiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Partial<SubService>) => Promise<void>;
    services: Service[];
    initialData?: SubService | null;
}

export function SubServiceModal({ isOpen, onClose, onSubmit, services, initialData }: SubServiceModalProps) {
    const isEditing = !!initialData;
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<SubServiceForm>(DEFAULT_FORM_STATE);
    const [touched, setTouched] = useState<Partial<Record<keyof SubServiceForm, boolean>>>({});

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData({
                    name: initialData.name || '',
                    serviceId: typeof initialData.serviceId === 'string' 
                        ? initialData.serviceId 
                        : initialData.serviceId?._id || '',
                    basePrice: initialData.basePrice || 0,
                    priceType: initialData.priceType === 'range' ? 'range' : 'fixed',
                    isActive: initialData.isActive ?? true,
                });
            } else {
                setFormData(DEFAULT_FORM_STATE);
            }
            setTouched({});
        }
    }, [isOpen, initialData]);

    const updateField = useCallback(<K extends keyof SubServiceForm>(field: K, value: SubServiceForm[K]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setTouched(prev => ({ ...prev, [field]: true }));
    }, []);

    const errors = useMemo(() => {
        const newErrors: Partial<Record<keyof SubServiceForm, string>> = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.serviceId) newErrors.serviceId = 'Parent service is required';
        if (formData.basePrice < 0 || isNaN(formData.basePrice)) newErrors.basePrice = 'Base price must be positive';
        if (!formData.priceType) newErrors.priceType = 'Price type is required';
        return newErrors;
    }, [formData]);

    const isFormValid = Object.keys(errors).length === 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Mark all as touched to show any missing validations if someone hits Enter
        const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
        setTouched(allTouched);

        if (!isFormValid) return;

        setLoading(true);
        try {
            await onSubmit(formData);
            onClose();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[500px] rounded-2xl p-0 overflow-hidden outline-none">
                <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-slate-900">
                            {isEditing ? 'Edit Sub-Service' : 'Add New Sub-Service'}
                        </DialogTitle>
                        <DialogDescription className="text-slate-500 mt-1">
                            {isEditing 
                                ? 'Update the details of this sub-service offering.' 
                                : 'Create a new specific sub-service for a parent category.'}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
                    <FieldWrapper 
                        id="name" 
                        label="Sub-Service Name" 
                        required 
                        error={touched.name ? errors.name : undefined}
                    >
                        <Input
                            id="name"
                            autoFocus
                            placeholder="e.g., Deep Cleaning 3BHK"
                            value={formData.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            onBlur={() => setTouched(prev => ({ ...prev, name: true }))}
                            className={`rounded-xl h-11 transition-shadow ${
                                touched.name && errors.name 
                                    ? 'border-red-300 focus-visible:ring-red-500' 
                                    : 'border-slate-200 focus-visible:ring-blue-500'
                            }`}
                            aria-invalid={!!errors.name}
                        />
                    </FieldWrapper>

                    <FieldWrapper 
                        id="serviceId" 
                        label="Parent Service" 
                        required 
                        error={touched.serviceId ? errors.serviceId : undefined}
                    >
                        <Select
                            value={formData.serviceId}
                            onValueChange={(val: string) => updateField('serviceId', val)}
                        >
                            <SelectTrigger 
                                id="serviceId"
                                className={`rounded-xl h-11 transition-shadow ${
                                    touched.serviceId && errors.serviceId 
                                        ? 'border-red-300 focus:ring-red-500' 
                                        : 'border-slate-200 focus:ring-blue-500'
                                }`}
                                aria-invalid={!!errors.serviceId}
                            >
                                <SelectValue placeholder="Select Parent Service" />
                            </SelectTrigger>
                            <SelectContent>
                                {services.map(s => (
                                    <SelectItem key={s._id} value={s._id}>{s.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FieldWrapper>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FieldWrapper 
                            id="basePrice" 
                            label="Base Price (INR)" 
                            required 
                            error={touched.basePrice ? errors.basePrice : undefined}
                        >
                            <Input
                                id="basePrice"
                                type="number"
                                min="0"
                                value={formData.basePrice === 0 && !isEditing ? '' : formData.basePrice}
                                onChange={(e) => updateField('basePrice', Number(e.target.value))}
                                onBlur={() => setTouched(prev => ({ ...prev, basePrice: true }))}
                                className={`rounded-xl h-11 transition-shadow ${
                                    touched.basePrice && errors.basePrice 
                                        ? 'border-red-300 focus-visible:ring-red-500' 
                                        : 'border-slate-200 focus-visible:ring-blue-500'
                                }`}
                                aria-invalid={!!errors.basePrice}
                            />
                        </FieldWrapper>

                        <FieldWrapper 
                            id="priceType" 
                            label="Price Type" 
                            required
                        >
                            <Select
                                value={formData.priceType}
                                onValueChange={(val: string) => {
                                    if (val === 'fixed' || val === 'range') {
                                        updateField('priceType', val);
                                    }
                                }}
                            >
                                <SelectTrigger 
                                    id="priceType"
                                    className="rounded-xl border-slate-200 focus:ring-blue-500 h-11 transition-shadow"
                                >
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fixed">Fixed</SelectItem>
                                    <SelectItem value="range">Range</SelectItem>
                                </SelectContent>
                            </Select>
                        </FieldWrapper>
                    </div>

                    <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 -mx-6 -mb-6 flex justify-end gap-3 mt-8">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="rounded-xl border-slate-200 text-slate-700 bg-white hover:bg-slate-50 h-11 px-5"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading || !isFormValid}
                            className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white min-w-[120px] h-11 px-5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            {isEditing ? 'Save Changes' : 'Create Sub-Service'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

// Reusable field wrapper for consistent layout and error handling
function FieldWrapper({ 
    id, 
    label, 
    error, 
    children, 
    required 
}: { 
    id: string;
    label: string;
    error?: string;
    children: React.ReactNode;
    required?: boolean;
}) {
    return (
        <div className="space-y-2 flex flex-col">
            <Label htmlFor={id} className="text-slate-700 font-medium inline-flex items-center gap-1">
                {label}
                {required && <span className="text-red-500 font-bold" aria-hidden="true">*</span>}
            </Label>
            {children}
            {error && (
                <span className="text-sm text-red-500 mt-1 animate-in slide-in-from-top-1 fade-in duration-200" role="alert">
                    {error}
                </span>
            )}
        </div>
    );
}
