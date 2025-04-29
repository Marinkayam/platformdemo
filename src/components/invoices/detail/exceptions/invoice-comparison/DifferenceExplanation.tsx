
import { AlertTriangle } from "lucide-react";

export function DifferenceExplanation() {
  return (
    <div className="bg-amber-50 p-4 rounded-md border border-amber-200 mt-6">
      <h4 className="text-lg font-medium text-amber-800 mb-2">Why these differences matter:</h4>
      
      <ul className="space-y-2">
        <li className="flex items-start gap-2 text-amber-800">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <span><strong>Different statuses</strong> can affect how the invoice is processed and may require additional verification.</span>
        </li>
        <li className="flex items-start gap-2 text-amber-800">
          <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <span><strong>Invoices with fewer exceptions</strong> generally process faster and have a lower risk of delays.</span>
        </li>
      </ul>
    </div>
  );
}
