import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
    status: string;
    className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
        case 'active':
            return <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>;
        case 'inactive':
            return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inactive</Badge>;
        default:
            return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>;
    }
}
