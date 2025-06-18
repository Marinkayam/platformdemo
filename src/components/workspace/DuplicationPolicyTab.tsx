
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Settings, TriangleAlert, Info } from "lucide-react";
import { showSuccessToast } from "@/lib/toast-helpers";

export function DuplicationPolicyTab() {
  const [autoReplace, setAutoReplace] = useState(true);

  const handleSavePolicy = () => {
    showSuccessToast(
      "Policy Updated", 
      "Your duplication policy has been updated. Changes apply immediately to new portal imports."
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h6 className="text-lg font-semibold text-grey-900 mb-1">Duplication Policy</h6>
        <p className="text-base text-grey-600">
          Monto may encounter duplicate invoices in your portals. Define how you'd like the system to handle them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Auto Replacement Card */}
        <Card className="shadow-none border border-grey-400 rounded-xl">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary-lighter flex items-center justify-center flex-shrink-0">
                <Settings size={20} className="text-primary-main" />
              </div>
              <div className="flex-1">
                <h6 className="text-sm font-semibold text-grey-900 mb-2">Auto Replacement</h6>
                <p className="text-sm text-grey-600 mb-3">
                  If an invoice is marked Invalid or Rejected, Monto will automatically replace it with the newest version from your portal.
                </p>
                <div className="text-xs text-grey-500 bg-grey-200 p-2 rounded">
                  Example: INV-0098 → replaced with INV-0098 (Submitted)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stop and Ask Card */}
        <Card className="shadow-none border border-grey-400 rounded-xl">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full bg-warning-main/10 flex items-center justify-center flex-shrink-0">
                <TriangleAlert size={20} className="text-warning-main" />
              </div>
              <div className="flex-1">
                <h6 className="text-sm font-semibold text-grey-900 mb-2">Stop & Ask</h6>
                <p className="text-sm text-grey-600 mb-3">
                  For all other statuses, Monto will pause and wait for your team to confirm which version is valid before replacing.
                </p>
                <div className="text-xs text-grey-500 bg-grey-200 p-2 rounded">
                  Manual validation required for: Submitted, Approved, Paid
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Toggle Section */}
      <Card className="shadow-none border border-grey-400 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <label htmlFor="auto-replace-toggle" className="text-sm font-medium text-grey-800 cursor-pointer">
                Automatically replace invalid/rejected invoices with latest version
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={16} className="text-grey-500 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>If disabled, you'll be asked to approve all replacements manually.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch 
              id="auto-replace-toggle"
              checked={autoReplace}
              onCheckedChange={setAutoReplace}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Section */}
      <div className="text-right">
        <Button size="lg" onClick={handleSavePolicy}>
          Save Policy
        </Button>
      </div>
    </div>
  );
}
