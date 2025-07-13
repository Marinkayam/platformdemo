
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardMetricsGrid } from "@/components/dashboard/DashboardMetricsGrid";
import { DashboardExceptions } from "@/components/dashboard/DashboardExceptions";
import { TransactionsChart } from "@/components/dashboard/TransactionsChart";
import { AccountReceivables } from "@/components/dashboard/AccountReceivables";
import { DateRangeFilter, DateRange } from "@/components/dashboard/DateRangeFilter";
import { calculateExceptionData } from "@/utils/dashboardAnalytics";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>('last-month');

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Mock metrics data for the new structure
  const metricsData = {
    totalCustomers: 425,
    totalOpenPOsValue: 73500000,
    connectedPortals: 120,
    atRiskCash: 2350000,
    upcomingAmount: 30,
    upcomingInvoices: 185,
    pastDueAmount: 30,
    pastDueInvoices: 92,
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
      {/* Transactions and Account Receivables Row - Top priority */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TransactionsChart />
        <AccountReceivables />
      </div>
      
      {/* Exceptions Row */}
      <DashboardExceptions exceptionData={exceptionData} />
      
      {/* Date Range Filter */}
      <DateRangeFilter 
        value={dateRange} 
        onChange={setDateRange}
        className="flex justify-end"
      />
      
      {/* Main Metrics Grid */}
      <DashboardMetricsGrid data={metricsData} />
    </div>
  );
};

export default Dashboard;
