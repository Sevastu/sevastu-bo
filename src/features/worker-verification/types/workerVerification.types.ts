import { WorkerProfileStatus } from '@/lib/enums';

export interface WorkerVerificationUI {
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
