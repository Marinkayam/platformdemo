import React from 'react';
import { AnalyticsCard } from './AnalyticsCard';
import { TrendingUp, Building, FileText, CreditCard, AlertTriangle, Clock } from 'lucide-react';

interface MetricsData {
  totalCustomers: number;
  totalOpenPOsValue: number;
  connectedPortals: number;
  atRiskCash: number;
  upcomingAmount: number;
  upcomingInvoices: number;
  pastDueAmount: number;
  pastDueInvoices: number;
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
        icon={<Building className="h-4 w-4" style={{ width: 16, height: 16 }} />}
      />
      
      <AnalyticsCard
        title="Connected Portals"
        value={data.connectedPortals.toString()}
        subtitle="+12% from last month"
        type="portal"
        icon={<CreditCard className="h-4 w-4" style={{ width: 16, height: 16 }} />}
      />
      
      <AnalyticsCard
        title="Total Open POs"
        value={`$${(data.totalOpenPOsValue / 1000000).toFixed(1)}M`}
        subtitle="+14.5% from last month"
        type="upcoming"
        icon={<FileText className="h-4 w-4" style={{ width: 16, height: 16 }} />}
      />
      
      <AnalyticsCard
        title="At-Risk Cash"
        value={`$${(data.atRiskCash / 1000000).toFixed(1)}M`}
        subtitle="-5.8% from last month"
        type="pastdue"
        icon={<AlertTriangle className="h-4 w-4" style={{ width: 16, height: 16 }} />}
      />
      
      <AnalyticsCard
        title="Upcoming"
        value={`$${data.upcomingAmount}M`}
        subtitle={`${data.upcomingInvoices} invoices`}
        type="upcoming"
        icon={<Clock className="h-4 w-4" style={{ width: 16, height: 16 }} />}
      />
      
      <AnalyticsCard
        title="Past Due"
        value={`$${data.pastDueAmount}M`}
        subtitle={`${data.pastDueInvoices} invoices`}
        type="pastdue"
        icon={<AlertTriangle className="h-4 w-4" style={{ width: 16, height: 16 }} />}
      />
    </div>
  );
}
