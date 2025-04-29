
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExceptionsTab } from "./ExceptionsTab";
import { RTPDataTab } from "./RTPDataTab";
import { ActivityTab } from "./ActivityTab";
import { Invoice } from "@/types/invoice";
import { toast } from "@/hooks/use-toast";

interface TabContentProps {
  tab: string;
  invoice?: Invoice;
}

export function TabContent({ tab, invoice }: TabContentProps) {
  const [localInvoice, setLocalInvoice] = useState<Invoice | undefined>(invoice);
  const navigate = useNavigate();
  
  const handleResolveException = (exceptionId: string, resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT' | 'EXCLUDED') => {
    if (!localInvoice) return;
    
    // Create a copy of the invoice with resolved exceptions
    const updatedInvoice = { 
      ...localInvoice,
      exceptions: localInvoice.exceptions?.map(exception => 
        exception.id === exceptionId 
          ? { ...exception, resolved: true, resolvedAt: new Date().toISOString() } 
          : exception
      )
    };
    
    // Check if all exceptions are resolved
    const allResolved = updatedInvoice.exceptions?.every(exception => exception.resolved) ?? true;
    if (allResolved) {
      updatedInvoice.hasExceptions = false;
      // In a real app, we would update the backend here
    }
    
    setLocalInvoice(updatedInvoice);
    
    // Handle different resolution types
    if (allResolved) {
      let toastMessage = "";
      let toastDescription = "";
      
      if (resolution === 'UPLOAD_NEW_PDF') {
        toastMessage = "Exception resolved";
        toastDescription = "User uploaded corrected invoice with new PO";
      } else if (resolution === 'MARK_RESOLVED') {
        toastMessage = "Exception resolved";
        toastDescription = "Duplicate invoice exception has been resolved";
      } else if (resolution === 'FORCE_SUBMIT') {
        toastMessage = "Invoice force submitted";
        toastDescription = "Invoice has been submitted despite exceptions";
      } else if (resolution === 'EXCLUDED') {
        toastMessage = "Duplicate invoices resolved";
        toastDescription = "Selected invoice will be kept, others marked as excluded";
      }
      
      setTimeout(() => {
        toast({
          title: toastMessage,
          description: toastDescription
        });
        
        // Navigate back to invoices list
        setTimeout(() => {
          navigate("/invoices");
        }, 1500);
      }, 500);
    }
  };

  // Always return the appropriate content for each tab
  switch (tab) {
    case "invoice-data":
      // This will be handled directly by the InvoiceDetail component
      return null;
    case "exceptions":
      return (
        <ExceptionsTab 
          exceptions={localInvoice?.exceptions || []}
          onResolveException={handleResolveException}
          invoice={localInvoice}
        />
      );
    case "rtp-data":
      return <RTPDataTab />;
    case "portal-records":
      return (
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-muted-foreground">No portal records found.</p>
        </div>
      );
    case "activity":
      return <ActivityTab />;
    default:
      return null;
  }
}
