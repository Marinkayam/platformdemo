
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy } from 'lucide-react';
import { getPortalLogoUrl } from "@/lib/utils";
import { PortalUser } from "@/types/portalUser";

interface PortalIdentitySectionProps {
  portalUser: PortalUser;
  copyToClipboard: (text: string) => void;
}

export function PortalIdentitySection({ portalUser, copyToClipboard }: PortalIdentitySectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Portal Identity</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="portal">Portal Name</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-primary-lighter flex items-center justify-center overflow-hidden flex-shrink-0">
              <img 
                src={getPortalLogoUrl(portalUser.portal)} 
                alt={`${portalUser.portal} logo`} 
                className="w-full h-full object-contain" 
                width={16} 
                height={16} 
                onError={(e) => { 
                  e.currentTarget.onerror = null; 
                  e.currentTarget.src = '/portal-logos/placeholder.svg'; 
                }} 
              />
            </div>
            <Input 
              id="portal" 
              value={portalUser.portal} 
              readOnly 
              className="bg-gray-50 pl-10" 
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <div className="flex gap-2">
            <Input id="username" value={portalUser.username} readOnly className="bg-gray-50 font-mono" />
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(portalUser.username)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
