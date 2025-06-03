
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

interface DuplicationResolutionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  action: 'REPLACE' | 'KEEP_CURRENT' | 'FORCE_SUBMIT';
  invoiceNumber: string;
}

export function DuplicationResolutionModal({ 
  open, 
  onOpenChange, 
  onConfirm,
  action,
  invoiceNumber
}: DuplicationResolutionModalProps) {
  const getActionText = () => {
    switch (action) {
      case 'REPLACE':
        return 'replace the current invoice with this new version';
      case 'KEEP_CURRENT':
        return 'keep the current invoice and discard the new one';
      case 'FORCE_SUBMIT':
        return 'force submit both versions';
      default:
        return 'resolve this duplication';
    }
  };

  const getButtonText = () => {
    switch (action) {
      case 'REPLACE':
        return 'Replace Invoice';
      case 'KEEP_CURRENT':
        return 'Keep Current';
      case 'FORCE_SUBMIT':
        return 'Force Submit';
      default:
        return 'Confirm';
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to {getActionText()} for invoice {invoiceNumber}. 
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-md">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            className="rounded-md"
            onClick={onConfirm}
          >
            {getButtonText()}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
