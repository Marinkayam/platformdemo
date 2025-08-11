import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/PageHeader";
import { Link } from "react-router-dom";
import { SparklesText } from "@/components/common/SparklesText";
import { calculatePortalsDashboardMetrics } from "@/utils/portalsDashboardUtils";
import { BuyersFoundCard } from "@/components/portals-dashboard/BuyersFoundCard";
import { PortalsScannedCard } from "@/components/portals-dashboard/PortalsScannedCard";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, AlertCircle, X } from "lucide-react";

export default function PortalsDashboard2() {
  const finalMetrics = calculatePortalsDashboardMetrics();

  // Format last scan time with more prominent design
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

  // Fake data for new metrics
  const fakeData = {
    openPOsBreakdown: [
      { name: 'Existing', value: 156, color: '#94A3B8' },
      { name: 'New (Latest Scan)', value: 24, color: '#7B59FF' }
    ],
    posFoundInScan: 247,
    invoiceRecordsFoundInScan: 582,
    unmatchedInvoicePortalRecords: 45,
    rejectedInvoices: 23,
    recentPOs: [
      { id: 'PO-2024-156', company: 'Walmart', amount: '$12,500', date: 'Aug 10, 2024' },
      { id: 'PO-2024-157', company: 'Target', amount: '$8,900', date: 'Aug 10, 2024' },
      { id: 'PO-2024-158', company: 'Costco', amount: '$15,200', date: 'Aug 9, 2024' }
    ],
    recentInvoices: [
      { id: 'INV-2024-891', company: 'Amazon', amount: '$7,800', date: 'Aug 10, 2024' },
      { id: 'INV-2024-892', company: 'Home Depot', amount: '$4,500', date: 'Aug 10, 2024' },
      { id: 'INV-2024-893', company: 'Best Buy', amount: '$9,200', date: 'Aug 9, 2024' }
    ]
  };

  // Progress bar animation
  useEffect(() => {
    let frame: number;
    if (progress < 100) {
      frame = window.setTimeout(() => setProgress(progress + 10), 250);
    } else {
      setTimeout(() => setScanComplete(true), 200);
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

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        className="text-sm font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full">
      <div className="px-2 sm:px-4 md:px-6 py-3 max-w-[1440px] mx-auto w-full space-y-8">
        <PageHeader 
          title="Portals Dashboard 2" 
          subtitle="Redesigned dashboard with enhanced metrics and visualizations"
        />
        
        {/* AI Scan Progress Bar */}
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
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <SparklesText text="✨" className="text-2xl animate-pulse" sparklesCount={6} duration={1500} />
              </div>
            </div>
          </div>
        )}

        {/* Latest Scan Time - Simple and Clean */}
        {scanComplete && (
          <div className="flex items-center gap-2 text-sm text-[#7B59FF] font-semibold">
            <span className="text-base font-semibold">Latest Scan:</span>
            <span className="text-[#586079] font-normal ml-2">{formattedLastScan}</span>
          </div>
        )}

        {/* Scan Results */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#061237]">Latest Scan Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/purchase-orders">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-[#061237]">{fakeData.posFoundInScan}</div>
                  <div className="text-sm text-[#586079] mb-3">Recent POs Found</div>
                  <div className="space-y-1 mb-3 text-xs">
                    {fakeData.recentPOs.slice(0, 2).map((po, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-[#586079]">{po.company}</span>
                        <span className="text-[#061237] font-medium">{po.amount}</span>
                      </div>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="text-xs w-full text-[#7B59FF] border-[#7B59FF] hover:bg-[#7B59FF] hover:text-white" asChild>
                    <Link to="/purchase-orders">View POs</Link>
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/invoices">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-[#061237]">{fakeData.invoiceRecordsFoundInScan}</div>
                  <div className="text-sm text-[#586079] mb-3">New Latest Invoice Records</div>
                  <div className="space-y-1 mb-3 text-xs">
                    {fakeData.recentInvoices.slice(0, 2).map((invoice, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-[#586079]">{invoice.company}</span>
                        <span className="text-[#061237] font-medium">{invoice.amount}</span>
                      </div>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="text-xs w-full text-[#7B59FF] border-[#7B59FF] hover:bg-[#7B59FF] hover:text-white" asChild>
                    <Link to="/invoices">View Invoices</Link>
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/portal-records">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-[#061237]">{fakeData.unmatchedInvoicePortalRecords}</div>
                  <div className="text-sm text-[#586079] mb-3">Unmatched Invoice Records</div>
                  <Button size="sm" variant="outline" className="text-xs w-full text-[#7B59FF] border-[#7B59FF] hover:bg-[#7B59FF] hover:text-white" asChild>
                    <Link to="/portal-records">View Records</Link>
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/invoices">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-[#061237]">{fakeData.rejectedInvoices}</div>
                  <div className="text-sm text-[#586079] mb-3">Rejected Invoices</div>
                  <Button size="sm" variant="outline" className="text-xs w-full text-[#7B59FF] border-[#7B59FF] hover:bg-[#7B59FF] hover:text-white" asChild>
                    <Link to="/invoices">View Rejected</Link>
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BuyersFoundCard 
            buyersCount={displayMetrics.buyersCount}
            topBuyersByFrequency={displayMetrics.topBuyersByFrequency}
          />
          <PortalsScannedCard 
            portalsCount={displayMetrics.portalsCount}
            recentPortals={displayMetrics.recentPortals}
          />
        </div>

        {/* Open POs Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#061237]">Open Purchase Orders</h3>
            <Button asChild variant="ghost" size="sm" className="text-[#7B59FF] hover:text-[#523BAA]">
              <Link to="/purchase-orders">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fakeData.openPOsBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {fakeData.openPOsBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              <Link to="/purchase-orders">
                <div className="text-2xl font-bold text-[#061237] hover:text-[#7B59FF] transition-colors cursor-pointer">
                  {fakeData.openPOsBreakdown.reduce((sum, item) => sum + item.value, 0)}
                </div>
              </Link>
              <div className="text-sm text-[#586079]">Total Open Purchase Orders</div>
              <div className="space-y-2">
                {fakeData.openPOsBreakdown.map((item, index) => (
                  <Link key={index} to="/purchase-orders">
                    <div className="flex items-center gap-2 hover:text-[#7B59FF] transition-colors cursor-pointer">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm text-[#586079]">{item.name}: {item.value}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}