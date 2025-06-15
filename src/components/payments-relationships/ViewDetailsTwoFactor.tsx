
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
      <div className="flex items-center justify-between p-2 bg-gray-50 border rounded text-sm">
        <div>
          <span className="text-[#20222A]">Status: </span>
          <span className="text-[#20222A]">{credentials.twoFA}</span>
          <div className="text-xs text-[#20222A] mt-1">Required by portal</div>
        </div>
        {credentials.twoFA === "Disabled" && (
          <Button 
            onClick={onConfigureSettings}
            size="xs"
          >
            Setup Required
          </Button>
        )}
        {credentials.twoFA === "Enabled" && (
          <div className="flex items-center gap-2">
            <span className="text-[#20222A] text-xs">via {credentials.twoFAMethod}</span>
          </div>
        )}
      </div>
      
      {credentials.twoFA === "Enabled" && (
        <div className="flex items-center gap-2 text-xs text-[#20222A]">
          <QrCode className="h-3 w-3" />
          <span>Set up during agent configuration with {credentials.twoFAMethod}</span>
        </div>
      )}
    </div>
  );
}
