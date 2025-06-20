
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface TwoFactorSectionProps {
  mockCredentials: {
    twoFAEnabled: boolean;
  };
}

export function TwoFactorSection({ mockCredentials }: TwoFactorSectionProps) {
  const handleSetup2FA = () => {
    console.log("Setup 2FA clicked");
    // Logic for setting up 2FA would go here
  };

  const handleDisable2FA = () => {
    console.log("Disable 2FA clicked");
    // Logic for disabling 2FA would go here
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 bg-gray-50 border rounded-md">
        <div className="space-y-1">
          <div className="text-sm font-medium">Two-Factor Authentication</div>
          <div className="text-xs text-gray-600">
            Status: <span className={mockCredentials.twoFAEnabled ? "text-green-600" : "text-red-600"}>
              {mockCredentials.twoFAEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
          {mockCredentials.twoFAEnabled && (
            <div className="text-xs text-gray-500">Method: Google Authenticator</div>
          )}
        </div>
        <div className="flex gap-2">
          {!mockCredentials.twoFAEnabled ? (
            <Button 
              onClick={handleSetup2FA}
              size="sm"
              className="h-8"
            >
              Setup Required
            </Button>
          ) : (
            <Button 
              onClick={handleDisable2FA}
              variant="outline"
              size="sm"
              className="h-8"
            >
              Disable
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
