
import { useState, useEffect } from "react";
import { Invoice } from "@/types/invoice";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Check, AlertTriangle, MoreVertical, Download, MessageSquare } from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DuplicateInvoiceTableProps {
  invoices: Invoice[];
  onSelect: (selected: Invoice[]) => void;
  onSelectSingle: (invoice: Invoice) => void;
  onExcludeAll: () => void;
  currentInvoice: Invoice;
  selectedInvoices?: Invoice[];
  defaultSelectedInvoice?: Invoice;
  onContactSupport?: (invoice: Invoice) => void;
  preventAutoAdvance?: boolean;
}

export function DuplicateInvoiceTable({ 
  invoices, 
  onSelect, 
  onSelectSingle, 
  onExcludeAll,
  currentInvoice, 
  selectedInvoices = [],
  defaultSelectedInvoice,
  onContactSupport,
  preventAutoAdvance = false
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
      
      // Only notify parent of default selection if not preventing auto-advance
      if (!preventAutoAdvance) {
        setTimeout(() => {
          const defaultSelected = invoices.filter(inv => initialSelection[inv.id]);
          if (defaultSelected.length > 0) {
            onSelect(defaultSelected);
          }
        }, 0);
      }
    }
    
    setSelected(initialSelection);
  }, [selectedInvoices, defaultSelectedInvoice, invoices, onSelect, preventAutoAdvance]);
  
  const handleToggle = (id: string) => {
    const newSelected = { ...selected };
    
    // If already selected, unselect
    if (newSelected[id]) {
      delete newSelected[id];
    } else {
      newSelected[id] = true;
    }
    
    setSelected(newSelected);
    
    // Don't auto-advance, just update the selection
    // The parent will be notified when Compare button is clicked
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

  const handleSelectSingle = (invoice: Invoice) => {
    // Clear any existing selections first
    const newSelected = { [invoice.id]: true };
    setSelected(newSelected);
    
    // Notify parent of single selection
    onSelectSingle(invoice);
  };
  
  const handleClearSelection = () => {
    setSelected({});
    onSelect([]);
  };

  const handleContactSupport = (invoice: Invoice) => {
    if (onContactSupport) {
      onContactSupport(invoice);
    }
  };
  
  // Format date to "Jan 16, 2025 12:05" format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };
  
  // Sort invoices by creation date (newest first)
  const sortedInvoices = [...invoices].sort((a, b) => {
    return new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime();
  });

  return (
    <div className="space-y-6">
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
                const exceptionCount = invoice.exceptions?.length || 0;
                const hasExceptions = exceptionCount > 0;
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
                        {formatDate(invoice.creationDate)}
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
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center text-amber-700 cursor-help">
                                <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
                                <span>{exceptionCount} Exceptions</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="w-80 p-3">
                              <h4 className="font-semibold mb-1">Exception Details:</h4>
                              <ul className="list-disc pl-4 space-y-1">
                                {invoice.exceptions?.map(exception => (
                                  <li key={exception.id} className="text-sm">
                                    {exception.message}
                                  </li>
                                )) || <li>No exception details available</li>}
                              </ul>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ) : (
                        <div className="flex items-center text-green-700">
                          <Check className="h-4 w-4 mr-1 text-green-600" />
                          <span>None</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-primary border-primary hover:bg-primary-50 text-xs"
                          onClick={() => handleSelectSingle(invoice)}
                        >
                          <Check className="h-3.5 w-3.5 mr-1" />
                          Select
                        </Button>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer">
                              <Download className="h-4 w-4 mr-2" />
                              Download Invoice
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="cursor-pointer" 
                              onClick={() => handleContactSupport(invoice)}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contact Support
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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
