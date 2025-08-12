
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
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
  onDeletePortalUser?: (userId: string) => void;
}

export function PortalUser({ isOpen, onClose, portalUser, onEditPortalUser, onDeletePortalUser }: PortalUserProps) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    portalUrl?: string;
  }>({});
  
  const isMontoUser = portalUser.userType === "Monto" || portalUser.userType === "Monto User";
  const isViewOnly = isMontoUser;
  const [editFormData, setEditFormData] = useState({
    portal: portalUser.portal,
    username: portalUser.username,
    password: "SecurePassword123!",
    confirmPassword: "SecurePassword123!",
    portalUrl: `https://${portalUser.portal.toLowerCase().replace(/\s+/g, '')}.com`,
    twoFAEnabled: portalUser.status !== "Disconnected",
    twoFAMethod: portalUser.twoFAMethod || "authenticator",
    phoneNumber: portalUser.phoneNumber || "",
    verificationEmail: portalUser.verificationEmail || "",
  });
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: `${text} copied!`, duration: 3000 });
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
      confirmPassword: "SecurePassword123!",
      portalUrl: `https://${portalUser.portal.toLowerCase().replace(/\s+/g, '')}.com`,
      twoFAEnabled: portalUser.status !== "Disconnected",
      twoFAMethod: portalUser.twoFAMethod || "authenticator",
      phoneNumber: portalUser.phoneNumber || "",
      verificationEmail: portalUser.verificationEmail || "",
    });
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Validate Portal URL
    if (!editFormData.portalUrl || !editFormData.portalUrl.startsWith('http')) {
      newErrors.portalUrl = 'Portal URL must be a valid URL starting with http:// or https://';
    }

    // Validate Password (only if not hidden)
    if (!(portalUser.userType === "Monto" || portalUser.userType === "Monto User")) {
      if (!editFormData.password || editFormData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters long';
      }

      // Validate password confirmation
      if (editFormData.password !== editFormData.confirmPassword) {
        newErrors.confirmPassword = 'Password and confirm password do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast({ 
        title: "Validation Error", 
        description: "Please fix the errors in the form.",
        variant: "destructive",
        duration: 5000
      });
      return;
    }

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
    setErrors({});
    onClose(); // Close modal and return to table
    toast({ 
      title: "Portal User Updated", 
      description: "Changes have been saved and validation has started.",
      duration: 5000
    });
  };

  const handleFormChange = (field: string, value: string | boolean) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (onDeletePortalUser) {
      onDeletePortalUser(portalUser.id);
      setShowDeleteConfirm(false);
      onClose();
      toast({ 
        title: "Portal User Deleted", 
        description: "The portal user has been removed from your system.",
        duration: 5000
      });
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
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
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] p-6 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span>Portal Agent Details</span>
              <StatusBadge status={portalUser.status} />
              <AgentUserTypeBadge type={(portalUser.userType === "Monto" || portalUser.userType === "Monto User") ? "Monto" : "External"} />
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
            isViewOnly={isViewOnly}
          />

          <CredentialsSection
            mockCredentials={mockCredentials}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            copyToClipboard={copyToClipboard}
            isEditMode={isEditMode}
            editFormData={editFormData}
            onFormChange={handleFormChange}
            hidePassword={(portalUser.userType === "Monto" || portalUser.userType === "Monto User")}
            errors={errors}
            isViewOnly={isViewOnly}
          />

          <TwoFactorSection
            mockCredentials={mockCredentials}
            isEditMode={isEditMode}
            editFormData={editFormData}
            onFormChange={handleFormChange}
            portalUserId={portalUser.id}
            isViewOnly={isViewOnly}
          />

        </div>

        {!isViewOnly && (
          <div className="flex justify-between pt-4 border-t">
            <div>
              {isEditMode && onDeletePortalUser && (
                <Button variant="destructive" onClick={handleDelete}>
                  Delete User
                </Button>
              )}
            </div>
            <div className="flex gap-2">
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
                  <Button onClick={handleEdit}>
                    Edit Portal Agent
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>

    {/* Delete Confirmation Modal */}
    <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Delete Portal User
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-gray-600 mb-4">
            Are you sure you want to delete this user?
          </p>
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              If you decide to delete this user, this may affect all the portal users connected to Smart Connections and this action is unrevertable.
            </AlertDescription>
          </Alert>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={handleCancelDelete}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleConfirmDelete}>
            Delete User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}
