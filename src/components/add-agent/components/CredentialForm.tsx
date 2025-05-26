
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EnhancedTwoFactorSetup } from "./EnhancedTwoFactorSetup";
import { ExistingUserData } from "@/context/AddAgentContext";

interface CredentialFormProps {
  data: ExistingUserData;
  onUpdate: (data: Partial<ExistingUserData>) => void;
}

export function CredentialForm({ data, onUpdate }: CredentialFormProps) {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Username *</Label>
          <Input
            id="email"
            type="text"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            placeholder="Enter the username for the portal"
            className="h-12"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="portalLink">Portal Link *</Label>
          <Input
            id="portalLink"
            type="url"
            value={data.portalLink}
            onChange={(e) => onUpdate({ portalLink: e.target.value })}
            placeholder="Paste portal login link"
            className="h-12"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => onUpdate({ password: e.target.value })}
            placeholder="Enter the password for the portal"
            className="h-12"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={data.confirmPassword}
            onChange={(e) => onUpdate({ confirmPassword: e.target.value })}
            placeholder="Enter the password again"
            className="h-12"
          />
        </div>
      </div>
      
      <div className="border-t pt-8">
        <EnhancedTwoFactorSetup data={data} onUpdate={onUpdate} />
      </div>
    </div>
  );
}
