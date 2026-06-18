"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { CategoriesService, Category } from '@/features/categories/categories.service';
import { CategoryModal } from '@/features/categories/components/CategoryModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { KPICard } from '@/components/ui/KPICard';
import * as LucideIcons from 'lucide-react';
import { Plus, Search, MoreVertical, Edit, Copy, Archive, Trash2, Layers, CheckCircle, XCircle, Briefcase } from 'lucide-react';
import { Dropdown } from '@/components/ui/dropdown';

// Fallback image if URL is missing or broken
const FALLBACK_IMAGE = 'https://placehold.co/600x400/f8fafc/94a3b8?text=No+Image';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0, services: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortFilter, setSortFilter] = useState('Newest First');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await CategoriesService.getCategories({
        search,
        status: statusFilter,
        sort: sortFilter,
        limit: 100 // Fetching a larger batch for simplicity, ideally implement proper pagination UI
      });
      setCategories(response.data);
      setStats({
        total: response.stats.totalCategories,
        active: response.stats.activeCategories,
        inactive: response.stats.inactiveCategories,
        services: response.stats.totalServices
      });
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  }, [search, statusFilter, sortFilter]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCategories();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, statusFilter, sortFilter, fetchCategories]);

  const handleAddClick = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (category: Category) => {
    if (category.activeServiceCount > 0) {
      alert('Cannot delete category with active services.');
      return;
    }
    if (confirm(`Are you sure you want to delete ${category.name}?`)) {
      try {
        await CategoriesService.deleteCategory(category._id);
        fetchCategories();
      } catch (error) {
        console.error("Failed to delete category:", error);
      }
    }
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Package;
    return <IconComponent className="w-6 h-6 text-blue-600" />;
  };

  return (
    <AppLayout>
      <div className="p-8 max-w-7xl mx-auto font-manrope bg-slate-50 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Categories</h1>
            <p className="text-slate-500 mt-1">Manage all service categories across the SevaStu marketplace.</p>
          </div>
          <Button onClick={handleAddClick} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all duration-200 ease-out">
            <Plus className="w-4 h-4 mr-2" /> Add Category
          </Button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Total Categories"
            value={stats.total.toString()}
            icon={<Layers className="w-6 h-6" />}
            change="+12%"
            changeType="increase"
          />
          <KPICard
            title="Active Categories"
            value={stats.active.toString()}
            icon={<CheckCircle className="w-6 h-6" />}
            change="+5%"
            changeType="increase"
          />
          <KPICard
            title="Inactive Categories"
            value={stats.inactive.toString()}
            icon={<XCircle className="w-6 h-6" />}
            change="-2%"
            changeType="decrease"
          />
          <KPICard
            title="Total Services"
            value={stats.services.toString()}
            icon={<Briefcase className="w-6 h-6" />}
            change="+8%"
            changeType="increase"
          />
        </div>

        {/* Filters */}
        <Card className="mb-8 rounded-xl shadow-sm border-slate-100">
          <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Search categories..."
                className="pl-9 w-full bg-slate-50 border-slate-200"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px] bg-white">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortFilter} onValueChange={setSortFilter}>
                <SelectTrigger className="w-[160px] bg-white">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Name A-Z">Name A-Z</SelectItem>
                  <SelectItem value="Name Z-A">Name Z-A</SelectItem>
                  <SelectItem value="Newest First">Newest First</SelectItem>
                  <SelectItem value="Oldest First">Oldest First</SelectItem>
                  <SelectItem value="Most Services">Most Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Categories Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-80 bg-white rounded-xl shadow-sm animate-pulse border border-slate-100">
                <div className="h-40 bg-slate-200 rounded-t-xl" />
                <div className="p-5">
                  <div className="h-5 bg-slate-200 rounded w-1/2 mb-4" />
                  <div className="h-4 bg-slate-200 rounded w-full mb-2" />
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-slate-100">
            <Layers className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900">No categories created yet</h3>
            <p className="text-slate-500 mt-2 mb-6">Create your first category to start organizing marketplace services.</p>
            <Button onClick={handleAddClick} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
              Create First Category
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map(category => (
              <div
                key={category._id}
                className="group bg-white rounded-xl shadow-[0_4px_20px_rgba(41,52,61,0.04)] border border-slate-100 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-out flex flex-col"
              >
                {/* Image Header */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                  <img
                    src={category.imageUrl || FALLBACK_IMAGE}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                  />
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant={category.status === 'active' ? 'success' : 'secondary'} className="shadow-sm">
                      {category.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>

                {/* Card Content */}
                <div className="pt-5 px-5 pb-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-[18px] font-semibold text-slate-900 leading-tight">
                      {category.name}
                    </h3>
                    <Dropdown
                      className="w-48 bg-white shadow-md border border-slate-100"
                      trigger={
                        <button className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      }
                    >
                      <button onClick={() => handleEditClick(category)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center">
                        <Edit className="w-4 h-4 mr-2" /> Edit Category
                      </button>
                      <button onClick={() => window.location.href = `/catalog/services?categoryId=${category._id}`} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center">
                        <Layers className="w-4 h-4 mr-2" /> View Services
                      </button>
                      <button onClick={() => handleDeleteClick(category)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                        <Trash2 className="w-4 h-4 mr-2" /> Delete Category
                      </button>
                    </Dropdown>
                  </div>

                  <p className="text-[13px] text-slate-500 line-clamp-2 mb-4 flex-1">
                    {category.description || 'No description provided.'}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-5">
                    <div className="bg-slate-50 rounded-lg p-2 text-center border border-slate-100">
                      <div className="text-lg font-semibold text-slate-700">{category.serviceCount}</div>
                      <div className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Services</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2 text-center border border-slate-100">
                      <div className="text-lg font-semibold text-slate-700">{category.subServiceCount}</div>
                      <div className="text-[11px] text-slate-500 uppercase tracking-wider font-medium">Sub-services</div>
                    </div>
                  </div>

                  {/* Actions & Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditClick(category)} className="rounded-lg h-8 px-3 text-[13px]">
                        Edit
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => window.location.href = `/services?categoryId=${category._id}`} className="rounded-lg h-8 px-3 text-[13px] bg-slate-100 hover:bg-slate-200 text-slate-700">
                        View Services
                      </Button>
                    </div>
                    <div className="text-[12px] text-slate-400">
                      {category.activeServiceCount} Active
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSaved={fetchCategories}
          category={selectedCategory}
        />
      </div>
    </AppLayout>
  );
}
