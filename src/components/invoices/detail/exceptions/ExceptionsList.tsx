
import { AlertCircle } from "lucide-react";
import { Exception } from "@/types/exception";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { ContactCustomerModal } from "./ContactCustomerModal";
import { Invoice } from "@/types/invoice";

interface ExceptionsListProps {
  exceptions: Exception[];
  invoice?: Invoice;
}

export function ExceptionsList({ exceptions, invoice }: ExceptionsListProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  if (!exceptions || exceptions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-muted-foreground">No exceptions found for this invoice.</p>
      </div>
    );
  }

  // We'll hide this component for the DataExtractionResolver as requested
  const hasDataExtractionException = exceptions.some(e => e.type === 'MISSING_INFORMATION');
  if (hasDataExtractionException) {
    return null;
  }

  // Determine alert header based on exception types
  const hasDuplicateException = exceptions.some(e => e.type === 'DUPLICATE_INVOICE');
  
  // Update styles based on exception type
  const headerColor = hasDuplicateException ? "bg-red-50/70" : "bg-red-50/70";
  const textColor = hasDuplicateException ? "text-red-800" : "text-red-800";
  const iconColor = hasDuplicateException ? "text-red-600" : "text-red-600";
  const borderColor = hasDuplicateException ? "border-red-200" : "border-red-200";
  
  // Get the appropriate title based on exception type
  const getExceptionTitle = () => {
    if (hasDuplicateException) {
      return "Duplication Exception - Monto detected multiple invoices with the same number";
    }
    return "Exception Detected";
  };
  
  // Get the icon based on exception type
  const ExceptionIcon = AlertCircle;

  return (
    <>
      <Card className={`border ${borderColor} shadow-sm`}>
        <CardHeader className={`${headerColor} border-b ${borderColor} px-6 py-4`}>
          <div className="flex items-start gap-3">
            <ExceptionIcon className={`h-5 w-5 ${iconColor} mt-0.5`} />
            <div>
              <CardTitle className={`text-lg font-medium ${textColor}`}>
                {getExceptionTitle()}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div>
            <div className={`text-sm rounded-md border p-4 ${headerColor} ${borderColor}`}>
              <p className="text-gray-800">
                {hasDuplicateException ? 
                  "We've detected multiple invoices with the same invoice number." :
                  "The following errors need to be resolved:"}
              </p>
              {!hasDuplicateException && (
                <ul className="list-disc ml-5 mt-2 space-y-1">
                  {exceptions.map(exception => (
                    <li key={exception.id} className="text-red-800">
                      {exception.message}
                    </li>
                  ))}
                </ul>
              )}
              
              <div className="mt-4 pt-3 border-t border-gray-200">
                {hasDuplicateException ? (
                  <p className="text-sm text-gray-700">
                    <strong>Resolution Steps:</strong> Review and select which invoice is valid. The others will be marked as excluded and won't be tracked.
                  </p>
                ) : (
                  <p className="text-sm text-gray-700">
                    <strong>Resolution Steps:</strong> Upload a new PDF with a new PO number or contact the customer to resolve the issue.
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {invoice && (
        <ContactCustomerModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          invoice={invoice}
          exceptions={exceptions}
        />
      )}
    </>
  );
}
