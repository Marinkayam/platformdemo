
import { PageHeader } from "@/components/common/PageHeader";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { KPICard } from "@/components/dashboard/KPICard";
import { ExceptionCard } from "@/components/dashboard/ExceptionCard";
import { RecentInvoicesTable } from "@/components/dashboard/RecentInvoicesTable";
import { 
  calculateAnalyticsSummary, 
  calculateKPIData, 
  calculateExceptionData,
  getRecentInvoices 
} from "@/utils/dashboardAnalytics";
import { FileText, DollarSign, TrendingUp, Clock, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  const analytics = calculateAnalyticsSummary();
  const kpiData = calculateKPIData();
  const exceptionData = calculateExceptionData();
  const recentInvoices = getRecentInvoices();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Dashboard" 
        subtitle="Your real-time overview of invoice and connection health" 
      />
      
      {/* Analytics Cards - 5 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <AnalyticsCard
          title="Paid Invoices"
          value={analytics.paid}
          subtitle="Successfully processed"
          type="paid"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <AnalyticsCard
          title="Upcoming Invoices"
          value={analytics.upcoming}
          subtitle="Due for payment"
          type="upcoming"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <AnalyticsCard
          title="Past Due Invoices"
          value={analytics.pastDue}
          subtitle="Overdue payments"
          type="pastdue"
          icon={<AlertTriangle className="h-5 w-5" />}
        />
        <AnalyticsCard
          title="Portal Invoices"
          value={analytics.totalInPortal}
          subtitle="Found in portal systems"
          type="portal"
          icon={<FileText className="h-5 w-5" />}
        />
        <AnalyticsCard
          title="Avg Time-to-Payment"
          value={`${analytics.avgTimeToPayment} days`}
          subtitle="Average processing time"
          type="time"
          icon={<Clock className="h-5 w-5" />}
        />
      </div>

      {/* KPI Cards - Rejection Rate and Zero Touch */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <KPICard
          title="Rejection Rate"
          value={kpiData.rejectionRate}
          subtitle="% of invoices rejected vs. submitted"
          type="rejection"
        />
        <KPICard
          title="Zero-Touch Processing"
          value={kpiData.zeroTouchPercentage}
          subtitle="Invoices auto-processed without manual intervention"
          type="zerotouch"
          showProgress={true}
        />
      </div>

      {/* Recent Invoices Table */}
      <div className="grid grid-cols-1 gap-6">
        <RecentInvoicesTable invoices={recentInvoices} />
      </div>

      {/* Exception CTAs - 2 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExceptionCard
          title="RTP Exceptions"
          subtitle="Invoices needing manual attention"
          count={exceptionData.rtpExceptions.count}
          amount={exceptionData.rtpExceptions.totalAmount}
          type="rtp"
        />
        <ExceptionCard
          title="Smart Connection Exceptions"
          subtitle="Connection issues affecting invoices"
          count={exceptionData.scExceptions.connectionCount}
          affectedInvoices={exceptionData.scExceptions.affectedInvoices}
          type="smartconnection"
        />
      </div>
    </div>
  );
};

export default Dashboard;
