import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SparklesText } from "@/components/common/SparklesText";
import { calculatePortalsDashboardMetrics } from "@/utils/portalsDashboardUtils";
import { useCountAnimation } from "@/hooks/useCountAnimation";
import { BuyersFoundCard } from "@/components/portals-dashboard/BuyersFoundCard";
import { PortalsScannedCard } from "@/components/portals-dashboard/PortalsScannedCard";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Calendar, ShoppingCart, FileText, AlertTriangle, AlertCircle } from "lucide-react";

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
    openInvoicesTotal: 0
  });

  // Data for cards
  const fakeData = {
    posFoundInScan: 247,
    posFoundPrevious: 240,
    posTotalValue: "$4.2M",
    posAvgValue: "$17K",
    invoiceRecordsFoundInScan: 582,
    invoiceRecordsPrevious: 575,
    invoicesTotalValue: "$8.7M",
    invoicesAvgValue: "$15K",
    rejectedInvoices: 23,
    rejectedPrevious: 21,
    rejectedTotalValue: "$1.2M",
    rejectedThisWeek: 5,
    unmatchedInvoicePortalRecords: 45,
    unmatchedPrevious: 42,
    openPOs: [
      { name: 'Costco', amount: '$15,200', percentage: 100 },
      { name: 'Walmart', amount: '$12,500', percentage: 82 },
      { name: 'Target', amount: '$8,900', percentage: 59 },
      { name: 'Amazon', amount: '$6,200', percentage: 41 }
    ],
    recentInvoices: [
      { name: 'Best Buy', amount: '$9,200', percentage: 100 },
      { name: 'Amazon', amount: '$7,800', percentage: 85 },
      { name: 'Home Depot', amount: '$4,500', percentage: 49 },
      { name: 'Microsoft', amount: '$3,800', percentage: 41 }
    ],
    recentRejections: [
      { name: 'Microsoft', amount: '$3,400' },
      { name: 'Oracle', amount: '$2,800' }
    ],
    rejectionBreakdown: [
      { name: 'PO Mismatch', value: 60, color: '#DF1C41' },
      { name: 'Price Variance', value: 25, color: '#F59E0B' },
      { name: 'Other', value: 15, color: '#9CA3AF' }
    ],
    issuesByPortal: [
      { name: 'Walmart Portal', issue: '8 unmatched', color: 'text-blue-600' },
      { name: 'Target B2B', issue: '5 unmatched', color: 'text-blue-600' },
      { name: 'Amazon Vendor', issue: '3 conflicts', color: 'text-amber-600' },
      { name: 'Home Depot', issue: '1 rejected by buyer', color: 'text-red-600' }
    ]
  };

  // Progress bar animation
  useEffect(() => {
    let frame: number;
    if (progress < 100) {
      frame = window.setTimeout(() => setProgress(progress + 10), 250);
    } else {
      setTimeout(() => {
        setScanComplete(true);
      }, 200);
    }
    return () => clearTimeout(frame);
  }, [progress]);

  // Metrics scanning animation
  useEffect(() => {
    if (!metricsScanning) return;

    const metricsInterval = setInterval(() => {
      setCurrentMetrics(prev => ({
        buyersCount: Math.min(finalMetrics.buyersCount, Math.round((finalMetrics.buyersCount * progress) / 100)),
        portalsCount: Math.min(finalMetrics.portalsCount, Math.round((finalMetrics.portalsCount * progress) / 100)),
        openPOsCount: Math.min(finalMetrics.openPOsCount, Math.round((finalMetrics.openPOsCount * progress) / 100)),
        openPOsTotal: Math.min(finalMetrics.openPOsTotal, Math.round((finalMetrics.openPOsTotal * progress) / 100)),
        openInvoicesCount: Math.min(finalMetrics.openInvoicesCount, Math.round((finalMetrics.openInvoicesCount * progress) / 100)),
        openInvoicesTotal: Math.min(finalMetrics.openInvoicesTotal, Math.round((finalMetrics.openInvoicesTotal * progress) / 100))
      }));
    }, 250);

    const completionTimer = setTimeout(() => {
      setMetricsScanning(false);
      setCurrentMetrics({
        buyersCount: finalMetrics.buyersCount,
        portalsCount: finalMetrics.portalsCount,
        openPOsCount: finalMetrics.openPOsCount,
        openPOsTotal: finalMetrics.openPOsTotal,
        openInvoicesCount: finalMetrics.openInvoicesCount,
        openInvoicesTotal: finalMetrics.openInvoicesTotal
      });
      clearInterval(metricsInterval);
    }, 2500);

    return () => {
      clearInterval(metricsInterval);
      clearTimeout(completionTimer);
    };
  }, [progress, finalMetrics, metricsScanning]);

  const displayMetrics = metricsScanning ? {
    ...finalMetrics,
    buyersCount: currentMetrics.buyersCount,
    portalsCount: currentMetrics.portalsCount,
    openPOsCount: currentMetrics.openPOsCount,
    openPOsTotal: currentMetrics.openPOsTotal,
    openInvoicesCount: currentMetrics.openInvoicesCount,
    openInvoicesTotal: currentMetrics.openInvoicesTotal
  } : finalMetrics;

  // Animated counters
  const animatedPOs = useCountAnimation({
    end: fakeData.posFoundInScan,
    startFrom: fakeData.posFoundPrevious,
    duration: 2500,
    isActive: progress > 0 && progress <= 100
  });

  const animatedInvoices = useCountAnimation({
    end: fakeData.invoiceRecordsFoundInScan,
    startFrom: fakeData.invoiceRecordsPrevious,
    duration: 2500,
    isActive: progress > 0 && progress <= 100
  });

  const animatedUnmatched = useCountAnimation({
    end: fakeData.unmatchedInvoicePortalRecords,
    startFrom: fakeData.unmatchedPrevious,
    duration: 2500,
    isActive: progress > 0 && progress <= 100
  });

  const animatedRejected = useCountAnimation({
    end: fakeData.rejectedInvoices,
    startFrom: fakeData.rejectedPrevious,
    duration: 2500,
    isActive: progress > 0 && progress <= 100
  });

  const newPOs = progress > 0 ? Math.max(0, animatedPOs - fakeData.posFoundPrevious) : 0;
  const newInvoices = progress > 0 ? Math.max(0, animatedInvoices - fakeData.invoiceRecordsPrevious) : 0;

  // Check if still loading
  const isLoading = progress < 100;

  // Skeleton component for loading state
  const Skeleton = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto space-y-5">
      {/* Header with Scan Status */}
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-gray-900">Portals Overview</h1>
        <div className="flex items-center justify-between mt-3">
          <p className="text-sm text-gray-600">Portal information collected and cleaned by Monto's AI to save you time</p>

          {/* Scan Status - Right Side */}
          {scanComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-sm font-medium text-emerald-600">Latest Scan</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>{formattedLastScan}</span>
              </div>
              <span className="text-sm text-gray-400">|</span>
              <span className="text-sm text-gray-500">Next scan in 4 hours</span>
            </motion.div>
          )}
        </div>
      </div>

      {/* AI Scan Progress Bar */}
      {!scanComplete && (
        <div className="w-96 max-w-full flex flex-col items-center relative">
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
                className="text-base font-normal text-primary"
                sparklesCount={8}
                duration={1500}
              />
            </motion.div>
          </AnimatePresence>
          <div className="relative w-full">
            <Progress
              value={progress}
              indicatorClassName="bg-gradient-to-r from-primary via-[#B983FF] to-primary shadow-[0_0_16px_2px_rgba(123,89,255,0.25)] transition-all duration-300"
              className="h-1 rounded-full bg-[#F0EDFF] shadow-[0_2px_16px_0_rgba(123,89,255,0.10)]"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <SparklesText text="✨" className="text-2xl animate-pulse" sparklesCount={6} duration={1500} />
            </div>
          </div>
        </div>
      )}

      {/* Row 1: Main Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Purchase Orders Card */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
              <span className="font-semibold text-gray-800 text-sm">Purchase Orders</span>
            </div>
            {isLoading ? (
              <Skeleton className="w-12 h-4" />
            ) : (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-primary text-xs font-normal"
              >
                {newPOs} new
              </motion.span>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              {isLoading ? (
                <Skeleton className="w-10 h-6 mx-auto mb-1" />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-xl font-bold text-gray-900"
                >
                  {animatedPOs}
                </motion.div>
              )}
              <div className="text-[10px] text-gray-500">Total</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              {isLoading ? (
                <Skeleton className="w-12 h-6 mx-auto mb-1" />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="text-xl font-bold text-gray-900"
                >
                  {fakeData.posTotalValue}
                </motion.div>
              )}
              <div className="text-[10px] text-gray-500">Value</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4 text-center">
              {isLoading ? (
                <Skeleton className="w-10 h-6 mx-auto mb-1" />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-xl font-bold text-emerald-600"
                >
                  {fakeData.posAvgValue}
                </motion.div>
              )}
              <div className="text-[10px] text-emerald-600">Avg</div>
            </div>
          </div>

          {/* Growth Chart */}
          {!isLoading && (
            <div className="mb-6 py-4 px-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-medium text-gray-500">Value Growth (6 months)</span>
                <span className="text-[10px] font-semibold text-emerald-600">+100%</span>
              </div>
              <div className="flex items-end gap-4">
                <span className="text-xs text-gray-400">$2.1M</span>
                <svg width="100%" height="36" className="flex-1" viewBox="0 0 200 36" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="poGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#7B59FF" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#7B59FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M0 32 L25 27 L50 22 L75 17 L100 12 L125 8 L150 5 L175 4 L200 2 L200 36 L0 36 Z"
                    fill="url(#poGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  />
                  <motion.path
                    d="M0 32 L25 27 L50 22 L75 17 L100 12 L125 8 L150 5 L175 4 L200 2"
                    fill="none"
                    stroke="#7B59FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  />
                </svg>
                <span className="text-xs font-semibold text-primary">$4.2M</span>
              </div>
            </div>
          )}

          {/* Top 3 Open POs */}
          <div>
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-3">Top 3 Open POs</div>
            <div className="space-y-3">
              {fakeData.openPOs.slice(0, 3).map((po, index) => (
                <motion.div
                  key={index}
                  className="flex justify-between text-xs"
                  variants={itemVariants}
                  initial="hidden"
                  animate={scanComplete ? "visible" : "hidden"}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <span className="text-gray-600">{po.name}</span>
                  <span className="font-semibold text-gray-900">{po.amount}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full py-2.5 text-xs font-medium text-gray-600 border-gray-200 hover:bg-gray-50"
              asChild
            >
              <Link to="/purchase-orders">View Purchase Orders</Link>
            </Button>
          </div>
        </motion.div>

        {/* Invoice Portal Records Card */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
              <span className="font-semibold text-gray-800 text-sm">Invoice Portal Records</span>
            </div>
            {isLoading ? (
              <Skeleton className="w-12 h-4" />
            ) : (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-primary text-xs font-normal"
              >
                {newInvoices} new
              </motion.span>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              {isLoading ? (
                <Skeleton className="w-10 h-6 mx-auto mb-1" />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-xl font-bold text-gray-900"
                >
                  {animatedInvoices}
                </motion.div>
              )}
              <div className="text-[10px] text-gray-500">Total</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              {isLoading ? (
                <Skeleton className="w-12 h-6 mx-auto mb-1" />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="text-xl font-bold text-gray-900"
                >
                  {fakeData.invoicesTotalValue}
                </motion.div>
              )}
              <div className="text-[10px] text-gray-500">Value</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-4 text-center">
              {isLoading ? (
                <Skeleton className="w-10 h-6 mx-auto mb-1" />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-xl font-bold text-emerald-600"
                >
                  {fakeData.invoicesAvgValue}
                </motion.div>
              )}
              <div className="text-[10px] text-emerald-600">Avg</div>
            </div>
          </div>

          {/* Growth Chart */}
          {!isLoading && (
            <div className="mb-6 py-4 px-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-medium text-gray-500">Value Growth (6 months)</span>
                <span className="text-[10px] font-semibold text-emerald-600">+107%</span>
              </div>
              <div className="flex items-end gap-4">
                <span className="text-xs text-gray-400">$4.2M</span>
                <svg width="100%" height="36" className="flex-1" viewBox="0 0 200 36" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="invoiceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#7B59FF" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#7B59FF" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M0 32 L25 28 L50 22 L75 16 L100 11 L125 7 L150 5 L175 4 L200 2 L200 36 L0 36 Z"
                    fill="url(#invoiceGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  />
                  <motion.path
                    d="M0 32 L25 28 L50 22 L75 16 L100 11 L125 7 L150 5 L175 4 L200 2"
                    fill="none"
                    stroke="#7B59FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  />
                </svg>
                <span className="text-xs font-semibold text-primary">$8.7M</span>
              </div>
            </div>
          )}

          {/* Top 3 Recent Invoices */}
          <div>
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-3">Top 3 Recent Invoices</div>
            <div className="space-y-3">
              {fakeData.recentInvoices.slice(0, 3).map((invoice, index) => (
                <motion.div
                  key={index}
                  className="flex justify-between text-xs"
                  variants={itemVariants}
                  initial="hidden"
                  animate={scanComplete ? "visible" : "hidden"}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <span className="text-gray-600">{invoice.name}</span>
                  <span className="font-semibold text-gray-900">{invoice.amount}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full py-2.5 text-xs font-medium text-gray-600 border-gray-200 hover:bg-gray-50"
              asChild
            >
              <Link to="/portal-records">View Portal Records</Link>
            </Button>
          </div>
        </motion.div>

        {/* Rejected Portal Records Card */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
              <span className="font-semibold text-gray-800 text-sm">Rejected Portal Records</span>
            </div>
            {isLoading ? (
              <Skeleton className="w-16 h-4" />
            ) : (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-error-main text-xs font-normal"
              >
                {fakeData.rejectedThisWeek} this week
              </motion.span>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              {isLoading ? (
                <Skeleton className="w-8 h-6 mx-auto mb-1" />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="text-xl font-bold text-gray-900"
                >
                  {animatedRejected}
                </motion.div>
              )}
              <div className="text-[10px] text-gray-500">Total</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              {isLoading ? (
                <Skeleton className="w-12 h-6 mx-auto mb-1" />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="text-xl font-bold text-gray-900"
                >
                  {fakeData.rejectedTotalValue}
                </motion.div>
              )}
              <div className="text-[10px] text-gray-500">Value</div>
            </div>
            <div className="bg-red-50 rounded-lg p-3 text-center">
              {isLoading ? (
                <Skeleton className="w-6 h-6 mx-auto mb-1" />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="text-xl font-bold text-error-main"
                >
                  {fakeData.rejectedThisWeek}
                </motion.div>
              )}
              <div className="text-[10px] text-error-main">This week</div>
            </div>
          </div>

          {/* Donut Chart + Legend */}
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 flex-shrink-0">
              {isLoading ? (
                <div className="w-full h-full rounded-full border-4 border-gray-200 animate-pulse" />
              ) : (
                <motion.div
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="w-20 h-20"
                >
                  <PieChart width={80} height={80}>
                    <Pie
                      data={fakeData.rejectionBreakdown}
                      cx={40}
                      cy={40}
                      innerRadius={18}
                      outerRadius={35}
                      paddingAngle={2}
                      dataKey="value"
                      strokeWidth={0}
                      animationBegin={0}
                      animationDuration={800}
                    >
                      {fakeData.rejectionBreakdown.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          className="cursor-pointer transition-all duration-200 hover:opacity-80"
                          style={{ filter: 'drop-shadow(0 0 2px rgba(0,0,0,0.1))' }}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white px-3 py-2 rounded-lg shadow-lg border border-gray-100">
                              <p className="text-xs font-medium text-gray-900">{data.name}</p>
                              <p className="text-xs text-gray-600">{data.value}%</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                  </PieChart>
                </motion.div>
              )}
            </div>

            {/* Legend */}
            <div className="flex-1 space-y-1.5">
              {fakeData.rejectionBreakdown.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: scanComplete ? 1 : 0, x: scanComplete ? 0 : 10 }}
                  transition={{ duration: 0.3, delay: 0.4 + 0.1 * index }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900">{item.value}%</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Rejections */}
          <div className="bg-gray-50 rounded-xl p-5">
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Recent Rejections</div>
            <div className="space-y-2">
              {fakeData.recentRejections.map((rejection, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: scanComplete ? 1 : 0, x: scanComplete ? 0 : -10 }}
                  transition={{ duration: 0.3, delay: 0.5 + 0.1 * index }}
                >
                  <span className="text-xs text-gray-700">{rejection.name}</span>
                  <span className="text-xs font-semibold text-gray-900">{rejection.amount}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Two Buttons */}
          <div className="mt-auto pt-4">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="sm"
                className="py-2.5 text-xs font-medium text-error-main bg-red-50 border-red-100 hover:bg-red-100"
                asChild
              >
                <Link to="/portal-records?status=rejected">Rejected Records</Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="py-2.5 text-xs font-medium text-amber-700 bg-amber-50 border-amber-100 hover:bg-amber-100"
                asChild
              >
                <Link to="/invoices?status=pending">Pending RTPs</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Row 2: Secondary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* Action Required Card */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 p-6"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          {/* Header */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
              <h3 className="font-semibold text-gray-800 text-sm">Action Required</h3>
            </div>
            <p className="text-xs text-gray-500">Records that need your attention</p>
          </div>

          {/* Stats Boxes */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <Link to="/portal-records?status=unmatched" className="bg-blue-50 rounded-lg p-4 text-center hover:bg-blue-100 transition-colors">
              {isLoading ? (
                <Skeleton className="w-10 h-8 mx-auto mb-1" />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="text-2xl font-bold text-blue-600"
                >
                  {animatedUnmatched}
                </motion.div>
              )}
              <div className="text-[10px] text-blue-600">Found Without Match</div>
            </Link>
            <Link to="/portal-records?status=conflicts" className="bg-red-50 rounded-lg p-4 text-center hover:bg-red-100 transition-colors">
              {isLoading ? (
                <Skeleton className="w-8 h-8 mx-auto mb-1" />
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="text-2xl font-bold text-error-main"
                >
                  12
                </motion.div>
              )}
              <div className="text-[10px] text-error-main">Conflicts</div>
            </Link>
          </div>

          {/* Issues by Portal */}
          <div>
            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-3">Issues by Portal</div>
            <div className="space-y-3">
              {fakeData.issuesByPortal.map((portal, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: scanComplete ? 1 : 0, x: scanComplete ? 0 : -10 }}
                  transition={{ duration: 0.3, delay: 0.5 + 0.1 * index }}
                >
                  <span className="text-xs text-gray-700">{portal.name}</span>
                  <span className={`text-xs font-normal ${portal.color}`}>{portal.issue}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Buyers Found Card */}
        <BuyersFoundCard
          buyersCount={displayMetrics.buyersCount}
          topBuyersByFrequency={displayMetrics.topBuyersByFrequency}
          isLoading={isLoading}
        />

        {/* Portal Connections Card */}
        <PortalsScannedCard
          portalsCount={12}
          recentPortals={displayMetrics.recentPortals}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
