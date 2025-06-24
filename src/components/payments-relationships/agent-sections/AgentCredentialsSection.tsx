
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Eye, EyeOff } from "lucide-react";

interface AgentCredentialsSectionProps {
  credentials: {
    username: string;
    password: string;
    portalLink: string;
  };
  isEditMode: boolean;
  editFormData?: {
    username: string;
    password: string;
    portalLink: string;
  };
  onFormChange?: (field: string, value: string | boolean) => void;
  copyToClipboard: (text: string) => void;
}

export function AgentCredentialsSection({ 
  credentials, 
  isEditMode, 
  editFormData, 
  onFormChange, 
  copyToClipboard 
}: AgentCredentialsSectionProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-4">
      <h4 className="text-base font-semibold text-primary">Credentials</h4>
      
      <div className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Portal Link
          </label>
          <div className="flex items-center gap-2">
            {isEditMode ? (
              <input
                type="text"
                value={editFormData?.portalLink || credentials.portalLink}
                onChange={(e) => onFormChange?.('portalLink', e.target.value)}
                className="flex-1 p-2 bg-white border rounded text-sm text-blue-600"
              />
            ) : (
              <input
                type="text"
                value={credentials.portalLink}
                readOnly
                className="flex-1 p-2 bg-gray-50 border rounded text-sm text-blue-600"
              />
            )}
            <Button variant="outline" size="sm" onClick={() => window.open(credentials.portalLink, '_blank')}>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Username
          </label>
          <div className="flex items-center gap-2">
            {isEditMode ? (
              <input
                type="text"
                value={editFormData?.username || credentials.username}
                onChange={(e) => onFormChange?.('username', e.target.value)}
                className="flex-1 p-2 bg-white border rounded text-sm"
              />
            ) : (
              <input
                type="text"
                value={credentials.username}
                readOnly
                className="flex-1 p-2 bg-gray-50 border rounded text-sm"
              />
            )}
            <Button variant="outline" size="sm" onClick={() => copyToClipboard(credentials.username)}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Password
          </label>
          <div className="flex items-center gap-2">
            {isEditMode ? (
              <input
                type={showPassword ? "text" : "password"}
                value={editFormData?.password || "demo_password_123"}
                onChange={(e) => onFormChange?.('password', e.target.value)}
                className="flex-1 p-2 bg-white border rounded text-sm font-mono"
              />
            ) : (
              <input
                type={showPassword ? "text" : "password"}
                value={showPassword ? "demo_password_123" : credentials.password}
                readOnly
                className="flex-1 p-2 bg-gray-50 border rounded text-sm font-mono"
              />
            )}
            <Button variant="outline" size="sm" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm" onClick={() => copyToClipboard("demo_password_123")}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
