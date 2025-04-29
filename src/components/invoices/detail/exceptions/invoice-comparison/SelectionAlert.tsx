
import { AlertCircle } from "lucide-react";

interface SelectionAlertProps {
  count: number;
}

export function SelectionAlert({ count }: SelectionAlertProps) {
  return (
    <div className="bg-primary-50 p-4 rounded-md mb-6 border border-primary-100">
      <div className="flex items-center gap-3">
        <span className="p-1 bg-primary-100 rounded-full">
          <AlertCircle className="h-5 w-5 text-primary" />
        </span>
        <div>
          <h4 className="font-medium text-primary-700">Ready to Compare</h4>
          <p className="text-sm text-primary-600">
            You've selected {count} {count === 1 ? 'invoice' : 'invoices'}. 
            Compare their details to select which one to keep.
          </p>
        </div>
      </div>
    </div>
  );
}
