"use client";

import React, { useEffect, useState, useCallback } from "react";
import { JobApi } from "@/features/fulfillment/api/job.api";
import { Job, JobStatus } from "@/features/fulfillment/types/job.types";
import { DataTable } from "@/components/DataTable";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, Eye, Calendar, Search, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/date-utils";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { jobStatusColors } from "@/lib/status-colors";

const jobApi = new JobApi();

interface JobFilters {
  status?: JobStatus | 'all';
  categoryId?: string;
  serviceId?: string;
  workerId?: string;
  customerId?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  sort?: 'createdAt' | 'preferredSchedule' | 'status';
  order?: 'asc' | 'desc';
}

interface SortConfig {
  field: 'createdAt' | 'preferredSchedule' | 'status';
  order: 'asc' | 'desc';
}

export default function FulfillmentJobListPage() {
  const router = useRouter();
  const [data, setData] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState<JobFilters>({
    status: 'all',
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'createdAt',
    order: 'desc',
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await jobApi.getJobs({
        ...filters,
        page,
        limit,
        sort: sortConfig.field,
        order: sortConfig.order,
      });
      setData(res.data);
      setTotal(res.pagination.total);
    } catch (err) {
      setError("Failed to load jobs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [filters, page, limit, sortConfig]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSort = (field: 'createdAt' | 'preferredSchedule' | 'status') => {
    setSortConfig(prev => ({
      field,
      order: prev.field === field && prev.order === 'asc' ? 'desc' : 'asc',
    }));
    setPage(1);
  };

  const handleViewDetails = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
  };

  const columns: any[] = [
    {
      key: "id",
      label: "Job ID",
      render: (item: Job) => (
        <span className="font-mono text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded uppercase">
          {item.id.slice(-8)}
        </span>
      )
    },
    {
      key: "customerId",
      label: "Customer",
      render: (item: Job) => (
        <span className="font-medium text-sm">
          {item.customerId ? `Customer #${item.customerId.slice(-4)}` : '-'}
        </span>
      )
    },
    {
      key: "categoryId",
      label: "Category",
      render: (item: Job) => (
        <span className="font-medium text-sm">
          {item.categoryId ? `Category #${item.categoryId.slice(-4)}` : '-'}
        </span>
      )
    },
    {
      key: "serviceId",
      label: "Service",
      render: (item: Job) => (
        <span className="font-medium text-sm">
          {item.serviceId ? `Service #${item.serviceId.slice(-4)}` : '-'}
        </span>
      )
    },
    {
      key: "subServiceId",
      label: "Sub Service",
      render: (item: Job) => (
        <span className="font-medium text-sm">
          {item.subServiceId ? `Sub #${item.subServiceId.slice(-4)}` : '-'}
        </span>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (item: Job) => (
        <Badge className={cn("px-3 py-1 rounded-full font-bold uppercase tracking-widest text-[9px] border shadow-none", jobStatusColors[item.status])}>
          {item.status.replace('_', ' ')}
        </Badge>
      )
    },
    {
      key: "currentAssignmentId",
      label: "Assigned Worker",
      render: (item: Job) => (
        <span className="font-medium text-sm">
          {item.currentAssignmentId ? `Worker #${item.currentAssignmentId.slice(-4)}` : '-'}
        </span>
      )
    },
    {
      key: "preferredSchedule",
      label: "Preferred Schedule",
      render: (item: Job) => (
        <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
          <Calendar className="w-3 h-3" />
          {formatDate(new Date(item.preferredSchedule), "dd MMM, hh:mm a")}
        </div>
      )
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (item: Job) => (
        <span className="text-muted-foreground text-sm">
          {formatDate(new Date(item.createdAt), "dd MMM, hh:mm a")}
        </span>
      )
    },
    {
      key: "workflowStatus",
      label: "Current Workflow Status",
      render: (item: Job) => (
        <Badge className={cn("px-3 py-1 rounded-full font-bold uppercase tracking-widest text-[9px] border shadow-none", jobStatusColors[item.status])}>
          {item.status.replace('_', ' ')}
        </Badge>
      )
    },
    {
      key: "actions",
      label: "Action",
      render: (item: Job) => (
        <Button
          size="sm"
          variant="ghost"
          className="h-8 w-8 p-0 rounded-lg hover:bg-primary/5 hover:text-primary transition-all active:scale-90"
          onClick={() => handleViewDetails(item.id)}
          aria-label={`View details for job ${item.id.slice(-8)}`}
        >
          <Eye className="w-4 h-4" />
        </Button>
      )
    }
  ];

  const totalPages = Math.ceil(total / limit) || 1;

  return (
    <AppLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Fulfillment Jobs</h2>
            <p className="text-muted-foreground text-lg">Monitor and manage all service requests.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 rounded-3xl bg-muted/30 border border-border/50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by Job ID, Customer..."
              className="pl-10 h-11 bg-card border-border/50 rounded-xl focus-visible:ring-primary/20"
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>

          <Select value={filters.status ?? 'all'} onValueChange={(val: string) => setFilters(prev => ({ ...prev, status: val as any }))}>
            <SelectTrigger className="h-11 bg-card border-border/50 rounded-xl focus:ring-primary/20">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent className="rounded-xl border-border/50 shadow-xl overflow-hidden">
              <SelectItem value="all">All Statuses</SelectItem>
              {Object.values(JobStatus).map(s => (
                <SelectItem key={s} value={s} className="capitalize">{s.replace('_', ' ')}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Input
              type="date"
              className="h-11 bg-card border-border/50 rounded-xl focus-visible:ring-primary/20"
              onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
            />
            <span className="text-muted-foreground font-bold">→</span>
            <Input
              type="date"
              className="h-11 bg-card border-border/50 rounded-xl focus-visible:ring-primary/20"
              onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
            />
          </div>

          <Button variant="outline" className="h-11 rounded-xl gap-2 font-bold border-border/50 hover:bg-muted" onClick={() => setFilters({ status: 'all' })}>
            <Filter className="w-4 h-4" /> Reset
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl" role="alert">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-destructive mt-0.5" />
              <p className="text-destructive font-medium">{error}</p>
            </div>
            <Button size="sm" variant="ghost" className="mt-2" onClick={loadData}>
              Retry
            </Button>
          </div>
        )}

        <DataTable
          data={data}
          columns={columns}
          isLoading={loading}
          total={total}
          page={page}
          limit={limit}
          onPageChange={setPage}
          onSearch={() => {}}
        />
      </div>
    </AppLayout>
  );
}