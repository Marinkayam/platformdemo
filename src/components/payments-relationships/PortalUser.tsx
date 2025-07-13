
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import type { PortalUser as PortalUserType } from "@/types/portalUser";
import { StatusBadge } from "@/components/ui/status-badge";
import { AgentUserTypeBadge } from '@/components/ui/agent-user-type-badge';
import { toast } from '@/hooks/use-toast';
import { PortalIdentitySection } from './portal-users/sections/PortalIdentitySection';
import { CredentialsSection } from './portal-users/sections/CredentialsSection';
import { TwoFactorSection } from './portal-users/sections/TwoFactorSection';


interface PortalUserProps {
  isOpen: boolean;
  onClose: () => void;
  portalUser: PortalUserType;
  onEditPortalUser: (user: PortalUserType) => void;
}

export function PortalUser({ isOpen, onClose, portalUser, onEditPortalUser }: PortalUserProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editFormData, setEditFormData] = useState({
    portal: portalUser.portal,
    username: portalUser.username,
    password: "SecurePassword123!",
    portalUrl: `https://${portalUser.portal.toLowerCase().replace(/\s+/g, '')}.com`,
    twoFAEnabled: portalUser.status !== "Disconnected",
    twoFAMethod: portalUser.twoFAMethod || "authenticator",
    phoneNumber: portalUser.phoneNumber || "",
    verificationEmail: portalUser.verificationEmail || "",
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
      phoneNumber: portalUser.phoneNumber || "",
      verificationEmail: portalUser.verificationEmail || "",
    });
  };

  const handleSave = () => {
    // Update the portal user with new data and set to validating
    const updatedUser: PortalUserType = {
      ...portalUser,
      portal: editFormData.portal,
      username: editFormData.username,
      status: "Validating", // Always set to validating after save
      twoFAMethod: editFormData.twoFAMethod as 'authenticator' | 'sms' | 'email' | 'other',
      phoneNumber: editFormData.phoneNumber,
      verificationEmail: editFormData.verificationEmail,
      issue: undefined, // Clear the issue when updating
      lastUpdated: new Date().toISOString(),
    };
    
    onEditPortalUser(updatedUser);
    setIsEditMode(false);
    onClose(); // Close modal and return to table
    toast({ 
      title: "Portal User Updated", 
      description: "Changes have been saved and validation has started." 
    });
  };

  const handleFormChange = (field: string, value: string | boolean) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Get disconnection reason from the portalUser.issue field
  const getDisconnectionReason = () => {
    if (portalUser.issue) {
      return portalUser.issue;
    }
    // Default reasons based on common scenarios
    return "Authentication failed. Please verify your credentials.";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>Portal Agent Details</span>
            <StatusBadge status={portalUser.status} />
            <AgentUserTypeBadge type={portalUser.userType} />
          </DialogTitle>
        </DialogHeader>

        {/* Disconnection Alert Banner */}
        {portalUser.status === "Disconnected" && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Connection Failed:</strong> {getDisconnectionReason()} Please edit your credentials and save to retry validation.
            </AlertDescription>
          </Alert>
        )}

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
                Edit Portal Agent
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
