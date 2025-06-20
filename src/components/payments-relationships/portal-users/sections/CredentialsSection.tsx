
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy, Eye, EyeOff, ExternalLink } from 'lucide-react';

interface CredentialsSectionProps {
  mockCredentials: {
    password: string;
    portalUrl: string;
  };
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  copyToClipboard: (text: string) => void;
}

export function CredentialsSection({ 
  mockCredentials, 
  showPassword, 
  setShowPassword, 
  copyToClipboard 
}: CredentialsSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Credentials</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="portal-url">Portal URL</Label>
          <div className="flex gap-2">
            <button
              onClick={() => window.open(mockCredentials.portalUrl, '_blank')}
              className="flex-1 h-10 px-3 py-2 bg-gray-50 border border-input rounded-md text-left font-mono text-sm text-blue-600 hover:bg-gray-100 transition-colors flex items-center"
            >
              {mockCredentials.portalUrl}
            </button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(mockCredentials.portalUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(mockCredentials.portalUrl)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="flex gap-2">
            <Input 
              id="password" 
              type={showPassword ? "text" : "password"}
              value={showPassword ? mockCredentials.password : "••••••••••••"} 
              readOnly 
              className="bg-gray-50 font-mono" 
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(mockCredentials.password)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
