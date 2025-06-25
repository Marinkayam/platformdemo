
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
import { PortalRecord } from "@/types/portalRecord";

interface MakePrimaryConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  record: PortalRecord | null;
}

export function MakePrimaryConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  record,
}: MakePrimaryConfirmModalProps) {
  if (!record) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Make Primary Record?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to make portal record <strong>{record.id}</strong> the primary record for this invoice? 
            This will change the current primary record to alternate status.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            Yes, Make Primary
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
