
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PurchaseOrderLineItem } from "@/types/purchaseOrder";

interface PurchaseOrderLineItemsTableProps {
  lineItems: PurchaseOrderLineItem[];
}

export function PurchaseOrderLineItemsTable({ lineItems }: PurchaseOrderLineItemsTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Items</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Unit Price</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lineItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.description}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                <TableCell className="text-right font-semibold">{formatCurrency(item.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
