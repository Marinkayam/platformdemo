
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

  // Determine alert header based on exception types
  const hasDuplicateException = exceptions.some(e => e.type === 'DUPLICATE_INVOICE');
  const headerTitle = hasDuplicateException ? "Duplicate Invoice Detected" : "Exception Detected";
  const headerColor = hasDuplicateException ? "bg-amber-50" : "bg-red-50";
  const textColor = hasDuplicateException ? "text-amber-700" : "text-red-700";
  const iconColor = hasDuplicateException ? "text-amber-600" : "text-red-600";

  return (
    <>
      <Card>
        <CardHeader className={`${headerColor} border-b`}>
          <div className="flex items-start gap-3">
            <AlertCircle className={`h-5 w-5 ${iconColor} mt-0.5`} />
            <div>
              <CardTitle className={`text-lg font-medium ${textColor}`}>
                {headerTitle}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div>
            <div className="text-sm bg-gray-50 p-4 rounded-md border">
              <p>The following errors need to be resolved:</p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                {exceptions.map(exception => (
                  <li key={exception.id}>{exception.message}</li>
                ))}
              </ul>
              
              <div className="mt-4 pt-3 border-t border-gray-200">
                {hasDuplicateException ? (
                  <p className="text-sm text-gray-700">
                    <strong>Resolution Steps:</strong> Select the correct invoice from the duplicates and mark the others as invalid.
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
