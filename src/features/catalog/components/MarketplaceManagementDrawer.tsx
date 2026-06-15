import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
    Edit, Trash2, PowerOff, ChevronRight, Clock, 
    IndianRupee, Calendar, Hash, ImageIcon, Globe, 
    Star, TrendingUp, CheckCircle2, Activity, Link as LinkIcon, Search, Loader2
} from "lucide-react";
import { CatalogEntityType, Category, Service, SubService } from "@/features/services/types";
import Image from "next/image";

type DrawerNode = Category | Service | SubService;

interface MarketplaceManagementDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    type: CatalogEntityType | null;
    node: DrawerNode | null;
    onEdit?: (type: CatalogEntityType, id: string) => void;
    onDelete?: (type: CatalogEntityType, id: string) => void;
    onUpdate?: (type: CatalogEntityType, id: string, payload: any) => Promise<void>;
}

export function MarketplaceManagementDrawer({
    open,
    onOpenChange,
    type,
    node,
    onEdit,
    onDelete,
    onUpdate
}: MarketplaceManagementDrawerProps) {
    const [updating, setUpdating] = useState(false);

    if (!node || !type) return null;

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
        } finally {
            setUpdating(false);
        }
    };

    const handleStatusToggle = async () => {
        if (!onUpdate) return;
        setUpdating(true);
        try {
            await onUpdate(type, node._id, { isActive: !node.isActive });
        } finally {
            setUpdating(false);
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-full sm:w-[540px] md:w-[600px] p-0 flex flex-col h-full bg-slate-50 dark:bg-zinc-950 border-l">
                
                {/* Hero Header */}
                <div className="bg-white dark:bg-zinc-900 px-6 py-8 flex flex-col gap-4 relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    
                    <div className="flex items-start justify-between relative z-10">
                        <div className="space-y-1">
                            {/* Breadcrumbs */}
                            <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                                <span>Catalog</span>
                                <ChevronRight className="h-3 w-3" />
                                <span>{type.replace(/([A-Z])/g, ' $1').trim()}</span>
                            </div>
                            <SheetTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                                {node.name}
                            </SheetTitle>
                            {('slug' in node && node.slug) && (
                                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-1">
                                    <LinkIcon className="h-3.5 w-3.5" />
                                    <span>/{node.slug}</span>
                                </div>
                            )}
                        </div>
                        <Badge 
                            variant={node.isActive ? "default" : "secondary"} 
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${node.isActive ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:text-emerald-400' : ''}`}
                        >
                            {node.isActive ? "Active" : "Inactive"}
                        </Badge>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-400 max-w-[90%] leading-relaxed relative z-10">
                        {node.description || ('shortDescription' in node && node.shortDescription) || "No description provided."}
                    </p>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 relative">
                    
                    {/* Metadata Section */}
                    <section>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                            <Activity className="h-4 w-4 text-primary" />
                            System Metadata
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center gap-3">
                                <div className="p-2 bg-slate-100 dark:bg-zinc-800 rounded-lg"><Calendar className="h-4 w-4 text-slate-500" /></div>
                                <div>
                                    <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Created</p>
                                    <p className="text-sm font-medium">{formatDate(node.createdAt)}</p>
                                </div>
                            </div>
                            <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-slate-200 dark:border-zinc-800 flex items-center gap-3">
                                <div className="p-2 bg-slate-100 dark:bg-zinc-800 rounded-lg"><Hash className="h-4 w-4 text-slate-500" /></div>
                                <div>
                                    <p className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Sort Order</p>
                                    <p className="text-sm font-medium">{node.order}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Assets Section */}
                    {(type === 'category' || type === 'service') && (
                        <section>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                                <ImageIcon className="h-4 w-4 text-primary" />
                                Media Assets
                            </h4>
                            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 p-4">
                                {('iconUrl' in node && node.iconUrl) ? (
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden border bg-slate-50 dark:bg-zinc-950 p-2">
                                            <Image src={node.iconUrl} alt={node.name} fill className="object-contain p-1" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">Category Icon</p>
                                            <p className="text-xs text-muted-foreground">High-resolution vector</p>
                                        </div>
                                    </div>
                                ) : ('imageUrl' in node && node.imageUrl) ? (
                                    <div className="flex gap-4">
                                        <div className="relative w-32 h-20 rounded-lg overflow-hidden border shadow-sm">
                                            <Image src={node.imageUrl} alt={node.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium">Service Cover</p>
                                            <p className="text-xs text-muted-foreground">Displayed on category listings</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-6 text-center">
                                        <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
                                            <ImageIcon className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No media uploaded</p>
                                        <p className="text-xs text-muted-foreground mt-1 max-w-[250px]">Upload an image or icon to make this {type} visually appealing in the app.</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}

                    {/* SubService specific: Pricing & Operations */}
                    {type === 'subService' && (
                        <section className="space-y-8">
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-primary" />
                                    Economics & Operations
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    {/* Pricing Metric Card */}
                                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 p-5 shadow-sm relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-3 opacity-10"><IndianRupee className="h-12 w-12" /></div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-semibold bg-slate-50 dark:bg-zinc-950">
                                                {('priceType' in node) ? node.priceType : 'Fixed'} Price
                                            </Badge>
                                        </div>
                                        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1 mt-4">Base Price</p>
                                        <div className="flex items-end gap-1">
                                            <span className="text-xl font-semibold text-slate-500">₹</span>
                                            <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                                {('basePrice' in node) ? node.basePrice : 0}
                                            </span>
                                        </div>
                                        {('pricing' in node && node.pricing) && (
                                            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800 text-xs font-medium text-muted-foreground">
                                                {node.pricing.minimumPrice && <span>Min: ₹{node.pricing.minimumPrice}</span>}
                                                {node.pricing.maximumPrice && <span>Max: ₹{node.pricing.maximumPrice}</span>}
                                            </div>
                                        )}
                                    </div>

                                    {/* Duration Metric Card */}
                                    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 p-5 shadow-sm relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-3 opacity-10"><Clock className="h-12 w-12" /></div>
                                        <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-semibold bg-slate-50 dark:bg-zinc-950 mb-2">
                                            Execution
                                        </Badge>
                                        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-1 mt-4">Est. Duration</p>
                                        <div className="flex items-baseline gap-1.5">
                                            <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                                {('estimatedDurationMinutes' in node) ? node.estimatedDurationMinutes : 60}
                                            </span>
                                            <span className="text-sm font-semibold text-slate-500">minutes</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Marketplace Visibility Flags */}
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Star className="h-4 w-4 text-primary" />
                                        Marketplace Positioning
                                    </div>
                                </h4>
                                <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl divide-y divide-slate-100 dark:divide-zinc-800 overflow-hidden shadow-sm">
                                    
                                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                        <div className="space-y-1 pr-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Featured Placement</span>
                                                {('marketplace' in node && node.marketplace?.featured) && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
                                            </div>
                                            <p className="text-xs text-muted-foreground leading-snug">Pin this service to the top of homepage discovery feeds.</p>
                                        </div>
                                        <Switch 
                                            checked={!!('marketplace' in node && node.marketplace?.featured)} 
                                            onCheckedChange={(c) => handleToggle('featured', c)}
                                            disabled={updating || !onUpdate}
                                        />
                                    </div>

                                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                        <div className="space-y-1 pr-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Popular Badge</span>
                                                {('marketplace' in node && node.marketplace?.popular) && <CheckCircle2 className="h-3 w-3 text-blue-500" />}
                                            </div>
                                            <p className="text-xs text-muted-foreground leading-snug">Add a 'Popular' highlight to drive higher conversion rates.</p>
                                        </div>
                                        <Switch 
                                            checked={!!('marketplace' in node && node.marketplace?.popular)} 
                                            onCheckedChange={(c) => handleToggle('popular', c)}
                                            disabled={updating || !onUpdate}
                                        />
                                    </div>

                                    <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors">
                                        <div className="space-y-1 pr-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">Search Indexing</span>
                                                {('marketplace' in node && node.marketplace?.searchable) && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
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

                            {/* SEO Optimization */}
                            <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                                    <Globe className="h-4 w-4 text-primary" />
                                    Search Engine Optimization
                                </h4>
                                {('seo' in node && (node.seo?.metaTitle || node.seo?.metaDescription)) ? (
                                    <div className="p-5 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-sm">
                                        <p className="text-blue-600 dark:text-blue-400 font-medium text-lg hover:underline cursor-pointer truncate mb-0.5">
                                            {node.seo.metaTitle || node.name}
                                        </p>
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <span className="text-emerald-700 dark:text-emerald-500 text-sm font-medium">sevastu.com</span>
                                            <ChevronRight className="h-3 w-3 text-slate-400" />
                                            <span className="text-slate-500 text-sm">{node.slug || '...'}</span>
                                        </div>
                                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                            {node.seo.metaDescription || node.shortDescription || node.description}
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-8 text-center bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 border-dashed rounded-xl">
                                        <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex items-center justify-center mb-3">
                                            <Search className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300">No SEO data configured</p>
                                        <p className="text-xs text-muted-foreground mt-1 max-w-[250px]">Add a meta title and description to improve external search rankings.</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    )}
                </div>

                {/* Sticky Action Footer */}
                <div className="border-t bg-white dark:bg-zinc-950 p-4 flex items-center justify-between shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                    <Button 
                        variant="outline" 
                        onClick={() => onEdit?.(type, node._id)} 
                        className="gap-2 font-semibold shadow-sm"
                        disabled={updating}
                    >
                        <Edit className="h-4 w-4" />
                        Edit Details
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button 
                            variant="secondary" 
                            onClick={handleStatusToggle} 
                            className="gap-2 shadow-sm bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700"
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
            </SheetContent>
        </Sheet>
    );
}
