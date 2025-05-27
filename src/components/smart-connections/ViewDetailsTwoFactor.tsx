
import React from "react";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";

interface ViewDetailsTwoFactorProps {
  credentials: {
    twoFA: string;
    twoFAMethod: string;
  };
  onConfigureSettings: () => void;
}

export function ViewDetailsTwoFactor({ credentials, onConfigureSettings }: ViewDetailsTwoFactorProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-base font-semibold text-primary">🔐 Two-Factor Authentication</h4>
      <div className="max-w-md space-y-2">
        <div className="flex items-center justify-between p-2 bg-gray-50 border rounded text-sm">
          <div>
            <span className="text-gray-500">Status: </span>
            <span className="text-gray-500">{credentials.twoFA}</span>
            <div className="text-xs text-gray-500 mt-1">Required by portal</div>
          </div>
          {credentials.twoFA === "Disabled" && (
            <Button 
              onClick={onConfigureSettings}
              className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1"
              size="sm"
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
        
        {credentials.twoFA === "Enabled" && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <QrCode className="h-3 w-3" />
            <span>Set up during agent configuration with {credentials.twoFAMethod}</span>
          </div>
        )}
      </div>
    </div>
  );
}
