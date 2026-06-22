import React, { memo } from 'react';
import { WorkerProfilePhotoCard } from './WorkerProfilePhotoCard';
import { WorkerProfileDetails } from './WorkerProfileDetails';
import { ReviewWorkerDetails } from '../types/workerReview.types';

export const WorkerProfileSummary = memo(function WorkerProfileSummary({ profile }: { profile: ReviewWorkerDetails | null }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
            <WorkerProfilePhotoCard profile={profile} />
            <WorkerProfileDetails profile={profile} />
        </div>
    );
});
