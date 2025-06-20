
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface TwoFactorSectionProps {
  mockCredentials: {
    twoFAEnabled: boolean;
  };
  isEditMode?: boolean;
  editFormData?: {
    portal: string;
    username: string;
    password: string;
    portalUrl: string;
    twoFAEnabled: boolean;
  };
  onFormChange?: (field: string, value: string | boolean) => void;
}

export function TwoFactorSection({ 
  mockCredentials, 
  isEditMode = false,
  editFormData,
  onFormChange
}: TwoFactorSectionProps) {
  const currentTwoFAEnabled = isEditMode ? editFormData?.twoFAEnabled ?? mockCredentials.twoFAEnabled : mockCredentials.twoFAEnabled;

  const handleSetup2FA = () => {
    console.log("Setup 2FA clicked");
    if (isEditMode) {
      onFormChange?.('twoFAEnabled', true);
    }
  };

  const handleDisable2FA = () => {
    console.log("Disable 2FA clicked");
    if (isEditMode) {
      onFormChange?.('twoFAEnabled', false);
    }
  };

  const handleToggle2FA = (enabled: boolean) => {
    if (isEditMode) {
      onFormChange?.('twoFAEnabled', enabled);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 bg-gray-50 border rounded-md">
        <div className="space-y-1">
          <div className="text-sm font-medium">Two-Factor Authentication</div>
          <div className="text-xs text-gray-600">
            Status: <span className={currentTwoFAEnabled ? "text-green-600" : "text-red-600"}>
              {currentTwoFAEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
          {currentTwoFAEnabled && (
            <div className="text-xs text-gray-500">Method: Google Authenticator</div>
          )}
        </div>
        <div className="flex gap-2 items-center">
          {isEditMode ? (
            <div className="flex items-center gap-2">
              <Label htmlFor="2fa-toggle" className="text-xs">Enable 2FA</Label>
              <Switch 
                id="2fa-toggle"
                checked={currentTwoFAEnabled}
                onCheckedChange={handleToggle2FA}
              />
            </div>
          ) : (
            <>
              {!currentTwoFAEnabled ? (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
