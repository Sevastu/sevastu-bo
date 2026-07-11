import React, { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import { useJobsDashboard } from '../hooks/useJobsDashboard';
import JobToolbar from './JobToolbar';
import JobStats from './JobStats';
import JobFilters from './JobFilters';
import JobTable from './JobTable';
import JobCardGrid from './JobCardGrid';
import { Briefcase } from 'lucide-react';
import { StateViews } from '@/components/common/StateViews';
import { AppLayout } from '@/components/layout/AppLayout';

export default function JobDashboard() {
  const {
    jobs,
    total,
    analytics,
    page,
    limit,
    filters,
    view,
    isLoading,
    isError,
    error,
    isAnalyticsLoading,
    setPage,
    setView,
    handleSearch,
    handleFilterChange,
    refresh,
    refetch,
  } = useJobsDashboard();

  const [showFilters, setShowFilters] = useState(false);

  return (
    <AppLayout>
      <div className="space-y-6 flex flex-col h-full animate-in fade-in duration-300">
        <PageHeader
          title="Jobs Operations"
          description="Monitor, schedule, and manage all fulfillment jobs across the platform."
        />
        
        <JobStats analytics={analytics} isLoading={isAnalyticsLoading} />

        <div className="flex flex-col gap-4">
          <JobToolbar
            view={view}
            onViewChange={setView}
            searchValue={filters.search}
            onSearch={handleSearch}
            onRefresh={refresh}
            isRefreshing={isLoading}
            onToggleFilters={() => setShowFilters(!showFilters)}
          />

          {showFilters && (
            <JobFilters
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          )}

          <StateViews
            isLoading={isLoading && jobs.length === 0}
            isError={isError}
            error={error}
            isEmpty={!isLoading && !isError && jobs.length === 0 && !filters.search && !filters.status && !filters.category}
            onRetry={refetch}
            emptyConfig={{
              icon: Briefcase,
              title: 'No Jobs Found',
              description: 'There are currently no jobs in the system matching your criteria.',
            }}
          >
            {view === 'table' ? (
              <JobTable
                jobs={jobs}
                total={total}
                page={page}
                limit={limit}
                onPageChange={setPage}
                isLoading={isLoading}
              />
            ) : (
              <JobCardGrid
                jobs={jobs}
                total={total}
                page={page}
                limit={limit}
                onPageChange={setPage}
                isLoading={isLoading}
              />
            )}
          </StateViews>
        </div>
      </div>
    </AppLayout>
  );
}