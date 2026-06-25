import { useState, useEffect } from "react";
import { fetchWorkerDetails } from "@/features/workers/api";

export interface WorkerProfileData {
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

export function useWorkerProfile(workerId: string) {
  const [workerData, setWorkerData] = useState<WorkerProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!workerId) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        const data = await fetchWorkerDetails(workerId);
        setWorkerData(data);
      } catch (err) {
        console.error("Error fetching worker profile:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch worker profile"));
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [workerId]);

  return { workerData, loading, error };
}
