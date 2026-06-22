import { useState, useEffect, useCallback } from 'react';
import { fetchCustomers, CustomerAnalytics } from '@/features/customers/api';
import { CustomerUI } from '../types/customer-ui.types';

// The backend doesn't have an analytics endpoint, so we aggregate manually on the client side
// by fetching a large chunk of customers (or relying on pagination, but ideally all for accurate stats).

export function useCustomerAnalytics() {
    const [analytics, setAnalytics] = useState<CustomerAnalytics | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadAnalytics = useCallback(async () => {
        setIsLoading(true);
        try {
            // Fetching a large limit just for client-side stats generation
            const result = await fetchCustomers({ limit: 10000 });
            const allCustomers = result.data as CustomerUI[];

            const totalCustomers = allCustomers.length;
            let activeCustomers = 0;
            let inactiveCustomers = 0;
            let totalLtv = 0;
            let currentMonthSignups = 0;

            const now = new Date();
            const currentMonth = now.getMonth();
            const currentYear = now.getFullYear();

            allCustomers.forEach(c => {
                if (c.status === 'active') activeCustomers++;
                else inactiveCustomers++;

                if (c.totalSpent) totalLtv += c.totalSpent;

                if (c.joinedDate) {
                    const joined = new Date(c.joinedDate);
                    if (joined.getMonth() === currentMonth && joined.getFullYear() === currentYear) {
                        currentMonthSignups++;
                    }
                }
            });

            // Very basic retention metric proxy for UI demonstration: 
            // Percentage of active vs total customers (or mock realistic data based on actual activity)
            const retentionRate = totalCustomers > 0 ? Math.round((activeCustomers / totalCustomers) * 100) : 0;
            const averageLifetimeValue = totalCustomers > 0 ? totalLtv / totalCustomers : 0;

            setAnalytics({
                totalCustomers,
                activeCustomers,
                inactiveCustomers,
                retentionRate,
                averageLifetimeValue
            });

        } catch (error) {
            console.error("Failed to fetch customers for analytics:", error);
            setAnalytics(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAnalytics();
    }, [loadAnalytics]);

    return { analytics, isLoading, refresh: loadAnalytics };
}
