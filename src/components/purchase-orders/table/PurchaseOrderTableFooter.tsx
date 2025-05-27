
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
      <TableRow className="h-14 bg-gray-50">
        <TableCell colSpan={2} className="text-[14px] font-medium text-gray-700 bg-neutral-100 px-4">
          <div className="flex items-center gap-2">
            <span>Total Purchase Orders:</span>
            <span className="font-semibold text-gray-900">{totalPurchaseOrders}</span>
          </div>
        </TableCell>
        <TableCell colSpan={2} className="bg-neutral-100 px-4"></TableCell>
        <TableCell className="text-[14px] font-medium text-gray-700 bg-neutral-100 px-4">
          <div className="flex items-center gap-2">
            <span>Total Amount:</span>
            <span className="font-semibold text-gray-900">{formatCurrency(totalAmount)}</span>
          </div>
        </TableCell>
        <TableCell colSpan={3} className="bg-neutral-100 px-4"></TableCell>
      </TableRow>
    </TableFooter>
  );
}
