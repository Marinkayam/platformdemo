
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
}

export function TwoFactorStatusField({
  currentTwoFAEnabled,
  currentTwoFAMethod,
  isEditMode,
  onToggle2FA,
  onView2FACode,
  getMethodDisplayName
}: TwoFactorStatusFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="2fa-status" className="text-sm font-medium">
        Two-Factor Authentication
      </Label>
      <div className="flex items-center gap-2">
        <Input
          id="2fa-status"
          type="text"
          readOnly
          value={currentTwoFAEnabled ? `Verification Method: ${getMethodDisplayName(currentTwoFAMethod)}` : 'Disabled'}
          className={`flex-1 ${currentTwoFAEnabled ? 'text-gray-900' : 'text-gray-500'}`}
        />
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
        {isEditMode && (
          <Switch 
            id="2fa-toggle"
            checked={currentTwoFAEnabled}
            onCheckedChange={onToggle2FA}
          />
        )}
      </div>
    </div>
  );
}
