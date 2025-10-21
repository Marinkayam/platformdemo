
import { ViewDetailsModal } from "./ViewDetailsModal";
import { Agent, SmartConnection } from "@/types/smartConnection";

interface AgentModalsProps {
  selectedAgent: Agent | null;
  isDetailsModalOpen: boolean;
  connection: SmartConnection;
  onCloseDetailsModal: () => void;
  onUpdateAgent?: (agent: Agent) => void;
}

export function AgentModals({
  selectedAgent,
  isDetailsModalOpen,
  connection,
  onCloseDetailsModal,
  onUpdateAgent
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
          onUpdateAgent={onUpdateAgent}
        />
      )}
    </>
  );
}
