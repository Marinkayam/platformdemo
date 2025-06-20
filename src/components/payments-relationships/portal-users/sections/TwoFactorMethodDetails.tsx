
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { QrCode, Smartphone, Mail, Shield, Send, Check } from "lucide-react";
import { toast } from '@/hooks/use-toast';

interface TwoFactorMethodDetailsProps {
  method: string;
  editFormData: {
    twoFAMethod: string;
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

  if (method === "authenticator") {
    return (
      <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-blue-600" />
          <h4 className="text-sm font-medium">Authenticator App Setup</h4>
        </div>
        
        <div className="space-y-3">
          <p className="text-sm text-gray-600">
            Scan the QR code below with your authenticator app (Google Authenticator, Authy, etc.)
          </p>
          
          <div className="flex justify-center p-4 bg-white border rounded">
            <div className="w-32 h-32 bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
              <QrCode className="h-16 w-16 text-gray-400" />
            </div>
          </div>
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>Backup codes (save these in a safe place):</p>
            <div className="bg-white p-2 rounded font-mono text-xs">
              <div>1234-5678-9012</div>
              <div>3456-7890-1234</div>
              <div>5678-9012-3456</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="auth-code" className="text-sm">Enter 6-digit code from your app</Label>
            <Input
              id="auth-code"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="123456"
              maxLength={6}
              className="font-mono"
            />
          </div>
          
          {verificationCode.length === 6 && (
            <Button 
              onClick={handleVerifyCode}
              className="w-full"
              size="sm"
            >
              <Check className="h-4 w-4 mr-2" />
              Verify Code
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (method === "sms") {
    return (
      <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-green-600" />
          <h4 className="text-sm font-medium">SMS Verification Setup</h4>
        </div>
        
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="phone-number" className="text-sm">Phone Number</Label>
            <Input
              id="phone-number"
              type="tel"
              value={editFormData.phoneNumber || ""}
              onChange={(e) => onFormChange('phoneNumber', e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="font-mono"
            />
            <p className="text-xs text-gray-500">
              Include country code (e.g., +1 for US)
            </p>
          </div>
          
          {editFormData.phoneNumber && !isCodeSent && (
            <Button 
              onClick={handleSendVerification}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Test Code
            </Button>
          )}
          
          {isCodeSent && (
            <div className="space-y-2">
              <Label htmlFor="sms-code" className="text-sm">Enter SMS Code</Label>
              <Input
                id="sms-code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="123456"
                maxLength={6}
                className="font-mono"
              />
              
              {verificationCode.length === 6 && (
                <Button 
                  onClick={handleVerifyCode}
                  className="w-full"
                  size="sm"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Verify Code
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (method === "email") {
    return (
      <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-orange-600" />
          <h4 className="text-sm font-medium">Email Verification Setup</h4>
        </div>
        
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="verification-email" className="text-sm">Email Address</Label>
            <Input
              id="verification-email"
              type="email"
              value={editFormData.verificationEmail || ""}
              onChange={(e) => onFormChange('verificationEmail', e.target.value)}
              placeholder="user@example.com"
            />
            <p className="text-xs text-gray-500">
              This email will receive verification codes
            </p>
          </div>
          
          {editFormData.verificationEmail && !isCodeSent && (
            <Button 
              onClick={handleSendVerification}
              variant="outline"
              size="sm"
              className="w-full"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Test Code
            </Button>
          )}
          
          {isCodeSent && (
            <div className="space-y-2">
              <Label htmlFor="email-code" className="text-sm">Enter Email Code</Label>
              <Input
                id="email-code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="123456"
                maxLength={6}
                className="font-mono"
              />
              
              {verificationCode.length === 6 && (
                <Button 
                  onClick={handleVerifyCode}
                  className="w-full"
                  size="sm"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Verify Code
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}
