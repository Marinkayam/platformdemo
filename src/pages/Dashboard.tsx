
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardMetricsGrid } from "@/components/dashboard/DashboardMetricsGrid";
import { DashboardExceptions } from "@/components/dashboard/DashboardExceptions";
import { DashboardInsights } from "@/components/dashboard/DashboardInsights";
import { CompactCashForecast } from "@/components/dashboard/CompactCashForecast";
import { calculateExceptionData } from "@/utils/dashboardAnalytics";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Mock metrics data based on the screenshot
  const metricsData = {
    totalCustomers: 425,
    totalOpenPOsValue: 73500000,
    totalApprovedInvoices: 48750000,
    connectedPortals: 120,
    availableEarlyPayments: 12500000,
    atRiskCash: 2350000,
  };

  const exceptionData = calculateExceptionData();

  if (isLoading) {
    return (
      <div className="space-y-8 p-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-80 w-full rounded-xl" />
          <Skeleton className="h-80 w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-2">
      {/* Insights and Cash Forecast Row - Top priority */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <DashboardInsights />
        <CompactCashForecast />
      </div>
      
      {/* Exceptions Row */}
      <DashboardExceptions exceptionData={exceptionData} />
      
      {/* Main Metrics Grid */}
      <DashboardMetricsGrid data={metricsData} />
    </div>
  );
};

export default Dashboard;
