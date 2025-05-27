
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
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
        
        <div className="space-y-8 mt-8">
          {/* Attention Banner for Disconnected Agents */}
          {agent.status === "Disconnected" && (
            <Alert className="border-orange-200 bg-orange-50">
              <AlertTitle className="text-orange-800 flex items-center gap-2">
                <span>⚠️</span>
                <span className="font-bold">Two-Factor Authentication Required</span>
              </AlertTitle>
              <AlertDescription className="text-orange-700 mt-2">
                The portal requires 2FA to be configured for this account.{" "}
                <button 
                  onClick={handleConfigureSettings}
                  className="text-orange-800 underline hover:text-orange-900 font-medium"
                >
                  Configure settings
                </button>
              </AlertDescription>
            </Alert>
          )}

          {/* Credentials Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900">Credentials</h3>
            
            <div className="space-y-3">
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
          
          {/* Two-Factor Authentication moved to bottom with enhanced info */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-gray-50 border rounded text-sm">
                <span>{credentials.twoFA}</span>
                {credentials.twoFA === "Enabled" && (
                  <span className="text-gray-600">via {credentials.twoFAMethod}</span>
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
          
          {/* Updated Footer with purple Edit Agent button */}
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
