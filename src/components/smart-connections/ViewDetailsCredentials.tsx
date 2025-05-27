
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink, Eye, EyeOff } from "lucide-react";

interface ViewDetailsCredentialsProps {
  credentials: {
    username: string;
    password: string;
    portalLink: string;
  };
}

export function ViewDetailsCredentials({ credentials }: ViewDetailsCredentialsProps) {
  const [showPassword, setShowPassword] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-4">
      <h4 className="text-base font-semibold text-primary">Credentials</h4>
      
      <div className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Portal Link
          </label>
          <div className="flex items-center gap-2">
            <div className="flex-1 p-2 bg-gray-50 border rounded text-sm text-blue-600">
              {credentials.portalLink}
            </div>
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
            <div className="flex-1 p-2 bg-gray-50 border rounded text-sm">
              {credentials.username}
            </div>
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
            <div className="flex-1 p-2 bg-gray-50 border rounded text-sm font-mono">
              {showPassword ? "demo_password_123" : credentials.password}
            </div>
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
