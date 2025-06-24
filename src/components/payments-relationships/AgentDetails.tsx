
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Agent } from "@/types/smartConnection";
import { StatusBadge } from "@/components/ui/status-badge";
import { AgentUserTypeBadge } from '@/components/ui/agent-user-type-badge';
import { toast } from '@/hooks/use-toast';
import { TabsNav } from '@/components/common/TabsNav';
import { FileText, MessageSquareText, Link, Plus } from "lucide-react";
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
    portalLink: `https://${agent.portalName.toLowerCase().replace(/\s+/g, '')}.com`,
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
      <DialogContent className="sm:max-w-[900px] p-0 max-h-[90vh] overflow-hidden bg-white">
        <div className="p-6 bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              <span>Agent Details</span>
              <StatusBadge status={agent.status} />
              <AgentUserTypeBadge type={agent.type} />
            </DialogTitle>
          </DialogHeader>

          {/* Smart Connection Section - Monto Style */}
          <div className="mt-6 p-4 bg-gradient-to-r from-[#7b61ff]/5 to-[#6b46ff]/5 border border-[#7b61ff]/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#7b61ff] rounded-lg flex items-center justify-center">
                  <Link className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-600 mb-1">Smart Connection</div>
                  <div className="text-lg font-semibold text-gray-900">{mockSmartConnection.name}</div>
                </div>
              </div>
              {activeTab === "details" ? (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleViewInstructions}
                  className="bg-white hover:bg-gray-50 border-[#7b61ff]/30 text-[#7b61ff] hover:text-[#6b46ff]"
                >
                  View Instructions
                </Button>
              ) : (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {}}
                  className="bg-white hover:bg-gray-50 border-[#7b61ff]/30 text-[#7b61ff] hover:text-[#6b46ff]"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Instructions
                </Button>
              )}
            </div>
          </div>

          <AgentDisconnectionAlert agent={agent} />
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 bg-white">
          <TabsNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Tab Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {activeTab === "details" && (
            <div className="space-y-6 max-w-full">
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

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 p-6 bg-white border-t">
          {isEditMode ? (
            <>
              <Button variant="ghost" onClick={handleCancel} className="min-w-[100px]">
                Cancel
              </Button>
              <Button onClick={handleSave} className="min-w-[120px] bg-[#7b61ff] hover:bg-[#6b46ff]">
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" onClick={onClose} className="min-w-[80px]">
                Close
              </Button>
              <Button onClick={handleEdit} className="min-w-[100px] bg-[#7b61ff] hover:bg-[#6b46ff]">
                Edit Agent
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
