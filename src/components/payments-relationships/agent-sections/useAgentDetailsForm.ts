
import { useState } from "react";
import { Agent } from "@/types/smartConnection";
import { toast } from '@/hooks/use-toast';

interface FormData {
  portalName: string;
  username: string;
  password: string;
  portalLink: string;
  twoFAEnabled: boolean;
  twoFAMethod: string;
  phoneNumber: string;
  verificationEmail: string;
}

export function useAgentDetailsForm(agent: Agent, onEditAgent: (agent: Agent) => void, onClose: () => void) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editFormData, setEditFormData] = useState<FormData>({
    portalName: agent.portalName,
    username: agent.portalUser,
    password: "demo_password_123",
    portalLink: `https://${agent.portalName.toLowerCase().replace(/\s+/g, '')}.com`,
    twoFAEnabled: agent.status !== "Disconnected",
    twoFAMethod: "authenticator",
    phoneNumber: "",
    verificationEmail: "",
  });

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
      phoneNumber: "",
      verificationEmail: "",
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

  return {
    isEditMode,
    editFormData,
    handleEdit,
    handleCancel,
    handleSave,
    handleFormChange
  };
}
