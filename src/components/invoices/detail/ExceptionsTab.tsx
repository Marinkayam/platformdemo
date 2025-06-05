
import { Exception } from "@/types/exception";
import { Invoice } from "@/types/invoice";
import { showSuccessToast } from "@/lib/toast-helpers";
import { useNavigate } from "react-router-dom";
import { ExceptionHandler } from "./exceptions/ExceptionHandler";
import { FileUploadExceptionHandler } from "./exceptions/FileUploadExceptionHandler";

interface ExceptionsTabProps {
  exceptions: Exception[];
  onResolveException: (exceptionId: string, resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT' | 'EXCLUDED') => void;
  invoice?: Invoice;
}

export function ExceptionsTab({ exceptions, onResolveException, invoice }: ExceptionsTabProps) {
  const navigate = useNavigate();
  
  // Handle resolution from the wizard or new duplicate component
  const handleWizardResolve = (resolutionData: any) => {
    console.log('Resolution data:', resolutionData);
    
    let resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT' | 'EXCLUDED' = 'MARK_RESOLVED';
    
    switch(resolutionData.action || resolutionData) {
      case 'upload':
        resolution = 'UPLOAD_NEW_PDF';
        showSuccessToast(
          "File uploaded successfully",
          "Your new RTP has been uploaded and exceptions resolved"
        );
        break;
      case 'resolve_manual':
        resolution = 'MARK_RESOLVED';
        showSuccessToast(
          "Exception resolved",
          "Missing data has been filled and exception resolved"
        );
        break;
      case 'force_submit':
      case 'FORCE_SUBMIT':
        resolution = 'FORCE_SUBMIT';
        showSuccessToast(
          "Invoice force submitted",
          "Invoice has been submitted despite exceptions"
        );
        break;
      case 'exclude':
      case 'EXCLUDED':
        resolution = 'EXCLUDED';
        showSuccessToast(
          "Invoice excluded",
          "Invoice has been excluded from submission"
        );
        break;
      case 'REPLACE':
        resolution = 'MARK_RESOLVED';
        showSuccessToast(
          "Invoice replaced",
          "The new invoice version has been selected and duplicates removed"
        );
        // For demo: navigate back to pending invoices after resolution
        setTimeout(() => {
          navigate("/invoices?status=pending");
        }, 1500);
        break;
      case 'KEEP_CURRENT':
        resolution = 'MARK_RESOLVED';
        showSuccessToast(
          "Duplicate resolved",
          "Current invoice kept active, duplicate invoice removed from table"
        );
        // For demo: navigate back to pending invoices after resolution
        setTimeout(() => {
          navigate("/invoices?status=pending");
        }, 1500);
        break;
      case 'resolve_outside':
        resolution = 'MARK_RESOLVED';
        showSuccessToast(
          "Exception resolved",
          "Exception marked as resolved outside the system"
        );
        break;
      default:
        resolution = 'MARK_RESOLVED';
    }
    
    // Mark all exceptions as resolved
    exceptions.forEach(exception => {
      onResolveException(exception.id, resolution);
    });
  };

  if (!exceptions || exceptions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-muted-foreground">No exceptions found for this invoice.</p>
      </div>
    );
  }

  // Try to handle with specific exception handlers first
  const specificHandler = (
    <ExceptionHandler
      exceptions={exceptions}
      onResolveException={onResolveException}
      invoice={invoice}
      onWizardResolve={handleWizardResolve}
    />
  );

  if (specificHandler) {
    return <div className="space-y-6">{specificHandler}</div>;
  }

  // Fallback to file upload handler for other exception types
  return (
    <div className="space-y-6">
      <FileUploadExceptionHandler 
        exceptions={exceptions}
        onResolveException={onResolveException}
      />
    </div>
  );
}
