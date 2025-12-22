
import React from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";

interface TwoFactorStatusFieldProps {
  currentTwoFAEnabled: boolean;
  currentTwoFAMethod: string;
  isEditMode: boolean;
  onToggle2FA: (enabled: boolean) => void;
  onView2FACode: () => void;
  getMethodDisplayName: (method: string) => string;
  isViewOnly?: boolean;
}

export function TwoFactorStatusField({
  currentTwoFAEnabled,
  currentTwoFAMethod,
  isEditMode,
  onToggle2FA,
  onView2FACode,
  getMethodDisplayName,
  isViewOnly = false
}: TwoFactorStatusFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="2fa-status" className="text-sm font-medium">
        Two-Factor Authentication
      </Label>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            id="2fa-status"
            type="text"
            readOnly
            value={currentTwoFAEnabled ? `Verification Method: ${getMethodDisplayName(currentTwoFAMethod)}` : 'Disabled'}
            className={`w-full pr-14 ${currentTwoFAEnabled ? 'text-gray-900' : 'text-gray-500'}`}
          />
          {isEditMode && !isViewOnly && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
              <Switch
                id="2fa-toggle"
                checked={currentTwoFAEnabled}
                onCheckedChange={(checked) => {
                  onToggle2FA(checked);
                }}
              />
            </div>
          )}
        </div>
        {!isEditMode && currentTwoFAEnabled && (
          <Button
            onClick={onView2FACode}
            variant="outline"
            size="sm"
            className="px-3"
          >
            <Eye className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
