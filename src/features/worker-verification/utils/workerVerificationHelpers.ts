import { WorkerProfileStatus } from '@/lib/enums';
import { WorkerVerificationUI } from '../types/workerVerification.types';
import { WORKER_VERIFICATION_CONSTANTS } from './workerVerificationConstants';

export function mapWorkerResponse(data: any[]): WorkerVerificationUI[] {
  if (!Array.isArray(data)) return [];

  return data.map((item: any) => ({
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
}

export function formatWorkerName(name?: string): string {
  return name && name.trim().length > 0 ? name : WORKER_VERIFICATION_CONSTANTS.NO_NAME;
}

export function formatWorkerEmail(email?: string): string {
  return email && email.trim().length > 0 ? email : WORKER_VERIFICATION_CONSTANTS.NO_EMAIL;
}

export function formatWorkerPhone(phone?: string): string {
  return phone && phone.trim().length > 0 ? phone : WORKER_VERIFICATION_CONSTANTS.NO_PHONE;
}

export function formatWorkerAddress(address?: string): string {
  return address && address.trim().length > 0 ? address : WORKER_VERIFICATION_CONSTANTS.NO_ADDRESS;
}
