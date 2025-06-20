
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, ChevronDown, Check, Info } from 'lucide-react';
import { getPortalLogoUrl, cn } from "@/lib/utils";
import { PortalUser } from "@/types/portalUser";
import { DedicatedMontoUserSetup } from "./DedicatedMontoUserSetup";

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
    userType: "Monto" | "Regular";
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
  const [open, setOpen] = useState(false);
  const [montoSetupConfirmed, setMontoSetupConfirmed] = useState(false);
  
  const currentPortal = isEditMode ? editFormData?.portal || portalUser.portal : portalUser.portal;
  const currentUsername = isEditMode ? editFormData?.username || portalUser.username : portalUser.username;
  const currentUserType = isEditMode ? editFormData?.userType || portalUser.userType : portalUser.userType;

  const handleMontoSetupConfirmation = (confirmed: boolean) => {
    setMontoSetupConfirmed(confirmed);
  };

  return (
    <TooltipProvider>
      <div className="space-y-4">
        {/* Portal Name Row */}
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
        
        {/* Username Row */}
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

        {/* User Type Row */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="userType" className="text-sm">User Type</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-gray-400" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <div className="space-y-2 text-sm">
                  <div><strong>Regular User:</strong> Use existing portal credentials. Quick setup but may affect tracking.</div>
                  <div><strong>Monto User:</strong> Dedicated user for Monto integration. Optimized for automation and unlocks advanced features.</div>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          {isEditMode ? (
            <Select 
              value={currentUserType} 
              onValueChange={(value: "Monto" | "Regular") => onFormChange?.('userType', value)}
            >
              <SelectTrigger className="h-10 text-sm">
                <SelectValue placeholder="Select user type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Regular">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>Regular User</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Use existing portal credentials. Quick setup but may affect tracking.</p>
                    </TooltipContent>
                  </Tooltip>
                </SelectItem>
                <SelectItem value="Monto">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>Monto User</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Dedicated user for Monto integration. Optimized for automation and unlocks advanced features.</p>
                    </TooltipContent>
                  </Tooltip>
                </SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Input 
              id="userType" 
              value={currentUserType === "Monto" ? "Monto User" : "Regular User"} 
              readOnly 
              className="bg-gray-50 h-10 text-sm" 
            />
          )}
        </div>

        {/* Monto User Setup Instructions - Only show when Monto is selected in edit mode */}
        {isEditMode && currentUserType === "Monto" && (
          <DedicatedMontoUserSetup 
            portalName={currentPortal}
            onConfirmationChange={handleMontoSetupConfirmation}
          />
        )}
      </div>
    </TooltipProvider>
  );
}
