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
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, AlertCircle, X, ShoppingCart, TrendingUp, Receipt, Clock, CheckSquare, Brain, AlertTriangle } from "lucide-react";

export default function PortalsDashboard() {
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
          title="Portals Overview"
          subtitle="Portal information collected and cleaned by Monto's AI to save you time"
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
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <SparklesText text="✨" className="text-2xl animate-pulse" sparklesCount={6} duration={1500} />
              </div>
            </div>
          </div>
        )}

        {/* Latest Scan Time - Enhanced Design */}
        {scanComplete && (
          <div className="inline-flex items-center gap-3 bg-[#7B59FF]/5 border border-[#7B59FF]/20 rounded-lg px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-[#7B59FF]">Latest Scan</span>
            </div>
            <div className="h-4 w-px bg-[#7B59FF]/20"></div>
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5 text-[#7B59FF]" />
              <span className="text-sm text-[#061237] font-medium">{formattedLastScan}</span>
            </div>
          </div>
        )}

        {/* Scan Results */}
        <div className="space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            <Link to="/purchase-orders" className="h-full">
              <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#E6E7EB] h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-sm font-medium text-[#586079]">Purchase Orders</CardTitle>
                  <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                    <ShoppingCart className="h-4 w-4 text-blue-500" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-3xl font-bold text-[#061237]">{fakeData.posFoundInScan}</div>
                        <span className="text-xs text-[#586079]">Total</span>
                      </div>
                      <div className="text-sm text-[#7B59FF]">67 new</div>
                    </div>
                    
                    <div className="text-sm text-[#061237]">
                      Total value: <span className="text-[#061237]">$4.2M</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-xs text-[#586079]">Open POs:</div>
                    {fakeData.recentPOs.slice(0, 2).map((po, index) => (
                      <div key={index} className="text-sm text-[#061237] flex justify-between items-center">
                        <span>{po.company}</span>
                        <span className="text-xs text-[#586079]">{po.amount}</span>
                      </div>
                    ))}
                    
                    <div className="border-t border-gray-200 mt-8 mb-4"></div>
                    
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600">Average: $17K per PO</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs w-full text-[#7B59FF] border-[#7B59FF] hover:bg-[#7B59FF] hover:text-white" asChild>
                    <Link to="/purchase-orders">View POs</Link>
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/invoices" className="h-full">
              <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#E6E7EB] h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-sm font-medium text-[#586079]">Invoice Records</CardTitle>
                  <div className="p-2.5 rounded-xl bg-green-50 border border-green-200">
                    <Receipt className="h-4 w-4 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-3xl font-bold text-[#061237]">{fakeData.invoiceRecordsFoundInScan}</div>
                        <span className="text-xs text-[#586079]">Total</span>
                      </div>
                      <div className="text-sm text-[#7B59FF]">134 new</div>
                    </div>
                    
                    <div className="text-sm text-[#061237]">
                      Total value: <span className="text-[#061237]">$8.7M</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-xs text-[#586079]">Recent Invoices:</div>
                    {fakeData.recentInvoices.slice(0, 2).map((invoice, index) => (
                      <div key={index} className="text-sm text-[#061237] flex justify-between items-center">
                        <span>{invoice.company}</span>
                        <span className="text-xs text-[#586079]">{invoice.amount}</span>
                      </div>
                    ))}
                    
                    <div className="border-t border-gray-200 mt-8 mb-4"></div>
                    
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-xs text-green-600">Average: $15K per invoice</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs w-full text-[#7B59FF] border-[#7B59FF] hover:bg-[#7B59FF] hover:text-white" asChild>
                    <Link to="/invoices">View Invoices</Link>
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/invoices?status=rejected" className="h-full">
              <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#E6E7EB] h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <CardTitle className="text-sm font-medium text-[#586079]">Rejected Invoices</CardTitle>
                  <div className="p-2.5 rounded-xl bg-red-50 border border-red-200">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="text-3xl font-bold text-[#061237]">{fakeData.rejectedInvoices}</div>
                        <span className="text-xs text-[#586079]">Total</span>
                      </div>
                      <div className="text-sm text-[#7B59FF]">5 this week</div>
                    </div>
                    
                    <div className="text-sm text-[#061237]">
                      Total value: <span className="text-[#061237]">$1.2M</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-xs text-[#586079]">Recent Rejections:</div>
                    <div className="text-sm text-[#061237] flex justify-between items-center">
                      <span>Microsoft</span>
                      <span className="text-xs text-[#586079]">$3,400</span>
                    </div>
                    <div className="text-sm text-[#061237] flex justify-between items-center">
                      <span>Oracle</span>
                      <span className="text-xs text-[#586079]">$2,800</span>
                    </div>
                    
                    <div className="border-t border-gray-200 mt-8 mb-4"></div>
                    
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-3 w-3 text-red-500" />
                      <span className="text-xs text-red-600">Common: PO mismatch</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs w-full text-[#7B59FF] border-[#7B59FF] hover:bg-[#7B59FF] hover:text-white" asChild>
                    <Link to="/invoices?status=rejected">View Rejected</Link>
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <div className="h-full">
              <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-gradient-to-br from-[#7B59FF] to-[#9D7BFF] border-[#7B59FF]/20 h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-medium text-white">Monto Portal Insights</CardTitle>
                <div className="p-2.5 rounded-xl bg-white/20 border border-white/30">
                  <Brain className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="text-3xl font-bold text-white">$2.4M</div>
                      <span className="text-xs text-white/80">Saved</span>
                    </div>
                    <div className="text-sm text-white/90">This quarter</div>
                  </div>
                  
                  <div className="text-sm text-white/90">
                    Time saved: <span className="text-white font-medium">340 hours</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-xs text-white/80">AI Automation Impact:</div>
                  <div className="text-sm text-white flex justify-between items-center">
                    <span>Auto-matched records</span>
                    <span className="text-xs text-white/90">1,247</span>
                  </div>
                  <div className="text-sm text-white flex justify-between items-center">
                    <span>Portals connected</span>
                    <span className="text-xs text-white/90">47</span>
                  </div>
                  
                  <div className="border-t border-white/20 mt-8 mb-4"></div>
                  
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-green-300" />
                    <span className="text-xs text-green-300">94% auto-processing</span>
                  </div>
                </div>
              </CardContent>
              </Card>
            </div>
          </div>

          {/* Dashboard Analytics Chart */}
          <Card className="bg-white border-[#E6E7EB]">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-[#061237]">Portal Performance Analytics</CardTitle>
              <p className="text-sm text-[#586079]">Monthly processing trends and cost savings</p>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { month: 'Jan', processed: 1200, savings: 180000, accuracy: 89 },
                      { month: 'Feb', processed: 1450, savings: 210000, accuracy: 91 },
                      { month: 'Mar', processed: 1680, savings: 245000, accuracy: 92 },
                      { month: 'Apr', processed: 1920, savings: 285000, accuracy: 93 },
                      { month: 'May', processed: 2150, savings: 320000, accuracy: 94 },
                      { month: 'Jun', processed: 2380, savings: 358000, accuracy: 94 },
                      { month: 'Jul', processed: 2420, savings: 365000, accuracy: 95 },
                      { month: 'Aug', processed: 2580, savings: 395000, accuracy: 95 }
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E6E7EB" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#586079' }}
                    />
                    <YAxis 
                      yAxisId="left"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#586079' }}
                    />
                    <YAxis 
                      yAxisId="right"
                      orientation="right"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12, fill: '#586079' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E6E7EB',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      formatter={(value, name) => {
                        if (name === 'savings') return [`$${(value / 1000).toFixed(0)}K`, 'Cost Savings'];
                        if (name === 'processed') return [value, 'Records Processed'];
                        if (name === 'accuracy') return [`${value}%`, 'Accuracy Rate'];
                        return [value, name];
                      }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="processed"
                      stroke="#7B59FF"
                      strokeWidth={3}
                      dot={{ fill: '#7B59FF', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#7B59FF', strokeWidth: 2 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="savings"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, stroke: '#F59E0B', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Chart Legend */}
              <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-[#7B59FF]"></div>
                  <span className="text-xs text-[#586079]">Records Processed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-[#10B981]"></div>
                  <span className="text-xs text-[#586079]">Cost Savings ($)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-0.5 bg-[#F59E0B] opacity-70" style={{borderTop: '2px dashed #F59E0B'}}></div>
                  <span className="text-xs text-[#586079]">Accuracy Rate (%)</span>
                </div>
              </div>
            </CardContent>
          </Card>
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

      </div>
    </div>
  );
}