
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, Info, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TwoFactorModal } from "./TwoFactorModal";
import { ExistingUserData } from "@/context/AddAgentContext";

interface EnhancedCredentialFormProps {
  data: ExistingUserData;
  onUpdate: (data: Partial<ExistingUserData>) => void;
  isMontoUser?: boolean;
}

export function EnhancedCredentialForm({ data, onUpdate, isMontoUser = false }: EnhancedCredentialFormProps) {
  const { toast } = useToast();
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleCopyEmail = () => {
    const email = "client@montopay.com";
    navigator.clipboard.writeText(email);
    toast({
      title: "Copied!",
      description: "Email copied to clipboard",
    });
  };

  const handleCopyPhone = () => {
    const phone = "+1-222-333-4444";
    navigator.clipboard.writeText(phone);
    toast({
      title: "Copied!",
      description: "Phone number copied to clipboard",
    });
  };

  const handleTwoFactorConfirm = (code: string) => {
    setShowTwoFactorModal(false);
    toast({
      title: "2FA Code Received",
      description: `Code: ${code}`,
    });
  };

  return (
    <TooltipProvider>
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#38415F] font-medium">Email *</Label>
          <Input
            id="email"
            type="text"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            placeholder="Enter the username for the portal"
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="portalLink" className="text-[#38415F] font-medium">Portal Link *</Label>
          <Input
            id="portalLink"
            type="url"
            value={data.portalLink}
            onChange={(e) => onUpdate({ portalLink: e.target.value })}
            placeholder="Paste portal login link"
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-[#38415F] font-medium">Password *</Label>
          <Input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => onUpdate({ password: e.target.value })}
            placeholder="Enter the password for the portal"
            className="h-10"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-[#38415F] font-medium">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={data.confirmPassword}
            onChange={(e) => onUpdate({ confirmPassword: e.target.value })}
            placeholder="Re-enter the password"
            className="h-10"
          />
        </div>
      </div>

      <div className="border-t border-b pt-6 pb-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-[#38415F]">External Submission</h3>
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
              checked={data.externalSubmission || false}
              onCheckedChange={(checked) => onUpdate({ externalSubmission: checked })}
              disabled={isMontoUser}
            />
          </div>

          {data.externalSubmission && (
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

      <div className="border-t pt-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-[#38415F]">Two-Factor Authentication</h3>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={(checked) => setTwoFactorEnabled(checked)}
            />
          </div>

          {twoFactorEnabled && (
            <RadioGroup
              value={data.twoFactorMethod}
              onValueChange={(value: "redirect" | "authenticator") => 
                onUpdate({ twoFactorMethod: value })
              }
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="redirect" id="redirect" className="mt-1" />
                  <div className="space-y-4 flex-1">
                    <Label htmlFor="redirect" className="text-base font-medium text-[#38415F]">
                      Option 1: Redirect 2FA
                    </Label>
                    
                    {data.twoFactorMethod === "redirect" && (
                      <div className="space-y-4 ml-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-[#38415F]">Redirect to Email:</span>
                          <span className="font-mono text-sm">client@montopay.com</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCopyEmail}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-[#38415F]">Redirect to Phone:</span>
                          <span className="font-mono text-sm">+1-222-333-4444</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCopyPhone}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="outline"
                          onClick={() => setShowTwoFactorModal(true)}
                          className="text-[#7B59FF] border-[#7B59FF] hover:bg-[#7B59FF] hover:text-white"
                        >
                          Enter 2FA Code
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="authenticator" id="authenticator" className="mt-1" />
                  <div className="space-y-4 flex-1">
                    <Label htmlFor="authenticator" className="text-base font-medium text-[#38415F]">
                      Option 2: Use Authenticator App
                    </Label>
                    <p className="text-sm text-[#8C92A3]">
                      Use an authenticator app with the provided secret key.
                    </p>
                    
                    {data.twoFactorMethod === "authenticator" && (
                      <div className="space-y-4 ml-2">
                        <div className="space-y-2">
                          <Label htmlFor="authSecret" className="text-sm font-medium text-[#38415F]">
                            Secret Key
                          </Label>
                          <Input
                            id="authSecret"
                            type="text"
                            value={data.authSecret || ""}
                            onChange={(e) => onUpdate({ authSecret: e.target.value })}
                            placeholder="Enter authenticator secret key"
                            className="h-10"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-[#38415F]">
                            Upload QR Code (optional)
                          </Label>
                          <Input
                            type="file"
                            accept="image/*"
                            className="h-10"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </RadioGroup>
          )}
        </div>
      </div>

      <TwoFactorModal
        isOpen={showTwoFactorModal}
        onClose={() => setShowTwoFactorModal(false)}
        onConfirm={handleTwoFactorConfirm}
      />
    </div>
    </TooltipProvider>
  );
}
