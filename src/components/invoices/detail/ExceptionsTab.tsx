
import { Invoice } from "@/types/invoice";
import { DuplicateInvoiceHandler } from "./exceptions/DuplicateInvoiceHandler";
import { ExceptionResolutionWizard } from "./exceptions/ExceptionResolutionWizard";
import { ExtraDataExceptionWizard } from "./exceptions/ExtraDataExceptionWizard";
import { ValidationExceptionWizard } from "./exceptions/ValidationExceptionWizard";

interface ExceptionsTabProps {
  invoice: Invoice;
}

export function ExceptionsTab({ invoice }: ExceptionsTabProps) {
  const exceptions = invoice.exceptions || [];
  
  // Check for duplicate exceptions first
  const duplicateExceptions = exceptions.filter(e => e.type === 'DUPLICATE_INVOICE');
  
  if (duplicateExceptions.length > 0) {
    console.log("Rendering DuplicateInvoiceHandler for invoice:", invoice.id, "with exceptions:", duplicateExceptions);
    
    const handleResolveException = (exceptionId: string, resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT' | 'EXCLUDED') => {
      console.log(`Resolving exception ${exceptionId} with resolution: ${resolution}`);
      // In a real app, this would update the backend
    };

    return (
      <DuplicateInvoiceHandler
        invoice={invoice}
        exceptions={duplicateExceptions}
        onResolveException={handleResolveException}
      />
    );
  }

  // Handle other exception types
  if (exceptions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No exceptions found for this invoice.</p>
      </div>
    );
  }

  // Check for validation errors
  const validationExceptions = exceptions.filter(e => e.type === 'VALIDATION_ERROR');
  if (validationExceptions.length > 0) {
    return (
      <ValidationExceptionWizard
        invoice={invoice}
        exceptions={validationExceptions}
        onResolveException={(exceptionId, resolution) => {
          console.log(`Resolving validation exception ${exceptionId} with resolution: ${resolution}`);
        }}
      />
    );
  }

  // Check for PO-related exceptions
  const poExceptions = exceptions.filter(e => e.type === 'PO_CLOSED' || e.type === 'PO_INSUFFICIENT_FUNDS');
  if (poExceptions.length > 0) {
    return (
      <ExtraDataExceptionWizard
        invoice={invoice}
        exceptions={poExceptions}
        onResolveException={(exceptionId, resolution) => {
          console.log(`Resolving PO exception ${exceptionId} with resolution: ${resolution}`);
        }}
      />
    );
  }

  // Default exception handler
  return (
    <ExceptionResolutionWizard
      invoice={invoice}
      exceptions={exceptions}
      onResolveException={(exceptionId, resolution) => {
        console.log(`Resolving exception ${exceptionId} with resolution: ${resolution}`);
      }}
    />
  );
}
