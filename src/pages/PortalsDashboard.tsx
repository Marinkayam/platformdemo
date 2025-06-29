
import React from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/PageHeader";
import { Link } from "react-router-dom";
import { PortalRecordsTable } from "@/components/portal-records/PortalRecordsTable";
import { PurchaseOrderTable } from "@/components/purchase-orders/PurchaseOrderTable";
import { allPortalRecords } from "@/data/portalRecords";
import { purchaseOrderData } from "@/data/purchaseOrders";
import { Clock } from "lucide-react";
import { calculatePortalsDashboardMetrics } from "@/utils/portalsDashboardUtils";
import { BuyersFoundCard } from "@/components/portals-dashboard/BuyersFoundCard";
import { PortalsScannedCard } from "@/components/portals-dashboard/PortalsScannedCard";
import { TopBuyersCard } from "@/components/portals-dashboard/TopBuyersCard";
import { OpenPOsCard } from "@/components/portals-dashboard/OpenPOsCard";
import { OpenInvoicesCard } from "@/components/portals-dashboard/OpenInvoicesCard";
import { AtRiskCard } from "@/components/portals-dashboard/AtRiskCard";

export default function PortalsDashboard() {
  const metrics = calculatePortalsDashboardMetrics();

  // Format last scan time
  const lastScanTime = new Date();
  lastScanTime.setHours(lastScanTime.getHours() - 2);
  const formattedLastScan = lastScanTime.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="space-y-8 p-8">
      <PageHeader 
        title="Portals Dashboard" 
        subtitle="Unified view of invoices and POs from all portals—track connections, syncs, and insights."
      />
        
      {/* Last Scan Time */}
      <div className="flex items-center gap-2 text-sm text-[#586079] -mt-4">
        <Clock className="h-4 w-4 text-[#7B59FF]" />
        <span>Last scanned: {formattedLastScan}</span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BuyersFoundCard 
          buyersCount={metrics.buyersCount}
          topBuyersByFrequency={metrics.topBuyersByFrequency}
        />

        <PortalsScannedCard 
          portalsCount={metrics.portalsCount}
          recentPortals={metrics.recentPortals}
        />

        <TopBuyersCard 
          topBuyers={metrics.topBuyers}
          topOpenPO={metrics.topOpenPO}
        />

        <OpenPOsCard 
          openPOsCount={metrics.openPOsCount}
          openPOsTotal={metrics.openPOsTotal}
          topOpenPO={metrics.topOpenPO}
        />

        <OpenInvoicesCard 
          openInvoicesCount={metrics.openInvoicesCount}
          openInvoicesTotal={metrics.openInvoicesTotal}
          openInvoicesDueSoon={metrics.openInvoicesDueSoon}
        />

        <AtRiskCard 
          atRiskInvoicesCount={metrics.atRiskInvoicesCount}
          atRiskInvoicesTotal={metrics.atRiskInvoicesTotal}
        />
      </div>
      
      {/* Portal Records Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E6E7EB] pb-4">
          <div>
            <h2 className="text-xl font-semibold text-[#061237] tracking-tight">Portal Records</h2>
            <p className="text-sm text-[#586079] mt-1">Recent portal record activity</p>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-[#7B59FF] hover:text-[#523BAA]">
            <Link to="/portal-records">View All</Link>
          </Button>
        </div>
        <PortalRecordsTable records={allPortalRecords.slice(0, 5)} />
      </div>

      {/* Purchase Orders Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#E6E7EB] pb-4">
          <div>
            <h2 className="text-xl font-semibold text-[#061237] tracking-tight">Purchase Orders</h2>
            <p className="text-sm text-[#586079] mt-1">Recent purchase order activity</p>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-[#7B59FF] hover:text-[#523BAA]">
            <Link to="/purchase-orders">View All</Link>
          </Button>
        </div>
        <PurchaseOrderTable purchaseOrders={purchaseOrderData.slice(0, 5)} />
      </div>
    </div>
  );
}
