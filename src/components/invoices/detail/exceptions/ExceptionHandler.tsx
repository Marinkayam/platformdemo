
import { Exception } from "@/types/exception";
import { Invoice } from "@/types/invoice";
import { DuplicateInvoiceHandler } from "./DuplicateInvoiceHandler";
import { DataExtractionResolver } from "./DataExtractionResolver";
import { POLineItemsExceptionHandler } from "./POLineItemsExceptionHandler";
import ExceptionResolutionWizard from "./ExceptionResolutionWizard";
import ValidationExceptionWizard from "./ValidationExceptionWizard";
import { ExtraDataExceptionWizard } from "./ExtraDataExceptionWizard";

interface ExceptionHandlerProps {
  exceptions: Exception[];
  onResolveException: (exceptionId: string, resolution: 'UPLOAD_NEW_PDF' | 'MARK_RESOLVED' | 'FORCE_SUBMIT' | 'EXCLUDED') => void;
  invoice?: Invoice;
  onWizardResolve: (resolutionData: any) => void;
}

export function ExceptionHandler({ 
  exceptions, 
  onResolveException, 
  invoice, 
  onWizardResolve 
}: ExceptionHandlerProps) {
  // Check exception types
  const isDuplicateException = exceptions.some(exception => exception.type === 'DUPLICATE_INVOICE');
  const isDataExtractionException = exceptions.some(exception => exception.type === 'MISSING_INFORMATION');
  const isPOLineItemsException = exceptions.some(exception => 
    exception.type === 'MISSING_INFORMATION' && exception.missingFields?.includes('poLineItems')
  );
  const isPOException = exceptions.some(exception => exception.type === 'PO_CLOSED' || exception.type === 'PO_INSUFFICIENT_FUNDS');
  const isValidationException = exceptions.some(exception => exception.type === 'VALIDATION_ERROR');
  const isExtraDataException = exceptions.some(exception => exception.type === 'EXTRA_DATA');

  // Use the new DuplicateInvoiceHandler for ALL duplicate exceptions
  if (isDuplicateException && invoice) {
    return (
      <DuplicateInvoiceHandler
        invoice={invoice}
        exceptions={exceptions}
        onResolveException={onResolveException}
      />
    );
  }

  // Use the extra data wizard for EXTRA_DATA exceptions
  if (isExtraDataException) {
    return (
      <ExtraDataExceptionWizard 
        onResolve={onWizardResolve}
      />
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
      <ValidationExceptionWizard 
        exceptions={wizardExceptions}
        onResolve={onWizardResolve}
      />
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
      <ExceptionResolutionWizard 
        exceptions={wizardExceptions}
        onResolve={onWizardResolve}
      />
    );
  }

  // Use POLineItemsExceptionHandler for PO line items exceptions
  if (isPOLineItemsException && invoice) {
    return (
      <POLineItemsExceptionHandler 
        exceptions={exceptions}
        invoice={invoice}
        onResolveException={onResolveException}
      />
    );
  }

  // Use DataExtractionResolver for other MISSING_INFORMATION exceptions
  if (isDataExtractionException && invoice) {
    return (
      <DataExtractionResolver 
        exceptions={exceptions}
        invoice={invoice}
        onResolveException={onResolveException}
      />
    );
  }

  return null;
}
