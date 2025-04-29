
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";

interface ForceSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ForceSubmitModal({ isOpen, onClose, onConfirm }: ForceSubmitModalProps) {
  const [doNotShowAgain, setDoNotShowAgain] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    onConfirm();
    
    // Show confirmation toast
    toast({
      title: "Invoice force submitted",
      description: "The invoice has been submitted despite exceptions"
    });

    // Navigate back to invoices list
    setTimeout(() => {
      navigate("/invoices");
    }, 1000);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <AlertDialogTitle className="text-lg font-medium">
                Force submit invoice?
              </AlertDialogTitle>
            </div>
          </div>
        </AlertDialogHeader>
        
        <AlertDialogDescription className="pt-2 space-y-4">
          <p>
            Force submitting an invoice with unresolved exceptions may lead to 
            additional delays or rejection by the buyer's portal.
          </p>
          <p>
            We recommend resolving all exceptions before submission.
          </p>
          
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox 
              id="doNotShowAgain" 
              checked={doNotShowAgain} 
              onCheckedChange={(checked) => setDoNotShowAgain(checked === true)}
            />
            <label
              htmlFor="doNotShowAgain"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Don't show this again
            </label>
          </div>
        </AlertDialogDescription>
        
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="bg-amber-500 hover:bg-amber-600"
          >
            Force Submit
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
