
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PortalUser } from "@/types/portalUser";
import { StatusBadge } from "@/components/ui/status-badge";
import { AgentUserTypeBadge } from '@/components/ui/agent-user-type-badge';
import { toast } from '@/hooks/use-toast';
import { PortalIdentitySection } from './sections/PortalIdentitySection';
import { CredentialsSection } from './sections/CredentialsSection';
import { TwoFactorSection } from './sections/TwoFactorSection';
import { ConnectionDetailsSection } from './sections/ConnectionDetailsSection';

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
          <PortalIdentitySection 
            portalUser={portalUser}
            copyToClipboard={copyToClipboard}
          />

          <CredentialsSection
            mockCredentials={mockCredentials}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            copyToClipboard={copyToClipboard}
          />

          <TwoFactorSection
            mockCredentials={mockCredentials}
          />

          <ConnectionDetailsSection
            portalUser={portalUser}
            mockLinkedConnections={mockLinkedConnections}
            handleConnectionClick={handleConnectionClick}
          />

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
