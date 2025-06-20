
import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Info } from "lucide-react";

interface DedicatedMontoUserSetupProps {
  portalName: string;
  onConfirmationChange: (confirmed: boolean) => void;
}

export function DedicatedMontoUserSetup({ 
  portalName, 
  onConfirmationChange 
}: DedicatedMontoUserSetupProps) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmationChange = (checked: boolean) => {
    setIsConfirmed(checked);
    onConfirmationChange(checked);
  };

  const getPortalUrl = (portal: string) => {
    return `${portal.toLowerCase().replace(/\s+/g, '')}.com`;
  };

  return (
    <Alert className="bg-blue-50 border-blue-200">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertTitle className="text-blue-800">Setup Instructions</AlertTitle>
      <AlertDescription className="text-blue-700 space-y-3 mt-2">
        <div>
          <p className="font-medium mb-2">To set up a Dedicated Monto User:</p>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Log into your {portalName} portal</li>
            <li>Create a new user with the username: <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">monto_integration_user_001</code></li>
            <li>Assign the required permissions:</li>
            <ul className="list-disc list-inside ml-4 mt-1 space-y-0.5">
              <li>Purchase Order Read Access</li>
              <li>Invoice Management</li>
              <li>Supplier Information Access</li>
              <li>API Integration Rights</li>
            </ul>
            <li>Confirm the user creation</li>
          </ol>
        </div>
        
        <div className="flex items-center space-x-2 pt-2 border-t border-blue-200">
          <Checkbox 
            id="setup-confirmed"
            checked={isConfirmed}
            onCheckedChange={handleConfirmationChange}
          />
          <label 
            htmlFor="setup-confirmed" 
            className="text-sm font-medium cursor-pointer"
          >
            I've created this user in {portalName} with the required permissions
          </label>
        </div>
      </AlertDescription>
    </Alert>
  );
}
