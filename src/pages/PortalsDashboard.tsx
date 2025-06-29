
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography/typography";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/common/PageHeader";
import { Link } from "react-router-dom";
import { PortalRecordsTable } from "@/components/portal-records/PortalRecordsTable";
import { PurchaseOrderTable } from "@/components/purchase-orders/PurchaseOrderTable";
import { allPortalRecords } from "@/data/portalRecords";
import { purchaseOrderData } from "@/data/purchaseOrders";
import { Users, Server, Award, ListChecks, FileText, AlertTriangle, Clock } from "lucide-react";
import { getPortalLogoUrl } from "@/lib/utils";

function formatCurrency(amount, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export default function PortalsDashboard() {
  // Buyers
  const buyersSet = new Set(
    allPortalRecords.map(r => r.buyer).filter(b => b && b !== "—")
  );
  const buyersCount = buyersSet.size;

  // Portals
  const portalsSet = new Set(
    allPortalRecords.map(r => r.portal).filter(p => p && p !== "—")
  );
  const portalsCount = portalsSet.size;

  // Open POs
  const openPOs = purchaseOrderData.filter(po => po.status === "New" || po.status === "Partially Invoiced");
  const openPOsCount = openPOs.length;
  const openPOsTotal = openPOs.reduce((sum: number, po) => {
    const val = parseFloat(po.total as any);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  // Open Invoices
  const openInvoices = allPortalRecords.filter(
    r => (r.status === "Pending" || r.portalStatus === "Approved by Buyer" || r.portalStatus === "Partially Settled")
  );
  const openInvoicesCount = openInvoices.length;
  const openInvoicesTotal = openInvoices.reduce((sum: number, r) => {
    const val = parseFloat(r.total as any);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  // At Risk Invoices
  const now = new Date();
  const atRiskInvoices = allPortalRecords.filter(r => {
    // Rejected
    if (r.portalStatus === "Rejected by Buyer") return true;
    // Open & past due (if updated or lastSynced is in the past)
    if (
      (r.status === "Pending" || r.portalStatus === "Approved by Buyer" || r.portalStatus === "Partially Settled") &&
      r.updated && !isNaN(Date.parse(r.updated)) && new Date(r.updated) < now
    ) {
      return true;
    }
    return false;
  });
  const atRiskInvoicesCount = atRiskInvoices.length;
  const atRiskInvoicesTotal = atRiskInvoices.reduce((sum: number, r) => {
    const val = parseFloat(r.total as any);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  // Top 3 Buyers by open invoices total
  const buyerTotals: Record<string, number> = {};
  openInvoices.forEach(r => {
    if (!r.buyer || r.buyer === "—") return;
    const val = parseFloat(r.total as any);
    buyerTotals[r.buyer] = Number(buyerTotals[r.buyer] ?? 0) + (isNaN(val) ? 0 : val);
  });
  const topBuyers = Object.entries(buyerTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Buyers context
  const recentBuyers = Array.from(buyersSet).filter(Boolean).slice(0, 3);
  // Portals context - get 6 portals for display
  const recentPortals = Array.from(portalsSet).filter(Boolean).slice(0, 6);
  // Top buyer/portal for open POs
  const topOpenPO = openPOs[0];
  // Open invoices due soon (within 7 days)
  const openInvoicesDueSoon = openInvoices.filter(r => {
    if (!r.updated) return false;
    const due = new Date(r.updated);
    const diff = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  });

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
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-[#061237] tracking-tight">Portals Dashboard</h1>
        <p className="text-lg text-[#586079] leading-relaxed max-w-4xl">
          Unified view of all portal data including invoices and purchase orders. Monitor your portal connections, track data synchronization, and manage portal-specific insights.
        </p>
        
        {/* Last Scan Time */}
        <div className="flex items-center gap-2 text-sm text-[#586079] pt-2">
          <Clock className="h-4 w-4 text-[#7B59FF]" />
          <span>Last scanned: {formattedLastScan}</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Buyers Found */}
        <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#E6E7EB]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-[#586079]">Buyers Found</CardTitle>
            <div className="p-2.5 rounded-xl bg-[#7B59FF]/10 border border-[#7B59FF]/20">
              <Users className="h-4 w-4 text-[#7B59FF]" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-[#061237]">{buyersCount}</div>
            <div className="space-y-2">
              <p className="text-sm text-[#586079] leading-relaxed">Monto spotted unique buyer activity</p>
              {recentBuyers.length > 0 && (
                <p className="text-xs text-[#7B59FF] font-medium">Latest: {recentBuyers.join(", ")}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Portals Scanned */}
        <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#3B82F6]/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-[#586079]">Portals Scanned</CardTitle>
            <div className="p-2.5 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20">
              <Server className="h-4 w-4 text-[#3B82F6]" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-[#061237]">{portalsCount}</div>
            <div className="space-y-3">
              <p className="text-sm text-[#586079] leading-relaxed">Active portals synced in the latest scan</p>
              <div className="space-y-2">
                <div className="flex items-center gap-1 flex-wrap">
                  {recentPortals.map((portal) => (
                    <img
                      key={portal}
                      src={getPortalLogoUrl(portal)}
                      alt={portal + ' logo'}
                      className="w-6 h-6 rounded-full border border-[#E6E7EB] bg-white object-contain shadow-sm"
                      title={portal}
                    />
                  ))}
                </div>
                <p className="text-xs text-[#3B82F6] font-medium">Most recent: {recentPortals.join(", ")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Buyers */}
        <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#E6E7EB]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-[#586079]">Top Buyers</CardTitle>
            <div className="p-2.5 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20">
              <Award className="h-4 w-4 text-[#22C55E]" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-[#061237]">{formatCurrency(topBuyers.reduce((sum, [, total]) => sum + Number(total), 0))}</div>
            <div className="space-y-3">
              <p className="text-sm text-[#586079] leading-relaxed">Buyers leading in open invoice value</p>
              <div className="space-y-1">
                {topBuyers.slice(0, 3).map(([buyer, total], idx) => (
                  <div key={buyer} className="text-sm text-[#061237] flex justify-between items-center">
                    <span className={idx === 0 ? "font-semibold" : "font-normal"}>{buyer}</span>
                    <span className="text-xs text-[#586079]">{formatCurrency(Number(total))}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-end pt-1">
                <span className="text-xs text-[#22C55E] font-medium hover:underline cursor-pointer">
                  View full leaderboard →
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Open POs */}
        <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#E6E7EB]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-[#586079]">Open POs</CardTitle>
            <div className="p-2.5 rounded-xl bg-[#7B59FF]/10 border border-[#7B59FF]/20">
              <ListChecks className="h-4 w-4 text-[#7B59FF]" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-[#061237]">{formatCurrency(openPOsTotal)}</div>
            <div className="space-y-2">
              <p className="text-sm text-[#586079] leading-relaxed">From {openPOsCount} open POs</p>
              {topOpenPO && (
                <p className="text-xs text-[#7B59FF] font-medium">
                  Top: {topOpenPO.buyerName} via {topOpenPO.portal}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Open Invoices */}
        <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#E6E7EB]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-[#586079]">Open Invoices</CardTitle>
            <div className="p-2.5 rounded-xl bg-[#7B59FF]/10 border border-[#7B59FF]/20">
              <FileText className="h-4 w-4 text-[#7B59FF]" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-[#061237]">{formatCurrency(openInvoicesTotal)}</div>
            <div className="space-y-2">
              <p className="text-sm text-[#586079] leading-relaxed">
                Across {openInvoicesCount} invoices {openInvoicesDueSoon.length > 0 ? `(${openInvoicesDueSoon.length} due soon)` : '(none due soon)'}
              </p>
              <div className="flex justify-end">
                <a href="#" className="text-xs text-[#7B59FF] font-medium hover:underline flex items-center gap-1">
                  View all invoices <span>→</span>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* At Risk Invoices */}
        <Card className="relative overflow-hidden border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#F2AE40]/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-sm font-medium text-[#F2AE40]">At Risk</CardTitle>
            <div className="p-2.5 rounded-xl bg-[#F2AE40]/10 border border-[#F2AE40]/20">
              <AlertTriangle className="h-4 w-4 text-[#F2AE40]" />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-3xl font-bold text-[#F2AE40]">{formatCurrency(atRiskInvoicesTotal)}</div>
            <div className="space-y-2">
              <p className="text-sm text-[#F2AE40] leading-relaxed">Monto flagged risky invoices needing attention</p>
            </div>
          </CardContent>
        </Card>
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
