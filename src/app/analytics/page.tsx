"use client";

import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ExecutiveDashboard } from "@/components/analytics/ExecutiveDashboard";

export default function AnalyticsPage() {
  return (
    <AppLayout>
      <ExecutiveDashboard />
    </AppLayout>
  );
}
