import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardMetricsGrid } from "@/components/dashboard/DashboardMetricsGrid";
import { DashboardExceptions } from "@/components/dashboard/DashboardExceptions";
import { TransactionsChart } from "@/components/dashboard/TransactionsChart";
import { AccountReceivables } from "@/components/dashboard/AccountReceivables";
import { DateRangeFilter, DateRange } from "@/components/dashboard/DateRangeFilter";
import { calculateExceptionData } from "@/utils/dashboardAnalytics";
import { 
  Sun, 
  Moon, 
  Coffee,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  ArrowRight,
  Activity
} from "lucide-react";

const SecretDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState<DateRange>('last-month');

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good morning", icon: Sun };
    if (hour < 17) return { text: "Good afternoon", icon: Coffee };
    return { text: "Good evening", icon: Moon };
  };

  const greeting = getGreeting();
  const userName = "Nitsan";

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

  // Calculate status summary
  const totalExceptions = exceptionData.duplicateInvoices + exceptionData.poMismatches + exceptionData.missingData;
  const hasUrgentItems = totalExceptions > 0 || metricsData.pastDueInvoices > 0;
  const systemStatus = hasUrgentItems ? "needs_attention" : "healthy";

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-24 w-full rounded-xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton className="h-80 w-full rounded-xl" />
          <Skeleton className="h-80 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 1. Personal Welcome Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <greeting.icon className="h-6 w-6 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {greeting.text}, {userName}!
                </h1>
                <p className="text-gray-600 mt-1">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            
            {/* Status Summary */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2">
                  {systemStatus === "healthy" ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-700">All systems healthy</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                      <span className="text-sm font-medium text-amber-700">
                        {totalExceptions + metricsData.pastDueInvoices} items need attention
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {metricsData.connectedPortals} portals connected
                </p>
              </div>
              
              {/* Date Filter */}
              <DateRangeFilter 
                value={dateRange} 
                onChange={setDateRange}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Critical Actions First (if any) */}
      {hasUrgentItems && (
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <CardTitle className="text-amber-900">Priority Actions Required</CardTitle>
                <Badge className="bg-amber-600 text-white">
                  {totalExceptions + metricsData.pastDueInvoices} items
                </Badge>
              </div>
              <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                Review All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {totalExceptions > 0 && (
                <div className="bg-white rounded-lg p-4 border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span className="font-medium text-gray-900">Invoice Exceptions</span>
                  </div>
                  <p className="text-2xl font-bold text-amber-600 mb-1">{totalExceptions}</p>
                  <p className="text-sm text-gray-600">Duplicates and mismatches</p>
                  <Button size="sm" variant="outline" className="mt-2 w-full">
                    Resolve Issues
                  </Button>
                </div>
              )}
              
              {metricsData.pastDueInvoices > 0 && (
                <div className="bg-white rounded-lg p-4 border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="h-4 w-4 text-red-600" />
                    <span className="font-medium text-gray-900">Overdue Payments</span>
                  </div>
                  <p className="text-2xl font-bold text-red-600 mb-1">{metricsData.pastDueInvoices}</p>
                  <p className="text-sm text-gray-600">${(metricsData.pastDueAmount * 1000000).toLocaleString()} total</p>
                  <Button size="sm" variant="outline" className="mt-2 w-full">
                    Process Payments
                  </Button>
                </div>
              )}

              <div className="bg-white rounded-lg p-4 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-gray-900">System Health</span>
                </div>
                <p className="text-2xl font-bold text-green-600 mb-1">99.2%</p>
                <p className="text-sm text-gray-600">Processing rate</p>
                <Button size="sm" variant="outline" className="mt-2 w-full">
                  View Details
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 3. Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open PO Value</p>
                <p className="text-3xl font-bold text-gray-900">
                  ${(metricsData.totalOpenPOsValue / 1000000).toFixed(1)}M
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">{metricsData.poGrowth}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Upcoming</p>
                <p className="text-xl font-semibold text-blue-600">{metricsData.upcomingInvoices}</p>
                <p className="text-xs text-gray-500">invoices</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Connected Portals</p>
                <p className="text-3xl font-bold text-gray-900">{metricsData.connectedPortals}</p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600">{metricsData.portalGrowth}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Customers</p>
                <p className="text-xl font-semibold text-blue-600">{metricsData.totalCustomers}</p>
                <p className="text-xs text-gray-500">active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">At Risk Cash</p>
                <p className="text-3xl font-bold text-red-600">
                  ${(metricsData.atRiskCash / 1000000).toFixed(1)}M
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <TrendingUp className={`h-4 w-4 ${metricsData.riskChange.includes('+') ? 'text-red-600' : 'text-green-600'}`} />
                  <span className={`text-sm ${metricsData.riskChange.includes('+') ? 'text-red-600' : 'text-green-600'}`}>
                    {metricsData.riskChange}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Past Due</p>
                <p className="text-xl font-semibold text-red-600">{metricsData.pastDueInvoices}</p>
                <p className="text-xs text-gray-500">invoices</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. Charts for Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TransactionsChart />
        <AccountReceivables />
      </div>
      
      {/* 5. Exceptions Detail */}
      <DashboardExceptions exceptionData={exceptionData} />
      
      {/* 6. Detailed Metrics Grid */}
      <DashboardMetricsGrid data={metricsData} />
    </div>
  );
};

export default SecretDashboard;