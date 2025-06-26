
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
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Metrics Grid */}
      <DashboardMetricsGrid data={metricsData} />
      
      {/* Exceptions and Insights Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DashboardExceptions exceptionData={exceptionData} />
        </div>
        <div className="space-y-6">
          <DashboardInsights />
          <CompactCashForecast />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
