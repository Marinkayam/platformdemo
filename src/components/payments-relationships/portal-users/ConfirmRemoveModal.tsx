
import React from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ConfirmRemoveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
  title?: string;
  description?: string;
}

export function ConfirmRemoveModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
  title,
  description,
}: ConfirmRemoveModalProps) {
  const defaultTitle = itemName === "Two-Factor Authentication" 
    ? `Are you sure you want to disable ${itemName}?`
    : `Are you sure you want to remove ${itemName}?`;
    
  const defaultDescription = itemName === "Two-Factor Authentication"
    ? "Disabling two-factor authentication will make this account less secure."
    : "This action cannot be undone. This may affect Smart Connections that depend on it.";

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || defaultTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || defaultDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-primary text-primary hover:bg-primary/5">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-white hover:bg-destructive/90"
          >
            Yes, I'm sure
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
