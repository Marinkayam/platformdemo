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
  const finalMetrics = calculatePortalsDashboardMetrics();

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
  const [metricsScanning, setMetricsScanning] = useState(true);
  const [currentMetrics, setCurrentMetrics] = useState({
    buyersCount: 0,
    portalsCount: 0,
    openPOsCount: 0,
    openPOsTotal: 0,
    openInvoicesCount: 0,
    openInvoicesTotal: 0,
    atRiskInvoicesCount: 0,
    atRiskInvoicesTotal: 0
  });

  // Progress bar animation - smoother with easing
  useEffect(() => {
    if (progress < 100) {
      const increment = progress < 30 ? 2 : progress < 70 ? 3 : 1.5; // Variable speed for realistic effect
      const timeout = progress < 30 ? 150 : progress < 70 ? 100 : 200;
      
      const frame = setTimeout(() => {
        setProgress(prev => Math.min(prev + increment, 100));
      }, timeout);
      
      return () => clearTimeout(frame);
    } else {
      const completionTimer = setTimeout(() => setScanComplete(true), 300);
      return () => clearTimeout(completionTimer);
    }
  }, [progress]);

  // Metrics scanning animation - smoother increments
  useEffect(() => {
    if (!metricsScanning) return;
    
    const metricsInterval = setInterval(() => {
      const progressFactor = Math.min(progress / 100, 1);
      const easedProgress = 1 - Math.pow(1 - progressFactor, 3); // Cubic ease-out
      
      setCurrentMetrics({
        buyersCount: Math.floor(finalMetrics.buyersCount * easedProgress),
        portalsCount: Math.floor(finalMetrics.portalsCount * easedProgress),
        openPOsCount: Math.floor(finalMetrics.openPOsCount * easedProgress),
        openPOsTotal: Math.floor(finalMetrics.openPOsTotal * easedProgress),
        openInvoicesCount: Math.floor(finalMetrics.openInvoicesCount * easedProgress),
        openInvoicesTotal: Math.floor(finalMetrics.openInvoicesTotal * easedProgress),
        atRiskInvoicesCount: Math.floor(finalMetrics.atRiskInvoicesCount * easedProgress),
        atRiskInvoicesTotal: Math.floor(finalMetrics.atRiskInvoicesTotal * easedProgress)
      });
    }, 50); // Higher frequency for smoother updates

    const completionTimer = setTimeout(() => {
      setMetricsScanning(false);
      setCurrentMetrics({
        buyersCount: finalMetrics.buyersCount,
        portalsCount: finalMetrics.portalsCount,
        openPOsCount: finalMetrics.openPOsCount,
        openPOsTotal: finalMetrics.openPOsTotal,
        openInvoicesCount: finalMetrics.openInvoicesCount,
        openInvoicesTotal: finalMetrics.openInvoicesTotal,
        atRiskInvoicesCount: finalMetrics.atRiskInvoicesCount,
        atRiskInvoicesTotal: finalMetrics.atRiskInvoicesTotal
      });
      clearInterval(metricsInterval);
    }, 3000);

    return () => {
      clearInterval(metricsInterval);
      clearTimeout(completionTimer);
    };
  }, [progress, finalMetrics, metricsScanning]);

  // Use current metrics during scan, final metrics after scan
  const displayMetrics = metricsScanning ? {
    ...finalMetrics,
    buyersCount: currentMetrics.buyersCount,
    portalsCount: currentMetrics.portalsCount,
    openPOsCount: currentMetrics.openPOsCount,
    openPOsTotal: currentMetrics.openPOsTotal,
    openInvoicesCount: currentMetrics.openInvoicesCount,
    openInvoicesTotal: currentMetrics.openInvoicesTotal,
    atRiskInvoicesCount: currentMetrics.atRiskInvoicesCount,
    atRiskInvoicesTotal: currentMetrics.atRiskInvoicesTotal
  } : finalMetrics;

  return (
    <div className="w-full">
      <div className="px-2 sm:px-4 md:px-6 py-3 max-w-[1440px] mx-auto w-full space-y-8">
        <PageHeader 
          title="Portals Dashboard" 
          subtitle="Unified view of invoices and POs from all portals—track connections, syncs, and insights."
        />
        
        {/* AI Scan Progress Bar - Enhanced Magical Version */}
        {!scanComplete && (
          <motion.div 
            className="w-96 max-w-full mt-2 mb-2 flex flex-col items-center relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <AnimatePresence>
              <motion.div
                key="ai-magic-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-1"
              >
                <SparklesText 
                  text={`AI scanning portals... ${Math.round(progress)}%`} 
                  className="text-base font-semibold text-[#7B59FF]" 
                  sparklesCount={12} 
                  duration={1200} 
                />
              </motion.div>
            </AnimatePresence>
            <div className="relative w-full">
              <Progress
                value={progress}
                indicatorClassName="bg-gradient-to-r from-[#7B59FF] via-[#9B7AFF] via-[#B983FF] to-[#7B59FF] shadow-[0_0_20px_3px_rgba(123,89,255,0.4)] transition-all duration-500 ease-out"
                className="h-1.5 rounded-full bg-gradient-to-r from-[#F0EDFF] to-[#E8E3FF] shadow-[0_3px_20px_0_rgba(123,89,255,0.15)]"
              />
              {/* Enhanced sparkles overlay with pulsing */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <SparklesText text="✨" className="text-2xl" sparklesCount={8} duration={1000} />
                </motion.div>
              </div>
              {/* Scanning light effect */}
              <motion.div
                className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full"
                animate={{ x: [-32, 384] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ filter: 'blur(1px)' }}
              />
            </div>
          </motion.div>
        )}
        
        {/* Enhanced completion message */}
        {scanComplete && (
          <motion.div 
            className="flex items-center gap-2 text-sm text-[#7B59FF] font-semibold -mt-4 min-h-[40px]"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.span 
              className="text-base font-semibold"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              ✅ AI scan completed:
            </motion.span>
            <span className="text-[#586079] font-normal ml-2">{formattedLastScan}</span>
          </motion.div>
        )}

        {/* Enhanced Metrics Grid with smooth animations */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0.7 }}
          animate={{ opacity: scanComplete ? 1 : 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ 
              scale: metricsScanning ? [1, 1.02, 1] : 1,
            }}
            transition={{ 
              duration: 1.5,
              repeat: metricsScanning ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            <BuyersFoundCard 
              buyersCount={displayMetrics.buyersCount}
              topBuyersByFrequency={displayMetrics.topBuyersByFrequency}
            />
          </motion.div>

          <motion.div
            animate={{ 
              scale: metricsScanning ? [1, 1.02, 1] : 1,
            }}
            transition={{ 
              duration: 1.5,
              repeat: metricsScanning ? Infinity : 0,
              ease: "easeInOut",
              delay: 0.1
            }}
          >
            <PortalsScannedCard 
              portalsCount={displayMetrics.portalsCount}
              recentPortals={displayMetrics.recentPortals}
            />
          </motion.div>

          <motion.div
            animate={{ 
              scale: metricsScanning ? [1, 1.02, 1] : 1,
            }}
            transition={{ 
              duration: 1.5,
              repeat: metricsScanning ? Infinity : 0,
              ease: "easeInOut",
              delay: 0.2
            }}
          >
            <TopBuyersCard 
              topBuyers={displayMetrics.topBuyers}
              topOpenPO={displayMetrics.topOpenPO}
            />
          </motion.div>

          <motion.div
            animate={{ 
              scale: metricsScanning ? [1, 1.02, 1] : 1,
            }}
            transition={{ 
              duration: 1.5,
              repeat: metricsScanning ? Infinity : 0,
              ease: "easeInOut",
              delay: 0.3
            }}
          >
            <OpenPOsCard 
              openPOsCount={displayMetrics.openPOsCount}
              openPOsTotal={displayMetrics.openPOsTotal}
              topOpenPO={displayMetrics.topOpenPO}
            />
          </motion.div>

          <motion.div
            animate={{ 
              scale: metricsScanning ? [1, 1.02, 1] : 1,
            }}
            transition={{ 
              duration: 1.5,
              repeat: metricsScanning ? Infinity : 0,
              ease: "easeInOut",
              delay: 0.4
            }}
          >
            <OpenInvoicesCard 
              openInvoicesCount={displayMetrics.openInvoicesCount}
              openInvoicesTotal={displayMetrics.openInvoicesTotal}
              openInvoicesDueSoon={displayMetrics.openInvoicesDueSoon}
            />
          </motion.div>

          <motion.div
            animate={{ 
              scale: metricsScanning ? [1, 1.02, 1] : 1,
            }}
            transition={{ 
              duration: 1.5,
              repeat: metricsScanning ? Infinity : 0,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <AtRiskCard 
              atRiskInvoicesCount={displayMetrics.atRiskInvoicesCount}
              atRiskInvoicesTotal={displayMetrics.atRiskInvoicesTotal}
            />
          </motion.div>
        </motion.div>
        
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
