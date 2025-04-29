
import React from "react";

export function InfoPanel() {
  return (
    <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
      <h4 className="text-sm font-medium text-blue-700 mb-1">What happens next?</h4>
      <ul className="space-y-2 text-sm text-blue-800 list-disc pl-5 mt-2">
        <li>This invoice will be kept as the valid record</li>
        <li>Other invoices with the same number will be excluded</li>
        <li>The system will run validations on the selected invoice</li>
        <li>You'll need to address any other exceptions</li>
      </ul>
    </div>
  );
}
