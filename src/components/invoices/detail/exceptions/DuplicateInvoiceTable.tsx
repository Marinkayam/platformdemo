
import { useState, useEffect } from "react";
import { Invoice } from "@/types/invoice";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Check, Clock, AlertCircle, XCircle } from "lucide-react";

interface DuplicateInvoiceTableProps {
  invoices: Invoice[];
  onSelect: (selected: Invoice[]) => void;
  onSelectSingle: (invoice: Invoice) => void;
  currentInvoice: Invoice;
  selectedInvoices?: Invoice[];
}

export function DuplicateInvoiceTable({ 
  invoices, 
  onSelect, 
  onSelectSingle, 
  currentInvoice, 
  selectedInvoices = [] 
}: DuplicateInvoiceTableProps) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  
  // Initialize selections based on props
  useEffect(() => {
    const initialSelection: Record<string, boolean> = {};
    selectedInvoices.forEach(inv => {
      initialSelection[inv.id] = true;
    });
    
    // If nothing is pre-selected, select the current invoice by default
    if (Object.keys(initialSelection).length === 0) {
      initialSelection[currentInvoice.id] = true;
    }
    
    setSelected(initialSelection);
  }, [selectedInvoices, currentInvoice.id]);
  
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
    
    // Update parent component with selected invoices
    const selectedInvoices = invoices.filter(inv => newSelected[inv.id]);
    onSelect(selectedInvoices);
  };
  
  const handleCompare = () => {
    // Need exactly 2 selections for comparison
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
  
  const handleExcludeAll = () => {
    toast({
      title: "Not implemented",
      description: "This feature is not yet implemented.",
    });
  };

  // Sort invoices by creation date (newest first)
  const sortedInvoices = [...invoices].sort((a, b) => {
    return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="bg-primary-50 p-4 rounded-md border border-primary-200">
        <div className="flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-primary-700">About duplicate invoices</h4>
            <p className="text-sm text-primary-800 mt-1">
              We've detected multiple invoices with the same invoice number. Compare the invoices to determine which one is valid.
            </p>
          </div>
        </div>
      </div>
      
      <Table className="border">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-12 text-center">Select</TableHead>
            <TableHead>Invoice #</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedInvoices.map((invoice) => {
            const isNewest = invoice.creationDate === sortedInvoices[0].creationDate;
            const isCurrent = invoice.id === currentInvoice.id;
            
            return (
              <TableRow key={invoice.id} className="hover:bg-gray-50">
                <TableCell className="text-center">
                  <Checkbox
                    id={`invoice-${invoice.id}`}
                    checked={!!selected[invoice.id]}
                    onCheckedChange={() => handleToggle(invoice.id)}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                </TableCell>
                <TableCell>
                  <div className="font-medium">{invoice.number}</div>
                  {isNewest && (
                    <span className="text-green-700 text-xs flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      Newest
                    </span>
                  )}
                  {isCurrent && !isNewest && (
                    <span className="text-primary-700 text-xs flex items-center gap-1 mt-1">
                      <AlertCircle className="h-3 w-3" />
                      Current
                    </span>
                  )}
                </TableCell>
                <TableCell>{invoice.creationDate}</TableCell>
                <TableCell>{formatCurrency(invoice.total, invoice.currency || 'USD')}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                    ${invoice.status === 'Pending Action' ? 'bg-amber-100 text-amber-800' : 
                      invoice.status === 'External Submission' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'}`}>
                    {invoice.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onSelectSingle(invoice)}
                    className="text-primary hover:text-primary-700 hover:bg-primary-100 p-0 h-8 px-2"
                  >
                    Choose this invoice
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleExcludeAll}
          className="border-red-300 text-red-700 hover:bg-red-50"
        >
          <XCircle className="mr-2 h-4 w-4" />
          Exclude All
        </Button>
        
        <Button 
          onClick={handleCompare}
          variant="default"
          className="bg-primary hover:bg-primary-600"
          disabled={Object.keys(selected).length !== 2}
        >
          Compare Selected
        </Button>
      </div>
    </div>
  );
}
