"use client"
import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  FileText,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter,
  X,
  Loader2,
  Clock
} from 'lucide-react';
// import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { VerificationStatusBadge } from '../../components/ui/VerificationStatusBadge';
import { AppLayout } from '@/components/layout/AppLayout';
import { fetchWorkers, approveWorker, rejectWorker } from '@/features/workers/api';
import { WorkerProfileStatus } from '@/lib/enums';
import { WorkerReviewPanel } from '../workers/components/WorkerReviewSheet';

interface Worker {
  id: string;
  name: string;
  photoUrl: string;
  email: string;
  phoneNumber: string;
  address: string;
  registrationDate: string;
  rating: number;
  experience: string;
  services: string[];
  verificationStatus: WorkerProfileStatus;
  documents: {
    aadhaarFront: string;
    aadhaarBack: string;
    pan: string;
    experience: string;
  };
}
const WorkerVerificationCard: React.FC<{
  worker: Worker;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onViewDocuments: (worker: Worker) => void;
}> = ({ worker, onApprove, onReject, onViewDocuments }) => {
  return (
    <div className="bg-[var(--color-card)] rounded-lg p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-[var(--color-muted)] flex items-center justify-center">
            {worker.photoUrl ? (
              <img
                src={worker.photoUrl}
                alt={worker.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <User size={32} className="text-[var(--color-text-secondary)]" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text)]">{worker.name}</h3>
            <p className="text-sm text-[var(--color-text-secondary)]">Worker ID: {worker.id}</p>
            <VerificationStatusBadge status={worker.verificationStatus} />
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-sm text-[var(--color-text-secondary)]">
            <Star size={16} className="text-yellow-400" />
            {worker.rating}
          </div>
          <div className="text-sm text-[var(--color-text-muted)]">{worker.experience}</div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <Mail size={14} />
            {worker.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <Phone size={14} />
            {worker.phoneNumber}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <MapPin size={14} />
            {worker.address}
          </div>
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <Calendar size={14} />
            Registered: {new Date(worker.registrationDate).toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mb-4">
        <div className="text-sm font-medium text-[var(--color-text)] mb-2">Services</div>
        <div className="flex flex-wrap gap-2">
          {worker.services.map((service, index) => (
            <span
              key={service}
              className="px-2 py-1 bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-xs font-medium rounded-full"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Documents Preview */}
      <div className="mb-4">
        <div className="text-sm font-medium text-[var(--color-text)] mb-2">Documents</div>
        <button
          onClick={() => onViewDocuments(worker)}
          className="w-full text-left p-3 bg-[var(--color-muted)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-[var(--color-text)]">
              View All Documents & Review
            </span>
            <Eye size={14} className="text-[var(--color-primary)]" />
          </div>
          <div className="text-xs text-[var(--color-text-muted)]">
            Click to open review panel with OCR analysis
          </div>
        </button>
      </div>

      {/* Actions */}
      {worker.verificationStatus === WorkerProfileStatus.KYC_PENDING && (
        <div className="flex gap-3">
          <button
            onClick={() => onViewDocuments(worker)}
            className="flex-1 bg-[var(--color-blue-600)] text-[var(--color-card)] px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Eye size={16} />
            Review & Approve
          </button>
          <button
            onClick={() => onApprove(worker.id)}
            className="flex-1 bg-[var(--color-success)] text-card px-4 py-2 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <CheckCircle size={16} />
            Quick Approve
          </button>
          <button
            onClick={() => onReject(worker.id)}
            className="flex-1 bg-[var(--color-error)] text-card px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <XCircle size={16} />
            Quick Reject
          </button>
        </div>
      )}
    </div>
  );
};

const WorkerVerification: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<WorkerProfileStatus | 'all'>('all');
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0,
  });
  const [selectedWorkerUserId, setSelectedWorkerUserId] = useState<string | null>(null);
  const [selectedRowStatus, setSelectedRowStatus] = useState<string | undefined>(undefined);
  const [isViewingPanel, setIsViewingPanel] = useState(false);

  useEffect(() => {
    loadWorkers();
  }, []);

  const loadWorkers = async () => {
    // const data = await fetchWorkers();

    // console.log("Workers API Response:", data);
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWorkers();
      const mappedWorkers: Worker[] = data.map((item: any) => ({
        id: item.id || item.userId || '',
        name: item.name || item.fullName || '',
        photoUrl: item.photoUrl || '',
        email: item.email || '',
        phoneNumber: item.phone || item.phoneNumber || '',
        address: item.address || '',
        registrationDate: item.registrationDate || item.createdAt || '',
        rating: item.rating || 0,
        experience: item.experience || '',
        services: item.skills || [],
        verificationStatus:
          item.profileStatus ||
          item.verificationStatus ||
          WorkerProfileStatus.KYC_PENDING,
        documents: {
          aadhaarFront: item.idProof?.frontKey || '',
          aadhaarBack: item.idProof?.backKey || '',
          pan: item.panProof?.key || item.panKey || '',
          experience: item.experienceProof?.key || item.experienceKey || ''
        }
      }));
      setWorkers(mappedWorkers);
      
      // Calculate statistics
      const pending = mappedWorkers.filter(w => 
        w.verificationStatus === WorkerProfileStatus.UNDER_REVIEW || 
        w.verificationStatus === WorkerProfileStatus.KYC_PENDING
      ).length;
      const approved = mappedWorkers.filter(w => 
        w.verificationStatus === WorkerProfileStatus.VERIFIED
      ).length;
      const rejected = mappedWorkers.filter(w => 
        w.verificationStatus === WorkerProfileStatus.REJECTED
      ).length;
      
      setStats({
        pending,
        approved,
        rejected,
        total: mappedWorkers.length,
      });
    } catch (err) {
      setError('Failed to load workers');
      console.error('Error loading workers:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || worker.verificationStatus === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleApprove = async (workerId: string) => {
    try {
      await approveWorker(workerId);
      await loadWorkers();
    } catch (err) {
      console.error('Error approving worker:', err);
      setError('Failed to approve worker');
    }
  };

  const handleReject = async (workerId: string) => {
    try {
      await rejectWorker(workerId, 'Rejected via quick action');
      await loadWorkers();
    } catch (err) {
      console.error('Error rejecting worker:', err);
      setError('Failed to reject worker');
    }
  };

  const handleViewDocuments = (worker: Worker) => {
    setSelectedWorkerUserId(worker.id);
    setSelectedRowStatus(worker.verificationStatus);
    setIsViewingPanel(true);
  };

  const handleBackToList = () => {
    setIsViewingPanel(false);
    setSelectedWorkerUserId(null);
    setSelectedRowStatus(undefined);
  };

  const handlePanelBack = () => {
    setIsViewingPanel(false);
    setSelectedWorkerUserId(null);
    setSelectedRowStatus(undefined);
    setTimeout(() => loadWorkers(), 100);
  };
  return (
    <AppLayout>
      {isViewingPanel && selectedWorkerUserId ? (
        <WorkerReviewPanel
          workerUserId={selectedWorkerUserId}
          initialProfileStatus={selectedRowStatus}
          onAfterChange={handlePanelBack}
          onBack={handlePanelBack}
        />
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="mt-2 flex items-center gap-2 text-3xl font-bold tracking-tight text-muted-foreground">Worker-Verification</h1>
            <p className="text-gray-500 text-lg">Review and verify worker documents and credentials</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Pending Reviews</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-blue-400" />
              </div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Approved</p>
                  <p className="text-2xl font-bold text-green-900">{stats.approved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Rejected</p>
                  <p className="text-2xl font-bold text-red-900">{stats.rejected}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-400" />
              </div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Workers</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <User className="h-8 w-8 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-card rounded-lg p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search workers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="lg:w-48">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as WorkerProfileStatus | 'all')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value={WorkerProfileStatus.UNDER_REVIEW}>Under Review</option>
                  <option value={WorkerProfileStatus.VERIFIED}>Verified</option>
                  <option value={WorkerProfileStatus.REJECTED}>Rejected</option>
                  <option value={WorkerProfileStatus.KYC_PENDING}>KYC Pending</option>
                  <option value={WorkerProfileStatus.DRAFT}>Draft</option>
                </select>
              </div>

              {/* Filter Button */}
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Filter size={16} />
                More Filters
              </button>
            </div>
          </div>

          {/* Worker Cards */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-gray-400 w-8 h-8" />
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
              {error}
            </div>
          ) : filteredWorkers.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No workers found matching the criteria
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredWorkers.map((worker) => (
                <WorkerVerificationCard
                  key={worker.id}
                  worker={worker}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  onViewDocuments={handleViewDocuments}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
};

export default WorkerVerification;
