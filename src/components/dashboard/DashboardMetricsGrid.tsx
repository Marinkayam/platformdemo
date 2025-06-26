
import React from 'react';
import { AnalyticsCard } from './AnalyticsCard';
import { TrendingUp, TrendingDown, Building, FileText, CreditCard, AlertTriangle } from 'lucide-react';

interface MetricsData {
  totalCustomers: number;
  totalOpenPOsValue: number;
  totalApprovedInvoices: number;
  connectedPortals: number;
  availableEarlyPayments: number;
  atRiskCash: number;
}

interface DashboardMetricsGridProps {
  data: MetricsData;
}

export function DashboardMetricsGrid({ data }: DashboardMetricsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnalyticsCard
        title="Total Customers"
        value={data.totalCustomers.toLocaleString()}
        subtitle="+8% from last month"
        type="paid"
        icon={<Building className="h-5 w-5" />}
      />
      
      <AnalyticsCard
        title="Total Open POs Value"
        value={`$${(data.totalOpenPOsValue / 1000000).toFixed(1)}M`}
        subtitle="+14.5% from last month"
        type="upcoming"
        icon={<FileText className="h-5 w-5" />}
      />
      
      <AnalyticsCard
        title="Total Approved Invoices"
        value={`$${(data.totalApprovedInvoices / 1000000).toFixed(1)}M`}
        subtitle="+6.2% from last month"
        type="paid"
        icon={<TrendingUp className="h-5 w-5" />}
      />
      
      <AnalyticsCard
        title="Connected Portals"
        value={data.connectedPortals.toString()}
        subtitle="+12% from last month"
        type="portal"
        icon={<CreditCard className="h-5 w-5" />}
      />
      
      <AnalyticsCard
        title="Available Early Payments"
        value={`$${(data.availableEarlyPayments / 1000000).toFixed(1)}M`}
        subtitle="+18.7% from last month"
        type="portal"
        icon={<TrendingUp className="h-5 w-5" />}
      />
      
      <AnalyticsCard
        title="At-Risk Cash"
        value={`$${(data.atRiskCash / 1000000).toFixed(1)}M`}
        subtitle="-5.8% from last month"
        type="pastdue"
        icon={<AlertTriangle className="h-5 w-5" />}
      />
    </div>
  );
}
