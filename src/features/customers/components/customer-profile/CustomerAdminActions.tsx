import React, { memo } from 'react';
import { Shield, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CustomerAdminActionsProps {
    onBlockUser: () => void;
    customerId: string;
}

export const CustomerAdminActions = memo(function CustomerAdminActions({
    onBlockUser,
    customerId
}: CustomerAdminActionsProps) {
    return (
        <div className="p-4 bg-card border-t border-border flex items-center gap-3 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.05)] sticky bottom-0 z-10">
            <Button
                onClick={onBlockUser}
                variant="outline"
                className="flex-1 rounded-xl border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive shadow-sm"
            >
                <Shield className="w-4 h-4 mr-2" />
                Block User
            </Button>
            <Button
                variant="default"
                className="flex-1 rounded-xl bg-foreground text-primary-foreground hover:bg-foreground/90 shadow-sm"
                onClick={() => console.log('View Full Profile', customerId)}
            >
                <ExternalLink className="w-4 h-4 mr-2" />
                Full Profile
            </Button>
        </div>
    );
});
