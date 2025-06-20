
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy } from 'lucide-react';
import { getPortalLogoUrl } from "@/lib/utils";
import { PortalUser } from "@/types/portalUser";

interface PortalIdentitySectionProps {
  portalUser: PortalUser;
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

const availablePortals = [
  "SAP Ariba", "Coupa", "Oracle Procurement", "Tipalti", "Amazon Payee", 
  "Bill", "Shopify", "Walmart", "Apple"
];

export function PortalIdentitySection({ 
  portalUser, 
  copyToClipboard, 
  isEditMode = false,
  editFormData,
  onFormChange
}: PortalIdentitySectionProps) {
  const currentPortal = isEditMode ? editFormData?.portal || portalUser.portal : portalUser.portal;
  const currentUsername = isEditMode ? editFormData?.username || portalUser.username : portalUser.username;

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="portal" className="text-sm">Portal Name</Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-primary-lighter flex items-center justify-center overflow-hidden flex-shrink-0 z-10">
            <img 
              src={getPortalLogoUrl(currentPortal)} 
              alt={`${currentPortal} logo`} 
              className="w-full h-full object-contain" 
              width={16} 
              height={16} 
              onError={(e) => { 
                e.currentTarget.onerror = null; 
                e.currentTarget.src = '/portal-logos/placeholder.svg'; 
              }} 
            />
          </div>
          {isEditMode ? (
            <Select 
              value={currentPortal} 
              onValueChange={(value) => onFormChange?.('portal', value)}
            >
              <SelectTrigger className="pl-10 h-10 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {availablePortals.map((portal) => (
                  <SelectItem key={portal} value={portal}>
                    {portal}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <Input 
              id="portal" 
              value={currentPortal} 
              readOnly 
              className="bg-gray-50 pl-10 h-10 text-sm" 
            />
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm">Username</Label>
        <div className="flex gap-2">
          <Input 
            id="username" 
            value={currentUsername} 
            readOnly={!isEditMode}
            onChange={(e) => isEditMode && onFormChange?.('username', e.target.value)}
            className={`${isEditMode ? 'bg-white' : 'bg-gray-50'} font-mono h-10 text-sm`} 
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(currentUsername)}
            className="h-10"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
