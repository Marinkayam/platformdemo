
import { allPortalRecords } from "@/data/portalRecords";
import { purchaseOrderData } from "@/data/purchaseOrders";

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function calculatePortalsDashboardMetrics() {
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
  const openPOs = purchaseOrderData.filter(po => po.status === "new" || po.status === "Partially Invoiced");
  const openPOsCount = openPOs.length;
  const openPOsTotal = openPOs.reduce((sum: number, po) => {
    const val = parseFloat(String(po.total));
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  // Open Invoices
  const openInvoices = allPortalRecords.filter(
    r => (r.status === "Pending" || r.portalStatus === "Approved by Buyer" || r.portalStatus === "Partially Settled")
  );
  const openInvoicesCount = openInvoices.length;
  const openInvoicesTotal = openInvoices.reduce((sum: number, r) => {
    const val = parseFloat(String(r.total));
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
    const val = parseFloat(String(r.total));
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  // Top 3 Buyers by open invoices total
  const buyerTotals: Record<string, number> = {};
  openInvoices.forEach(r => {
    if (!r.buyer || r.buyer === "—") return;
    const val = parseFloat(String(r.total));
    buyerTotals[r.buyer] = Number(buyerTotals[r.buyer] ?? 0) + (isNaN(val) ? 0 : val);
  });
  const topBuyers = Object.entries(buyerTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Top 3 buyers by frequency (not amount)
  const buyerFrequency: Record<string, number> = {};
  allPortalRecords.forEach(r => {
    if (!r.buyer || r.buyer === "—") return;
    buyerFrequency[r.buyer] = (buyerFrequency[r.buyer] || 0) + 1;
  });
  const topBuyersByFrequency = Object.entries(buyerFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

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

  return {
    buyersCount,
    portalsCount,
    openPOsCount,
    openPOsTotal,
    openInvoicesCount,
    openInvoicesTotal,
    atRiskInvoicesCount,
    atRiskInvoicesTotal,
    topBuyers,
    topBuyersByFrequency,
    recentPortals,
    topOpenPO,
    openInvoicesDueSoon
  };
}
