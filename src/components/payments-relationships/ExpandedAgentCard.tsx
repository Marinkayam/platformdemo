
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
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [agentToDeactivate, setAgentToDeactivate] = useState<Agent | null>(null);

  const handleViewDetails = (agent: Agent) => {
    setSelectedAgent(agent);
    setIsDetailsModalOpen(true);
  };

  const handleDeactivateAgent = (agent: Agent) => {
    setAgentToDeactivate(agent);
    setIsDeactivateModalOpen(true);
  };

  const handleConfirmDeactivation = () => {
    if (agentToDeactivate) {
      // TODO: Implement actual agent deactivation logic
      console.log('Deactivating agent:', agentToDeactivate.id);
      setIsDeactivateModalOpen(false);
      setAgentToDeactivate(null);
    }
  };

  const handleCloseDetailsModal = () => {
    setIsDetailsModalOpen(false);
    setSelectedAgent(null);
  };

  const handleCloseDeactivateModal = () => {
    setIsDeactivateModalOpen(false);
    setAgentToDeactivate(null);
  };

  return (
    <>
      <AgentTable
        connection={connection}
        onViewDetails={handleViewDetails}
        onDeactivateAgent={handleDeactivateAgent}
      />

      <AgentModals
        selectedAgent={selectedAgent}
        isDetailsModalOpen={isDetailsModalOpen}
        isDeactivateModalOpen={isDeactivateModalOpen}
        agentToDeactivate={agentToDeactivate}
        connection={connection}
        onCloseDetailsModal={handleCloseDetailsModal}
        onCloseDeactivateModal={handleCloseDeactivateModal}
        onConfirmDeactivation={handleConfirmDeactivation}
      />
    </>
  );
}
