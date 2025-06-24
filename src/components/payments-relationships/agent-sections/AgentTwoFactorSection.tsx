
import React from "react";
import { Button } from "@/components/ui/button";
import { QrCode, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AgentTwoFactorSectionProps {
  credentials: {
    twoFA: string;
    twoFAMethod: string;
  };
  isEditMode: boolean;
  editFormData?: {
    twoFAEnabled: boolean;
    twoFAMethod: string;
  };
  onFormChange?: (field: string, value: string | boolean) => void;
  onConfigureSettings?: () => void;
  agentId: string;
}

export function AgentTwoFactorSection({ 
  credentials, 
  isEditMode, 
  editFormData, 
  onFormChange, 
  onConfigureSettings, 
  agentId 
}: AgentTwoFactorSectionProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-base font-semibold text-primary">Two-Factor Authentication</h4>
      
      {credentials.twoFA === "Disabled" && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Two-factor authentication is required by this portal but is currently disabled. Please configure 2FA to ensure proper agent functionality.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Status
          </label>
          <div className="flex items-center justify-between p-2 bg-gray-50 border rounded text-sm">
            <div>
              <span className="text-gray-900">{credentials.twoFA}</span>
              <div className="text-xs text-gray-600 mt-1">Required by portal</div>
            </div>
            {credentials.twoFA === "Disabled" && (
              <Button 
                onClick={onConfigureSettings}
                size="sm"
                variant="destructive"
              >
                Setup Required
              </Button>
            )}
            {credentials.twoFA === "Enabled" && (
              <div className="flex items-center gap-2">
                <span className="text-gray-600 text-xs">via {credentials.twoFAMethod}</span>
              </div>
            )}
          </div>
        </div>
        
        {credentials.twoFA === "Enabled" && (
          <div className="flex items-center gap-2 text-xs text-gray-600 p-2 bg-blue-50 border border-blue-200 rounded">
            <QrCode className="h-3 w-3" />
            <span>Set up during agent configuration with {credentials.twoFAMethod}</span>
          </div>
        )}
      </div>
    </div>
  );
}
