import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Service, Category } from '../types';
import { createService, updateService } from '../api';
import { Loader2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  service?: Service | null;
  categories: Category[];
  lockedCategoryId?: string | null;
}

export function ServiceModal({ isOpen, onClose, onSaved, service, categories, lockedCategoryId }: ServiceModalProps) {
  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    description: '',
    icon: 'Package',
    imageUrl: '',
    isActive: true,
    categoryId: lockedCategoryId || '',
    slug: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || '',
        description: service.description || '',
        icon: service.icon || 'Package',
        imageUrl: service.imageUrl || '',
        isActive: service.isActive !== undefined ? service.isActive : true,
        categoryId: typeof service.categoryId === 'string' ? service.categoryId : service.categoryId._id,
        slug: service.slug || ''
      });
    } else {
      setFormData({
        name: '',
        description: '',
        icon: 'Package',
        imageUrl: '',
        isActive: true,
        categoryId: lockedCategoryId || (categories.length > 0 ? categories[0]._id : ''),
        slug: ''
      });
    }
    setIsDirty(false);
  }, [service, isOpen, lockedCategoryId, categories]);

  const handleChange = (field: keyof Service, value: any) => {
    setIsDirty(true);
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'name' && !service) {
        updated.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }
      return updated;
    });
  };

  const handleClose = () => {
    if (isDirty) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to discard them?');
      if (!confirm) return;
    }
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (service && service._id) {
        await updateService(service._id, formData);
      } else {
        await createService(formData);
      }
      onSaved();
      onClose();
    } catch (error) {
      console.error('Failed to save service', error);
      alert('Unable to save service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-5 h-5 text-primary" /> : <LucideIcons.Package className="w-5 h-5 text-primary" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[720px]">
        <DialogHeader>
          <DialogTitle>{service ? 'Edit Service' : 'Add Service'}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
          {/* Form Column */}
          <form id="serviceForm" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Service Name <span className="text-destructive">*</span></Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={e => handleChange('name', e.target.value)} 
                required 
                minLength={3}
                maxLength={50}
                placeholder="e.g. Deep Cleaning"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoryId">Parent Category <span className="text-destructive">*</span></Label>
              <select 
                id="categoryId"
                className="w-full h-10 px-3 py-2 rounded-md border border-border bg-card text-sm"
                value={formData.categoryId as string}
                onChange={e => handleChange('categoryId', e.target.value)}
                disabled={!!lockedCategoryId && !service}
                required
              >
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">SEO Slug</Label>
              <Input 
                id="slug" 
                value={formData.slug} 
                onChange={e => handleChange('slug', e.target.value)} 
                placeholder="deep-cleaning"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="description">Description <span className="text-destructive">*</span></Label>
                <span className="text-xs text-muted-foreground">{formData.description?.length || 0} / 300</span>
              </div>
              <Textarea 
                id="description" 
                value={formData.description} 
                onChange={e => handleChange('description', e.target.value)} 
                required 
                maxLength={300}
                rows={3}
                placeholder="Detailed cleaning service covering every corner."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="icon">Icon Name <span className="text-destructive">*</span></Label>
              <Input 
                id="icon" 
                value={formData.icon} 
                onChange={e => handleChange('icon', e.target.value)} 
                placeholder="Sparkles"
                required
              />
              <p className="text-xs text-muted-foreground">E.g., Sparkles, Brush, Zap. (Icon Picker Mock)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">Cover Image URL <span className="text-destructive">*</span></Label>
              <Input 
                id="imageUrl" 
                value={formData.imageUrl} 
                onChange={e => handleChange('imageUrl', e.target.value)} 
                placeholder="https://example.com/image.jpg"
                required
              />
              <p className="text-xs text-muted-foreground">Drag-and-drop Image Uploader Mock.</p>
            </div>

            <div className="flex items-center justify-between border rounded-xl p-4">
              <div className="space-y-0.5">
                <Label>Status</Label>
                <p className="text-sm text-muted-foreground">
                  {formData.isActive ? 'Service is active.' : 'Service is hidden.'}
                </p>
              </div>
              <Switch 
                checked={formData.isActive}
                onCheckedChange={checked => handleChange('isActive', checked)}
              />
            </div>
          </form>

          {/* Live Preview Column */}
          <div className="hidden md:block">
            <Label className="mb-4 block">Live Preview</Label>
            <div className="bg-card rounded-xl shadow-[0_4px_20px_rgba(41,52,61,0.04)] border border-border overflow-hidden flex flex-col h-[380px]">
              <div className="relative h-40 bg-muted overflow-hidden shrink-0">
                <img 
                  src={formData.imageUrl || 'https://placehold.co/600x400/f8fafc/94a3b8?text=No+Image'} 
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider ${formData.isActive ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`}>
                    {formData.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="absolute -bottom-6 left-5 w-12 h-12 bg-card rounded-full shadow-md flex items-center justify-center border border-border">
                  {renderIcon(formData.icon || 'Package')}
                </div>
              </div>
              <div className="pt-8 px-5 pb-5 flex flex-col flex-1">
                <h3 className="text-[18px] font-semibold text-foreground leading-tight">
                  {formData.name || 'Service Name'}
                </h3>
                <p className="text-xs text-primary font-medium mt-1 mb-3">
                  {categories.find(c => c._id === formData.categoryId)?.name || 'Parent Category'}
                </p>
                <p className="text-[13px] text-muted-foreground line-clamp-2">
                  {formData.description || 'Service description will appear here.'}
                </p>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" form="serviceForm" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Saving...' : 'Save Service'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
