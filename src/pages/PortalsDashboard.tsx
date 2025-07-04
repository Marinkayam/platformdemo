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
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

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

  const [progress, setProgress] = useState(0);
  const [scanComplete, setScanComplete] = useState(false);
  useEffect(() => {
    let frame: number;
    if (progress < 100) {
      frame = window.setTimeout(() => setProgress(progress + 10), 250);
    } else {
      setTimeout(() => setScanComplete(true), 200);
    }
    return () => clearTimeout(frame);
  }, [progress]);

  return (
    <div className="w-full">
      <div className="px-2 sm:px-4 md:px-6 py-3 max-w-[1440px] mx-auto w-full space-y-8">
        <PageHeader 
          title="Portals Dashboard" 
          subtitle="Unified view of invoices and POs from all portals—track connections, syncs, and insights."
        />
        
        {/* AI Scan Progress Bar - Magical Version */}
        {!scanComplete && (
          <div className="w-96 max-w-full mt-2 mb-2 flex flex-col items-center relative">
            <AnimatePresence>
              <motion.div
                key="ai-magic-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="mb-1"
              >
                <SparklesText 
                  text={`Fetching data from portals... ${progress}%`} 
                  className="text-base font-normal text-[#7B59FF]" 
                  sparklesCount={8} 
                  duration={1500} 
                />
              </motion.div>
            </AnimatePresence>
            <div className="relative w-full">
              <Progress
                value={progress}
                indicatorClassName="bg-gradient-to-r from-[#7B59FF] via-[#B983FF] to-[#7B59FF] shadow-[0_0_16px_2px_rgba(123,89,255,0.25)] transition-all duration-300"
                className="h-1 rounded-full bg-[#F0EDFF] shadow-[0_2px_16px_0_rgba(123,89,255,0.10)]"
              />
              {/* Sparkles overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <SparklesText text="✨" className="text-2xl animate-pulse" sparklesCount={6} duration={1500} />
              </div>
            </div>
          </div>
        )}
        {/* Last Scan Time */}
        {scanComplete && (
          <div className="flex items-center gap-2 text-sm text-[#7B59FF] font-semibold -mt-4 min-h-[40px]">
            <span className="text-base font-semibold">AI scan finished:</span>
            <span className="text-[#586079] font-normal ml-2">{formattedLastScan}</span>
          </div>
        )}

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
    </div>
  );
}
