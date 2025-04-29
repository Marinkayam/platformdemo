
import { AlertTriangle } from "lucide-react";

export function ComparisonHeader() {
  return (
    <div className="bg-primary-50 p-4 rounded-md border border-primary-200 mb-6">
      <div className="flex items-start gap-2">
        <AlertTriangle className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
        <div>
          <h4 className="text-sm font-medium text-primary-700">Compare invoice differences</h4>
          <p className="text-sm text-primary-800 mt-1">
            We've highlighted fields that differ between these invoices. Critical differences are marked with an indicator. 
            Select the invoice you want to keep.
          </p>
        </div>
      </div>
    </div>
  );
}
