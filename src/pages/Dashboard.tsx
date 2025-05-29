
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
import { FileText, DollarSign } from "lucide-react";

const Dashboard = () => {
  const analytics = calculateAnalyticsSummary();
  const kpiData = calculateKPIData();
  const exceptionData = calculateExceptionData();
  const recentInvoices = getRecentInvoices();

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Home Page" 
        subtitle="Your real-time overview of invoice and connection health" 
      />
      
      {/* Analytics Summary - Top Grid (3 Columns) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnalyticsCard
          title="Paid / Upcoming / Past Due"
          value={`${analytics.paid} / ${analytics.upcoming} / ${analytics.pastDue}`}
          type="paid"
        />
        <AnalyticsCard
          title="Invoices Found in Portal"
          value={analytics.totalInPortal}
          type="portal"
          icon={<FileText className="h-5 w-5" />}
        />
        <AnalyticsCard
          title="Avg Time-to-Payment"
          value={`${analytics.avgTimeToPayment} days`}
          subtitle="Avg time from issued to paid"
          type="time"
        />
      </div>

      {/* KPI Summary Cards - Row of 2 Cards */}
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

      {/* Recent Invoices Table */}
      <RecentInvoicesTable invoices={recentInvoices} />
    </div>
  );
};

export default Dashboard;
