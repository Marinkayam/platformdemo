
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Shield, Smartphone, Mail } from "lucide-react";
import { View2FAModal } from "../View2FAModal";
import { ConfirmRemoveModal } from "../ConfirmRemoveModal";
import { TwoFactorMethodDetails } from "./TwoFactorMethodDetails";

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
        // Show confirmation modal when disabling 2FA
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
        return 'Google Authenticator';
      case 'sms':
        return 'SMS';
      case 'email':
        return 'Email';
      default:
        return 'Google Authenticator';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'authenticator':
        return <Shield className="h-4 w-4" />;
      case 'sms':
        return <Smartphone className="h-4 w-4" />;
      case 'email':
        return <Mail className="h-4 w-4" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 border rounded-md">
          <div className="space-y-1">
            <div className="text-sm font-medium">Two-Factor Authentication</div>
            <div className="text-xs text-gray-600">
              Status: <span className={currentTwoFAEnabled ? "text-green-600" : "text-red-600"}>
                {currentTwoFAEnabled ? "Enabled" : "Disabled"}
              </span>
            </div>
            {currentTwoFAEnabled && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                {getMethodIcon(currentTwoFAMethod)}
                <span>Method: {getMethodDisplayName(currentTwoFAMethod)}</span>
              </div>
            )}
          </div>
          <div className="flex gap-2 items-center">
            {isEditMode ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Label htmlFor="2fa-toggle" className="text-xs">Enable 2FA</Label>
                  <Switch 
                    id="2fa-toggle"
                    checked={currentTwoFAEnabled}
                    onCheckedChange={handleToggle2FA}
                  />
                </div>
                {currentTwoFAEnabled && (
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Method</Label>
                    <Select value={currentTwoFAMethod} onValueChange={handleMethodChange}>
                      <SelectTrigger className="w-[160px] h-8">
                        <div className="flex items-center gap-2">
                          {getMethodIcon(currentTwoFAMethod)}
                          <SelectValue />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="authenticator">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            <span>Authenticator</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="sms">
                          <div className="flex items-center gap-2">
                            <Smartphone className="h-4 w-4" />
                            <span>SMS</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="email">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>Email</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            ) : (
              <>
                {currentTwoFAEnabled && (
                  <Button 
                    onClick={handleView2FACode}
                    variant="outline"
                    size="sm"
                    className="h-8"
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    View Code
                  </Button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Method Details Section - Only show in edit mode when 2FA is enabled */}
        {isEditMode && currentTwoFAEnabled && editFormData && (
          <TwoFactorMethodDetails 
            method={currentTwoFAMethod}
            editFormData={editFormData}
            onFormChange={onFormChange!}
          />
        )}
      </div>

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
