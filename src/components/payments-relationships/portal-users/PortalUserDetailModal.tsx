
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PortalUser } from "@/types/portalUser";
import { formatDistanceToNow, format } from 'date-fns';
import { StatusBadge } from "@/components/ui/status-badge";
import { AgentUserTypeBadge } from '@/components/ui/agent-user-type-badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Copy, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { getPortalLogoUrl } from "@/lib/utils";

interface PortalUserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  portalUser: PortalUser;
  onEditPortalUser: (user: PortalUser) => void;
}

export function PortalUserDetailModal({ isOpen, onClose, portalUser, onEditPortalUser }: PortalUserDetailModalProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: `${text} copied!` });
  };

  const lastUpdatedDate = new Date(portalUser.lastUpdated);
  const relativeTime = formatDistanceToNow(lastUpdatedDate, { addSuffix: true });

  // Mock credentials data
  const mockCredentials = {
    username: portalUser.username,
    password: "••••••••••••",
    portalUrl: `https://${portalUser.portal.toLowerCase().replace(/\s+/g, '')}.com`,
    twoFAEnabled: portalUser.status !== "Disconnected",
    twoFAMethod: portalUser.twoFAMethod || "authenticator"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="mb-2">Portal User Details</DialogTitle>
          <DialogDescription className="mt-0">View and manage portal user connection details.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Portal Identity Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Portal Identity</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="portal">Portal Name</Label>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-lighter flex items-center justify-center overflow-hidden flex-shrink-0">
                    <img 
                      src={getPortalLogoUrl(portalUser.portal)} 
                      alt={`${portalUser.portal} logo`} 
                      className="w-full h-full object-contain" 
                      width={32} 
                      height={32} 
                      onError={(e) => { 
                        e.currentTarget.onerror = null; 
                        e.currentTarget.src = '/portal-logos/placeholder.svg'; 
                      }} 
                    />
                  </div>
                  <Input id="portal" value={portalUser.portal} readOnly className="bg-gray-50" />
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex items-center h-10 px-3 border rounded-md bg-gray-50">
                  <StatusBadge status={portalUser.status} />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>User Type</Label>
                <div className="flex items-center h-10 px-3 border rounded-md bg-gray-50">
                  <AgentUserTypeBadge type={portalUser.userType} />
                </div>
              </div>
            </div>
          </div>

          {/* Credentials Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Credentials</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="portal-url">Portal URL</Label>
                <div className="flex gap-2">
                  <Input 
                    id="portal-url" 
                    value={mockCredentials.portalUrl} 
                    readOnly 
                    className="bg-gray-50 font-mono text-sm" 
                  />
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
                    value={showPassword ? "SecurePassword123!" : mockCredentials.password} 
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
                </div>
              </div>
            </div>
          </div>

          {/* Two-Factor Authentication Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Two-Factor Authentication</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="2fa-status">2FA Status</Label>
                <Input 
                  id="2fa-status" 
                  value={mockCredentials.twoFAEnabled ? "Enabled" : "Disabled"} 
                  readOnly 
                  className="bg-gray-50" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="2fa-method">2FA Method</Label>
                <Input 
                  id="2fa-method" 
                  value={mockCredentials.twoFAEnabled ? "Google Authenticator" : "Not configured"} 
                  readOnly 
                  className="bg-gray-50" 
                />
              </div>
            </div>
          </div>

          {/* Connection Details Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b pb-2">Connection Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linked-connections">Linked Smart Connections</Label>
                <Input 
                  id="linked-connections" 
                  value={`${portalUser.linkedSmartConnections} Connection${portalUser.linkedSmartConnections !== 1 ? 's' : ''}`} 
                  readOnly 
                  className="bg-gray-50" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="last-updated">Last Updated</Label>
                <Input 
                  id="last-updated" 
                  value={`${format(lastUpdatedDate, 'MMM dd, yyyy HH:mm')} (${relativeTime})`} 
                  readOnly 
                  className="bg-gray-50 text-sm" 
                />
              </div>
            </div>
          </div>

          {portalUser.status === "Disconnected" && portalUser.issue && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md text-sm">
              <p className="font-medium">Connection Issue</p>
              <p className="text-xs mt-1">This user is currently disconnected. Update credentials to restore sync.</p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          {!portalUser.isReadOnly && (
            <Button onClick={() => onEditPortalUser(portalUser)}>
              Edit Portal User
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
