
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ExistingUserData } from "@/context/AddAgentContext";
import { TwoFactorCodeModal } from "./TwoFactorCodeModal";

interface EnhancedTwoFactorSetupProps {
  data: ExistingUserData;
  onUpdate: (data: Partial<ExistingUserData>) => void;
}

export function EnhancedTwoFactorSetup({ data, onUpdate }: EnhancedTwoFactorSetupProps) {
  const { toast } = useToast();
  const [showCodeModal, setShowCodeModal] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleCodeConfirm = (code: string) => {
    console.log("2FA Code received:", code);
    setShowCodeModal(false);
    toast({
      title: "2FA Code Confirmed",
      description: "Authentication completed successfully",
    });
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Two-Factor Authentication</h3>
          <Label className="text-base font-medium text-gray-700">
            Enable Two-Factor Authentication Redirection
          </Label>
        </div>
        
        <RadioGroup
          value={data.twoFactorMethod}
          onValueChange={(value: "redirect" | "authenticator") => 
            onUpdate({ twoFactorMethod: value })
          }
        >
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <RadioGroupItem value="redirect" id="redirect" className="mt-1" />
              <div className="space-y-4 flex-1">
                <Label htmlFor="redirect" className="text-base font-medium">
                  Redirect to Email or Phone
                </Label>
                
                {data.twoFactorMethod === "redirect" && (
                  <div className="space-y-4 pl-4 border-l-2 border-[#7B59FF]/20">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Redirect to Email:</Label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 p-3 bg-gray-50 border rounded-lg font-mono text-sm">
                          client@montopay.com
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard("client@montopay.com", "Email")}
                          className="px-3"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Redirect to Phone:</Label>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 p-3 bg-gray-50 border rounded-lg font-mono text-sm">
                          +1-222-333-4444
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard("+1-222-333-4444", "Phone")}
                          className="px-3"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <RadioGroupItem value="authenticator" id="authenticator" className="mt-1" />
              <div className="space-y-4 flex-1">
                <Label htmlFor="authenticator" className="text-base font-medium">
                  Use Authenticator App
                </Label>
                <p className="text-sm text-gray-600">
                  Use an authenticator app with the provided secret key.
                </p>
                
                {data.twoFactorMethod === "authenticator" && (
                  <div className="space-y-4 pl-4 border-l-2 border-[#7B59FF]/20">
                    <div className="space-y-2">
                      <Label htmlFor="authSecret">Secret Key</Label>
                      <Input
                        id="authSecret"
                        type="text"
                        value={data.authSecret || ""}
                        onChange={(e) => onUpdate({ authSecret: e.target.value })}
                        placeholder="Enter authenticator secret key"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCodeModal(true)}
                    >
                      Upload QR Code
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>

      <TwoFactorCodeModal
        isOpen={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        onConfirm={handleCodeConfirm}
      />
    </>
  );
}
