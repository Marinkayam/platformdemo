
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
import { DedicatedMontoUserSetup } from './sections/DedicatedMontoUserSetup';
import { DisconnectedUserAlert } from './sections/DisconnectedUserAlert';

interface PortalUserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  portalUser: PortalUser;
  onEditPortalUser: (user: PortalUser) => void;
}

export function PortalUserDetailModal({ isOpen, onClose, portalUser, onEditPortalUser }: PortalUserDetailModalProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [setupConfirmed, setSetupConfirmed] = useState(false);
  const [editFormData, setEditFormData] = useState({
    portal: portalUser.portal,
    username: portalUser.username,
    password: "SecurePassword123!",
    portalUrl: `https://${portalUser.portal.toLowerCase().replace(/\s+/g, '')}.com`,
    twoFAEnabled: portalUser.status !== "Disconnected",
    twoFAMethod: portalUser.twoFAMethod || "authenticator",
    phoneNumber: portalUser.phoneNumber || "",
    verificationEmail: portalUser.verificationEmail || "",
    userType: portalUser.userType,
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
    setSetupConfirmed(false);
    // Reset form data to original values
    setEditFormData({
      portal: portalUser.portal,
      username: portalUser.username,
      password: "SecurePassword123!",
      portalUrl: `https://${portalUser.portal.toLowerCase().replace(/\s+/g, '')}.com`,
      twoFAEnabled: portalUser.status !== "Disconnected",
      twoFAMethod: portalUser.twoFAMethod || "authenticator",
      phoneNumber: portalUser.phoneNumber || "",
      verificationEmail: portalUser.verificationEmail || "",
      userType: portalUser.userType,
    });
  };

  const handleSave = () => {
    // Business rule: Monto users cannot be disconnected
    let finalStatus = portalUser.status;
    if (editFormData.userType === "Monto" && portalUser.status === "Disconnected") {
      finalStatus = "Connected";
      toast({ 
        title: "Status Updated", 
        description: "Dedicated Monto Users cannot be disconnected. Status set to Connected." 
      });
    }

    // For Dedicated Monto Users, require setup confirmation
    if (editFormData.userType === "Monto" && portalUser.userType !== "Monto" && !setupConfirmed) {
      toast({ 
        title: "Setup Required", 
        description: "Please confirm you have completed the setup instructions for Dedicated Monto User.",
        variant: "destructive"
      });
      return;
    }
    
    // Update the portal user with new data
    const updatedUser: PortalUser = {
      ...portalUser,
      portal: editFormData.portal,
      username: editFormData.username,
      status: finalStatus,
      userType: editFormData.userType,
      twoFAMethod: editFormData.twoFAMethod as 'authenticator' | 'sms' | 'email' | 'other',
      phoneNumber: editFormData.phoneNumber,
      verificationEmail: editFormData.verificationEmail,
    };
    
    onEditPortalUser(updatedUser);
    setIsEditMode(false);
    setSetupConfirmed(false);
    onClose();
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

  const showDisconnectedAlert = portalUser.status === "Disconnected" && portalUser.userType === "Regular";
  const showSetupInstructions = isEditMode && editFormData.userType === "Monto" && portalUser.userType !== "Monto";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Portal User Details</span>
            <div className="flex items-center gap-2">
              <StatusBadge status={portalUser.status} />
              <AgentUserTypeBadge type={portalUser.userType} />
            </div>
          </DialogTitle>
        </DialogHeader>

        {showDisconnectedAlert && <DisconnectedUserAlert />}

        <div className="space-y-6 py-4">
          <PortalIdentitySection 
            portalUser={portalUser}
            copyToClipboard={copyToClipboard}
            isEditMode={isEditMode}
            editFormData={editFormData}
            onFormChange={handleFormChange}
          />

          {showSetupInstructions && (
            <DedicatedMontoUserSetup 
              portalName={editFormData.portal}
              onConfirmationChange={setSetupConfirmed}
            />
          )}

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
