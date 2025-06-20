
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PortalUser } from "@/types/portalUser";
import { StatusBadge } from "@/components/ui/status-badge";
import { AgentUserTypeBadge } from '@/components/ui/agent-user-type-badge';
import { Copy, Eye, EyeOff, ExternalLink } from 'lucide-react';
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

  // Mock credentials data
  const mockCredentials = {
    username: portalUser.username,
    password: "SecurePassword123!",
    portalUrl: `https://${portalUser.portal.toLowerCase().replace(/\s+/g, '')}.com`,
    twoFAEnabled: portalUser.status !== "Disconnected",
    twoFAMethod: portalUser.twoFAMethod || "authenticator"
  };

  // Mock linked connections data
  const mockLinkedConnections = [
    { id: "sc1", name: "Acme Corp Invoice Processing", url: "/payments-relationships?filter=acme" },
    { id: "sc2", name: "Supplier Onboarding Flow", url: "/payments-relationships?filter=supplier" },
    { id: "sc3", name: "Payment Reconciliation", url: "/payments-relationships?filter=payment" },
  ].slice(0, portalUser.linkedSmartConnections);

  const handleConnectionClick = (url: string) => {
    console.log("Navigate to:", url);
    // In a real app, this would use navigation
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Portal User Details</DialogTitle>
            <div className="flex items-center gap-2">
              <StatusBadge status={portalUser.status} />
              <AgentUserTypeBadge type={portalUser.userType} />
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Portal Identity Section */}
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

          {/* Credentials Section */}
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
            
            <div className="space-y-2">
              <Label>Linked Smart Connections</Label>
              {mockLinkedConnections.length > 0 ? (
                <div className="space-y-2">
                  {mockLinkedConnections.map((connection) => (
                    <button
                      key={connection.id}
                      onClick={() => handleConnectionClick(connection.url)}
                      className="w-full h-10 px-3 py-2 bg-gray-50 border border-input rounded-md text-left text-sm text-blue-600 hover:bg-gray-100 transition-colors flex items-center"
                    >
                      {connection.name}
                    </button>
                  ))}
                </div>
              ) : (
                <Input 
                  value="No linked connections" 
                  readOnly 
                  className="bg-gray-50 text-gray-500" 
                />
              )}
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
          <Button onClick={() => onEditPortalUser(portalUser)}>
            Edit Portal User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
