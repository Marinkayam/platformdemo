
import { ExceptionBanner } from "@/components/ui/exception-banner";
import { WandSparkles } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { AgentDetails } from "@/components/payments-relationships/AgentDetails";

export function ExceptionBanners() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showAgentModal, setShowAgentModal] = useState(false);

  const handleConnectionHubClick = () => {
    setShowAgentModal(true);
  };

  // Mock agent data for the modal - matches the uploaded image
  const mockAgent = {
    id: "agent-sap-ariba-1",
    portalName: "SAP Ariba",
    type: "External" as const,
    status: "Disconnected" as const,
    portalUser: "customer.user@company.com",
    role: "Both" as const
  };

  // Mock connection info for the Smart Connection section
  const mockConnectionInfo = {
    receivable: "Company Corp",
    payable: "Supplier LLC"
  };

  // For INV-10032355 (test-regular-2), show only Smart Connections exception in red
  if (id === "test-regular-2") {
    return (
      <>
        <ExceptionBanner 
          variant="error" 
          icon="alert"
          title="Smart Connections"
        >
          Portal scan agent credentials are missing: Resolve the exception by updating the scan agent details{" "}
          <button 
            onClick={handleConnectionHubClick}
            className="text-error-main underline hover:text-error-main/80 cursor-pointer"
          >
            here
          </button>
        </ExceptionBanner>

        <AgentDetails
          isOpen={showAgentModal}
          onClose={() => setShowAgentModal(false)}
          agent={mockAgent}
          connectionInfo={mockConnectionInfo}
          onEditAgent={() => {
            // Handle edit logic here
          }}
        />
      </>
    );
  }

  // For other invoices, show both Smart Connection and Missing Data exceptions
  return (
    <>
      <ExceptionBanner 
        variant="error" 
        icon="alert"
        title="Smart Connection"
      >
        Portal scan agent credentials are missing: Resolve the exception by updating the scan agent details{" "}
        <button 
          onClick={handleConnectionHubClick}
          className="text-primary underline hover:text-primary/80 cursor-pointer"
        >
          here
        </button>
      </ExceptionBanner>

      <ExceptionBanner 
        variant="error" 
        icon="alert"
        title="Missing Data"
      >
        Required information is missing from the invoice's additional data: Invoice Date, Customer Name
      </ExceptionBanner>

      <AgentDetails
        isOpen={showAgentModal}
        onClose={() => setShowAgentModal(false)}
        agent={mockAgent}
        connectionInfo={mockConnectionInfo}
        onEditAgent={() => {
          // Handle edit logic here
        }}
      />
    </>
  );
}
