
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LineItem } from "@/types/invoice";

interface LineItemsProps {
  lineItems: LineItem[];
  showLineItems: boolean;
  setShowLineItems: (show: boolean) => void;
}

export function LineItems({ lineItems, showLineItems, setShowLineItems }: LineItemsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
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
                  <TableCell className="text-right">
                    ${item.unitPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-right">
                    ${item.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
