"use client";

import React, { useEffect, useState, useCallback } from "react";
import { X } from "lucide-react";
import { fetchCustomerById } from "@/features/customers/api";
import { CustomerUI } from "@/features/customers/types/customer-ui.types";

import { CustomerProfileHeader } from "@/features/customers/components/customer-profile/CustomerProfileHeader";
import { CustomerQuickStats } from "@/features/customers/components/customer-profile/CustomerQuickStats";
import { CustomerInfoSection } from "@/features/customers/components/customer-profile/CustomerInfoSection";
import { CustomerBookingsList } from "@/features/customers/components/customer-profile/CustomerBookingsList";
import { CustomerProfileSkeleton } from "@/features/customers/components/customer-profile/CustomerProfileSkeleton";
import { CustomerProfileError } from "@/features/customers/components/customer-profile/CustomerProfileError";
import { CustomerAdminActions } from "@/features/customers/components/customer-profile/CustomerAdminActions";

interface Customer extends CustomerUI {
    isOnline?: boolean;
    membershipType?: string;
    bookings?: Array<{
        id: string;
        serviceType: string;
        date: string;
        status: string;
        amount: number;
    }>;
}

interface CustomerProfileDrawerProps {
    customerId: string | null;
    isOpen: boolean;
    onClose: () => void;
}

export function CustomerProfileDrawer({ customerId, isOpen, onClose }: CustomerProfileDrawerProps) {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadCustomerDetails = useCallback(async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const customerData = await fetchCustomerById(id);
            // In a real scenario, we might merge missing typing data or just pass it as is
            setCustomer(customerData as Customer);
        } catch (err) {
            setError("Failed to load customer details. Please check your connection and try again.");
            console.error("Error loading customer:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (customerId && isOpen) {
            loadCustomerDetails(customerId);
        }
    }, [customerId, isOpen, loadCustomerDetails]);

    const handleBlockUser = useCallback(async () => {
        if (!customer) return;
        
        try {
            console.log("Blocking user:", customer._id);
            // await updateCustomerStatus(customer._id, 'blocked');
            onClose();
        } catch (err) {
            console.error("Error blocking user:", err);
        }
    }, [customer, onClose]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 transition-all duration-300 ease-out"
                onClick={onClose}
            />
            
            {/* Drawer */}
            <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-[#F8FAFC] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col font-manrope ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-10 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
                    <h2 className="text-lg font-bold text-slate-900">Customer Profile</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <CustomerProfileSkeleton />
                    ) : error ? (
                        <CustomerProfileError message={error} onRetry={() => customerId && loadCustomerDetails(customerId)} />
                    ) : customer ? (
                        <div className="p-6 space-y-8">
                            <CustomerProfileHeader 
                                name={customer.name}
                                email={customer.email}
                                avatarUrl={customer.avatarUrl}
                                status={customer.status}
                                isOnline={customer.isOnline}
                                membershipType={customer.membershipType}
                            />

                            <CustomerQuickStats 
                                totalOrders={customer.totalOrders}
                                totalSpent={customer.totalSpent}
                            />

                            <CustomerInfoSection 
                                customerId={customer._id}
                                phone={customer.phone}
                                location={customer.location}
                                joinedDate={customer.joinedDate}
                            />

                            <CustomerBookingsList bookings={customer.bookings} />
                        </div>
                    ) : null}
                </div>

                {/* Footer Actions */}
                {customer && !loading && !error && (
                    <CustomerAdminActions 
                        onBlockUser={handleBlockUser}
                        customerId={customer._id}
                    />
                )}
            </div>
        </>
    );
}
