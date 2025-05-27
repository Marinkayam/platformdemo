
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PurchaseOrder } from "@/types/purchaseOrder";
import { PurchaseOrderStatusBadge } from "@/components/ui/purchase-order-status-badge";

interface PurchaseOrderTableProps {
  purchaseOrders: PurchaseOrder[];
}

export function PurchaseOrderTable({ purchaseOrders }: PurchaseOrderTableProps) {
  const navigate = useNavigate();

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
    <div className="rounded-xl border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-medium text-gray-900">PO Number</TableHead>
            <TableHead className="font-medium text-gray-900">Buyer Name</TableHead>
            <TableHead className="font-medium text-gray-900">Status</TableHead>
            <TableHead className="font-medium text-gray-900">Portal</TableHead>
            <TableHead className="font-medium text-gray-900">Total</TableHead>
            <TableHead className="font-medium text-gray-900">Invoiced Amount</TableHead>
            <TableHead className="font-medium text-gray-900">Amount Left</TableHead>
            <TableHead className="font-medium text-gray-900">Payment Terms</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {purchaseOrders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-[56px] text-center text-[14px] text-gray-600 py-2 align-middle bg-white">
                No purchase orders found.
              </TableCell>
            </TableRow>
          ) : (
            purchaseOrders.map((po) => (
              <TableRow
                key={po.id}
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleRowClick(po.id)}
              >
                <TableCell className="font-bold text-blue-600 hover:text-blue-800">
                  {po.poNumber}
                </TableCell>
                <TableCell>{po.buyerName}</TableCell>
                <TableCell>
                  <PurchaseOrderStatusBadge status={po.status} />
                </TableCell>
                <TableCell>{po.portal}</TableCell>
                <TableCell>{formatCurrency(po.total)}</TableCell>
                <TableCell>{formatCurrency(po.invoicedAmount)}</TableCell>
                <TableCell>{formatCurrency(po.amountLeft)}</TableCell>
                <TableCell>{po.paymentTerms}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
