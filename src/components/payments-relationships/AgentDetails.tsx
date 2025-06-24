
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
  const [showAddInstructionForm, setShowAddInstructionForm] = useState(false);
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

  // Only show credentials for External User types
  const shouldShowCredentials = agent.type === "External";

  // Mock smart connection data
  const mockSmartConnection = {
    id: "sc1",
    name: `${connectionInfo.receivable} → ${connectionInfo.payable}`,
    url: `/payments-relationships?filter=connection1`
  };

  const handleViewInstructions = () => {
    setActiveTab("instructions");
  };

  const handleAddInstruction = () => {
    setActiveTab("instructions");
    setShowAddInstructionForm(true);
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
        <DialogContent className="sm:max-w-[1000px] p-0 h-[90vh] bg-white flex flex-col">
          {/* Fixed Header */}
          <div className="flex-shrink-0 p-6 pb-4 bg-white">
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
                    onClick={handleAddInstruction}
                    className="bg-white hover:bg-gray-50 border-[#7b61ff]/30 text-[#7b61ff] hover:text-[#6b46ff]"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Instructions
                  </Button>
                )}
              </div>
            </div>

            <AgentDisconnectionAlert agent={agent} />

            {/* Navigation Tabs */}
            <div className="mt-4">
              <TabsNav tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 bg-white">
            {activeTab === "details" && (
              <div className="space-y-6 max-w-full pb-6">
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
              </div>
            )}

            {activeTab === "instructions" && (
              <div className="pb-6">
                <AgentInstructionsTab 
                  agent={agent} 
                  showAddForm={showAddInstructionForm}
                  onShowAddFormChange={setShowAddInstructionForm}
                />
              </div>
            )}
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
