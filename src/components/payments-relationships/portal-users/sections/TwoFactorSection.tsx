
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Shield, Smartphone, Mail, AlertCircle } from "lucide-react";
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

  const getMethodDescription = (method: string) => {
    switch (method) {
      case 'authenticator':
        return 'Use an authenticator app like Google Authenticator or Authy';
      case 'sms':
        return 'Receive verification codes via text message';
      case 'email':
        return 'Receive verification codes via email';
      default:
        return 'Use an authenticator app like Google Authenticator or Authy';
    }
  };

  const methodOptions = [
    { value: 'authenticator', label: 'Authenticator App', icon: Shield, description: 'Most secure option using apps like Google Authenticator' },
    { value: 'sms', label: 'SMS Verification', icon: Smartphone, description: 'Receive codes via text message to your phone' },
    { value: 'email', label: 'Email Verification', icon: Mail, description: 'Receive codes via email to your inbox' }
  ];

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-600" />
            Two-Factor Authentication
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Status and Toggle Section */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
            <div className="space-y-1">
              <div className="text-sm font-medium">Current Status</div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${currentTwoFAEnabled ? 'bg-green-500' : 'bg-red-500'}`} />
              </div>
              {currentTwoFAEnabled && (
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  {getMethodIcon(currentTwoFAMethod)}
                  <span>{getMethodDisplayName(currentTwoFAMethod)}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {isEditMode ? (
                <div className="flex items-center gap-2">
                  <Label htmlFor="2fa-toggle" className="text-sm font-medium">
                    {currentTwoFAEnabled ? 'Disable' : 'Enable'} 2FA
                  </Label>
                  <Switch 
                    id="2fa-toggle"
                    checked={currentTwoFAEnabled}
                    onCheckedChange={handleToggle2FA}
                  />
                </div>
              ) : (
                <>
                  {currentTwoFAEnabled && (
                    <Button 
                      onClick={handleView2FACode}
                      variant="outline"
                      size="sm"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Code
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Method Selection - Only in Edit Mode when 2FA is Enabled */}
          {isEditMode && currentTwoFAEnabled && (
            <div className="space-y-3">
              <div>
                <Label className="text-sm font-medium">Choose Verification Method</Label>
                <p className="text-xs text-gray-500 mt-1">Select how you want to receive verification codes</p>
              </div>
              
              <div className="grid gap-3">
                {methodOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isSelected = currentTwoFAMethod === option.value;
                  
                  return (
                    <div
                      key={option.value}
                      className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        isSelected 
                          ? 'border-primary bg-primary/5' 
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                      onClick={() => handleMethodChange(option.value)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-md ${isSelected ? 'bg-primary/10' : 'bg-gray-100'}`}>
                          <IconComponent className={`h-4 w-4 ${isSelected ? 'text-primary' : 'text-gray-600'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${isSelected ? 'text-primary' : 'text-gray-900'}`}>
                              {option.label}
                            </span>
                          </div>
                          <p className={`text-xs mt-1 ${isSelected ? 'text-primary/70' : 'text-gray-500'}`}>
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Warning for Disabled 2FA */}
          {!currentTwoFAEnabled && (
            <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-amber-800">
                <div className="font-medium">Security Notice</div>
                <div className="mt-1">Two-factor authentication is disabled. Enable it to add an extra layer of security to this account.</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
