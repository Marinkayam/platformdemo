
import React from "react";
import { AlertCircle } from "lucide-react";

export function TwoFactorWarning() {
  return (
    <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
      <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
      <div className="text-xs text-amber-800">
        <div className="font-medium">Security Notice</div>
        <div className="mt-1">Two-factor authentication is disabled. Enable it to add an extra layer of security to this account.</div>
      </div>
    </div>
  );
}
