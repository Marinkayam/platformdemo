
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineItem } from "@/types/purchaseOrder";
import { PurchaseOrderLineItemsTable } from "./PurchaseOrderLineItemsTable";

interface PurchaseOrderLineItemsProps {
  lineItems: LineItem[];
}

export function PurchaseOrderLineItems({ lineItems }: PurchaseOrderLineItemsProps) {
  return (
    <Card className="border-0 shadow-none">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Line Items</CardTitle>
      </CardHeader>
      <CardContent>
        <PurchaseOrderLineItemsTable lineItems={lineItems} />
      </CardContent>
    </Card>
  );
}
