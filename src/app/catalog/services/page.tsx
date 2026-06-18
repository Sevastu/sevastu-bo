'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { fetchServices, fetchCategories, deleteService } from '@/features/services/api';
import { Service, Category } from '@/features/services/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dropdown } from '@/components/ui/dropdown';
import { KPICard } from '@/components/ui/KPICard';
import { Plus, Search, MoreVertical, Edit, Copy, Archive, Trash2, Layers, Briefcase, CheckCircle, XCircle } from 'lucide-react';
import { ServiceModal } from '@/features/services/components/ServiceModal';
import * as LucideIcons from 'lucide-react';
import { toast } from 'sonner';

const FALLBACK_IMAGE = 'https://placehold.co/600x400/f8fafc/94a3b8?text=No+Image';

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + ' years ago';
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + ' months ago';
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + ' days ago';
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + ' hours ago';
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + ' minutes ago';
  return Math.floor(seconds) + ' seconds ago';
}

// Custom hook for debouncing
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

function ServicesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlCategoryId = searchParams?.get('categoryId') || null;

  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(urlCategoryId || 'all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortFilter, setSortFilter] = useState<string>('newest');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const isCategoryMode = !!urlCategoryId;
  const activeCategory = categories.find(c => c._id === urlCategoryId);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const cats = await fetchCategories();
      setCategories(cats);

      const filterId = isCategoryMode ? urlCategoryId : (selectedCategoryId !== 'all' ? selectedCategoryId : undefined);
      
      const srvs = await fetchServices({
        categoryId: filterId,
        search: debouncedSearch || undefined,
        status: statusFilter !== 'all' ? statusFilter : undefined,
        sort: sortFilter
      });
      setServices(srvs);
    } catch (error) {
      console.error('Failed to fetch data', error);
      toast.error('Failed to load services');
    } finally {
      setIsLoading(false);
    }
  };

  // Reload when filters change
  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlCategoryId, selectedCategoryId, isCategoryMode, debouncedSearch, statusFilter, sortFilter]);

  const handleDelete = async (service: Service) => {
    if (window.confirm(`Are you sure you want to delete "${service.name}"?`)) {
      try {
        await deleteService(service._id);
        toast.success('Service deleted successfully');
        loadData();
      } catch (error) {
        toast.error('Failed to delete service');
      }
    }
  };

  const getCategoryName = (id: string | Category) => {
    if (typeof id === 'object') return id.name;
    const cat = categories.find(c => c._id === id);
    return cat ? cat.name : 'Unknown Category';
  };

  const renderIcon = (iconName?: string) => {
    if (!iconName) return <LucideIcons.Package className="w-5 h-5 text-blue-600" />;
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="w-5 h-5 text-blue-600" /> : <LucideIcons.Package className="w-5 h-5 text-blue-600" />;
  };

  // Calculate KPIs
  const stats = {
    total: services.length,
    active: services.filter(s => s.isActive).length,
    inactive: services.filter(s => !s.isActive).length,
    subServices: services.reduce((acc, s) => acc + (s.subServiceCount || 0), 0)
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <div className="text-sm text-slate-500 mb-6 flex items-center gap-2">
          <span>Catalog</span>
          <span>/</span>
          {isCategoryMode && activeCategory ? (
            <>
              <span className="cursor-pointer hover:text-blue-600" onClick={() => router.push('/catalog/categories')}>Categories</span>
              <span>/</span>
              <span>{activeCategory.name}</span>
              <span>/</span>
            </>
          ) : null}
          <span className="text-slate-900 font-medium">Services</span>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              {isCategoryMode && activeCategory ? `${activeCategory.name}` : 'All Services'}
            </h1>
            <p className="text-slate-500 mt-1">
              {isCategoryMode ? 'Manage services within this category.' : 'Manage all marketplace services across every category.'}
            </p>
          </div>
          <Button 
            onClick={() => { setEditingService(null); setIsModalOpen(true); }}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition-all duration-200 ease-out"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Service
          </Button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KPICard title="Total Services" value={stats.total.toString()} icon={<Briefcase className="w-6 h-6" />} change="+0%" changeType="increase" />
          <KPICard title="Active Services" value={stats.active.toString()} icon={<CheckCircle className="w-6 h-6" />} change="+0%" changeType="increase" />
          <KPICard title="Inactive Services" value={stats.inactive.toString()} icon={<XCircle className="w-6 h-6" />} change="+0%" changeType="decrease" />
          <KPICard title="Total Sub-services" value={stats.subServices.toString()} icon={<Layers className="w-6 h-6" />} change="+0%" changeType="increase" />
        </div>

        {/* Filters */}
        <Card className="mb-8 rounded-xl shadow-sm border-slate-100">
          <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search services..." 
                className="pl-9 w-full bg-slate-50 border-slate-200"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex w-full md:w-auto gap-4">
              {!isCategoryMode && (
                <div className="w-full sm:w-48">
                  <select 
                    className="w-full h-10 px-3 py-2 rounded-md border border-slate-200 bg-slate-50 text-sm"
                    value={selectedCategoryId}
                    onChange={e => setSelectedCategoryId(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="w-full sm:w-40">
                <select 
                  className="w-full h-10 px-3 py-2 rounded-md border border-slate-200 bg-slate-50 text-sm"
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="w-full sm:w-48">
                <select 
                  className="w-full h-10 px-3 py-2 rounded-md border border-slate-200 bg-slate-50 text-sm"
                  value={sortFilter}
                  onChange={e => setSortFilter(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name_asc">Name A-Z</option>
                  <option value="name_desc">Name Z-A</option>
                  <option value="sub_services">Most Sub-services</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Grid */}
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
        ) : services.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-slate-100">
            <Briefcase className="w-16 h-16 mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-semibold text-slate-900">No services found</h3>
            <p className="text-slate-500 mt-2 mb-6">Create your first service to get started.</p>
            <Button 
              onClick={() => { setEditingService(null); setIsModalOpen(true); }}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >
              Create First Service
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map(service => (
              <div 
                key={service._id} 
                className="group bg-white rounded-xl shadow-[0_4px_20px_rgba(41,52,61,0.04)] border border-slate-100 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-200 ease-out flex flex-col"
              >
                {/* Image Header */}
                <div className="relative h-40 bg-slate-100 overflow-hidden shrink-0">
                  <img 
                    src={service.imageUrl || FALLBACK_IMAGE} 
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    onError={(e) => (e.currentTarget.src = FALLBACK_IMAGE)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                  
                  {/* Floating Icon */}
                  <div className="absolute -bottom-6 left-5 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-slate-50 group-hover:shadow-blue-100 group-hover:shadow-lg transition-shadow duration-200 z-10">
                    {renderIcon(service.icon)}
                  </div>

                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className={`text-[10px] uppercase font-bold tracking-wider ${service.isActive ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {service.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>

                {/* Card Content */}
                <div className="pt-8 px-5 pb-5 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-[18px] font-semibold text-slate-900 leading-tight">
                        {service.name}
                      </h3>
                      <p className="text-xs text-blue-600 font-medium mt-1 mb-3">
                        {getCategoryName(service.categoryId)}
                      </p>
                    </div>
                    <Dropdown
                      className="w-48 bg-white shadow-md border border-slate-100 z-20"
                      trigger={
                        <button className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      }
                    >
                      <button onClick={() => { setEditingService(service); setIsModalOpen(true); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center">
                        <Edit className="w-4 h-4 mr-2" /> Edit Service
                      </button>
                      <button onClick={() => router.push(`/catalog/sub-services?serviceId=${service._id}`)} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center">
                        <Layers className="w-4 h-4 mr-2" /> View Sub-services
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center">
                        <Copy className="w-4 h-4 mr-2" /> Duplicate Service
                      </button>
                      <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center">
                        <Archive className="w-4 h-4 mr-2" /> Archive Service
                      </button>
                      <button onClick={() => handleDelete(service)} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center">
                        <Trash2 className="w-4 h-4 mr-2" /> Delete Service
                      </button>
                    </Dropdown>
                  </div>

                  <p className="text-[13px] text-slate-500 line-clamp-2 mb-4 flex-1">
                    {service.description || 'No description provided.'}
                  </p>

                  <div className="flex gap-2 mb-4">
                    <div className="bg-slate-50 rounded-lg p-2 text-center border border-slate-100 flex-1">
                      <div className="text-lg font-semibold text-slate-700">{service.subServiceCount || 0}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Sub-services</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2 text-center border border-slate-100 flex-1">
                      <div className="text-lg font-semibold text-slate-700">{service.activeWorkerCount || 0}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">Workers</div>
                    </div>
                  </div>

                  {/* Actions & Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => { setEditingService(service); setIsModalOpen(true); }} className="rounded-lg h-8 px-3 text-[13px]">
                        Edit
                      </Button>
                      <Button variant="secondary" size="sm" onClick={() => router.push(`/catalog/sub-services?serviceId=${service._id}`)} className="rounded-lg h-8 px-3 text-[13px] bg-slate-100 hover:bg-slate-200 text-slate-700">
                        View Sub-services
                      </Button>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Updated {service.createdAt ? timeAgo(service.createdAt) : 'recently'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <ServiceModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSaved={loadData}
          service={editingService}
          categories={categories}
          lockedCategoryId={isCategoryMode ? urlCategoryId : null}
        />
      </div>
    </div>
  );
}

import { AppLayout } from '@/components/layout/AppLayout';

export default function ServicesPage() {
  return (
    <AppLayout>
      <Suspense fallback={<div className="p-8">Loading Services...</div>}>
        <ServicesContent />
      </Suspense>
    </AppLayout>
  );
}
