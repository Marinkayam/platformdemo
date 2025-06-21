
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { PurchaseOrder } from "@/types/purchase-orders";
import { formatCurrency } from "@/lib/utils";

interface PurchaseOrderTableFooterProps {
  purchaseOrders: PurchaseOrder[];
}

export function PurchaseOrderTableFooter({ purchaseOrders }: PurchaseOrderTableFooterProps) {
  const totalPurchaseOrders = purchaseOrders.length;
  
  // Calculate totals by currency
  const currencyTotals = purchaseOrders.reduce((acc, po) => {
    const currency = po.currency || "USD";
    if (!acc[currency]) {
      acc[currency] = 0;
    }
    acc[currency] += po.total || 0;
    return acc;
  }, {} as Record<string, number>);

  // Format the total amounts display
  const formatTotalAmounts = () => {
    const entries = Object.entries(currencyTotals);
    if (entries.length === 0) return formatCurrency(0, "USD");
    
    return entries
      .map(([currency, amount]) => formatCurrency(amount, currency))
      .join(" + ");
  };

  return (
    <TableFooter>
      <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9]">
        <TableCell colSpan={2} className="font-semibold text-gray-700 sticky left-0 z-10 bg-[#F6F7F9] border-r border-gray-200">
          <div className="flex items-center gap-2">
            <span>Total Purchase Orders:</span>
            <span className="font-bold text-gray-900">{totalPurchaseOrders}</span>
          </div>
        </TableCell>
        <TableCell colSpan={2} className="bg-[#F6F7F9]"></TableCell>
        <TableCell className="font-semibold text-gray-700 bg-[#F6F7F9]">
          <div className="flex items-center gap-2">
            <span>Total Amount:</span>
            <span className="font-bold text-gray-900">{formatTotalAmounts()}</span>
          </div>
        </TableCell>
        <TableCell colSpan={3} className="bg-[#F6F7F9]"></TableCell>
      </TableRow>
    </TableFooter>
  );
}
