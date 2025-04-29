
import { useState, useEffect } from "react";
import { Invoice } from "@/types/invoice";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Check, AlertTriangle, MoreVertical } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";

interface DuplicateInvoiceTableProps {
  invoices: Invoice[];
  onSelect: (selected: Invoice[]) => void;
  onSelectSingle: (invoice: Invoice) => void;
  onExcludeAll: () => void;
  currentInvoice: Invoice;
  selectedInvoices?: Invoice[];
  defaultSelectedInvoice?: Invoice;
}

export function DuplicateInvoiceTable({ 
  invoices, 
  onSelect, 
  onSelectSingle, 
  onExcludeAll,
  currentInvoice, 
  selectedInvoices = [],
  defaultSelectedInvoice
}: DuplicateInvoiceTableProps) {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  
  // Initialize selections based on props and default selection
  useEffect(() => {
    const initialSelection: Record<string, boolean> = {};
    
    // Add pre-selections from props
    selectedInvoices.forEach(inv => {
      initialSelection[inv.id] = true;
    });
    
    // Add default selection if provided and not already selected
    if (defaultSelectedInvoice && selectedInvoices.length === 0) {
      initialSelection[defaultSelectedInvoice.id] = true;
      
      // Notify parent of default selection
      setTimeout(() => {
        const defaultSelected = invoices.filter(inv => initialSelection[inv.id]);
        if (defaultSelected.length > 0) {
          onSelect(defaultSelected);
        }
      }, 0);
    }
    
    setSelected(initialSelection);
  }, [selectedInvoices, defaultSelectedInvoice, invoices, onSelect]);
  
  const handleToggle = (id: string) => {
    const newSelected = { ...selected };
    
    // If already selected, unselect
    if (newSelected[id]) {
      delete newSelected[id];
    } else {
      newSelected[id] = true;
    }
    
    setSelected(newSelected);
    
    // Update parent component with selected invoices
    const selectedInvoices = invoices.filter(inv => newSelected[inv.id]);
    onSelect(selectedInvoices);
  };
  
  const handleCompare = () => {
    const selectedIds = Object.keys(selected);
    if (selectedIds.length === 0) {
      toast({
        title: "Selection required",
        description: "Please select at least one invoice to compare.",
        variant: "destructive",
      });
      return;
    }
    
    const selectedInvoices = invoices.filter(inv => selected[inv.id]);
    onSelect(selectedInvoices);
  };
  
  const handleClearSelection = () => {
    setSelected({});
    onSelect([]);
  };
  
  // Sort invoices by creation date (newest first)
  const sortedInvoices = [...invoices].sort((a, b) => {
    return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
  });

  return (
    <div className="space-y-6">
      <div className="bg-primary-50 p-4 rounded-md border border-primary-200">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="text-sm font-medium text-primary-700">About duplicate invoices</h4>
            <p className="text-sm text-primary-800 mt-1">
              We've detected multiple invoices with the same invoice number. Resolution Steps: Review and select which invoice is valid. The others will be marked as excluded and won't be tracked.
            </p>
          </div>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-12 text-center"></TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Exceptions</TableHead>
              <TableHead className="w-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-[14px] text-gray-600">
                  No invoices found.
                </TableCell>
              </TableRow>
            ) : (
              sortedInvoices.map((invoice) => {
                const isSelected = !!selected[invoice.id];
                const hasExceptions = invoice.exceptions?.length > 0;
                const isNewest = invoice.id === sortedInvoices[0].id;
                
                return (
                  <TableRow key={invoice.id} className={`hover:bg-gray-50 ${isSelected ? 'bg-primary-50' : ''}`}>
                    <TableCell className="text-center">
                      <Checkbox
                        id={`invoice-${invoice.id}`}
                        checked={isSelected}
                        onCheckedChange={() => handleToggle(invoice.id)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="font-medium flex items-center">
                        {invoice.creationDate}
                        {isNewest && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            Newest
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(invoice.total, invoice.currency || 'USD')}</TableCell>
                    <TableCell>
                      <StatusBadge status={invoice.status} />
                    </TableCell>
                    <TableCell>
                      {hasExceptions ? (
                        <div className="flex items-center text-amber-700">
                          <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
                          <span>{invoice.exceptions?.length} Exceptions</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-green-700">
                          <Check className="h-4 w-4 mr-1 text-green-600" />
                          <span>None</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleClearSelection}
          className="text-gray-700"
        >
          Clear Selection
        </Button>
        
        <div className="flex gap-2">
          <Button 
            onClick={onExcludeAll}
            variant="outline"
            className="border-red-300 text-red-700 hover:bg-red-50"
          >
            Exclude All
          </Button>
          
          <Button 
            onClick={handleCompare}
            variant="default"
            className="bg-primary hover:bg-primary-600"
          >
            Compare Selected
          </Button>
        </div>
      </div>
    </div>
  );
}
