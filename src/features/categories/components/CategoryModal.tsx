import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Category, CategoriesService } from '../categories.service';
import * as LucideIcons from 'lucide-react';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  category?: Category | null;
}

export function CategoryModal({ isOpen, onClose, onSaved, category }: CategoryModalProps) {
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    description: '',
    icon: 'Package',
    imageUrl: '',
    status: 'active',
    slug: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        icon: category.icon || category.iconKey || 'Package',
        imageUrl: category.imageUrl || '',
        status: category.status || 'active',
        slug: category.slug || ''
      });
    } else {
      setFormData({
        name: '',
        description: '',
        icon: 'Package',
        imageUrl: '',
        status: 'active',
        slug: ''
      });
    }
  }, [category, isOpen]);

  const handleChange = (field: keyof Category, value: any) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      if (field === 'name' && !category) { // Auto-generate slug for new categories
        updated.slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (category && category._id) {
        await CategoriesService.updateCategory(category._id, formData);
      } else {
        await CategoriesService.createCategory(formData);
      }
      onSaved();
      onClose();
    } catch (error) {
      console.error('Failed to save category', error);
      // Ideally show toast notification here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>{category ? 'Edit Category' : 'Add Category'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label htmlFor="name">Category Name <span className="text-red-500">*</span></Label>
              <Input 
                id="name" 
                value={formData.name} 
                onChange={e => handleChange('name', e.target.value)} 
                required 
                placeholder="e.g. Home Cleaning"
              />
            </div>
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label htmlFor="slug">SEO Slug</Label>
              <Input 
                id="slug" 
                value={formData.slug} 
                onChange={e => handleChange('slug', e.target.value)} 
                placeholder="home-cleaning"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
            <Textarea 
              id="description" 
              value={formData.description} 
              onChange={e => handleChange('description', e.target.value)} 
              required 
              rows={3}
              placeholder="Professional home and office cleaning services."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Cover Image URL</Label>
            <Input 
              id="imageUrl" 
              value={formData.imageUrl} 
              onChange={e => handleChange('imageUrl', e.target.value)} 
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="flex items-center justify-between border rounded-xl p-4">
            <div className="space-y-0.5">
              <Label>Status</Label>
              <p className="text-sm text-slate-500">
                {formData.status === 'active' ? 'Category is visible.' : 'Category is hidden.'}
              </p>
            </div>
            <Switch 
              checked={formData.status === 'active'}
              onCheckedChange={checked => handleChange('status', checked ? 'active' : 'inactive')}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Category'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
