
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Agent } from "@/types/smartConnection";
import { EditAgentModal } from "./EditAgentModal";
import { StatusBadge } from "@/components/ui/status-badge";
import { AgentUserTypeBadge } from "@/components/ui/agent-user-type-badge";
import { toast } from "@/hooks/use-toast";
import { AgentIdentitySection } from "./agent-sections/AgentIdentitySection";
import { AgentCredentialsSection } from "./agent-sections/AgentCredentialsSection";
import { AgentTwoFactorSection } from "./agent-sections/AgentTwoFactorSection";
import { AgentConnectionSection } from "./agent-sections/AgentConnectionSection";

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
  const [isEditMode, setIsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({
    portalName: agent.portalName,
    username: agent.portalUser,
    password: "demo_password_123",
    portalLink: `https://${agent.portalName.toLowerCase().replace(/\s+/g, '')}.com`,
    twoFAEnabled: agent.status !== "Disconnected",
    twoFAMethod: "authenticator",
  });

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
    toast({ title: "Copied to clipboard", description: `${text} copied!` });
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

  const handleFormChange = (field: string, value: string | boolean) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Get disconnection reason from the agent status
  const getDisconnectionReason = () => {
    if (agent.status === "Disconnected") {
      return "Authentication failed. Please verify your credentials.";
    }
    if (agent.status === "Error") {
      return "Connection error occurred. Please check your settings.";
    }
    return "";
  };

  // Only show credentials for Customer User types
  const shouldShowCredentials = agent.type === "External";
  
  // Only show account type details for Monto users
  const shouldShowAccountTypeDetails = agent.type === "Monto";

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
      <DialogContent className="sm:max-w-[600px] p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>Agent Details</span>
            <StatusBadge status={agent.status} />
            <AgentUserTypeBadge type={agent.type} />
          </DialogTitle>
        </DialogHeader>

        {/* Disconnection Alert Banner */}
        {(agent.status === "Disconnected" || agent.status === "Error") && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Connection Failed:</strong> {getDisconnectionReason()} Please edit your agent settings and save to retry validation.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6 py-4">
          <AgentIdentitySection 
            agent={agent}
            connectionInfo={connectionInfo}
            copyToClipboard={copyToClipboard}
            isEditMode={false}
          />

          {shouldShowCredentials && (
            <AgentCredentialsSection
              credentials={credentials}
              isEditMode={false}
              copyToClipboard={copyToClipboard}
            />
          )}

          {shouldShowCredentials && (
            <AgentTwoFactorSection
              credentials={credentials}
              isEditMode={false}
              onConfigureSettings={handleConfigureSettings}
              agentId={agent.id}
            />
          )}

          <AgentConnectionSection
            agent={agent}
            connectionInfo={connectionInfo}
          />
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleEdit}>
            Edit Agent
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
