
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TwoFactorSectionProps {
  mockCredentials: {
    twoFAEnabled: boolean;
  };
}

export function TwoFactorSection({ mockCredentials }: TwoFactorSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Two-Factor Authentication</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="2fa-status">2FA Status</Label>
          <Input 
            id="2fa-status" 
            value={mockCredentials.twoFAEnabled ? "Enabled" : "Disabled"} 
            readOnly 
            className="bg-gray-50" 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="2fa-method">2FA Method</Label>
          <Input 
            id="2fa-method" 
            value={mockCredentials.twoFAEnabled ? "Google Authenticator" : "Not configured"} 
            readOnly 
            className="bg-gray-50" 
          />
        </div>
      </div>
    </div>
  );
}
