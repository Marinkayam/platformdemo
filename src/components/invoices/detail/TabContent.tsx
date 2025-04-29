
import { useState } from "react";
import { Activity } from "lucide-react";
import { ActivityTab } from "./ActivityTab";
import { RTPDataTab } from "./RTPDataTab";
import { ExceptionsTab } from "./ExceptionsTab";
import { Invoice } from "@/types/invoice";
import { toast } from "@/hooks/use-toast";

interface TabContentProps {
  tab: string;
  invoice?: Invoice;
}

export function TabContent({ tab, invoice }: TabContentProps) {
  const [localInvoice, setLocalInvoice] = useState<Invoice | undefined>(invoice);
  
  const handleResolveException = (exceptionId: string, resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT') => {
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
    
    // Dispatch custom event for tab change (if needed in the future)
    if (allResolved && resolution === 'UPLOAD_NEW_PDF') {
      setTimeout(() => {
        const event = new CustomEvent('switchTab', { 
          detail: { tab: 'activity' } 
        });
        window.dispatchEvent(event);
        
        toast({
          title: "Exception resolved",
          description: "User uploaded corrected invoice with new PO"
        });
      }, 1000);
    }
  };

  switch (tab) {
    case "exceptions":
      return (
        <ExceptionsTab 
          exceptions={localInvoice?.exceptions || []}
          onResolveException={handleResolveException}
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
