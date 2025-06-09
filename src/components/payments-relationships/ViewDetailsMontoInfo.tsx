
import React from "react";

export function ViewDetailsMontoInfo() {
  return (
    <div className="space-y-4">
      <h4 className="text-base font-semibold text-primary">Account Information</h4>
      <div className="max-w-md p-3 bg-blue-50 border border-blue-200 rounded-md text-sm">
        <p className="text-blue-800">
          This agent uses a dedicated Monto user account for portal access. 
          Credentials are managed independently by your organization.
        </p>
      </div>
    </div>
  );
}
