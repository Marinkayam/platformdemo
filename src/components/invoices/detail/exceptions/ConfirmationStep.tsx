
import { useState } from "react";
import { Invoice } from "@/types/invoice";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  const isRecommended = !hasExceptions && invoice.status === "APPROVED";
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center space-x-2 mb-6">
        <Button 
          variant="ghost" 
          className="pl-0 text-primary hover:text-primary-600 hover:bg-primary-50"
          onClick={onBack}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Selection
        </Button>
      </div>
      
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>Issue Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Exceptions</TableHead>
            <TableHead>Recommendation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-primary-50/40">
            <TableCell className="font-medium">
              {formatDate(invoice.creationDate)}
            </TableCell>
            <TableCell>{formatCurrency(invoice.total, invoice.currency || 'USD')}</TableCell>
            <TableCell>
              <span className={`px-2.5 py-0.5 rounded-full text-sm ${
                invoice.status === 'APPROVED' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {invoice.status === 'APPROVED' ? 'Approved by Buyer' : 'Pending Action'}
              </span>
            </TableCell>
            <TableCell>
              {hasExceptions ? (
                <div className="flex items-center text-amber-700">
                  <AlertTriangle className="h-4 w-4 mr-1 text-amber-500" />
                  <span>{exceptionCount} Exceptions</span>
                </div>
              ) : (
                <div className="flex items-center text-green-700">
                  <Check className="h-4 w-4 mr-1 text-green-600" />
                  <span>None</span>
                </div>
              )}
            </TableCell>
            <TableCell>
              {isRecommended && (
                <span className="bg-primary-100 text-primary px-2 py-0.5 rounded-full text-sm">
                  Recommended
                </span>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
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
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <Button 
          onClick={handleConfirmClick}
          className="bg-primary hover:bg-primary-700"
        >
          Confirm Selection
        </Button>
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
              <p className="font-medium">Invoice #{invoice.number} ({formatDate(invoice.creationDate)})</p>
              <p className="text-sm mt-1">
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  invoice.status === 'APPROVED' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {invoice.status === 'APPROVED' ? 'Approved by Buyer' : 'Pending Action'}
                </span>
              </p>
              <p className="text-sm mt-1">{invoice.exceptions?.length || 0} Exceptions</p>
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
