import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Smartphone, Mail, Shield, Send, Check, Copy, AlertCircle } from "lucide-react";
import { toast } from '@/hooks/use-toast';

interface TwoFactorMethodDetailsProps {
  method: string;
  editFormData: {
    twoFAMethod?: string;
    phoneNumber?: string;
    verificationEmail?: string;
  };
  onFormChange: (field: string, value: string) => void;
}

export function TwoFactorMethodDetails({ method, editFormData, onFormChange }: TwoFactorMethodDetailsProps) {
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendVerification = () => {
    setIsCodeSent(true);
    toast({
      title: "Verification code sent",
      description: method === "sms" ? "Check your phone for the code" : "Check your email for the code"
    });
  };

  const handleVerifyCode = () => {
    if (verificationCode.length === 6) {
      toast({
        title: "Verification successful",
        description: `${method === "sms" ? "Phone" : "Email"} verified successfully`
      });
    }
  };

  const copyBackupCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied to clipboard",
      description: "Backup code copied"
    });
  };

  if (method === "authenticator") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-600" />
            Authenticator App Setup
          </CardTitle>
          <CardDescription>
            Configure your authenticator app to generate verification codes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: QR Code */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">1</div>
              <Label className="text-sm font-medium">Scan QR Code</Label>
            </div>
            <p className="text-sm text-gray-600 pl-8">
              Open your authenticator app (Google Authenticator, Authy, etc.) and scan this QR code
            </p>
            
            <div className="pl-8">
              <div className="flex justify-center p-6 bg-white border-2 border-dashed border-gray-200 rounded-lg">
                <div className="w-32 h-32 bg-gray-50 flex items-center justify-center border rounded-lg">
                  <QrCode className="h-16 w-16 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Backup Codes */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">2</div>
              <Label className="text-sm font-medium">Save Backup Codes</Label>
            </div>
            <p className="text-sm text-gray-600 pl-8">
              Store these backup codes in a safe place. You can use them to access your account if you lose your authenticator device.
            </p>
            
            <div className="pl-8">
              <div className="bg-gray-50 border rounded-lg p-4 space-y-2">
                {['1234-5678-9012', '3456-7890-1234', '5678-9012-3456'].map((code, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                    <code className="text-sm font-mono text-gray-800">{code}</code>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => copyBackupCode(code)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Step 3: Verify */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">3</div>
              <Label className="text-sm font-medium">Verify Setup</Label>
            </div>
            <p className="text-sm text-gray-600 pl-8">
              Enter the 6-digit code from your authenticator app to confirm setup
            </p>
            
            <div className="pl-8 space-y-3">
              <Input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength={6}
                className="font-mono text-center max-w-48"
              />
              
              {verificationCode.length === 6 && (
                <Button 
                  onClick={handleVerifyCode}
                  className="w-full max-w-48"
                  size="sm"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Verify & Complete Setup
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (method === "sms") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-green-600" />
            SMS Verification Setup
          </CardTitle>
          <CardDescription>
            Configure phone number for SMS verification codes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Phone Number Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Enter Phone Number</Label>
            </div>
            <div className="space-y-2">
              <Input
                type="tel"
                value={editFormData.phoneNumber || ""}
                onChange={(e) => onFormChange('phoneNumber', e.target.value)}
                placeholder="+1 (555) 123-4567"
                className="font-mono max-w-64"
              />
              <p className="text-xs text-gray-500">
                Include country code (e.g., +1 for US)
              </p>
            </div>
          </div>
          
          {/* Test Verification */}
          {editFormData.phoneNumber && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Test Verification</Label>
              </div>
              <div className="space-y-3">
                {!isCodeSent ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-3">
                      Send a test code to verify your phone number
                    </p>
                    <Button 
                      onClick={handleSendVerification}
                      variant="outline"
                      size="sm"
                      className="w-full max-w-48"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Test Code
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 p-3 bg-green-50 border border-green-200 rounded-lg max-w-80">
                      <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-green-800">
                        <div className="font-medium">Code sent!</div>
                        <div className="mt-1">Check your phone for the verification code</div>
                      </div>
                    </div>
                    
                    <Input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter SMS code"
                      maxLength={6}
                      className="font-mono text-center max-w-48"
                    />
                    
                    {verificationCode.length === 6 && (
                      <Button 
                        onClick={handleVerifyCode}
                        className="w-full max-w-48"
                        size="sm"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Verify Phone Number
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (method === "email") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Mail className="h-4 w-4 text-orange-600" />
            Email Verification Setup
          </CardTitle>
          <CardDescription>
            Configure email address for receiving verification codes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Label className="text-sm font-medium">Enter Email Address</Label>
            </div>
            <div className="space-y-2">
              <Input
                type="email"
                value={editFormData.verificationEmail || ""}
                onChange={(e) => onFormChange('verificationEmail', e.target.value)}
                placeholder="user@example.com"
                className="max-w-80"
              />
              <p className="text-xs text-gray-500">
                This email will receive verification codes for 2FA
              </p>
            </div>
          </div>
          
          {/* Test Verification */}
          {editFormData.verificationEmail && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-medium">Test Verification</Label>
              </div>
              <div className="space-y-3">
                {!isCodeSent ? (
                  <div>
                    <p className="text-sm text-gray-600 mb-3">
                      Send a test code to verify your email address
                    </p>
                    <Button 
                      onClick={handleSendVerification}
                      variant="outline"
                      size="sm"
                      className="w-full max-w-48"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Test Code
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg max-w-80">
                      <Check className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-orange-800">
                        <div className="font-medium">Code sent!</div>
                        <div className="mt-1">Check your email inbox for the verification code</div>
                      </div>
                    </div>
                    
                    <Input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter email code"
                      maxLength={6}
                      className="font-mono text-center max-w-48"
                    />
                    
                    {verificationCode.length === 6 && (
                      <Button 
                        onClick={handleVerifyCode}
                        className="w-full max-w-48"
                        size="sm"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Verify Email Address
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return null;
}
