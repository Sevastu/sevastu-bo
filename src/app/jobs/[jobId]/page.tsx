"use client";

import { use } from 'react';
import JobDetailsPage from './components/JobDetailsPage';

interface PageProps {
  params: Promise<{ jobId: string }>;
}

export default function JobDetailsRoute({ params }: PageProps) {
  // In Next.js 15 app router, params is a promise
  const resolvedParams = use(params);
  return <JobDetailsPage jobId={resolvedParams.jobId} />;
}