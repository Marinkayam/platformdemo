
import React from "react";
import { Agent } from "@/types/smartConnection";
import { AgentDetails } from "./AgentDetails";

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
  const handleEditAgent = (updatedAgent: Agent) => {
    // TODO: Implement actual agent update logic
    console.log('Updating agent:', updatedAgent);
  };

  return (
    <AgentDetails
      isOpen={isOpen}
      onClose={onClose}
      agent={agent}
      connectionInfo={connectionInfo}
      onEditAgent={handleEditAgent}
    />
  );
}
