
import { PageHeader } from "@/components/common/PageHeader";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { KPICard } from "@/components/dashboard/KPICard";
import { ExceptionCard } from "@/components/dashboard/ExceptionCard";
import { RecentInvoicesTable } from "@/components/dashboard/RecentInvoicesTable";
import { MetricsChart } from "@/components/dashboard/MetricsChart";
import { RegionalChart } from "@/components/dashboard/RegionalChart";
import { ConversionCard } from "@/components/dashboard/ConversionCard";
import { 
  calculateAnalyticsSummary, 
  calculateKPIData, 
  calculateExceptionData,
  getRecentInvoices 
} from "@/utils/dashboardAnalytics";
import { FileText, DollarSign, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const analytics = calculateAnalyticsSummary();
  const kpiData = calculateKPIData();
  const exceptionData = calculateExceptionData();
  const recentInvoices = getRecentInvoices();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Home Page" 
        subtitle="Your real-time overview of invoice and connection health" 
      />
      
      {/* Top Metrics - 4 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AnalyticsCard
          title="Total active users"
          value="18,765"
          subtitle="+2.6% last 7 days"
          type="paid"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <AnalyticsCard
          title="Total installed"
          value="4,876"
          subtitle="+0.2% last 7 days"
          type="portal"
          icon={<FileText className="h-5 w-5" />}
        />
        <AnalyticsCard
          title="Total downloads"
          value="678"
          subtitle="-0.1% last 7 days"
          type="pastdue"
        />
        <AnalyticsCard
          title="Revenue"
          value="$52,765"
          subtitle="+12.5% last 7 days"
          type="paid"
          icon={<DollarSign className="h-5 w-5" />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RegionalChart />
        <MetricsChart />
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

      {/* Bottom Section - Table and Conversion Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentInvoicesTable invoices={recentInvoices} />
        </div>
        <div className="space-y-6">
          <ConversionCard 
            title="Conversion"
            value="38,566"
            percentage={48}
            color="green"
          />
          <ConversionCard 
            title="Applications"
            value="55,566"
            percentage={75}
            color="blue"
          />
        </div>
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
