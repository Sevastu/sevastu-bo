"use client";

import React, { useEffect, useState } from "react";
import { X, MapPin, Briefcase, FileText, DollarSign, CheckCircle, XCircle, Ban } from "lucide-react";
import { fetchWorkerDetails, approveWorker, rejectWorker } from "@/features/workers/api";
import { WorkerProfileStatus } from "@/lib/enums";
import { BlurOverlaySidePanel } from "@/components/ui/BlurOverlay";

interface WorkerDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  workerId: string | null;
  onWorkerUpdate?: () => void;
}

interface WorkerDetails {
  profile: {
    _id: string;
    userId: string;
    name: string;
    age: number;
    gender: string;
    email: string;
    phone?: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    photoUrl?: string;
    category?: string;
    rating: number;
    basePrice: number;
    experience: number;
    totalJobs: number;
    skills: string[];
    profileStatus: string;
    isAvailable: boolean;
    bio?: string;
    createdAt: string;
  };
  kyc?: {
    documentType: string;
    frontImage: string;
    backImage?: string;
    status: string;
    rejectionReason?: string;
  } | null;
}

export function WorkerDetailsDrawer({ isOpen, onClose, workerId, onWorkerUpdate }: WorkerDetailsDrawerProps) {
  const [workerDetails, setWorkerDetails] = useState<WorkerDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    if (isOpen && workerId) {
      fetchWorkerData();
    }
  }, [isOpen, workerId]);

  const fetchWorkerData = async () => {
    if (!workerId) return;
    
    setLoading(true);
    try {
      const details = await fetchWorkerDetails(workerId);
      setWorkerDetails(details);
    } catch (error) {
      console.error("Error fetching worker details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!workerId) return;
    
    setActionLoading(true);
    try {
      await approveWorker(workerId);
      await fetchWorkerData(); // Refresh data
      onWorkerUpdate?.(); // Refresh list
    } catch (error) {
      console.error("Error verifying worker:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    if (!workerId) return;
    
    const reason = prompt("Please provide rejection reason:");
    if (!reason) return;
    
    setActionLoading(true);
    try {
      await rejectWorker(workerId, reason);
      await fetchWorkerData(); // Refresh data
      onWorkerUpdate?.(); // Refresh list
    } catch (error) {
      console.error("Error rejecting worker:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleBlock = async () => {
    if (!workerId) return;
    
    if (confirm("Are you sure you want to block this worker? This action cannot be undone.")) {
      // Implement block worker functionality
      console.log("Block worker:", workerId);
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'verified':
      case 'APPROVED':
        return <span className={`${baseClasses} bg-green-100 text-green-800 border border-green-200`}>Verified</span>;
      case 'under_review':
      case 'kyc_pending':
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`}>Pending</span>;
      case 'rejected':
        return <span className={`${baseClasses} bg-red-100 text-red-800 border border-red-200`}>Rejected</span>;
      case 'draft':
        return <span className={`${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`}>Draft</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`}>{status}</span>;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Improved Blurred Backdrop */}
      <div 
        className="fixed inset-0 z-40 transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          WebkitBackdropFilter: 'blur(8px)',
          backdropFilter: 'blur(8px)'
        }}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Worker Profile</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Loading worker details...</div>
              </div>
            ) : workerDetails ? (
              <div className="p-6 space-y-6">
                {/* Profile Header */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                    {workerDetails.profile.photoUrl ? (
                      <img 
                        src={workerDetails.profile.photoUrl} 
                        alt={workerDetails.profile.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 font-medium text-xl">
                        {workerDetails.profile.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{workerDetails.profile.name}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {workerDetails.profile.city}, {workerDetails.profile.state}
                    </div>
                    <div className="mt-2">
                      {getStatusBadge(workerDetails.profile.profileStatus)}
                    </div>
                  </div>
                </div>

                {/* Quick Action Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                      <Briefcase className="w-5 h-5 text-blue-600" />
                      <span className="text-2xl font-bold text-blue-900">{workerDetails.profile.totalJobs}</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">Total Jobs</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-2xl font-bold text-green-900">
                        ${(workerDetails.profile.totalJobs * workerDetails.profile.basePrice).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">Total Earnings</p>
                  </div>
                </div>

                {/* Expertise & Skills */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Expertise & Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {workerDetails.profile.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Professional Summary */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Professional Summary</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {workerDetails.profile.bio || `Professional service provider with ${workerDetails.profile.experience} years of experience. Specialized in ${workerDetails.profile.category || 'multiple services'} with a proven track record of ${workerDetails.profile.totalJobs} completed jobs and a ${workerDetails.profile.rating} star rating.`}
                  </p>
                </div>

                {/* Verification Documents */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Verification Documents</h4>
                  <div className="space-y-3">
                    {workerDetails.kyc ? (
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <FileText className="w-5 h-5 text-gray-400" />
                            <div>
                              <p className="font-medium text-gray-900">{workerDetails.kyc.documentType}</p>
                              <p className="text-sm text-gray-500">Government ID</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {workerDetails.kyc.status === 'approved' ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : workerDetails.kyc.status === 'rejected' ? (
                              <XCircle className="w-5 h-5 text-red-500" />
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-yellow-500" />
                            )}
                            <span className="text-sm text-gray-500 capitalize">{workerDetails.kyc.status}</span>
                          </div>
                        </div>
                        {workerDetails.kyc.rejectionReason && (
                          <p className="text-sm text-red-600 mt-2">Reason: {workerDetails.kyc.rejectionReason}</p>
                        )}
                        <div className="mt-3 flex space-x-2">
                          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View Front</button>
                          {workerDetails.kyc.backImage && (
                            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View Back</button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm">No verification documents uploaded</div>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Additional Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span className="text-gray-900">{workerDetails.profile.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone:</span>
                      <span className="text-gray-900">{workerDetails.profile.phone || 'Not provided'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Experience:</span>
                      <span className="text-gray-900">{workerDetails.profile.experience} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Base Price:</span>
                      <span className="text-gray-900">${workerDetails.profile.basePrice}/hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Rating:</span>
                      <span className="text-gray-900">{workerDetails.profile.rating} stars</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-gray-500">Worker details not found</div>
              </div>
            )}
          </div>

          {/* Admin Actions Footer */}
          {workerDetails && (
            <div className="border-t border-gray-200 p-6 space-y-3">
              {workerDetails.profile.profileStatus !== 'verified' && workerDetails.profile.profileStatus !== 'APPROVED' && (
                <button
                  onClick={handleVerify}
                  disabled={actionLoading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? 'Processing...' : 'Verify Worker'}
                </button>
              )}
              
              {workerDetails.profile.profileStatus !== 'rejected' && (
                <button
                  onClick={handleReject}
                  disabled={actionLoading}
                  className="w-full border border-red-300 text-red-600 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {actionLoading ? 'Processing...' : 'Reject Worker'}
                </button>
              )}
              
              <button
                onClick={handleBlock}
                className="w-full text-red-600 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Ban className="w-4 h-4" />
                <span>Block Worker</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
