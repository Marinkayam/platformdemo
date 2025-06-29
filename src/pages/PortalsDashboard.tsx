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
  // Portals context
  const recentPortals = Array.from(portalsSet).filter(Boolean).slice(0, 2);
  // Top buyer/portal for open POs
  const topOpenPO = openPOs[0];
  // Open invoices due soon (within 7 days)
  const openInvoicesDueSoon = openInvoices.filter(r => {
    if (!r.updated) return false;
    const due = new Date(r.updated);
    const diff = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  });
  const openInvoiceDueSoon = openInvoicesDueSoon[0];
  // At risk: past due
  const atRiskPastDue = atRiskInvoices.filter(r => {
    if (!r.updated) return false;
    const due = new Date(r.updated);
    return due < now;
  });
  const atRiskPastDueBuyer = atRiskPastDue[0];

  // Summary
  const summary = `Monto found ${buyersCount} unique buyers across ${portalsCount} scanned portals. There are ${openPOsCount} open POs (${formatCurrency(openPOsTotal)}), ${openInvoicesCount} open invoices (${formatCurrency(openInvoicesTotal)}), and ${atRiskInvoicesCount} invoices at risk (${formatCurrency(atRiskInvoicesTotal)}).`;

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
    <div className="space-y-8">
      <PageHeader 
        title="Portals Dashboard" 
        subtitle="Unified view of all portal data including invoices and purchase orders. Monitor your portal connections, track data synchronization, and manage portal-specific insights." 
      />
      {/* Last Scan Time - Left aligned below title */}
      <div className="flex items-center gap-2 text-xs text-[#586079] mt-1 mb-4">
        <Clock className="h-4 w-4 text-[#7B59FF]" />
        <span>Last scanned: {formattedLastScan}</span>
      </div>
      {/* Insights grid top bar */}
      {/* (Removed Explore Insights button) */}
      {/* Insights Section - Unified, responsive, min height, color hierarchy, bar chart, fewer CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Buyers Found */}
        <Card className="relative overflow-visible border min-h-[200px] flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#E6E7EB] group">
          <CardHeader className="flex flex-row items-center gap-2 pb-0">
            <Users className="h-5 w-5 text-[#7B59FF] mr-2" />
            <CardTitle className="text-base font-semibold text-[#061237]">Buyers Found</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 leading-normal">
            <div className="text-4xl font-bold text-[#061237] mt-0 mb-0">{buyersCount}</div>
            <div className="text-xs text-[#586079] mt-0.5">Monto spotted {buyersCount} unique buyers across all portals</div>
            {recentBuyers.length > 0 && (
              <div className="text-xs text-[#586079] mt-0.5 pl-0">Latest: {recentBuyers.join(", ")}</div>
            )}
          </CardContent>
        </Card>
        {/* Portals Scanned */}
        <Card className="relative overflow-visible border min-h-[200px] flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#3B82F6]/20 group">
          <CardHeader className="flex flex-row items-center gap-2 pb-0">
            <Server className="h-5 w-5 text-[#3B82F6] mr-2" />
            <CardTitle className="text-base font-semibold text-[#061237]">Portals Scanned</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 leading-normal">
            <div className="text-4xl font-bold text-[#061237] mt-0 mb-0">{portalsCount}</div>
            <div className="text-xs text-[#586079] mt-0.5">{portalsCount} portals scanned in the last sweep</div>
            <div className="flex items-center gap-1 mt-1">
              {recentPortals.slice(0, 6).map((portal) => (
                <img
                  key={portal}
                  src={getPortalLogoUrl(portal)}
                  alt={portal + ' logo'}
                  className="w-6 h-6 rounded-full border border-[#E6E7EB] bg-white object-contain shadow-sm"
                  title={portal}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Top Buyers - dashboard style */}
        <Card className="relative overflow-visible border min-h-[200px] flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#E6E7EB] group">
          <div className="flex items-center justify-between px-6 pt-6 pb-0">
            <span className="text-sm font-medium text-[#586079]">Top Buyers</span>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#E6F4EA] border border-[#22C55E]/20">
              <Award className="h-5 w-5 text-[#22C55E]" />
            </span>
          </div>
          <div className="px-6 pb-4">
            <div className="text-3xl font-bold text-[#061237] mt-0 mb-0">{formatCurrency(topBuyers.reduce((sum, [, total]) => sum + Number(total), 0))}</div>
            <div className="text-xs text-[#586079] mb-2">Top buyers by open invoice value</div>
            <div className="flex flex-col gap-1">
              {topBuyers.slice(0, 3).map(([buyer, total], idx) => (
                <div key={buyer} className={idx === 0 ? "font-bold text-[#061237] text-sm" : "text-[#061237] text-sm"}>
                  {buyer} <span className="ml-2 text-xs font-normal text-[#061237]">{formatCurrency(Number(total))}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
        {/* Open POs */}
        <Card className="relative overflow-visible border min-h-[200px] flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#E6E7EB] group">
          <CardHeader className="flex flex-row items-center gap-2 pb-0">
            <ListChecks className="h-5 w-5 text-[#7B59FF] mr-2" />
            <CardTitle className="text-base font-semibold text-[#061237]">Open POs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 leading-normal">
            <div className="text-4xl font-bold text-[#061237] mt-0 mb-0">{formatCurrency(openPOsTotal)}</div>
            <div className="text-xs text-[#586079] mt-0.5">Across {openPOsCount} active POs</div>
            {topOpenPO && (
              <div className="text-xs text-[#7B59FF] font-medium mt-1">
                Top: {topOpenPO.buyerName} via {topOpenPO.portal}
              </div>
            )}
          </CardContent>
        </Card>
        {/* Open Invoices */}
        <Card className="relative overflow-visible border min-h-[200px] flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border-[#E6E7EB] group">
          <CardHeader className="flex flex-row items-center gap-2 pb-0">
            <FileText className="h-5 w-5 text-[#7B59FF] mr-2" />
            <CardTitle className="text-base font-semibold text-[#061237]">Open Invoices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-0 leading-normal">
            <div className="text-4xl font-bold text-[#061237] mt-0 mb-0">{formatCurrency(openInvoicesTotal)}</div>
            <div className="text-xs text-[#586079] mt-0.5">Across {openInvoicesCount} records{openInvoicesDueSoon && `, ${openInvoicesDueSoon.length} due soon`}</div>
            {openInvoiceDueSoon && (
              <div className="text-xs text-[#EF4444] font-medium mt-1">
                {openInvoicesDueSoon.length} due soon ({openInvoiceDueSoon.buyer})
              </div>
            )}
            <div className="flex justify-end mt-1">
              <a href="#" className="text-xs text-[#7B59FF] font-medium flex items-center gap-1 group-hover:underline">
                View all invoices <span className="ml-0.5">→</span>
              </a>
            </div>
          </CardContent>
        </Card>
        {/* At Risk Invoices - warning bg, animated icon, color hierarchy */}
        <Card className="relative overflow-visible border min-h-[200px] flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-[#FFF5F5] border-[#EF4444]/40 group">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <span className="relative flex items-center">
              <AlertTriangle className="h-5 w-5 text-[#EF4444] animate-pulse" />
            </span>
            <CardTitle className="text-base font-semibold text-[#EF4444]">At Risk</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 leading-normal">
            <div className="text-4xl font-bold text-[#EF4444] mb-0.5">{formatCurrency(atRiskInvoicesTotal)}</div>
            <div className="text-xs text-[#EF4444] mt-0.5">Invoices flagged for immediate attention{atRiskInvoicesCount ? ` (${atRiskInvoicesCount} invoices)` : ''}</div>
            {atRiskPastDueBuyer && (
              <div className="text-xs text-[#EF4444] font-medium mt-1">
                {atRiskPastDue.length} past due ({atRiskPastDueBuyer.buyer})
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Last Scan Time - left-aligned under insights */}
      <div className="mt-2 mb-2">
        <span className="text-xs text-[#586079]">Last scanned: {formattedLastScan}</span>
      </div>
      
      {/* Portal Records Section */}
      <div className="bg-white border-b border-[#E6E7EB] pb-2 mb-2">
        <div className="flex items-center justify-between px-0 pt-2 pb-2">
          <h2 className="text-base font-semibold text-[#061237] tracking-tight">Portal Records</h2>
          <Button asChild variant="ghost" size="sm" className="text-[#7B59FF] hover:text-[#523BAA] px-2">
            <Link to="/portal-records">View All</Link>
          </Button>
        </div>
        <div className="px-0 pb-0">
          <PortalRecordsTable records={allPortalRecords.slice(0, 5)} />
        </div>
      </div>
      {/* Purchase Orders Section */}
      <div className="bg-white pb-2">
        <div className="flex items-center justify-between px-0 pt-2 pb-2">
          <h2 className="text-base font-semibold text-[#061237] tracking-tight">Purchase Orders</h2>
          <Button asChild variant="ghost" size="sm" className="text-[#7B59FF] hover:text-[#523BAA] px-2">
            <Link to="/purchase-orders">View All</Link>
          </Button>
        </div>
        <div className="px-0 pb-0">
          <PurchaseOrderTable purchaseOrders={purchaseOrderData.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
} 