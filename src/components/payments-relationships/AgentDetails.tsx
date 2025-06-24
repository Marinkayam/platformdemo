
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Agent } from "@/types/smartConnection";
import { StatusBadge } from "@/components/ui/status-badge";
import { AgentUserTypeBadge } from '@/components/ui/agent-user-type-badge';
import { toast } from '@/hooks/use-toast';
import { TabsNav } from '@/components/common/TabsNav';
import { FileText, MessageSquareText } from "lucide-react";
import { AgentIdentitySection } from './agent-sections/AgentIdentitySection';
import { AgentCredentialsSection } from './agent-sections/AgentCredentialsSection';
import { AgentTwoFactorSection } from './agent-sections/AgentTwoFactorSection';
import { AgentSmartConnectionSection } from './agent-sections/AgentSmartConnectionSection';
import { AgentMontoAccountSection } from './agent-sections/AgentMontoAccountSection';
import { AgentDisconnectionAlert } from './agent-sections/AgentDisconnectionAlert';
import { AgentInstructionsTab } from './agent-sections/AgentInstructionsTab';
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
  const [activeTab, setActiveTab] = useState("details");
  
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
    portalUrl: `https://${agent.portalName.toLowerCase().replace(/\s+/g, '')}.com`,
    twoFAEnabled: agent.status !== "Disconnected",
    twoFAMethod: "Google Authenticator",
    twoFA: agent.status !== "Disconnected" ? "Enabled" : "Disabled"
  };

  // Only show credentials for External User types
  const shouldShowCredentials = agent.type === "External";

  // Mock smart connection data
  const mockSmartConnection = {
    id: "sc1",
    name: `${connectionInfo.receivable} → ${connectionInfo.payable}`,
    url: `/payments-relationships?filter=connection1`
  };

  const handleSmartConnectionClick = (url: string) => {
    console.log("Navigate to:", url);
    // In a real app, this would use navigation
  };

  const handleViewInstructions = () => {
    setActiveTab("instructions");
  };

  const tabs = [
    { 
      id: "details", 
      icon: <FileText className="h-4 w-4" />, 
      label: "Details", 
      tooltip: null 
    },
    { 
      id: "instructions", 
      icon: <MessageSquareText className="h-4 w-4" />, 
      label: "Instructions", 
      tooltip: null 
    },
  ];

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

        {/* Smart Connection Section */}
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Smart Connection
              </label>
              <div className="text-sm text-gray-900 font-medium">{mockSmartConnection.name}</div>
              <div className="text-xs text-gray-600">Active payment relationship</div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleViewInstructions}
            >
              View Instructions
            </Button>
          </div>
        </div>

        <AgentDisconnectionAlert agent={agent} />

        {/* Navigation Tabs */}
        <TabsNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <div className="py-4">
          {activeTab === "details" && (
            <div className="space-y-6">
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
          )}

          {activeTab === "instructions" && (
            <AgentInstructionsTab agent={agent} />
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
