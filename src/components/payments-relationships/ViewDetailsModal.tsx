
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
  onUpdateAgent?: (agent: Agent) => void;
}

export function ViewDetailsModal({
  isOpen,
  onClose,
  agent,
  connectionInfo,
  onUpdateAgent
}: ViewDetailsModalProps) {
  const handleEditAgent = (updatedAgent: Agent) => {
    if (onUpdateAgent) {
      onUpdateAgent(updatedAgent);
    }
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
