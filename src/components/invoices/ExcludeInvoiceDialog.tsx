
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

interface ExcludeInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  invoiceNumber?: string;
}

export function ExcludeInvoiceDialog({ 
  open, 
  onOpenChange, 
  onConfirm,
  invoiceNumber 
}: ExcludeInvoiceDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to exclude this invoice?</AlertDialogTitle>
          <AlertDialogDescription>
            {invoiceNumber ? `Invoice ${invoiceNumber} will be excluded from processing. ` : "This invoice will be excluded from processing. "}
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-md">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            className="rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={onConfirm}
          >
            Exclude Invoice
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
