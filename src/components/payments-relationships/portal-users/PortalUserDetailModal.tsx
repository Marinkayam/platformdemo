
import React, { useState } from "react";
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
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editFormData, setEditFormData] = useState({
    portal: portalUser.portal,
    username: portalUser.username,
    password: "SecurePassword123!",
    portalUrl: `https://${portalUser.portal.toLowerCase().replace(/\s+/g, '')}.com`,
    twoFAEnabled: portalUser.status !== "Disconnected",
    twoFAMethod: portalUser.twoFAMethod || "authenticator",
  });
  
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

  // Mock linked connections data with simplified names
  const mockLinkedConnections = Array.from({ length: portalUser.linkedSmartConnections }, (_, index) => ({
    id: `sc${index + 1}`,
    name: `Smart Connection ${index + 1}`,
    url: `/payments-relationships?filter=connection${index + 1}`
  }));

  const handleConnectionClick = (url: string) => {
    console.log("Navigate to:", url);
    // In a real app, this would use navigation
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Reset form data to original values
    setEditFormData({
      portal: portalUser.portal,
      username: portalUser.username,
      password: "SecurePassword123!",
      portalUrl: `https://${portalUser.portal.toLowerCase().replace(/\s+/g, '')}.com`,
      twoFAEnabled: portalUser.status !== "Disconnected",
      twoFAMethod: portalUser.twoFAMethod || "authenticator",
    });
  };

  const handleSave = () => {
    // Update the portal user with new data
    const updatedUser: PortalUser = {
      ...portalUser,
      portal: editFormData.portal,
      username: editFormData.username,
      status: editFormData.twoFAEnabled ? "Connected" : "Disconnected",
      twoFAMethod: editFormData.twoFAMethod as 'authenticator' | 'sms' | 'email' | 'other',
    };
    
    onEditPortalUser(updatedUser);
    setIsEditMode(false);
    onClose(); // Close modal and return to table
    toast({ 
      title: "Portal User Updated", 
      description: "Changes have been saved successfully." 
    });
  };

  const handleFormChange = (field: string, value: string | boolean) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>Portal User Details</span>
            <StatusBadge status={portalUser.status} />
            <AgentUserTypeBadge type={portalUser.userType} />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <PortalIdentitySection 
            portalUser={portalUser}
            copyToClipboard={copyToClipboard}
            isEditMode={isEditMode}
            editFormData={editFormData}
            onFormChange={handleFormChange}
          />

          <CredentialsSection
            mockCredentials={mockCredentials}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            copyToClipboard={copyToClipboard}
            isEditMode={isEditMode}
            editFormData={editFormData}
            onFormChange={handleFormChange}
          />

          <TwoFactorSection
            mockCredentials={mockCredentials}
            isEditMode={isEditMode}
            editFormData={editFormData}
            onFormChange={handleFormChange}
            portalUserId={portalUser.id}
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
          {isEditMode ? (
            <>
              <Button variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
              <Button onClick={handleEdit}>
                Edit Portal User
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
