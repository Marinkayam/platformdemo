
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
    confirmPassword?: string;
    portalUrl: string;
    twoFAEnabled: boolean;
  };
  onFormChange?: (field: string, value: string | boolean) => void;
  hidePassword?: boolean;
  errors?: {
    password?: string;
    confirmPassword?: string;
    portalUrl?: string;
  };
  isViewOnly?: boolean;
}

export function CredentialsSection({ 
  mockCredentials, 
  showPassword, 
  setShowPassword, 
  copyToClipboard,
  isEditMode = false,
  editFormData,
  onFormChange,
  hidePassword = false,
  errors = {},
  isViewOnly = false
}: CredentialsSectionProps) {
  const currentPortalUrl = isEditMode ? editFormData?.portalUrl || mockCredentials.portalUrl : mockCredentials.portalUrl;
  const currentPassword = isEditMode ? editFormData?.password || mockCredentials.password : mockCredentials.password;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="portal-url" className="text-sm">Portal URL</Label>
        <div className="flex gap-2">
          {isEditMode && !isViewOnly ? (
            <div className="flex-1">
              <Input
                value={currentPortalUrl}
                onChange={(e) => onFormChange?.('portalUrl', e.target.value)}
                className={`h-10 font-mono text-sm ${errors.portalUrl ? 'border-red-500' : ''}`}
              />
              {errors.portalUrl && (
                <p className="text-xs text-red-500 mt-1">{errors.portalUrl}</p>
              )}
            </div>
          ) : (
            <button
              onClick={() => window.open(currentPortalUrl, '_blank')}
              className="flex-1 h-10 px-3 py-2 bg-gray-50 border border-input rounded-md text-left font-mono text-sm text-blue-600 hover:bg-gray-100 transition-colors flex items-center"
            >
              {currentPortalUrl}
            </button>
          )}
        </div>
      </div>
      
      {!hidePassword && (
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm">Password</Label>
          <div className="space-y-1">
            <div className="flex gap-2">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"}
                value={showPassword ? currentPassword : "••••••••••••"} 
                readOnly={!isEditMode}
                onChange={(e) => isEditMode && showPassword && onFormChange?.('password', e.target.value)}
                className={`${isEditMode ? 'bg-white' : 'bg-gray-50'} font-mono h-10 text-sm ${errors.password ? 'border-red-500' : ''}`} 
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
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>
        </div>
      )}
      
      {isEditMode && !hidePassword && (
        <div className="space-y-2">
          <Label htmlFor="confirm-password" className="text-sm">Confirm Password</Label>
          <div className="space-y-1">
            <div className="flex gap-2">
              <Input 
                id="confirm-password" 
                type={showPassword ? "text" : "password"}
                value={editFormData?.confirmPassword || ""}
                onChange={(e) => onFormChange?.('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                className={`bg-white font-mono h-10 text-sm ${errors.confirmPassword ? 'border-red-500' : ''}`} 
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
                className="h-10"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
