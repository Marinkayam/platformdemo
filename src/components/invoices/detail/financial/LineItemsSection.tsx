
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { LineItem } from "@/types/invoice";

interface LineItemsSectionProps {
  lineItems: LineItem[];
}

export function LineItemsSection({ lineItems }: LineItemsSectionProps) {
  const [lineItemsOpen, setLineItemsOpen] = useState(false);
  
  return (
    <div className="border-t pt-4">
      <button 
        onClick={() => setLineItemsOpen(!lineItemsOpen)}
        className="w-full flex items-center justify-between py-2 text-left font-medium"
      >
        <span>Line Items</span>
        {lineItemsOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>
      
      <div className={lineItemsOpen ? "block pt-4" : "hidden"}>
        <Table>
          <TableHeader>
            <TableRow className="h-10">
              <TableHead className="h-10">Description</TableHead>
              <TableHead className="text-right h-10">Quantity</TableHead>
              <TableHead className="text-right h-10">Unit Price</TableHead>
              <TableHead className="text-right h-10">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lineItems.map(item => (
              <TableRow key={item.id} className="h-12">
                <TableCell className="h-12 py-2">{item.description}</TableCell>
                <TableCell className="text-right h-12 py-2">{item.quantity}</TableCell>
                <TableCell className="text-right h-12 py-2">
                  ${item.unitPrice.toLocaleString('en-US', {
                    minimumFractionDigits: 2
                  })}
                </TableCell>
                <TableCell className="text-right h-12 py-2">
                  ${item.total.toLocaleString('en-US', {
                    minimumFractionDigits: 2
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
