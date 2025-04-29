
import { useState } from "react";
import { Invoice } from "@/types/invoice";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface DuplicateInvoiceTableProps {
  invoices: Invoice[];
  onSelect: (selected: Invoice[]) => void;
  currentInvoice: Invoice;
}

export function DuplicateInvoiceTable({ invoices, onSelect, currentInvoice }: DuplicateInvoiceTableProps) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  
  const handleToggle = (id: string) => {
    const newSelected = { ...selected };
    
    // If already selected, unselect
    if (newSelected[id]) {
      delete newSelected[id];
    } else {
      // Check if we already have 2 selected
      if (Object.keys(newSelected).length >= 2) {
        toast({
          title: "Selection limit reached",
          description: "You can only select 2 invoices to compare.",
          variant: "destructive",
        });
        return;
      }
      newSelected[id] = true;
    }
    
    setSelected(newSelected);
  };
  
  const handleCompare = () => {
    // Need at least 2 selections
    if (Object.keys(selected).length !== 2) {
      toast({
        title: "Selection required",
        description: "Please select exactly 2 invoices to compare.",
        variant: "destructive",
      });
      return;
    }
    
    const selectedInvoices = invoices.filter(inv => selected[inv.id]);
    onSelect(selectedInvoices);
  };
  
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Creation Date</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow 
                key={invoice.id} 
                className={invoice.id === currentInvoice.id ? "bg-primary/5" : ""}
              >
                <TableCell>
                  <Checkbox 
                    id={`invoice-${invoice.id}`}
                    checked={!!selected[invoice.id]}
                    onCheckedChange={() => handleToggle(invoice.id)}
                  />
                </TableCell>
                <TableCell>{invoice.creationDate}</TableCell>
                <TableCell>{invoice.owner}</TableCell>
                <TableCell>{invoice.buyer}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>{invoice.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-end">
        <Button 
          onClick={handleCompare}
          disabled={Object.keys(selected).length !== 2}
        >
          Compare Selected
        </Button>
      </div>
    </div>
  );
}
