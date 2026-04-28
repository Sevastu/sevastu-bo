"use client";

import React, { useEffect, useState } from "react";
import { X, MapPin, Phone, Calendar, DollarSign, BookOpen, User, Shield, AlertCircle } from "lucide-react";
import { fetchCustomerById } from "@/features/customers/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Customer {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    location?: string;
    avatarUrl?: string;
    status: 'active' | 'inactive';
    joinedDate: string;
    totalOrders?: number;
    totalSpent?: number;
    lastActiveDate?: string;
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

    useEffect(() => {
        if (customerId && isOpen) {
            loadCustomerDetails(customerId);
        }
    }, [customerId, isOpen]);

    const loadCustomerDetails = async (id: string) => {
        setLoading(true);
        setError(null);
        try {
            const customerData = await fetchCustomerById(id);
            setCustomer(customerData);
        } catch (err) {
            setError("Failed to load customer details");
            console.error("Error loading customer:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleBlockUser = async () => {
        if (!customer) return;
        
        try {
            // Implement block user functionality
            console.log("Blocking user:", customer._id);
            // await updateCustomerStatus(customer._id, 'blocked');
            onClose();
        } catch (err) {
            console.error("Error blocking user:", err);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                onClick={onClose}
            />
            
            {/* Drawer */}
            <div className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">Customer Profile</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="text-center">
                                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
                                <p className="text-gray-600">{error}</p>
                            </div>
                        </div>
                    ) : customer ? (
                        <div className="p-4 space-y-6">
                            {/* Profile Header */}
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                        {customer.avatarUrl ? (
                                            <img 
                                                src={customer.avatarUrl} 
                                                alt={customer.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                                                <span className="text-white font-bold text-xl">
                                                    {customer.name ? customer.name.charAt(0).toUpperCase() : 'U'}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    {/* Online Status Indicator */}
                                    <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                                        customer.isOnline ? 'bg-green-500' : 'bg-gray-400'
                                    }`}></div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900">{customer.name || 'Unknown'}</h3>
                                    <p className="text-sm text-gray-500">{customer.email || 'No email provided'}</p>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <Badge className={`${
                                            customer.status === 'active' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {customer.status === 'active' ? 'Active' : 'Inactive'}
                                        </Badge>
                                        {customer.membershipType && (
                                            <Badge className="bg-purple-100 text-purple-800">
                                                {customer.membershipType}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <BookOpen className="w-5 h-5 text-blue-600" />
                                        <span className="text-2xl font-bold text-blue-900">
                                            {customer.totalOrders || 0}
                                        </span>
                                    </div>
                                    <p className="text-sm text-blue-700 mt-1">Total Bookings</p>
                                </div>
                                <div className="bg-green-50 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <DollarSign className="w-5 h-5 text-green-600" />
                                        <span className="text-2xl font-bold text-green-900">
                                            ${(customer.totalSpent || 0).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-green-700 mt-1">Total Spent</p>
                                </div>
                            </div>

                            {/* Personal Information */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Personal Information</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-3">
                                        <Phone className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">
                                            {customer.phone || 'Not provided'}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">
                                            {customer.location || 'Not provided'}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">
                                            Joined {customer.joinedDate ? new Date(customer.joinedDate).toLocaleDateString() : 'Unknown'}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <User className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-600">
                                            ID: {customer._id}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Bookings */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Recent Bookings</h4>
                                <div className="space-y-2">
                                    {customer.bookings && customer.bookings.length > 0 ? (
                                        customer.bookings.slice(0, 5).map((booking) => (
                                            <div key={booking.id} className="bg-gray-50 rounded-lg p-3">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{booking.serviceType || 'Unknown Service'}</p>
                                                        <p className="text-xs text-gray-500">
                                                            {booking.date ? new Date(booking.date).toLocaleDateString() : 'Unknown Date'}
                                                        </p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            ${booking.amount ? booking.amount.toLocaleString() : '0'}
                                                        </p>
                                                        <Badge className={`text-xs ${
                                                            booking.status === 'completed' 
                                                                ? 'bg-green-100 text-green-800'
                                                                : booking.status === 'pending'
                                                                ? 'bg-yellow-100 text-yellow-800'
                                                                : 'bg-red-100 text-red-800'
                                                        }`}>
                                                            {booking.status || 'Unknown'}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 text-center py-4">
                                            No recent bookings found
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* Footer - Admin Actions */}
                {customer && (
                    <div className="border-t p-4">
                        <Button
                            onClick={handleBlockUser}
                            variant="destructive"
                            className="w-full"
                        >
                            <Shield className="w-4 h-4 mr-2" />
                            Block User
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
