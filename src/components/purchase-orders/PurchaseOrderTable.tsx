
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { PurchaseOrderStatusBadge } from "@/components/ui/purchase-order-status-badge";
import { useSortedPurchaseOrders } from "@/hooks/useSortedPurchaseOrders";
import { PurchaseOrderTableHeader } from "./table/PurchaseOrderTableHeader";
import { PurchaseOrderTableFooter } from "./table/PurchaseOrderTableFooter";

interface PurchaseOrderTableProps {
  purchaseOrders: PurchaseOrder[];
}

export function PurchaseOrderTable({ purchaseOrders }: PurchaseOrderTableProps) {
  const navigate = useNavigate();
  const { 
    sortedPurchaseOrders, 
    sortField, 
    sortDirection, 
    handleSort, 
    setLocalPurchaseOrders 
  } = useSortedPurchaseOrders(purchaseOrders);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const handleRowClick = (poId: string) => {
    navigate(`/purchase-orders/${poId}`);
  };

  return (
    <div className="rounded-xl border overflow-hidden relative">
      <div className="overflow-x-auto max-h-[600px] scrollbar-none" style={{ overflow: 'auto' }}>
        <Table>
          <PurchaseOrderTableHeader 
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
            className="sticky top-0 z-10"
          />
          
          <TableBody className="divide-y">
            {sortedPurchaseOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-sm text-gray-600 align-middle bg-white">
                  No purchase orders found.
                </TableCell>
              </TableRow>
            ) : (
              sortedPurchaseOrders.map((po) => (
                <TableRow
                  key={po.id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors bg-white"
                  onClick={() => handleRowClick(po.id)}
                >
                  <TableCell className="px-4 text-left sticky left-0 z-10 bg-white">
                    <span className="font-medium text-[#0A0714] hover:text-blue-800">
                      {po.poNumber}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 text-sm">{po.buyerName}</TableCell>
                  <TableCell className="px-4 text-sm">
                    <PurchaseOrderStatusBadge status={po.status} />
                  </TableCell>
                  <TableCell className="px-4 text-sm">{po.portal}</TableCell>
                  <TableCell className="px-4 text-sm">{formatCurrency(po.total)}</TableCell>
                  <TableCell className="px-4 text-sm">{formatCurrency(po.invoicedAmount)}</TableCell>
                  <TableCell className="px-4 text-sm">{formatCurrency(po.amountLeft)}</TableCell>
                  <TableCell className="px-4 text-sm">{po.paymentTerms}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
          
          <PurchaseOrderTableFooter purchaseOrders={sortedPurchaseOrders} />
        </Table>
      </div>
    </div>
  );
}
