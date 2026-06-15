import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    Edit, Trash2, PowerOff, ChevronRight, Clock,
    IndianRupee, Calendar, Hash, ImageIcon, Globe,
    Star, TrendingUp, CheckCircle2, Activity, Link as LinkIcon,
    Search, Loader2, Info, UploadCloud
} from "lucide-react";
import { CatalogEntityType, Category, Service, SubService } from "@/features/services/types";
import Image from "next/image";
import { toast } from "sonner";

type DrawerNode = Category | Service | SubService;

interface MarketplaceDetailsPanelProps {
    type: CatalogEntityType | null;
    node: DrawerNode | null;
    breadcrumbs?: string[];
    onEdit?: (type: CatalogEntityType, id: string) => void;
    onDelete?: (type: CatalogEntityType, id: string) => void;
    onUpdate?: (type: CatalogEntityType, id: string, payload: PartialCatalogEntity) => Promise<void>;
}

interface BaseCatalogEntity {
    _id: string;
    createdAt: string;
    updatedAt: string;
}

type PartialCatalogEntity = Partial<Category> | Partial<Service> | Partial<SubService>;

export function MarketplaceDetailsPanel({
    type,
    node,
    breadcrumbs = [],
    onEdit,
    onDelete,
    onUpdate
}: MarketplaceDetailsPanelProps) {
    const [updating, setUpdating] = useState(false);

    if (!node || !type) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-slate-50/50 dark:bg-zinc-950/50 border rounded-xl m-4">
                <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-zinc-900 flex items-center justify-center mb-4">
                    <Info className="h-6 w-6 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">No Item Selected</h3>
                <p className="text-sm text-slate-500 max-w-[250px]">
                    Select a Category, Service, or Sub-Service from the catalog tree to view and manage its details.
                </p>
            </div>
        );
    }

    const handleToggle = async (field: string, checked: boolean) => {
        if (!onUpdate) return;
        setUpdating(true);
        try {
            if (type === 'subService') {
                const subNode = node as SubService;
                await onUpdate(type, node._id, { marketplace: { ...subNode.marketplace, [field]: checked } });
            } else {
                await onUpdate(type, node._id, { [field]: checked });
            }
            toast.success(`Marketplace settings updated.`);
        } catch (e) {
            toast.error(`Failed to update settings.`);
        } finally {
            setUpdating(false);
        }
    };

    const handleStatusToggle = async () => {
        if (!onUpdate) return;
        setUpdating(true);
        try {
            await onUpdate(type, node._id, { isActive: !node.isActive });
            toast.success(node.isActive ? 'Deactivated successfully' : 'Activated successfully');
        } catch (e) {
            toast.error(`Failed to update status.`);
        } finally {
            setUpdating(false);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="flex flex-col h-full bg-card rounded-lg shadow-sm relative overflow-hidden">

            {/* Hero Header */}
            <div className="bg-card px-4 py-4 flex flex-col gap-4 relative overflow-hidden border-b-1 border-b-blue-900/20 mb-2">
                {/* <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" /> */}

                <div className="flex items-start justify-between relative z-10">
                    <div className="space-y-1">
                        {/* Breadcrumbs Hierarchy */}
                        <div className="flex items-center flex-wrap gap-1 text-xs font-medium text-black mb-3">
                            {breadcrumbs.map((item, index) => (
                                <React.Fragment key={`${item}-${index}`}>
                                    <span
                                        className={
                                            index === breadcrumbs.length - 1
                                                ? "text-primary font-semibold"
                                                : ""
                                        }
                                    >
                                        {item}
                                    </span>

                                    {index < breadcrumbs.length - 1 && (
                                        <ChevronRight className="h-3 w-3" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="flex items-center justify-between gap-3">
                            <h2 className="text-3xl font-bold tracking-tight text-black mb-2">
                                {node.name}
                            </h2>
                            <Badge
                                variant="outline"
                                className="uppercase text-[10px] tracking-wider font-semibold border-primary text-primary bg-primary/5"
                            >
                                {type}
                            </Badge>
                        </div>
                        {('slug' in node && node.slug) && (
                            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                                <LinkIcon className="h-3.5 w-4.5" />
                                <span>/{node.slug}</span>
                            </div>
                        )}
                    </div>
                    <Badge
                        variant={node.isActive ? "default" : "secondary"}
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${node.isActive ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' : ''}`}
                    >
                        {node.isActive ? "Active" : "Inactive"}
                    </Badge>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-[95%] leading-relaxed relative z-10 mt-2">
                    {node.description || ('shortDescription' in node && node.shortDescription) || <span className="italic opacity-60">No description provided.</span>}
                </p>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 relative">

                {/* System Metadata Section */}
                <section>
                    <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                        <Activity className="h-4 w-4 text-primary" />
                        System Metadata
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-primary/10 p-3 rounded-lg flex items-center gap-3">
                            <div className="p-2 bg-primary/20 rounded-lg shadow-sm"><Hash className="h-4 w-4 text-primary" /></div>
                            <div className="min-w-0">
                                <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider truncate">Entity ID</p>
                                <p className="text-xs font-mono font-medium truncate">{node._id}</p>
                            </div>
                        </div>
                        <div className="bg-primary/10 p-3 rounded-lg flex items-center gap-3">
                            <div className="p-2 bg-primary/20 rounded-lg shadow-sm"><Activity className="h-4 w-4 text-primary" /></div>
                            <div>
                                <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Sort Order</p>
                                <p className="text-sm font-medium">{node.order}</p>
                            </div>
                        </div>
                        <div className="bg-primary/10 p-3 rounded-lg flex items-center gap-3">
                            <div className="p-2 bg-primary/20 rounded-lg shadow-sm"><Calendar className="h-4 w-4 text-primary" /></div>
                            <div>
                                <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Created</p>
                                <p className="text-xs font-medium">{formatDate(node.createdAt)}</p>
                            </div>
                        </div>
                        <div className="bg-primary/10 p-3 rounded-lg flex items-center gap-3">
                            <div className="p-2 bg-primary/20 rounded-lg shadow-sm"><Clock className="h-4 w-4 text-primary" /></div>
                            <div>
                                <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Updated</p>
                                <p className="text-xs font-medium">{formatDate((node as unknown as BaseCatalogEntity).updatedAt || node.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Media Assets Section */}
                {(type === 'category' || type === 'service') && (
                    <section>
                        <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                            <ImageIcon className="h-4 w-4 text-primary" />
                            Media Assets
                        </h4>
                        <div className="bg-white overflow-hidden">
                            {('iconUrl' in node && node.iconUrl) ? (
                                <div className="p-4 flex items-center gap-4">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border bg-slate-50 dark:bg-zinc-950 p-2 shadow-sm">
                                        <Image src={node.iconUrl} alt={node.name} fill className="object-contain p-1" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Category Icon</p>
                                        <p className="text-xs text-muted-foreground">High-resolution vector</p>
                                    </div>
                                </div>
                            ) : ('imageUrl' in node && node.imageUrl) ? (
                                <div className="p-4 flex gap-4">
                                    <div className="relative w-32 h-20 rounded-lg overflow-hidden border shadow-sm">
                                        <Image src={node.imageUrl} alt={node.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1 py-1">
                                        <p className="text-sm font-medium">Service Cover Image</p>
                                        <p className="text-xs text-muted-foreground">Displayed on category listings</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center bg-primary/10">
                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                        <ImageIcon className="h-5 w-5 text-slate-400" />
                                    </div>
                                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No media uploaded</p>
                                    <p className="text-xs text-muted-foreground mt-1 max-w-[250px] mb-4">Enhance visibility by adding high-quality assets.</p>
                                    <Button variant="outline" size="sm" className="gap-2 h-8 text-xs font-medium" onClick={() => onEdit?.(type, node._id)}>
                                        <UploadCloud className="h-3.5 w-3.5" />
                                        Upload Asset
                                    </Button>
                                </div>
                            )}
                        </div>
                    </section>
                )}

                {/* SubService specific: Operations & Pricing */}
                {type === 'subService' && (
                    <section className="space-y-8">
                        <div>
                            <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                                <TrendingUp className="h-4 w-4 text-primary" />
                                Economics & Operations
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                {/* Pricing KPI Card */}
                                <div className="bg-red-200 rounded-lg p-5 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
                                    <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity"><IndianRupee className="h-16 w-16" /></div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300">
                                            {('priceType' in node) ? node.priceType : 'Fixed'} Price
                                        </Badge>
                                    </div>
                                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1 mt-4">Base Rate</p>
                                    <div className="flex items-end gap-1">
                                        <span className="text-xl font-semibold text-slate-500">₹</span>
                                        <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-card">
                                            {('basePrice' in node) ? node.basePrice : 0}
                                        </span>
                                    </div>
                                    {('pricing' in node && node.pricing) && (
                                        <div className="flex flex-col gap-1 mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800 text-xs font-medium text-muted-foreground">
                                            {node.pricing.minimumPrice && <div className="flex justify-between"><span>Minimum</span> <span className="text-slate-700 dark:text-slate-300">₹{node.pricing.minimumPrice}</span></div>}
                                            {node.pricing.maximumPrice && <div className="flex justify-between"><span>Maximum</span> <span className="text-slate-700 dark:text-slate-300">₹{node.pricing.maximumPrice}</span></div>}
                                        </div>
                                    )}
                                </div>

                                {/* Duration KPI Card */}
                                <div className="bg-red-200 rounded-lg p-5 shadow-sm relative overflow-hidden group hover:border-primary/30 transition-colors">
                                    <div className="absolute top-0 right-0 p-3 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity"><Clock className="h-16 w-16" /></div>
                                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 mb-2">
                                        Execution Time
                                    </Badge>
                                    <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1 mt-4">Est. Duration</p>
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-card">
                                            {('estimatedDurationMinutes' in node) ? node.estimatedDurationMinutes : 60}
                                        </span>
                                        <span className="text-sm font-semibold text-slate-500">minutes</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Marketplace Visibility Flags */}
                        <div>
                            <h4 className="text-sm font-bold mb-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Star className="h-4 w-4 text-primary" />
                                    Marketplace Positioning
                                </div>
                            </h4>
                            <div className="bg-white rounded-lg divide-y divide-slate-100 dark:divide-zinc-800 overflow-hidden shadow-sm">

                                <div className="p-4 flex items-center justify-between hover:bg-primary/10 transition-colors">
                                    <div className="space-y-1 pr-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold">Featured Placement</span>
                                            {('marketplace' in node && node.marketplace?.featured) && <Badge variant="outline" className="h-5 px-1.5 text-[9px] bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800/50 uppercase tracking-wider font-bold">Featured</Badge>}
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-snug">Pin this service to the top of homepage discovery feeds.</p>
                                    </div>
                                    <Switch
                                        checked={!!('marketplace' in node && node.marketplace?.featured)}
                                        onCheckedChange={(c) => handleToggle('featured', c)}
                                        disabled={updating || !onUpdate}
                                    />
                                </div>

                                <div className="p-4 flex items-center justify-between hover:bg-primary/10 transition-colors">
                                    <div className="space-y-1 pr-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold">Popular Badge</span>
                                            {('marketplace' in node && node.marketplace?.popular) && <Badge variant="outline" className="h-5 px-1.5 text-[9px] bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50 uppercase tracking-wider font-bold">Popular</Badge>}
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-snug">Add a 'Popular' highlight to drive higher conversion rates.</p>
                                    </div>
                                    <Switch
                                        checked={!!('marketplace' in node && node.marketplace?.popular)}
                                        onCheckedChange={(c) => handleToggle('popular', c)}
                                        disabled={updating || !onUpdate}
                                    />
                                </div>

                                <div className="p-4 flex items-center justify-between hover:bg-primary/10 transition-colors">
                                    <div className="space-y-1 pr-4">
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold">Search Indexing</span>
                                            {('marketplace' in node && node.marketplace?.searchable) && <Badge variant="outline" className="h-5 px-1.5 text-[9px] bg-emerald-50 text-emerald-700 border-emerald-200 uppercase tracking-wider font-bold">Indexed</Badge>}
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-snug">Allow customers to find this via the global search bar.</p>
                                    </div>
                                    <Switch
                                        checked={!!('marketplace' in node && node.marketplace?.searchable)}
                                        onCheckedChange={(c) => handleToggle('searchable', c)}
                                        disabled={updating || !onUpdate}
                                    />
                                </div>

                            </div>
                        </div>
                    </section>
                )}

                {/* Universal SEO Section */}
                <section >
                    <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" />
                        Search Engine Optimization
                    </h4>
                    {('seo' in node && (node.seo?.metaTitle || node.seo?.metaDescription)) ? (
                        <div className="p-5 bg-primary/20 border border-slate-200 rounded-lg shadow-sm hover:border-blue-500/30 transition-colors cursor-default">
                            <p className="text-primary font-medium text-lg hover:underline cursor-pointer truncate mb-0.5">
                                {node.seo.metaTitle || node.name}
                            </p>
                            <div className="flex items-center gap-1.5 mb-2">
                                <span className="text-emerald-700 dark:text-emerald-500 text-sm font-medium">sevastu.com</span>
                                <ChevronRight className="h-3 w-3 text-slate-400" />
                                <span className="text-slate-500 text-sm">{('slug' in node && node.slug) ? node.slug : '...'}</span>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                {node.seo.metaDescription || ('shortDescription' in node ? node.shortDescription : '') || node.description}
                            </p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center bg-primay/10 border border-slate-200 dark:border-zinc-800 border-dashed rounded-xl">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">SEO not configured</p>
                            <p className="text-xs text-muted-foreground mt-1 max-w-[250px] mb-4">Add a meta title and description to improve external search rankings.</p>
                            <Button variant="outline" size="sm" className="gap-2 h-8 text-xs font-medium" onClick={() => onEdit?.(type, node._id)}>
                                <Edit className="h-3.5 w-3.5" />
                                Edit SEO Settings
                            </Button>
                        </div>
                    )}
                </section>
            </div>

            {/* Sticky Action Footer */}
            <div className="border-t bg-card p-4 flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.02)] relative z-20">
                <Button
                    variant="outline"
                    onClick={() => onEdit?.(type, node._id)}
                    className="gap-2 font-semibold shadow-sm bg-primary"
                    disabled={updating}
                >
                    <Edit className="h-4 w-4" />
                    Edit Details
                </Button>
                <div className="flex items-center gap-2">
                    <Button
                        variant="secondary"
                        onClick={handleStatusToggle}
                        className="gap-2 shadow-sm bg-slate-100 hover:bg-slate-200 font-semibold"
                        disabled={updating}
                    >
                        {updating ? <Loader2 className="h-4 w-4 animate-spin" /> : <PowerOff className={`h-4 w-4 ${node.isActive ? 'text-rose-500' : 'text-emerald-500'}`} />}
                        {node.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => onDelete?.(type, node._id)}
                        className="gap-2 shadow-sm"
                        disabled={updating}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
