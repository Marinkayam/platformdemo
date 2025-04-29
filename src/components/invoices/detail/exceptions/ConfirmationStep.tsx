
import { useState } from "react";
import { Invoice } from "@/types/invoice";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ConfirmationStepProps {
  invoice: Invoice;
  onConfirm: () => void;
  onBack: () => void;
  onExcludeAll: () => void;
}

export function ConfirmationStep({ invoice, onConfirm, onBack, onExcludeAll }: ConfirmationStepProps) {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  
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

  const handleConfirmClick = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleFinalConfirm = () => {
    setIsConfirmDialogOpen(false);
    onConfirm();
  };
  
  const exceptionCount = invoice.exceptions?.length || 0;
  const hasExceptions = exceptionCount > 0;
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center py-2 mb-2">
        <h3 className="text-lg font-medium text-primary-700">Selected Invoice</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
          You have selected this invoice to keep. All other duplicate invoices will be excluded.
        </p>
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
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-primary-50">
              <TableCell className="text-center">
                <div className="flex justify-center">
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">
                  {formatDate(invoice.creationDate)}
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
            </TableRow>
          </TableBody>
        </Table>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
        <h4 className="text-sm font-medium text-blue-700 mb-1">What happens next?</h4>
        <ul className="space-y-2 text-sm text-blue-800 list-disc pl-5 mt-2">
          <li>This invoice will be kept as the valid record</li>
          <li>Other invoices with the same number will be excluded</li>
          <li>The system will run validations on the selected invoice</li>
          <li>You'll need to address any other exceptions</li>
        </ul>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onExcludeAll}
            className="border-red-300 text-red-700 hover:bg-red-50"
          >
            Exclude All
          </Button>
          
          <Button 
            onClick={handleConfirmClick}
            className="bg-primary hover:bg-primary-700"
          >
            Confirm Selected Invoice
          </Button>
        </div>
      </div>

      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold">
              Resolve Duplication Exception
            </AlertDialogTitle>
          </AlertDialogHeader>
          
          <div className="py-2">
            <p className="mb-4">You've selected:</p>
            <div className="bg-gray-50 p-4 rounded-md border mb-4">
              <p className="font-medium">Record {invoice.id.slice(-1)} (#{invoice.number}) {formatDate(invoice.creationDate)}</p>
              <p className="text-sm mt-1">Status: {invoice.status}</p>
              <p className="text-sm">{invoice.exceptions?.length || 0} Exceptions</p>
            </div>
            
            <div className="mb-4">
              <h4 className="font-medium mb-2">What happens next:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Run validations on this record</li>
                <li>Exclude the other version(s) to prevent duplicates</li>
                <li>Submit this invoice to the buyer portal after all exceptions are solved</li>
              </ul>
            </div>
          </div>
          
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleFinalConfirm}
              className="bg-primary hover:bg-primary-700"
            >
              Confirm Selected Invoice
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
