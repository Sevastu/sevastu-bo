"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function JobsPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/jobs/fulfillment");
  }, [router]);
  
  return null;
}