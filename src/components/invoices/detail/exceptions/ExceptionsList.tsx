
import { AlertCircle } from "lucide-react";
import { Exception } from "@/types/exception";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

  return (
    <>
      <Card>
        <CardHeader className="bg-red-50 border-b">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <CardTitle className="text-lg font-medium text-red-700">
                Exception Detected
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div>
            <h3 className="font-medium mb-2">Exception Message:</h3>
            <div className="text-sm bg-gray-50 p-4 rounded-md border">
              <p>The following errors need to be resolved to meet the buyer's and portal's requirements:</p>
              <ul className="list-disc ml-5 mt-2 space-y-1">
                {exceptions.map(exception => (
                  <li key={exception.id}>{exception.message}</li>
                ))}
              </ul>
              
              <div className="mt-4 pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-700">
                  <strong>Resolution Steps:</strong> Upload a new PDF with a new PO number or contact the customer to resolve the issue.
                </p>
                
                <div className="mt-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsContactModalOpen(true)}
                  >
                    Contact customer
                  </Button>
                </div>
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
