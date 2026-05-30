import type {
    CatalogTreeCategory,
    Category,
    Service,
    SubService,
} from "@/features/services/types";

const DEFAULT_SERVICE_IMAGE =
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=400";

export function getCategoryId(categoryId: string | Category): string {
    return typeof categoryId === "string" ? categoryId : categoryId._id;
}

export function getServiceId(serviceId: string | Service): string {
    return typeof serviceId === "string" ? serviceId : serviceId._id;
}

export function buildCatalogTree(
    categories: Category[],
    services: Service[],
    subServices: SubService[]
): CatalogTreeCategory[] {
    const servicesByCategory = new Map<string, Service[]>();
    for (const service of services) {
        const catId = getCategoryId(service.categoryId);
        const list = servicesByCategory.get(catId) ?? [];
        list.push(service);
        servicesByCategory.set(catId, list);
    }

    const subServicesByService = new Map<string, SubService[]>();
    for (const sub of subServices) {
        const srvId = getServiceId(sub.serviceId);
        const list = subServicesByService.get(srvId) ?? [];
        list.push(sub);
        subServicesByService.set(srvId, list);
    }

    return categories.map((category) => ({
        category,
        services: (servicesByCategory.get(category._id) ?? []).map((service) => ({
            service,
            subServices: subServicesByService.get(service._id) ?? [],
        })),
    }));
}

export { DEFAULT_SERVICE_IMAGE };
