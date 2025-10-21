
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, ExternalLink, Eye, EyeOff, Info, HelpCircle } from "lucide-react";

interface AgentCredentialsSectionProps {
  credentials: {
    username: string;
    password: string;
    portalLink: string;
    externalSubmission?: boolean;
  };
  isEditMode: boolean;
  editFormData?: {
    username: string;
    password: string;
    portalLink: string;
    externalSubmission?: boolean;
  };
  onFormChange?: (field: string, value: string | boolean) => void;
  copyToClipboard: (text: string) => void;
  agentType?: "Monto" | "External";
}

export function AgentCredentialsSection({
  credentials,
  isEditMode,
  editFormData,
  onFormChange,
  copyToClipboard,
  agentType
}: AgentCredentialsSectionProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TooltipProvider>
    <div className="space-y-6">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Portal Link
          </label>
          <div className="flex items-center gap-3">
            {isEditMode ? (
              <input
                type="text"
                value={editFormData?.portalLink || credentials.portalLink}
                onChange={(e) => onFormChange?.('portalLink', e.target.value)}
                className="flex-1 h-10 px-3 bg-white border rounded-md text-sm text-blue-600"
              />
            ) : (
              <input
                type="text"
                value={credentials.portalLink}
                readOnly
                className="flex-1 h-10 px-3 bg-gray-50 border rounded-md text-sm text-blue-600"
              />
            )}
            <Button variant="outline" className="h-10 w-10 p-0" onClick={() => window.open(credentials.portalLink, '_blank')}>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Username
          </label>
          <div className="flex items-center gap-3">
            {isEditMode ? (
              <input
                type="text"
                value={editFormData?.username || credentials.username}
                onChange={(e) => onFormChange?.('username', e.target.value)}
                className="flex-1 h-10 px-3 bg-white border rounded-md text-sm"
              />
            ) : (
              <input
                type="text"
                value={credentials.username}
                readOnly
                className="flex-1 h-10 px-3 bg-gray-50 border rounded-md text-sm"
              />
            )}
            <Button variant="outline" className="h-10 w-10 p-0" onClick={() => copyToClipboard(credentials.username)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Password
          </label>
          <div className="flex items-center gap-3">
            {isEditMode ? (
              <input
                type={showPassword ? "text" : "password"}
                value={editFormData?.password || "demo_password_123"}
                onChange={(e) => onFormChange?.('password', e.target.value)}
                className="flex-1 h-10 px-3 bg-white border rounded-md text-sm font-mono"
              />
            ) : (
              <input
                type={showPassword ? "text" : "password"}
                value={showPassword ? "demo_password_123" : credentials.password}
                readOnly
                className="flex-1 h-10 px-3 bg-gray-50 border rounded-md text-sm font-mono"
              />
            )}
            <Button variant="outline" className="h-10 w-10 p-0" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button variant="outline" className="h-10 w-10 p-0" onClick={() => copyToClipboard("demo_password_123")}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="border-t border-b pt-6 pb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <label className="block text-sm font-medium text-muted-foreground">
                External Submission
              </label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="h-4 w-4 text-[#8C92A3] cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>Enable this if invoices sent through this agent should be marked as "External Submission" and picked up during portal scans instead of direct delivery.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Switch
              checked={editFormData?.externalSubmission || credentials.externalSubmission || false}
              onCheckedChange={(checked) => onFormChange?.('externalSubmission', checked)}
              disabled={!isEditMode || agentType === "Monto"}
            />
          </div>

          {(editFormData?.externalSubmission || credentials.externalSubmission) && (
            <Alert className="border-[#7B59FF] bg-[#F8F6FF]">
              <Info className="h-4 w-4 text-[#7B59FF]" />
              <AlertDescription className="text-[#38415F] ml-2">
                This agent is set as an <span className="font-semibold">External Submission Agent</span>.
                <br />
                That means any invoice sent to Monto through this agent will be marked as "External Submission."
                <br />
                Monto won't deliver the invoice to the portal directly — but don't worry, it'll be picked up automatically during the next portal scan.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
    </TooltipProvider>
  );
}
