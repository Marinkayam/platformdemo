import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Agent } from "@/types/smartConnection";
import { StatusBadge } from "@/components/ui/status-badge";
import { AgentUserTypeBadge } from '@/components/ui/agent-user-type-badge';
import { toast } from '@/hooks/use-toast';
import { AgentIdentitySection } from './agent-sections/AgentIdentitySection';
import { AgentCredentialsSection } from './agent-sections/AgentCredentialsSection';
import { AgentTwoFactorSection } from './agent-sections/AgentTwoFactorSection';

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
  const [isEditMode, setIsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState({
    portalName: agent.portalName,
    username: agent.portalUser,
    password: "demo_password_123",
    portalLink: `https://${agent.portalName.toLowerCase().replace(/\s+/g, '')}.com`,
    twoFAEnabled: agent.status !== "Disconnected",
    twoFAMethod: "authenticator",
  });
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: `${text} copied!` });
  };

  // Mock credentials for demo purposes - fixed to include all required properties
  const mockCredentials = {
    username: agent.portalUser,
    password: "demo_password_123",
    portalLink: `https://${agent.portalName.toLowerCase().replace(/\s+/g, '')}.com`,
    portalUrl: `https://${agent.portalName.toLowerCase().replace(/\s+/g, '')}.com`,
    twoFAEnabled: agent.status !== "Disconnected",
    twoFAMethod: "Google Authenticator",
    twoFA: agent.status !== "Disconnected" ? "Enabled" : "Disabled"
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Reset form data to original values
    setEditFormData({
      portalName: agent.portalName,
      username: agent.portalUser,
      password: "demo_password_123",
      portalLink: `https://${agent.portalName.toLowerCase().replace(/\s+/g, '')}.com`,
      twoFAEnabled: agent.status !== "Disconnected",
      twoFAMethod: "authenticator",
    });
  };

  const handleSave = () => {
    // Update the agent with new data and set to validating
    const updatedAgent: Agent = {
      ...agent,
      portalName: editFormData.portalName,
      portalUser: editFormData.username,
      status: "Validating", // Always set to validating after save
    };
    
    onEditAgent(updatedAgent);
    setIsEditMode(false);
    onClose(); // Close modal and return to table
    toast({ 
      title: "Agent Updated", 
      description: "Changes have been saved and validation has started." 
    });
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

  // Only show credentials for External User types
  const shouldShowCredentials = agent.type === "External";
  
  // Only show account type details for Monto users
  const shouldShowAccountTypeDetails = agent.type === "Monto";

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
        {agent.status === "Disconnected" && (
          <Alert variant="destructive" className="mt-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Connection Failed:</strong> {getDisconnectionReason()} Please edit your credentials and save to retry validation.
            </AlertDescription>
          </Alert>
        )}

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

          {shouldShowAccountTypeDetails && (
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-sm">
                <p className="text-blue-800">
                  This agent uses a dedicated Monto user account for portal access. 
                  Credentials are managed independently by your organization.
                </p>
              </div>
            </div>
          )}
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
