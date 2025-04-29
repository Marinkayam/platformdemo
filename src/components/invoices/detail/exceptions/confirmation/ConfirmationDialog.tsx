
import { Invoice } from "@/types/invoice";
import { formatDate } from "./utils";
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

interface ConfirmationDialogProps {
  invoice: Invoice;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function ConfirmationDialog({ 
  invoice, 
  isOpen, 
  onOpenChange, 
  onConfirm 
}: ConfirmationDialogProps) {
  const handleFinalConfirm = () => {
    onOpenChange(false);
    onConfirm();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
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
                invoice.status === 'Approved by Buyer' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {invoice.status}
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
  );
}
