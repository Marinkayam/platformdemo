
import React, { useState } from "react";
import { View2FAModal } from "../View2FAModal";
import { ConfirmRemoveModal } from "../ConfirmRemoveModal";
import { TwoFactorMethodDetails } from "./TwoFactorMethodDetails";
import { TwoFactorStatusField } from "./two-factor/TwoFactorStatusField";
import { TwoFactorMethodSelector } from "./two-factor/TwoFactorMethodSelector";
import { TwoFactorWarning } from "./two-factor/TwoFactorWarning";

interface TwoFactorSectionProps {
  mockCredentials: {
    twoFAEnabled: boolean;
  };
  isEditMode?: boolean;
  editFormData?: {
    portal: string;
    username: string;
    password: string;
    portalUrl: string;
    twoFAEnabled: boolean;
    twoFAMethod?: string;
    phoneNumber?: string;
    verificationEmail?: string;
  };
  onFormChange?: (field: string, value: string | boolean) => void;
  portalUserId?: string;
}

export function TwoFactorSection({ 
  mockCredentials, 
  isEditMode = false,
  editFormData,
  onFormChange,
  portalUserId = "default-id"
}: TwoFactorSectionProps) {
  const [isView2FAModalOpen, setIsView2FAModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const currentTwoFAEnabled = isEditMode ? editFormData?.twoFAEnabled ?? mockCredentials.twoFAEnabled : mockCredentials.twoFAEnabled;
  const currentTwoFAMethod = isEditMode ? editFormData?.twoFAMethod ?? 'authenticator' : 'authenticator';

  const handleToggle2FA = (enabled: boolean) => {
    if (isEditMode) {
      if (!enabled && currentTwoFAEnabled) {
        setIsConfirmModalOpen(true);
      } else {
        onFormChange?.('twoFAEnabled', enabled);
      }
    }
  };

  const handleConfirmDisable = () => {
    onFormChange?.('twoFAEnabled', false);
    setIsConfirmModalOpen(false);
  };

  const handleMethodChange = (method: string) => {
    if (isEditMode) {
      onFormChange?.('twoFAMethod', method);
    }
  };

  const handleView2FACode = () => {
    setIsView2FAModalOpen(true);
  };

  const getMethodDisplayName = (method: string) => {
    switch (method) {
      case 'authenticator':
        return 'Authenticator App';
      case 'sms':
        return 'SMS Verification';
      case 'email':
        return 'Email Verification';
      default:
        return 'Authenticator App';
    }
  };

  return (
    <>
      <div className="space-y-4">
        <TwoFactorStatusField
          currentTwoFAEnabled={currentTwoFAEnabled}
          currentTwoFAMethod={currentTwoFAMethod}
          isEditMode={isEditMode}
          onToggle2FA={handleToggle2FA}
          onView2FACode={handleView2FACode}
          getMethodDisplayName={getMethodDisplayName}
        />

        {/* Method Selection - Only in Edit Mode when 2FA is Enabled */}
        {isEditMode && currentTwoFAEnabled && (
          <TwoFactorMethodSelector
            currentTwoFAMethod={currentTwoFAMethod}
            onMethodChange={handleMethodChange}
          />
        )}

        {/* Warning for Disabled 2FA */}
        {!currentTwoFAEnabled && <TwoFactorWarning />}
      </div>

      {/* Method Details Section - Only show in edit mode when 2FA is enabled */}
      {isEditMode && currentTwoFAEnabled && editFormData && (
        <TwoFactorMethodDetails 
          method={currentTwoFAMethod}
          editFormData={{
            twoFAMethod: editFormData.twoFAMethod,
            phoneNumber: editFormData.phoneNumber,
            verificationEmail: editFormData.verificationEmail
          }}
          onFormChange={onFormChange!}
        />
      )}

      <View2FAModal 
        isOpen={isView2FAModalOpen}
        onClose={() => setIsView2FAModalOpen(false)}
        portalUserId={portalUserId}
      />

      <ConfirmRemoveModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDisable}
        itemName="Two-Factor Authentication"
      />
    </>
  );
}
