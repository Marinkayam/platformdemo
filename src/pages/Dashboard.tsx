
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

  // Dynamic metrics data based on date range
  const getMetricsData = (range: DateRange) => {
    switch (range) {
      case 'last-day':
        return {
          totalCustomers: 425,
          totalOpenPOsValue: 73500000,
          connectedPortals: 120,
          atRiskCash: 2350000,
          upcomingAmount: 30,
          upcomingInvoices: 185,
          pastDueAmount: 30,
          pastDueInvoices: 92,
          customerGrowth: "+0.2% from yesterday",
          portalGrowth: "+1% from yesterday", 
          poGrowth: "+2.1% from yesterday",
          riskChange: "-0.8% from yesterday",
        };
      case 'last-week':
        return {
          totalCustomers: 423,
          totalOpenPOsValue: 71200000,
          connectedPortals: 118,
          atRiskCash: 2480000,
          upcomingAmount: 28,
          upcomingInvoices: 172,
          pastDueAmount: 32,
          pastDueInvoices: 98,
          customerGrowth: "+1.8% from last week",
          portalGrowth: "+4.2% from last week",
          poGrowth: "+8.7% from last week", 
          riskChange: "-12.3% from last week",
        };
      case 'last-month':
        return {
          totalCustomers: 425,
          totalOpenPOsValue: 73500000,
          connectedPortals: 120,
          atRiskCash: 2350000,
          upcomingAmount: 30,
          upcomingInvoices: 185,
          pastDueAmount: 30,
          pastDueInvoices: 92,
          customerGrowth: "+8% from last month",
          portalGrowth: "+12% from last month",
          poGrowth: "+14.5% from last month",
          riskChange: "-5.8% from last month",
        };
      case 'last-year':
        return {
          totalCustomers: 387,
          totalOpenPOsValue: 62800000,
          connectedPortals: 95,
          atRiskCash: 3100000,
          upcomingAmount: 25,
          upcomingInvoices: 148,
          pastDueAmount: 38,
          pastDueInvoices: 115,
          customerGrowth: "+24.3% from last year",
          portalGrowth: "+35.8% from last year",
          poGrowth: "+42.1% from last year",
          riskChange: "-31.2% from last year",
        };
      default:
        return {
          totalCustomers: 425,
          totalOpenPOsValue: 73500000,
          connectedPortals: 120,
          atRiskCash: 2350000,
          upcomingAmount: 30,
          upcomingInvoices: 185,
          pastDueAmount: 30,
          pastDueInvoices: 92,
          customerGrowth: "+8% from last month",
          portalGrowth: "+12% from last month",
          poGrowth: "+14.5% from last month",
          riskChange: "-5.8% from last month",
        };
    }
  };

  const metricsData = getMetricsData(dateRange);

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
