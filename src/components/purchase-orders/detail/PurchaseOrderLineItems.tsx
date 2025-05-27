
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PurchaseOrderLineItem } from "@/types/purchaseOrder";
import { useState } from "react";

interface PurchaseOrderLineItemsProps {
  lineItems: PurchaseOrderLineItem[];
}

export function PurchaseOrderLineItems({ lineItems }: PurchaseOrderLineItemsProps) {
  const [showLineItems, setShowLineItems] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <Collapsible open={showLineItems} onOpenChange={setShowLineItems}>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Line Items</h2>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {showLineItems ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
              {showLineItems ? "Hide" : "Show"} Line Items
            </Button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent className="mt-4">
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
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                  <TableCell className="text-right font-semibold">{formatCurrency(item.total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
