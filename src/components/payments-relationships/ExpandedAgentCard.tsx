import { useState } from "react";
import { AgentTable } from "./AgentTable";
import { AgentModals } from "./AgentModals";
import { SmartConnection, Agent } from "@/types/smartConnection";
import { AIScanProgress } from "./agent-sections";

interface ExpandedAgentCardProps {
  connection: SmartConnection;
}

export function ExpandedAgentCard({ connection }: ExpandedAgentCardProps) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [agentToDeactivate, setAgentToDeactivate] = useState<Agent | null>(null);
  const [scanComplete, setScanComplete] = useState(false);

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

  const handleScanComplete = () => {
    setScanComplete(true);
  };

  return (
    <>
      {!scanComplete && <AIScanProgress onComplete={handleScanComplete} />}
      
      <div className="mt-4 mb-2 w-full text-left text-sm text-[#586079] font-medium tracking-tight px-2">
        Agents
      </div>
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
