
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Copy, ChevronDown, Check } from 'lucide-react';
import { getPortalLogoUrl, cn } from "@/lib/utils";
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
  isViewOnly?: boolean;
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
  onFormChange,
  isViewOnly = false
}: PortalIdentitySectionProps) {
  const [open, setOpen] = useState(false);
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
          {/* Portal name is always disabled in edit mode */}
          {false ? (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between pl-10 h-10 text-sm"
                >
                  {currentPortal}
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput 
                    placeholder="Search portals..." 
                    className="h-9"
                  />
                  <CommandList>
                    <CommandEmpty>No portal found.</CommandEmpty>
                    <CommandGroup>
                      {availablePortals.map((portal) => (
                        <CommandItem
                          key={portal}
                          value={portal}
                          onSelect={() => {
                            onFormChange?.('portal', portal);
                            setOpen(false);
                          }}
                        >
                          <div className="flex items-center gap-2 w-full">
                            <img 
                              src={getPortalLogoUrl(portal)} 
                              alt={`${portal} logo`} 
                              className="w-4 h-4 object-contain" 
                              width={16} 
                              height={16} 
                              onError={(e) => { 
                                e.currentTarget.onerror = null; 
                                e.currentTarget.src = '/portal-logos/placeholder.svg'; 
                              }} 
                            />
                            <span className="flex-1">{portal}</span>
                            <Check
                              className={cn(
                                "h-4 w-4",
                                currentPortal === portal ? "opacity-100" : "opacity-0"
                              )}
                            />
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
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
            readOnly={!isEditMode || isViewOnly}
            onChange={(e) => isEditMode && !isViewOnly && onFormChange?.('username', e.target.value)}
            className={`${isEditMode && !isViewOnly ? 'bg-white' : 'bg-gray-50'} font-mono h-10 text-sm`} 
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
