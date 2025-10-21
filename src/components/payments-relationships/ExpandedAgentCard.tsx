import { useState } from "react";
import { AgentTable } from "./AgentTable";
import { AgentModals } from "./AgentModals";
import { SmartConnection, Agent } from "@/types/smartConnection";

interface ExpandedAgentCardProps {
  connection: SmartConnection;
  onUpdateAgent?: (agent: Agent) => void;
}

export function ExpandedAgentCard({ connection, onUpdateAgent }: ExpandedAgentCardProps) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleViewDetails = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsDetailsModalOpen(true);
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedAgent(null);
  };

  const handleUpdateAgent = (updatedAgent: Agent) => {
    // Update parent state
    if (onUpdateAgent) {
      onUpdateAgent(updatedAgent);
    }
    // Modal close is handled by the modal component itself
  };

  return (
    <>
      <AgentTable
        connection={connection}
        onViewDetails={handleViewDetails}
      />

      <AgentModals
        selectedAgent={selectedAgent}
        isDetailsModalOpen={isDetailsModalOpen}
        connection={connection}
        onCloseDetailsModal={handleCloseDetailsModal}
        onUpdateAgent={handleUpdateAgent}
      />
    </>
  );
}