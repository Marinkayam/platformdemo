
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Agent } from "@/types/smartConnection";
import { StatusBadge } from "@/components/ui/status-badge";
import { AgentUserTypeBadge } from '@/components/ui/agent-user-type-badge';
import { toast } from '@/hooks/use-toast';
import { TabsNav } from '@/components/common/TabsNav';
import { FileText, MessageSquareText, Link } from "lucide-react";
import { AgentIdentitySection } from './agent-sections/AgentIdentitySection';
import { AgentCredentialsSection } from './agent-sections/AgentCredentialsSection';
import { AgentTwoFactorSection } from './agent-sections/AgentTwoFactorSection';
import { AgentDisconnectionAlert } from './agent-sections/AgentDisconnectionAlert';
import { AgentInstructionsTab } from './agent-sections/AgentInstructionsTab';
import { useAgentDetailsForm } from './agent-sections/useAgentDetailsForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  
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

  // Mock smart connection data
  const mockSmartConnection = {
    id: "sc1",
    name: `${connectionInfo.receivable} → ${connectionInfo.payable}`,
    url: `/payments-relationships?filter=connection1`
  };

  const handleViewInstructions = () => {
    setActiveTab("instructions");
  };

  const handleSaveClick = () => {
    setShowSaveConfirmation(true);
  };

  const handleConfirmSave = () => {
    setShowSaveConfirmation(false);
    handleSave();
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
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[1000px] p-0 h-[90vh] bg-white flex flex-col overflow-hidden">
          {/* Fixed Header */}
          <div className="flex-shrink-0 p-6 pb-2 bg-white">
            <DialogHeader className="mb-4">
              <DialogTitle className="flex items-center gap-3 text-xl">
                <span>Agent Details</span>
                <StatusBadge status={agent.status} />
                <AgentUserTypeBadge type={agent.type} />
              </DialogTitle>
            </DialogHeader>

            {/* Smart Connection Section - Monto Style */}
            <div className="mb-4 p-4 bg-gradient-to-r from-[#7b61ff]/5 to-[#6b46ff]/5 border border-[#7b61ff]/20 rounded-lg">
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
              </div>
            </div>

            <AgentDisconnectionAlert agent={agent} />

            <TabsNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 bg-white">
            <div className="space-y-6 max-w-full pb-6">
              {activeTab === "details" && (
                <>
                  <AgentIdentitySection 
                    agent={agent}
                    connectionInfo={connectionInfo}
                    copyToClipboard={copyToClipboard}
                    isEditMode={isEditMode}
                    editFormData={editFormData}
                    onFormChange={handleFormChange}
                  />

                  <AgentCredentialsSection
                    credentials={mockCredentials}
                    isEditMode={isEditMode}
                    editFormData={editFormData}
                    onFormChange={handleFormChange}
                    copyToClipboard={copyToClipboard}
                  />

                  <AgentTwoFactorSection
                    credentials={mockCredentials}
                    isEditMode={isEditMode}
                    editFormData={editFormData}
                    onFormChange={handleFormChange}
                    onConfigureSettings={handleEdit}
                    agentId={agent.id}
                  />
                </>
              )}

              {activeTab === "instructions" && (
                <>
                  <div className="mb-6">
                    <img
                      src="/lovable-uploads/9cc93995-38b5-4414-a59a-7c1c74a05d53.png"
                      alt="Agent instructions layout reference"
                      loading="lazy"
                      className="w-full rounded-lg border object-contain"
                    />
                  </div>
                  <AgentInstructionsTab agent={agent} />
                </>
              )}
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="flex-shrink-0 flex justify-end gap-3 p-6 bg-white border-t">
            {isEditMode ? (
              <>
                <Button variant="ghost" onClick={handleCancel} className="min-w-[100px]">
                  Cancel
                </Button>
                <Button onClick={handleSaveClick} className="min-w-[120px] bg-[#7b61ff] hover:bg-[#6b46ff]">
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

      <AlertDialog open={showSaveConfirmation} onOpenChange={setShowSaveConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Save Changes</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to save the changes made to this agent? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSave}>Save Changes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
