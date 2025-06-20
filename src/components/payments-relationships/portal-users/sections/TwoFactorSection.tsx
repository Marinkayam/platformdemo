
import React from "react";

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
  // Return null to remove the entire Two-Factor Authentication section
  return null;
}
