
import { TableCell, TableFooter, TableRow } from "@/components/ui/table";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { formatCurrency } from "@/lib/utils";

interface PurchaseOrderTableFooterProps {
  purchaseOrders: PurchaseOrder[];
}

export function PurchaseOrderTableFooter({ purchaseOrders }: PurchaseOrderTableFooterProps) {
  const totalAmount = purchaseOrders.reduce((sum, po) => sum + po.total, 0);
  const totalPurchaseOrders = purchaseOrders.length;

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
            <span className="font-bold text-gray-900">{formatCurrency(totalAmount)}</span>
          </div>
        </TableCell>
        <TableCell colSpan={3} className="bg-[#F6F7F9]"></TableCell>
      </TableRow>
    </TableFooter>
  );
}
