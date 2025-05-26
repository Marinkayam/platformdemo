
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ExistingUserData } from "@/context/AddAgentContext";

interface TwoFactorSetupProps {
  data: ExistingUserData;
  onUpdate: (data: Partial<ExistingUserData>) => void;
}

export function TwoFactorSetup({ data, onUpdate }: TwoFactorSetupProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
        <p className="text-sm text-gray-600 mt-1">
          Configure how Monto should handle 2FA for this portal user.
        </p>
      </div>
      
      <RadioGroup
        value={data.twoFactorMethod}
        onValueChange={(value: "redirect" | "authenticator") => 
          onUpdate({ twoFactorMethod: value })
        }
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="redirect" id="redirect" className="mt-1" />
            <div className="space-y-2 flex-1">
              <Label htmlFor="redirect" className="text-base font-medium">
                Redirect 2FA
              </Label>
              <p className="text-sm text-gray-600">
                Monto will redirect 2FA codes to your specified email or phone number.
              </p>
              
              {data.twoFactorMethod === "redirect" && (
                <div className="grid md:grid-cols-2 gap-4 mt-3">
                  <div className="space-y-2">
                    <Label htmlFor="redirectEmail">Redirect Email</Label>
                    <Input
                      id="redirectEmail"
                      type="email"
                      value={data.redirectEmail || ""}
                      onChange={(e) => onUpdate({ redirectEmail: e.target.value })}
                      placeholder="admin@company.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="redirectPhone">Redirect Phone</Label>
                    <Input
                      id="redirectPhone"
                      type="tel"
                      value={data.redirectPhone || ""}
                      onChange={(e) => onUpdate({ redirectPhone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="authenticator" id="authenticator" className="mt-1" />
            <div className="space-y-2 flex-1">
              <Label htmlFor="authenticator" className="text-base font-medium">
                Authenticator App
              </Label>
              <p className="text-sm text-gray-600">
                Use an authenticator app with the provided secret key.
              </p>
              
              {data.twoFactorMethod === "authenticator" && (
                <div className="space-y-2 mt-3">
                  <Label htmlFor="authSecret">Secret Key</Label>
                  <Input
                    id="authSecret"
                    type="text"
                    value={data.authSecret || ""}
                    onChange={(e) => onUpdate({ authSecret: e.target.value })}
                    placeholder="Enter authenticator secret key"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
}
