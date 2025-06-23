
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, FileText } from "lucide-react";

interface ConflictAlertsProps {
  hasConflict: boolean;
  selectedInvoice: any;
}

export function ConflictAlerts({ hasConflict, selectedInvoice }: ConflictAlertsProps) {
  return (
    <>
      {/* Conflict Warning */}
      {hasConflict && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <span className="font-medium">Conflict Detected:</span> This invoice is already linked to another portal record. 
            Matching will create a conflict that needs to be resolved.
          </AlertDescription>
        </Alert>
      )}

      {/* Primary Match Info */}
      {selectedInvoice && !hasConflict && (
        <Alert className="border-green-200 bg-green-50">
          <FileText className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <span className="font-medium">Primary Match:</span> This portal record will become the primary match for the selected invoice.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
