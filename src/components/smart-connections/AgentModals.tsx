
import { ViewDetailsModal } from "./ViewDetailsModal";
import { DeactivateAgentModal } from "./DeactivateAgentModal";
import { Agent, SmartConnection } from "@/types/smartConnection";

interface AgentModalsProps {
  selectedAgent: Agent | null;
  isDetailsModalOpen: boolean;
  isDeactivateModalOpen: boolean;
  agentToDeactivate: Agent | null;
  connection: SmartConnection;
  onCloseDetailsModal: () => void;
  onCloseDeactivateModal: () => void;
  onConfirmDeactivation: () => void;
}

export function AgentModals({
  selectedAgent,
  isDetailsModalOpen,
  isDeactivateModalOpen,
  agentToDeactivate,
  connection,
  onCloseDetailsModal,
  onCloseDeactivateModal,
  onConfirmDeactivation
}: AgentModalsProps) {
  return (
    <>
      {selectedAgent && (
        <ViewDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={onCloseDetailsModal}
          agent={selectedAgent}
          connectionInfo={{
            receivable: connection.receivableEntity,
            payable: connection.payableEntity
          }}
        />
      )}

      <DeactivateAgentModal
        isOpen={isDeactivateModalOpen}
        onClose={onCloseDeactivateModal}
        onConfirm={onConfirmDeactivation}
        agent={agentToDeactivate}
      />
    </>
  );
}
