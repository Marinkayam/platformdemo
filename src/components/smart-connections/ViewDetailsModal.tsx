
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, ExternalLink, Eye, EyeOff, QrCode } from "lucide-react";
import { useState } from "react";
import { Agent } from "@/types/smartConnection";
import { AgentStatusBadge } from "@/components/ui/agent-status-badge";
import { AgentUserTypeBadge } from "@/components/ui/agent-user-type-badge";
import { EditAgentModal } from "./EditAgentModal";

interface ViewDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent;
  connectionInfo: {
    receivable: string;
    payable: string;
  };
}

export function ViewDetailsModal({
  isOpen,
  onClose,
  agent,
  connectionInfo
}: ViewDetailsModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Mock credentials for demo purposes
  const credentials = {
    username: agent.portalUser,
    password: "••••••••",
    twoFA: agent.status === "Disconnected" ? "Disabled" : "Enabled",
    twoFAMethod: "Google Authenticator",
    portalLink: `https://${agent.portalName.toLowerCase().replace(/\s+/g, '')}.com`
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleConfigureSettings = () => {
    setIsEditMode(true);
  };

  const handleBackToView = () => {
    setIsEditMode(false);
  };

  const handleCloseEdit = () => {
    setIsEditMode(false);
    onClose();
  };

  // Only show credentials for Customer User types
  const shouldShowCredentials = agent.type === "External";

  const shouldShowTwoFABanner = agent.status === "Disconnected" && agent.type === "External";

  if (isEditMode) {
    return (
      <EditAgentModal
        isOpen={isOpen}
        onClose={handleCloseEdit}
        onBack={handleBackToView}
        agent={agent}
        connectionInfo={connectionInfo}
      />
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          {/* Title and status badges in the same row */}
          <div className="flex items-center gap-3">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Agent Details
            </DialogTitle>
            <AgentStatusBadge status={agent.status} />
            <AgentUserTypeBadge type={agent.type} />
          </div>
          
          {/* Subtitle with improved spacing */}
          <div className="text-sm text-gray-600 mt-6 text-left my-[21px]">
            {connectionInfo.receivable} → {connectionInfo.payable}
          </div>
          
          {/* Separator with balanced spacing */}
          <Separator className="mt-8 my-[25px]" />
        </DialogHeader>
        
        <div className="space-y-6 mt-8">
          {/* Attention Banner for Disconnected Customer Agents */}
          {shouldShowTwoFABanner && (
            <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-md p-3 text-sm">
              <span className="text-orange-500 mt-0.5">⚠️</span>
              <div className="text-orange-800">
                <span className="font-bold">Two-Factor Authentication Required</span>
                <br />
                The portal requires 2FA to be configured for this account.{" "}
                <button 
                  onClick={handleConfigureSettings}
                  className="underline font-medium hover:text-orange-900"
                >
                  Configure settings
                </button>
              </div>
            </div>
          )}

          {/* Credentials Section - only for Customer User */}
          {shouldShowCredentials && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Credentials</h3>
              
              <div className="w-full max-w-md space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Portal Link
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-2 bg-gray-50 border rounded text-sm text-blue-600">
                      {credentials.portalLink}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => window.open(credentials.portalLink, '_blank')}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-2 bg-gray-50 border rounded text-sm">
                      {credentials.username}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(credentials.username)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 p-2 bg-gray-50 border rounded text-sm font-mono">
                      {showPassword ? "demo_password_123" : credentials.password}
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard("demo_password_123")}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Two-Factor Authentication Section - only for Customer User */}
          {shouldShowCredentials && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">🔐 Two-Factor Authentication</h3>
              <div className="w-full max-w-md space-y-2">
                <div className="flex items-center justify-between p-2 bg-gray-50 border rounded text-sm">
                  <div>
                    <span className="text-gray-500">Status: </span>
                    <span className="text-gray-500">{credentials.twoFA}</span>
                    <div className="text-xs text-gray-500 mt-1">Required by portal</div>
                  </div>
                  {credentials.twoFA === "Disabled" && (
                    <Button 
                      onClick={handleConfigureSettings}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1"
                      size="sm"
                    >
                      Setup Required
                    </Button>
                  )}
                  {credentials.twoFA === "Enabled" && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-600 text-xs">via {credentials.twoFAMethod}</span>
                    </div>
                  )}
                </div>
                
                {credentials.twoFA === "Enabled" && (
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <QrCode className="h-3 w-3" />
                    <span>Set up during agent configuration with {credentials.twoFAMethod}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Information for Monto User */}
          {agent.type === "Monto" && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">Account Information</h3>
              <div className="w-full max-w-md p-3 bg-blue-50 border border-blue-200 rounded-md text-sm">
                <p className="text-blue-800">
                  This agent uses a dedicated Monto user account for portal access. 
                  Credentials are managed independently by your organization.
                </p>
              </div>
            </div>
          )}
          
          {/* Footer with Edit Agent button */}
          <div className="flex justify-between items-center pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button 
              onClick={handleEdit} 
              style={{ backgroundColor: '#7B59FF' }}
              className="hover:opacity-90"
            >
              Edit Agent
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
