import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FolderTree, Component, Layers, CheckCircle2, XCircle } from "lucide-react";

interface CatalogOverview {
    categories: number;
    services: number;
    subServices: number;
    activeItems: number;
    inactiveItems: number;
}

interface CatalogStats {
    categoryCount: number;
    serviceCount: number;
    subServiceCount: number;
    activeCount: number;
    inactiveCount: number;
}

export function CatalogDashboardCards({ stats }: { stats: CatalogOverview | CatalogStats | null }) {
    if (!stats) return null;

    // Handle both old and new API response structures
    const categories = 'categories' in stats ? stats.categories : stats.categoryCount;
    const services = 'services' in stats ? stats.services : stats.serviceCount;
    const subServices = 'subServices' in stats ? stats.subServices : stats.subServiceCount;
    const activeItems = 'activeItems' in stats ? stats.activeItems : stats.activeCount;
    const inactiveItems = 'inactiveItems' in stats ? stats.inactiveItems : stats.inactiveCount;

    return (
        <div className="w-full grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <Card className="border-none bg-card rounded-lg">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-md font-medium text-muted-foreground mb-2">Categories</p>
                            <h3 className="text-3xl font-bold text-muted-foreground tracking-tight">{categories}</h3>
                        </div>
                        <div className="p-3 bg-primary/20 rounded-3xl">
                            <FolderTree className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none bg-card rounded-lg">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-md font-medium text-muted-foreground mb-2">Services</p>
                            <h3 className="text-3xl font-bold text-muted-foreground tracking-tight">{services}</h3>
                        </div>
                        <div className="p-3 bg-primary/20 rounded-3xl">
                            <Layers className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none bg-card rounded-lg">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-md font-medium text-muted-foreground mb-2">Sub-Services</p>
                            <h3 className="text-3xl font-bold text-muted-foreground tracking-tight">{subServices}</h3>
                        </div>
                        <div className="p-3 bg-primary/20 rounded-3xl">
                            <Component className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none bg-card rounded-lg">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-md font-medium text-green-500 mb-2">Active</p>
                            <h3 className="text-3xl font-bold text-muted-foreground tracking-tight">{activeItems}</h3>
                        </div>
                        <div className="p-3 bg-green-100 rounded-3xl">
                            <CheckCircle2 className="h-6 w-6 text-green-500" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-none bg-card rounded-lg">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-md font-medium text-red-500 mb-2">Inactive</p>
                            <h3 className="text-3xl font-bold text-muted-foreground/50 tracking-tight">{inactiveItems}</h3>
                        </div>
                        <div className="p-3 rounded-3xl bg-red-100">
                            <XCircle className="h-6 w-6 text-red-500" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
