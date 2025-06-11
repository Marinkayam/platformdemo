import { PurchaseOrder } from "@/types/purchase-orders";
import { formatCurrency } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PurchaseOrderLineItemsProps {
  purchaseOrder: PurchaseOrder;
  className?: string;
}

export function PurchaseOrderLineItems({ purchaseOrder, className }: PurchaseOrderLineItemsProps) {
  if (!purchaseOrder.lineItems || purchaseOrder.lineItems.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No line items found for this purchase order.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Line Items</h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Unit Price</TableHead>
            <TableHead className="text-right">Tax Rate</TableHead>
            <TableHead className="text-right">Tax Amount</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>Account Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchaseOrder.lineItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.unitPrice, item.currency || "USD")}
              </TableCell>
              <TableCell className="text-right">
                {item.taxRate ? `${item.taxRate}%` : "-"}
              </TableCell>
              <TableCell className="text-right">
                {item.taxAmount
                  ? formatCurrency(item.taxAmount, item.currency || "USD")
                  : "-"}
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(item.total, item.currency || "USD")}
              </TableCell>
              <TableCell>{item.accountCode || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 