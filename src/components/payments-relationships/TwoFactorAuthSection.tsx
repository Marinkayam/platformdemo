
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { QrCode, ChevronUp } from "lucide-react";

type TwoFAMethod = "authenticator" | "email" | "phone";

interface TwoFactorAuthSectionProps {
  credentials: {
    twoFA: string;
    twoFAMethod: string;
  };
}

export function TwoFactorAuthSection({ credentials }: TwoFactorAuthSectionProps) {
  const [twoFAExpanded, setTwoFAExpanded] = useState(false);
  const [selectedTwoFAMethod, setSelectedTwoFAMethod] = useState<TwoFAMethod>("authenticator");
  const [verificationCode, setVerificationCode] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");

  const handleSetupTwoFA = () => {
    setTwoFAExpanded(!twoFAExpanded);
  };

  const renderTwoFASetup = () => {
    if (!twoFAExpanded) return null;

    return (
      <div className="mt-4 p-4 border rounded-lg bg-gray-50">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Choose verification method:</h4>
        
        {/* Method Selection */}
        <div className="space-y-2 mb-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="twoFAMethod"
              value="authenticator"
              checked={selectedTwoFAMethod === "authenticator"}
              onChange={(e) => setSelectedTwoFAMethod(e.target.value as TwoFAMethod)}
              className="text-blue-600"
            />
            <span className="text-sm">Authenticator App (Recommended)</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="twoFAMethod"
              value="email"
              checked={selectedTwoFAMethod === "email"}
              onChange={(e) => setSelectedTwoFAMethod(e.target.value as TwoFAMethod)}
              className="text-blue-600"
            />
            <span className="text-sm">Email Verification</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="twoFAMethod"
              value="phone"
              checked={selectedTwoFAMethod === "phone"}
              onChange={(e) => setSelectedTwoFAMethod(e.target.value as TwoFAMethod)}
              className="text-blue-600"
            />
            <span className="text-sm">Phone Verification</span>
          </label>
        </div>

        {/* Method-specific setup */}
        {selectedTwoFAMethod === "authenticator" && (
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              Download an authenticator app (Google Authenticator, Authy) and scan the QR code below:
            </p>
            <div className="flex justify-center p-4 bg-white border rounded">
              <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                <QrCode className="h-16 w-16 text-gray-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter 6-digit code from authenticator app:
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full p-2 border rounded text-sm"
                placeholder="123456"
                maxLength={6}
              />
            </div>
          </div>
        )}

        {selectedTwoFAMethod === "email" && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address:
              </label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full p-2 border rounded text-sm"
                placeholder="Enter email address"
              />
            </div>
            <Button variant="outline" size="sm" disabled={!emailInput}>
              Send Test Code
            </Button>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter verification code:
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full p-2 border rounded text-sm"
                placeholder="123456"
                maxLength={6}
                disabled={!emailInput}
              />
            </div>
          </div>
        )}

        {selectedTwoFAMethod === "phone" && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone number:
              </label>
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full p-2 border rounded text-sm"
                placeholder="+1 555-123-4567"
              />
            </div>
            <Button variant="outline" size="sm" disabled={!phoneInput}>
              Send Test SMS
            </Button>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter SMS code:
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="w-full p-2 border rounded text-sm"
                placeholder="123456"
                maxLength={6}
                disabled={!phoneInput}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <h4 className="text-base font-semibold text-primary">🔐 Two-Factor Authentication</h4>
      <div className="space-y-2 max-w-md">
        <div className="flex items-center justify-between p-2 bg-gray-50 border rounded text-sm">
          <div>
            <span className="text-gray-500">Status: </span>
            <span className="text-gray-500">{credentials.twoFA}</span>
            <div className="text-xs text-gray-500 mt-1">Required by portal</div>
          </div>
          {credentials.twoFA === "Disabled" && (
            <Button 
              onClick={handleSetupTwoFA}
              className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1"
              size="sm"
            >
              {twoFAExpanded ? (
                <>
                  <ChevronUp className="h-3 w-3 mr-1" />
                  Hide Setup
                </>
              ) : (
                "Setup Required"
              )}
            </Button>
          )}
          {credentials.twoFA === "Enabled" && (
            <div className="flex items-center gap-2">
              <span className="text-gray-600 text-xs">via {credentials.twoFAMethod}</span>
              <Button variant="outline" size="sm" className="text-red-600 text-xs">
                Disable
              </Button>
            </div>
          )}
        </div>
        
        {renderTwoFASetup()}
        
        {credentials.twoFA === "Enabled" && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <QrCode className="h-3 w-3" />
            <span>Set up during agent configuration with {credentials.twoFAMethod}</span>
          </div>
        )}
      </div>
    </div>
  );
}
