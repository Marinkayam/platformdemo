
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CheckCircle } from "lucide-react";

interface ExcludeAllModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ExcludeAllModal({ isOpen, onClose, onConfirm }: ExcludeAllModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <div className="flex flex-col items-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-center">
            Resolve Duplication Exception
          </AlertDialogTitle>
        </AlertDialogHeader>
        
        <div className="py-4">
          <div className="bg-primary-50 p-4 rounded-md mb-2">
            <h3 className="font-medium text-primary-800 mb-2">What happens next:</h3>
            <ul className="space-y-2 text-sm text-primary-700 list-disc pl-5">
              <li>All duplicate invoices will be excluded</li>
              <li>The system will run validations on remaining invoices</li>
              <li>You'll need to address any other exceptions</li>
              <li>Status will be updated in your dashboard</li>
            </ul>
          </div>
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-primary hover:bg-primary-700"
          >
            Confirm & Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
