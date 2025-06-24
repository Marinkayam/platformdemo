
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Agent } from "@/types/smartConnection";
import { StatusBadge } from "@/components/ui/status-badge";
import { AgentUserTypeBadge } from '@/components/ui/agent-user-type-badge';
import { toast } from '@/hooks/use-toast';
import { AgentIdentitySection } from './agent-sections/AgentIdentitySection';
import { AgentCredentialsSection } from './agent-sections/AgentCredentialsSection';
import { AgentTwoFactorSection } from './agent-sections/AgentTwoFactorSection';
import { AgentSmartConnectionSection } from './agent-sections/AgentSmartConnectionSection';
import { AgentMontoAccountSection } from './agent-sections/AgentMontoAccountSection';
import { AgentDisconnectionAlert } from './agent-sections/AgentDisconnectionAlert';
import { useAgentDetailsForm } from './agent-sections/useAgentDetailsForm';

interface AgentDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent;
  connectionInfo: {
    receivable: string;
    payable: string;
  };
  onEditAgent: (agent: Agent) => void;
}

export function AgentDetails({ 
  isOpen, 
  onClose, 
  agent, 
  connectionInfo,
  onEditAgent 
}: AgentDetailsProps) {
  const {
    isEditMode,
    editFormData,
    handleEdit,
    handleCancel,
    handleSave,
    handleFormChange
  } = useAgentDetailsForm(agent, onEditAgent, onClose);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: `${text} copied!` });
  };

  // Mock credentials for demo purposes
  const mockCredentials = {
    username: agent.portalUser,
    password: "demo_password_123",
    portalLink: `https://${agent.portalName.toLowerCase().replace(/\s+/g, '')}.com`,
    portalUrl: `https://${agent.portalName.toLowerCase().replace(/\s+/g, '')}.com`,
    twoFAEnabled: agent.status !== "Disconnected",
    twoFAMethod: "Google Authenticator",
    twoFA: agent.status !== "Disconnected" ? "Enabled" : "Disabled"
  };

  // Only show credentials for External User types
  const shouldShowCredentials = agent.type === "External";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span>Agent Details</span>
            <StatusBadge status={agent.status} />
            <AgentUserTypeBadge type={agent.type} />
          </DialogTitle>
        </DialogHeader>

        <AgentDisconnectionAlert agent={agent} />

        <div className="space-y-6 py-4">
          <AgentIdentitySection 
            agent={agent}
            connectionInfo={connectionInfo}
            copyToClipboard={copyToClipboard}
            isEditMode={isEditMode}
            editFormData={editFormData}
            onFormChange={handleFormChange}
          />

          {shouldShowCredentials && (
            <AgentCredentialsSection
              credentials={mockCredentials}
              isEditMode={isEditMode}
              editFormData={editFormData}
              onFormChange={handleFormChange}
              copyToClipboard={copyToClipboard}
            />
          )}

          {shouldShowCredentials && (
            <AgentTwoFactorSection
              credentials={mockCredentials}
              isEditMode={isEditMode}
              editFormData={editFormData}
              onFormChange={handleFormChange}
              onConfigureSettings={handleEdit}
              agentId={agent.id}
            />
          )}

          <AgentSmartConnectionSection
            agent={agent}
            connectionInfo={connectionInfo}
            copyToClipboard={copyToClipboard}
          />

          <AgentMontoAccountSection agent={agent} />
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          {isEditMode ? (
            <>
              <Button variant="ghost" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
              <Button onClick={handleEdit}>
                Edit Agent
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
