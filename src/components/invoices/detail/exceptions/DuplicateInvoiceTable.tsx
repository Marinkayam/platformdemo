
import { useState } from "react";
import { Invoice } from "@/types/invoice";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Check, Clock, AlertCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface DuplicateInvoiceTableProps {
  invoices: Invoice[];
  onSelect: (selected: Invoice[]) => void;
  onSelectSingle: (invoice: Invoice) => void;
  currentInvoice: Invoice;
}

export function DuplicateInvoiceTable({ invoices, onSelect, onSelectSingle, currentInvoice }: DuplicateInvoiceTableProps) {
  const [selected, setSelected] = useState<Record<string, boolean>>({
    [currentInvoice.id]: true // Pre-select current invoice
  });
  
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
  
  // Sort invoices by creation date (newest first)
  const sortedInvoices = [...invoices].sort((a, b) => {
    return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
        <h4 className="text-sm font-medium text-amber-700 mb-2">About duplicate invoices</h4>
        <p className="text-sm text-amber-800">
          We've detected multiple invoices with the same invoice number. Review the details and select which invoice should be kept.
          The other duplicates will be marked as invalid.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        {sortedInvoices.map((invoice) => {
          const isNewest = invoice.creationDate === sortedInvoices[0].creationDate;
          const isCurrent = invoice.id === currentInvoice.id;
          
          return (
            <Card 
              key={invoice.id}
              className={`overflow-hidden transition-all border-2 ${
                isCurrent 
                  ? "border-amber-400 shadow-md" 
                  : "border-gray-100 hover:border-gray-300"
              }`}
            >
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    id={`invoice-${invoice.id}`}
                    checked={!!selected[invoice.id]}
                    onCheckedChange={() => handleToggle(invoice.id)}
                  />
                  <label htmlFor={`invoice-${invoice.id}`} className="text-sm font-medium cursor-pointer">
                    {isNewest && (
                      <span className="text-green-700 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        Newest
                      </span>
                    )}
                    {isCurrent && !isNewest && (
                      <span className="text-amber-700 flex items-center gap-1">
                        <AlertCircle className="h-3.5 w-3.5" />
                        Current
                      </span>
                    )}
                    {!isNewest && !isCurrent && "Select"}
                  </label>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8"
                  onClick={() => onSelectSingle(invoice)}
                >
                  Select this one
                </Button>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="text-sm font-medium text-gray-500">Created on:</div>
                  <div className="text-sm">{invoice.creationDate}</div>
                  
                  <div className="text-sm font-medium text-gray-500">Invoice #:</div>
                  <div className="text-sm">{invoice.number}</div>
                  
                  <div className="text-sm font-medium text-gray-500">Buyer:</div>
                  <div className="text-sm">{invoice.buyer}</div>
                  
                  <div className="text-sm font-medium text-gray-500">Total:</div>
                  <div className="text-sm">{formatCurrency(invoice.total, invoice.currency || 'USD')}</div>
                  
                  <div className="text-sm font-medium text-gray-500">Status:</div>
                  <div className="text-sm">{invoice.status}</div>
                  
                  <div className="text-sm font-medium text-gray-500">Owner:</div>
                  <div className="text-sm">{invoice.owner}</div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      {Object.keys(selected).length === 2 && (
        <div className="flex justify-end">
          <Button 
            onClick={handleCompare}
            variant="default"
            className="bg-amber-500 hover:bg-amber-600"
          >
            Compare Selected
          </Button>
        </div>
      )}
    </div>
  );
}
