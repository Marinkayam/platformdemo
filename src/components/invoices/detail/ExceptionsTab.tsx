import { useState } from "react";
import { Exception } from "@/types/exception";
import { Invoice } from "@/types/invoice";
import { Card, CardContent } from "@/components/ui/card";
import { useFileAttachments } from "@/hooks/useFileAttachments";
import { toast } from "@/hooks/use-toast";
import { ExceptionsList } from "./exceptions/ExceptionsList";
import { FileUploadZone } from "./exceptions/FileUploadZone";
import { UploadProgress } from "./exceptions/UploadProgress";
import { FilePreviewList } from "./exceptions/FilePreviewList";
import { ActionButtons } from "./exceptions/ActionButtons";
import { DuplicateInvoiceHandler } from "./exceptions/DuplicateInvoiceHandler";
import { DataExtractionResolver } from "./exceptions/DataExtractionResolver";
import { DuplicationException } from "./exceptions/DuplicationException";
import ExceptionResolutionWizard from "./exceptions/ExceptionResolutionWizard";
import ValidationExceptionWizard from "./exceptions/ValidationExceptionWizard";
import { invoiceData } from "@/data/invoices";
import { useNavigate } from "react-router-dom";
import { ExtraDataExceptionWizard } from "./exceptions/ExtraDataExceptionWizard";

