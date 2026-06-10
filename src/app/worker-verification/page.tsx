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
  Download,
  Search,
  Filter,
  X,
  Loader2
} from 'lucide-react';
// import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { VerificationStatusBadge } from '../../components/ui/VerificationStatusBadge';
import { AppLayout } from '@/components/layout/AppLayout';
import { fetchWorkers, approveWorker, rejectWorker, fetchPrivateSignedUrl } from '@/features/workers/api';
import { WorkerProfileStatus } from '@/lib/enums';

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
  onViewDocuments: (worker: Worker, documentType: "aadhaar" | "pan" | "experience" | "all") => void;
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
        <div className="flex gap-2">
          <button
            onClick={() => onViewDocuments(worker, "aadhaar")}
            className="flex-1 text-left p-3 bg-[var(--color-muted)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[var(--color-text)]">
                Aadhaar Card
              </span>
              <Eye size={14} className="text-[var(--color-primary)]" />
            </div>

            <div className="text-xs text-[var(--color-text-muted)]">
              Click to preview
            </div>
          </button>
          <button
            onClick={() => onViewDocuments(worker, "pan")}
            className="flex-1 text-left p-3 bg-[var(--color-muted)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[var(--color-text)]">
                PAN Card
              </span>
              <Eye size={14} className="text-[var(--color-primary)]" />
            </div>

            <div className="text-xs text-[var(--color-text-muted)]">
              Click to preview
            </div>
          </button>
          <button
            onClick={() => onViewDocuments(worker, "experience")}
            className="flex-1 text-left p-3 bg-[var(--color-muted)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-[var(--color-text)]">
                Experience
              </span>
              <Eye size={14} className="text-[var(--color-primary)]" />
            </div>

            <div className="text-xs text-[var(--color-text-muted)]">
              Click to preview
            </div>
          </button>
        </div>
      </div>

      {/* Actions */}
      {worker.verificationStatus === WorkerProfileStatus.KYC_PENDING && (
        <div className="flex gap-3">
          <button
            onClick={() => onViewDocuments(worker, "all")}
            className="flex-1 bg-[var(--color-primary)] text-[var(--color-card)] px-4 py-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors font-medium flex items-center justify-center gap-2"
          >
            <Eye size={16} />
            View Documents
          </button>
          <button
            onClick={() => onApprove(worker.id)}
            className="flex-1 bg-[var(--color-success)] text-card px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <CheckCircle size={16} />
            Approve
          </button>
          <button
            onClick={() => onReject(worker.id)}
            className="flex-1 bg-[var(--color-error)] text-card px-4 py-2 rounded-lg hover:bg-[var(--color-error)] transition-colors font-medium flex items-center justify-center gap-2"
          >
            <XCircle size={16} />
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

const DocumentPreviewModal: React.FC<{
  worker: Worker | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (id: string) => void;
  selectedDocumentType: "aadhaar" | "pan" | "experience" | "all" | null;
  documentUrls: {
    aadhaarFront: string;
    aadhaarBack: string;
    pan: string;
    experience: string;
  };
}> = ({
  worker,
  isOpen,
  onClose,
  onApprove,
  selectedDocumentType,
  documentUrls,
}) => {
    if (!isOpen || !worker) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-[var(--color-card)] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
            <div>
              <h2 className="text-xl font-semibold text-[var(--color-text)]">Document Verification</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">{worker.name} - {worker.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-muted)] rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Documents */}
          <div className="p-6 space-y-6">
            {/* Aadhaar Card */}
            {(selectedDocumentType === "aadhaar" ||
              selectedDocumentType === "all") && (
                <div className="border border-[var(--color-border)] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-[var(--color-text)]">Aadhaar Card</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Front */}
                    <div className="bg-[var(--color-muted)] rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between p-2 border-b border-[var(--color-primary)]">
                        <span className="text-sm font-medium">Front Side</span>
                        <button
                          onClick={() => documentUrls.aadhaarFront && window.open(documentUrls.aadhaarFront, "_blank")}
                          disabled={!documentUrls.aadhaarFront}
                          className="disabled:opacity-50"
                        >
                          <Download size={16} />
                        </button>
                      </div>

                      <div className="h-64">
                        {documentUrls.aadhaarFront ? (
                          <img
                            src={documentUrls.aadhaarFront}
                            alt="Front Document"
                            onError={() => console.log("Failed to load Aadhaar Front")}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center text-gray-400">
                            No Front Document
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Back */}
                    <div className="bg-[var(--color-muted)] rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between p-2 border-b border-[var(--color-primary)]">
                        <span className="text-sm font-medium">Back Side</span>
                        <button
                          onClick={() => documentUrls.aadhaarBack && window.open(documentUrls.aadhaarBack, "_blank")}
                          disabled={!documentUrls.aadhaarBack}
                          className="disabled:opacity-50"
                        >
                          <Download size={16} />
                        </button>
                      </div>

                      <div className="h-64">
                        {documentUrls.aadhaarBack ? (
                          <img
                            src={documentUrls.aadhaarBack}
                            alt="Back Document"
                            onError={() => console.log("Failed to load Aadhaar Back")}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="h-full flex items-center justify-center text-gray-400">
                            No Back Document
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            {/* PAN Card */}
            {(selectedDocumentType === "pan" ||
              selectedDocumentType === "all") && (
                <div className="border border-[var(--color-border)] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-[var(--color-text)]">PAN Card</h3>
                    <button
                      onClick={() => documentUrls.pan && window.open(documentUrls.pan, "_blank")}
                      disabled={!documentUrls.pan}
                      className="flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:opacity-50"
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                  <div className="bg-[var(--color-muted)] rounded-lg h-64 flex items-center justify-center overflow-hidden">
                    {documentUrls.pan ? (
                      <img
                        src={documentUrls.pan}
                        alt="PAN Document"
                        onError={() => console.log("Failed to load PAN")}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <FileText size={48} className="text-[var(--color-text-muted)] mx-auto mb-2" />
                        <p className="text-[var(--color-text-muted)]">PAN Card Preview</p>
                        <p className="text-sm text-[var(--color-text-muted)]">No PAN card uploaded or failed to load</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

            {/* Experience Certificate */}
            {(selectedDocumentType === "experience" ||
              selectedDocumentType === "all") && (
                <div className="border border-[var(--color-border)] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-[var(--color-text)]">Experience Certificate</h3>
                    <button
                      onClick={() => documentUrls.experience && window.open(documentUrls.experience, "_blank")}
                      disabled={!documentUrls.experience}
                      className="flex items-center gap-2 text-[var(--color-primary)] hover:text-[var(--color-primary)] disabled:opacity-50"
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                  <div className="bg-[var(--color-muted)] rounded-lg h-64 flex items-center justify-center overflow-hidden">
                    {documentUrls.experience ? (
                      <img
                        src={documentUrls.experience}
                        alt="Experience Certificate"
                        onError={() => console.log("Failed to load Experience")}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <FileText size={48} className="text-[var(--color-text-muted)] mx-auto mb-2" />
                        <p className="text-[var(--color-text-muted)]">Experience Certificate Preview</p>
                        <p className="text-sm text-[var(--color-text-muted)]">No Experience Certificate uploaded or failed to load</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>

          {/* Actions */}
          <div className="border-t border-[var(--color-border)] p-6">
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 bg-[var(--color-muted)] text-[var(--color-text)] px-4 py-2 rounded-lg hover:bg-[var(--color-muted)] transition-colors font-medium"
              >
                Close
              </button>
              <button
                onClick={() => onApprove(worker.id)}
                className="flex-1 text-white px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <CheckCircle size={16} />
                Approve Worker
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

const WorkerVerification: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<WorkerProfileStatus | 'all'>('all');
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [selectedDocumentType, setSelectedDocumentType] = useState<
    "aadhaar" | "pan" | "experience" | "all" | null
  >(null);
  const [documentUrls, setDocumentUrls] = useState({
    aadhaarFront: '',
    aadhaarBack: '',
    pan: '',
    experience: '',
  });
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedWorkerForReject, setSelectedWorkerForReject] = useState<string | null>(null);

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
    setSelectedWorkerForReject(workerId);
    setShowRejectModal(true);
  };

  const confirmReject = async () => {
    if (!selectedWorkerForReject || !rejectReason.trim()) {
      setError('Please provide a rejection reason');
      return;
    }
    try {
      await rejectWorker(selectedWorkerForReject, rejectReason);
      setShowRejectModal(false);
      setRejectReason('');
      setSelectedWorkerForReject(null);
      await loadWorkers();
    } catch (err) {
      console.error('Error rejecting worker:', err);
      setError('Failed to reject worker');
    }
  };

  const handleViewDocuments = async (
    worker: Worker,
    documentType: "aadhaar" | "pan" | "experience" | "all"
  ) => {
    try {
      let aadhaarFront = '';
      let aadhaarBack = '';
      let pan = '';
      let experience = '';

      if (documentType === "all") {
        const [
          aadhaarFrontRes,
          aadhaarBackRes,
          panRes,
          experienceRes,
        ] = await Promise.all([
          worker.documents.aadhaarFront
            ? fetchPrivateSignedUrl(worker.documents.aadhaarFront)
            : Promise.resolve({ url: "" }),

          worker.documents.aadhaarBack
            ? fetchPrivateSignedUrl(worker.documents.aadhaarBack)
            : Promise.resolve({ url: "" }),

          worker.documents.pan
            ? fetchPrivateSignedUrl(worker.documents.pan)
            : Promise.resolve({ url: "" }),

          worker.documents.experience
            ? fetchPrivateSignedUrl(worker.documents.experience)
            : Promise.resolve({ url: "" }),
        ]);

        aadhaarFront = aadhaarFrontRes.url;
        aadhaarBack = aadhaarBackRes.url;
        pan = panRes.url;
        experience = experienceRes.url;
      }

      else if (documentType === 'aadhaar') {
        const [frontRes, backRes] = await Promise.all([
          fetchPrivateSignedUrl(worker.documents.aadhaarFront),
          fetchPrivateSignedUrl(worker.documents.aadhaarBack),
        ]);

        aadhaarFront = frontRes.url;
        aadhaarBack = backRes.url;
      }
      else if (documentType === 'pan') {
        if (worker.documents.pan) {
          const res = await fetchPrivateSignedUrl(worker.documents.pan);
          pan = res.url;
        }
      }
      else if (documentType === 'experience') {
        if (worker.documents.experience) {
          const res = await fetchPrivateSignedUrl(worker.documents.experience);
          experience = res.url;
        }
      }

      setDocumentUrls({
        aadhaarFront,
        aadhaarBack,
        pan,
        experience,
      });

      setSelectedDocumentType(documentType);
      setSelectedWorker(worker);
      setIsDocumentModalOpen(true);
    } catch (error) {
      console.error(error);
      setDocumentUrls({
        aadhaarFront: '',
        aadhaarBack: '',
        pan: '',
        experience: '',
      });
      setSelectedDocumentType(documentType);
      setSelectedWorker(worker);
      setIsDocumentModalOpen(true);
    }
  };
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="mt-2 flex items-center gap-2 text-3xl font-bold tracking-tight text-muted-foreground">Worker-Verification</h1>
          <p className="text-gray-500 text-lg">Review and verify worker documents and credentials</p>
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

        {/* Document Preview Modal */}
        <DocumentPreviewModal
          worker={selectedWorker}
          isOpen={isDocumentModalOpen}
          onClose={() => {
            setIsDocumentModalOpen(false);
            setSelectedDocumentType(null);
            setDocumentUrls({
              aadhaarFront: '',
              aadhaarBack: '',
              pan: '',
              experience: '',
            });
          }}
          onApprove={handleApprove}
          selectedDocumentType={selectedDocumentType}
          documentUrls={documentUrls}
        />

        {/* Reject Confirmation Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <h2 className="text-xl font-semibold mb-4">Reject Worker</h2>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Please provide a reason for rejection..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                rows={4}
              />
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectReason('');
                    setSelectedWorkerForReject(null);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReject}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  Confirm Reject
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default WorkerVerification;
