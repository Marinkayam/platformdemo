import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/PageHeader";
import { Link } from "react-router-dom";
import { PortalRecordsTable } from "@/components/portal-records/PortalRecordsTable";
import { PurchaseOrderTable } from "@/components/purchase-orders/PurchaseOrderTable";
import { allPortalRecords } from "@/data/portalRecords";
import { purchaseOrderData } from "@/data/purchaseOrders";
import { SparklesText } from "@/components/common/SparklesText";
import { calculatePortalsDashboardMetrics } from "@/utils/portalsDashboardUtils";
import { BuyersFoundCard } from "@/components/portals-dashboard/BuyersFoundCard";
import { PortalsScannedCard } from "@/components/portals-dashboard/PortalsScannedCard";
import { TopBuyersCard } from "@/components/portals-dashboard/TopBuyersCard";
import { OpenPOsCard } from "@/components/portals-dashboard/OpenPOsCard";
import { OpenInvoicesCard } from "@/components/portals-dashboard/OpenInvoicesCard";
import { AtRiskCard } from "@/components/portals-dashboard/AtRiskCard";
import { LoadingAnimation } from "@/components/payments-relationships/portal-users/add-portal-user-wizard/LoadingAnimation";

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

  const [showLoader, setShowLoader] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-8 p-8">
      <PageHeader 
        title="Portals Dashboard" 
        subtitle="Unified view of invoices and POs from all portals—track connections, syncs, and insights."
      />
        
      {/* Last Scan Time */}
      <div className="flex items-center gap-2 text-sm text-[#7B59FF] font-semibold -mt-4 min-h-[40px]">
        {!showLoader ? (
          <SparklesText text="AI scan finished:" className="text-base font-semibold" sparklesCount={6} duration={2000} />
        ) : (
          <span className="text-base font-semibold">AI scan finished:</span>
        )}
        <span className="text-[#586079] font-normal ml-2">{formattedLastScan}</span>
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
      <div className="space-y-2 pb-0">
        <div className="flex items-center justify-between pb-0">
          <div>
            <h2 className="text-xl font-semibold text-[#061237] tracking-tight">Portal Records</h2>
            <p className="text-sm text-[#586079] mt-0">Recent portal record activity</p>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-[#7B59FF] hover:text-[#523BAA]">
            <Link to="/portal-records">View All (showing 3 of {allPortalRecords.length})</Link>
          </Button>
        </div>
        <PortalRecordsTable records={allPortalRecords.slice(0, 3)} />
      </div>

      {/* Purchase Orders Section */}
      <div className="space-y-2 pb-0">
        <div className="flex items-center justify-between pb-0">
          <div>
            <h2 className="text-xl font-semibold text-[#061237] tracking-tight">Purchase Orders</h2>
            <p className="text-sm text-[#586079] mt-0">Recent purchase order activity</p>
          </div>
          <Button asChild variant="ghost" size="sm" className="text-[#7B59FF] hover:text-[#523BAA]">
            <Link to="/purchase-orders">View All (showing 3 of {purchaseOrderData.length})</Link>
          </Button>
        </div>
        <PurchaseOrderTable purchaseOrders={purchaseOrderData.slice(0, 3)} />
      </div>
    </div>
  );
}
