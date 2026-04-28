"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MapPin, Briefcase, FileText, DollarSign, CheckCircle, XCircle, Star, Calendar, Award, Shield } from "lucide-react";
import { fetchWorkerDetails } from "@/features/workers/api";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";

interface WorkerProfileData {
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

export default function WorkerVerificationDetail() {
  const params = useParams();
  const workerId = params?.id as string;
  const [workerData, setWorkerData] = useState<WorkerProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkerProfile = async () => {
      try {
        setLoading(true);
        const data = await fetchWorkerDetails(workerId);
        setWorkerData(data);
      } catch (error) {
        console.error("Error fetching worker profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (workerId) {
      fetchWorkerProfile();
    }
  }, [workerId]);

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    
    switch (status) {
      case 'verified':
      case 'APPROVED':
        return <Badge className="bg-green-100 text-green-800 border-green-200">Verified</Badge>;
      case 'under_review':
      case 'kyc_pending':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending Review</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      case 'draft':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Draft</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">{status}</Badge>;
    }
  };

  const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} className="w-5 h-5 fill-yellow-200 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    
    return (
      <div className="flex items-center gap-1">
        {stars}
        <span className="text-lg font-medium text-gray-900 ml-2">{rating.toFixed(1)}</span>
      </div>
    );
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-500">Loading worker profile...</div>
        </div>
      </AppLayout>
    );
  }

  if (!workerData) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-gray-500">Worker profile not found</div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
              {workerData.profile.photoUrl ? (
                <img 
                  src={workerData.profile.photoUrl} 
                  alt={workerData.profile.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <span className="text-gray-500 font-bold text-3xl">
                  {workerData.profile.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{workerData.profile.name}</h1>
                  <div className="flex items-center text-gray-600 mt-1">
                    <MapPin className="w-5 h-5 mr-2" />
                    {workerData.profile.city}, {workerData.profile.state}
                  </div>
                </div>
                <div>
                  {getStatusBadge(workerData.profile.profileStatus)}
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{workerData.profile.totalJobs}</div>
                  <div className="text-sm text-gray-600">Total Jobs</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{workerData.profile.experience} years</div>
                  <div className="text-sm text-gray-600">Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">${workerData.profile.basePrice}/hr</div>
                  <div className="text-sm text-gray-600">Base Price</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Profile Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <div className="text-gray-900">{workerData.profile.email}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Phone</label>
                  <div className="text-gray-900">{workerData.profile.phone || 'Not provided'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <div className="text-gray-900">{workerData.profile.address}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Pincode</label>
                  <div className="text-gray-900">{workerData.profile.pincode}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <div className="text-gray-900">{workerData.profile.category || 'General'}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Gender</label>
                  <div className="text-gray-900 capitalize">{workerData.profile.gender}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Age</label>
                  <div className="text-gray-900">{workerData.profile.age} years</div>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2" />
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {workerData.profile.bio || `Professional service provider with ${workerData.profile.experience} years of experience. Specialized in ${workerData.profile.category || 'multiple services'} with a proven track record of ${workerData.profile.totalJobs} completed jobs and a ${workerData.profile.rating} star rating.`}
              </p>
            </div>

            {/* Skills & Expertise */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Skills & Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {workerData.profile.skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-2 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="space-y-6">
            {/* Verification Score */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Verification Status
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Profile Status</span>
                  {getStatusBadge(workerData.profile.profileStatus)}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">KYC Status</span>
                  <div className="flex items-center">
                    {workerData.kyc?.status === 'approved' ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : workerData.kyc?.status === 'rejected' ? (
                      <XCircle className="w-5 h-5 text-red-500" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-yellow-500" />
                    )}
                    <span className="ml-2 capitalize">{workerData.kyc?.status || 'Not Submitted'}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Rating Score</span>
                  <div className="flex items-center">
                    <StarRating rating={workerData.profile.rating} />
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Verification Documents
              </h2>
              
              {workerData.kyc ? (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <FileText className="w-5 h-5 text-gray-400 mr-2" />
                        <div>
                          <p className="font-medium text-gray-900">{workerData.kyc.documentType}</p>
                          <p className="text-sm text-gray-500">Government ID</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        {workerData.kyc.status === 'approved' ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : workerData.kyc.status === 'rejected' ? (
                          <XCircle className="w-5 h-5 text-red-500" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-yellow-500" />
                        )}
                        <span className="ml-2 capitalize text-sm">{workerData.kyc.status}</span>
                      </div>
                    </div>
                    
                    {workerData.kyc.rejectionReason && (
                      <div className="mt-3 p-3 bg-red-50 rounded border border-red-200">
                        <p className="text-sm text-red-800">
                          <strong>Rejection Reason:</strong> {workerData.kyc.rejectionReason}
                        </p>
                      </div>
                    )}
                    
                    <div className="flex space-x-3 mt-4">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        View Front Document
                      </button>
                      {workerData.kyc.backImage && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          View Back Document
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-sm">No verification documents uploaded</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
