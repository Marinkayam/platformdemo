
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export function DuplicationPolicyTab() {
  const [autoReplace, setAutoReplace] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h6 className="text-lg font-semibold text-grey-900 mb-1">Duplication Handling Policy</h6>
        <p className="text-base text-grey-600">
          How should Monto deal with duplicate invoices from your portals?
        </p>
      </div>

      {/* Toggle Card */}
      <Card className="shadow-none border border-grey-400 rounded-xl">
        <CardContent className="p-8">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <label htmlFor="auto-replace-toggle" className="text-base font-medium text-grey-900 cursor-pointer">
                    Automatically replace invalid/rejected invoices
                  </label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info size={16} className="text-grey-500 cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This applies only to duplicates. All other statuses will default to "Stop and Ask."</p>
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
              
              {/* Always show status */}
              <div className="space-y-3">
                <p className="text-sm text-grey-600">
                  <span className="font-medium">{autoReplace ? 'Enabled' : 'Disabled'}:</span>{' '}
                  {autoReplace 
                    ? 'Monto will auto-replace older invoices marked Invalid or Rejected'
                    : 'Monto will always ask you to approve which version to keep'
                  }
                </p>
                {autoReplace && (
                  <div className="text-xs text-grey-500 bg-grey-200 p-3 rounded-lg">
                    <div className="font-mono mb-1">Example: INV-0098 → INV-0098 (Submitted)</div>
                    <div className="text-grey-600">
                      When a duplicate is found, the older version (Invalid/Rejected) gets automatically replaced by the newer version with an updated status.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Conditional Manual Review Section */}
      {!autoReplace && (
        <Card className="shadow-none border border-warning-main/20 bg-warning-main/5 rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="text-xl">✋</div>
              <div>
                <h6 className="text-sm font-semibold text-grey-900 mb-2">Manual Review Required</h6>
                <p className="text-sm text-grey-600 mb-2">We'll pause on any replacement.</p>
                <p className="text-sm text-grey-600">
                  You'll choose the valid version for statuses like: <span className="font-medium">Submitted, Approved, Paid</span>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
