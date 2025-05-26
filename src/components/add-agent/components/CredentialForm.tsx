
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TwoFactorSetup } from "./TwoFactorSetup";
import { ExistingUserData } from "@/context/AddAgentContext";

interface CredentialFormProps {
  data: ExistingUserData;
  onUpdate: (data: Partial<ExistingUserData>) => void;
}

export function CredentialForm({ data, onUpdate }: CredentialFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
            placeholder="user@company.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="portalLink">Portal Link</Label>
          <Input
            id="portalLink"
            type="url"
            value={data.portalLink}
            onChange={(e) => onUpdate({ portalLink: e.target.value })}
            placeholder="https://portal.example.com"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={data.password}
            onChange={(e) => onUpdate({ password: e.target.value })}
            placeholder="Enter password"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={data.confirmPassword}
            onChange={(e) => onUpdate({ confirmPassword: e.target.value })}
            placeholder="Confirm password"
          />
        </div>
      </div>
      
      <TwoFactorSetup data={data} onUpdate={onUpdate} />
    </div>
  );
}
