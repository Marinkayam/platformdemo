
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
  isEditMode?: boolean;
  editFormData?: {
    portal: string;
    username: string;
    password: string;
    portalUrl: string;
    twoFAEnabled: boolean;
  };
  onFormChange?: (field: string, value: string | boolean) => void;
}

export function CredentialsSection({ 
  mockCredentials, 
  showPassword, 
  setShowPassword, 
  copyToClipboard,
  isEditMode = false,
  editFormData,
  onFormChange
}: CredentialsSectionProps) {
  const currentPortalUrl = isEditMode ? editFormData?.portalUrl || mockCredentials.portalUrl : mockCredentials.portalUrl;
  const currentPassword = isEditMode ? editFormData?.password || mockCredentials.password : mockCredentials.password;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="portal-url" className="text-sm">Portal URL</Label>
        <div className="flex gap-2">
          {isEditMode ? (
            <Input
              value={currentPortalUrl}
              onChange={(e) => onFormChange?.('portalUrl', e.target.value)}
              className="flex-1 h-10 font-mono text-sm"
            />
          ) : (
            <button
              onClick={() => window.open(currentPortalUrl, '_blank')}
              className="flex-1 h-10 px-3 py-2 bg-gray-50 border border-input rounded-md text-left font-mono text-sm text-blue-600 hover:bg-gray-100 transition-colors flex items-center"
            >
              {currentPortalUrl}
            </button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(currentPortalUrl, '_blank')}
            className="h-10"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(currentPortalUrl)}
            className="h-10"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm">Password</Label>
        <div className="flex gap-2">
          <Input 
            id="password" 
            type={showPassword ? "text" : "password"}
            value={showPassword ? currentPassword : "••••••••••••"} 
            readOnly={!isEditMode}
            onChange={(e) => isEditMode && showPassword && onFormChange?.('password', e.target.value)}
            className={`${isEditMode ? 'bg-white' : 'bg-gray-50'} font-mono h-10 text-sm`} 
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
            className="h-10"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(currentPassword)}
            className="h-10"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
