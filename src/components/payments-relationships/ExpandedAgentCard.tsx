import { useState } from "react";
import { AgentTable } from "./AgentTable";
import { AgentModals } from "./AgentModals";
import { SmartConnection, Agent } from "@/types/smartConnection";

interface ExpandedAgentCardProps {
  connection: SmartConnection;
}

export function ExpandedAgentCard({ connection }: ExpandedAgentCardProps) {
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
      />
    </>
  );
}