interface ExceptionsTabProps {
  exceptions: Exception[];
  onResolveException: (exceptionId: string, resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT' | 'EXCLUDED') => void;
  invoice?: Invoice;
}

export function ExceptionsTab({ exceptions, onResolveException, invoice }: ExceptionsTabProps) {
  const { attachments, addAttachment, removeAttachment, clearAttachments } = useFileAttachments();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  
  // Check exception types
  const isDuplicateException = exceptions.some(exception => exception.type === 'DUPLICATE_INVOICE');
  const isDataExtractionException = exceptions.some(exception => exception.type === 'MISSING_INFORMATION');
  const isPOException = exceptions.some(exception => exception.type === 'PO_CLOSED' || exception.type === 'PO_INSUFFICIENT_FUNDS');
  const isValidationException = exceptions.some(exception => exception.type === 'VALIDATION_ERROR');
  const isExtraDataException = exceptions.some(exception => exception.type === 'EXTRA_DATA');
  
  // Handle resolution from the wizard or new duplicate component
  const handleWizardResolve = (resolutionData: any) => {
    console.log('Resolution data:', resolutionData);
    
    let resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT' | 'EXCLUDED' = 'MARK_RESOLVED';
    
    switch(resolutionData.action || resolutionData) {
      case 'upload':
        resolution = 'UPLOAD_NEW_PDF';
        toast({
          title: "File uploaded successfully",
          description: "Your new RTP has been uploaded and exceptions resolved"
        });
        break;
      case 'resolve_manual':
        resolution = 'MARK_RESOLVED';
        toast({
          title: "Exception resolved",
          description: "Missing data has been filled and exception resolved"
        });
        break;
      case 'force_submit':
      case 'FORCE_SUBMIT':
        resolution = 'FORCE_SUBMIT';
        toast({
          title: "Invoice force submitted",
          description: "Invoice has been submitted despite exceptions"
        });
        break;
      case 'exclude':
      case 'EXCLUDED':
        resolution = 'EXCLUDED';
        toast({
          title: "Invoice excluded",
          description: "Invoice has been excluded from submission"
        });
        break;
      case 'REPLACE':
        resolution = 'MARK_RESOLVED';
        toast({
          title: "Invoice replaced",
          description: "The new invoice version has been selected and duplicates removed"
        });
        // For demo: navigate back to pending invoices after resolution
        setTimeout(() => {
          navigate("/invoices?status=pending");
        }, 1500);
        break;
      case 'KEEP_CURRENT':
        resolution = 'MARK_RESOLVED';
        toast({
          title: "Duplicate resolved",
          description: "Current invoice kept active, duplicate invoice removed from table"
        });
        // For demo: navigate back to pending invoices after resolution
        setTimeout(() => {
          navigate("/invoices?status=pending");
        }, 1500);
        break;
      case 'resolve_outside':
        resolution = 'MARK_RESOLVED';
        toast({
          title: "Exception resolved",
          description: "Exception marked as resolved outside the system"
        });
        break;
      default:
        resolution = 'MARK_RESOLVED';
    }
    
    // Mark all exceptions as resolved
    exceptions.forEach(exception => {
      onResolveException(exception.id, resolution);
    });
  };
  
  const simulateUploadProgress = () => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const timer = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(timer);
          setIsUploading(false);
          return 100;
        }
        return newProgress;
      });
    }, 100);
  };
  
  const handleFileUpload = (file: File) => {
    clearAttachments();
    simulateUploadProgress();
    
    // Simulate network delay for upload
    setTimeout(() => {
      addAttachment(file);
      toast({
        title: "File uploaded",
        description: "Your PDF has been uploaded successfully"
      });
    }, 2000);
  };
  
  const handleDelete = (id: string) => {
    removeAttachment(id);
    toast({
      title: "File removed",
      description: "The PDF has been removed"
    });
  };
  
  const handleMarkAsResolved = () => {
    if (attachments.length === 0) {
      toast({
        title: "Upload required",
        description: "Please upload a corrected invoice PDF first",
        variant: "destructive"
      });
      return;
    }
    
    // Mark all exceptions as resolved
    exceptions.forEach(exception => {
      onResolveException(exception.id, 'UPLOAD_NEW_PDF');
    });
    
    toast({
      title: "Exceptions resolved",
      description: "The invoice exceptions have been marked as resolved"
    });
  };
  
  const handleForceSubmit = () => {
    // Force submit despite exceptions
    exceptions.forEach(exception => {
      onResolveException(exception.id, 'FORCE_SUBMIT');
    });
  };

  if (!exceptions || exceptions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-muted-foreground">No exceptions found for this invoice.</p>
      </div>
    );
  }

  // Use the new streamlined duplicate resolution component
  if (isDuplicateException && invoice) {
    // Find the duplicate invoice
    const duplicateInvoice = invoiceData.find(inv => 
      inv.number === invoice.number && 
      inv.id !== invoice.id && 
      inv.isDuplicate
    );

    if (duplicateInvoice) {
      return (
        <div className="space-y-6">
          <DuplicationException
            currentInvoice={invoice}
            duplicateInvoice={duplicateInvoice}
            onResolve={handleWizardResolve}
          />
        </div>
      );
    }
  }

  // Use the extra data wizard for EXTRA_DATA exceptions
  if (isExtraDataException) {
    return (
      <div className="space-y-6">
        <ExtraDataExceptionWizard 
          onResolve={handleWizardResolve}
        />
      </div>
    );
  }

  // Use the validation wizard for VALIDATION_ERROR exceptions (INV-40230612)
  if (isValidationException) {
    const wizardExceptions = exceptions.map(exception => ({
      id: exception.id,
      title: exception.message,
      description: exception.details,
      severity: 'error' as const,
      color: '#DF1C41'
    }));

    return (
      <div className="space-y-6">
        <ValidationExceptionWizard 
          exceptions={wizardExceptions}
          onResolve={handleWizardResolve}
        />
      </div>
    );
  }

  // Use the PO wizard for PO exceptions
  if (isPOException) {
    const wizardExceptions = exceptions.map(exception => ({
      id: exception.id,
      title: exception.message,
      description: exception.details,
      severity: exception.type === 'PO_CLOSED' ? 'warning' as const : 'error' as const,
      color: exception.type === 'PO_CLOSED' ? '#F2AE40' : '#DF1C41'
    }));

    return (
      <div className="space-y-6">
        <ExceptionResolutionWizard 
          exceptions={wizardExceptions}
          onResolve={handleWizardResolve}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {isDuplicateException && invoice ? (
        <DuplicateInvoiceHandler
          invoice={invoice}
          exceptions={exceptions}
          onResolveException={onResolveException}
        />
      ) : isDataExtractionException && invoice ? (
        <DataExtractionResolver 
          exceptions={exceptions}
          invoice={invoice}
          onResolveException={onResolveException}
        />
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <FileUploadZone onFileUpload={handleFileUpload} />
              
              <UploadProgress 
                uploadProgress={uploadProgress} 
                isUploading={isUploading} 
              />
              
              <FilePreviewList 
                attachments={attachments} 
                onDelete={handleDelete} 
              />
              
              <ActionButtons 
                attachmentsCount={attachments.length}
                onForceSubmit={handleForceSubmit}
                onMarkAsResolved={handleMarkAsResolved}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
