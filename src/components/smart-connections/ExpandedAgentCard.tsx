import { useState } from "react";
import { MoreVertical, FileLock, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ViewDetailsModal } from "./ViewDetailsModal";
import { DeactivateAgentModal } from "./DeactivateAgentModal";
import { AccountTypeTooltip } from "./AccountTypeTooltip";
import { SmartConnection, Agent } from "@/types/smartConnection";

interface ExpandedAgentCardProps {
  connection: SmartConnection;
}

export function ExpandedAgentCard({ connection }: ExpandedAgentCardProps) {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [agentToDeactivate, setAgentToDeactivate] = useState<Agent | null>(null);

  // Filter out disconnected Monto users
  const filteredAgents = connection.agents.filter(agent => 
    !(agent.type === "Monto" && agent.status === "Disconnected")
  );

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case "Connected":
        return "bg-green-50 text-green-700 border-green-200";
      case "Disconnected":
        return "bg-red-50 text-red-700 border-red-200";
      case "Error":
        return "bg-red-50 text-red-700 border-red-200";
      case "Validating":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Building":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case "Monto":
        return "bg-primary text-primary-foreground";
      case "External":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getAccountTypeDisplay = (type: string) => {
    return type === "Monto" ? "Monto" : "Customer";
  };

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

  if (filteredAgents.length === 0) {
    return (
      <div className="p-4 bg-gray-50">
        <div className="text-center text-gray-600">
          <p className="text-sm">No agents configured for this connection</p>
          <Button variant="outline" size="sm" className="mt-2">
            Add Agent
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50 py-2">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200 bg-gray-100">
              <TableHead className="h-12 px-6 text-left align-middle font-medium text-gray-600 text-sm">
                Portal Name
              </TableHead>
              <TableHead className="h-12 px-6 text-left align-middle font-medium text-gray-600 text-sm">
                Supplier → Buyer
              </TableHead>
              <TableHead className="h-12 px-6 text-left align-middle font-medium text-gray-600 text-sm">
                Status
              </TableHead>
              <TableHead className="h-12 px-6 text-left align-middle font-medium text-gray-600 text-sm">
                User Type
              </TableHead>
              <TableHead className="h-12 px-6 text-left align-middle font-medium text-gray-600 text-sm">
                Account Type
              </TableHead>
              <TableHead className="h-12 px-6 text-left align-middle font-medium text-gray-600 text-sm">
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAgents.map((agent) => (
              <TableRow key={agent.id} className="hover:bg-gray-100/50 transition-colors bg-white">
                <TableCell className="px-6 py-3">
                  <button
                    onClick={() => handleViewDetails(agent)}
                    className="font-medium text-gray-900 text-base hover:text-blue-600 hover:underline transition-colors text-left"
                  >
                    {agent.portalName}
                  </button>
                </TableCell>
                <TableCell className="px-6 py-3">
                  <div className="text-gray-600 text-sm">
                    {connection.receivableEntity} → {connection.payableEntity}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-3">
                  <Badge 
                    variant="outline"
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${getAgentStatusColor(agent.status)}`}
                  >
                    {agent.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-3">
                  <Badge 
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${getUserTypeColor(agent.type)}`}
                  >
                    {agent.type === "Monto" ? "Monto User" : "Customer User"}
                  </Badge>
                </TableCell>
                <TableCell className="px-6 py-3">
                  <span className="text-sm text-gray-600">
                    {getAccountTypeDisplay(agent.type)}
                  </span>
                </TableCell>
                <TableCell className="px-6 py-3">
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-blue-600 p-0 h-auto underline-offset-4 hover:underline text-sm flex items-center gap-2"
                    onClick={() => handleViewDetails(agent)}
                  >
                    <FileLock className="h-4 w-4" color="#01173E" strokeWidth={1} />
                    View Details
                  </Button>
                </TableCell>
                <TableCell className="px-6 py-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
                      <DropdownMenuItem>Edit Agent</DropdownMenuItem>
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeactivateAgent(agent)}
                      >
                        Deactivate Agent
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedAgent && (
        <ViewDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedAgent(null);
          }}
          agent={selectedAgent}
          connectionInfo={{
            receivable: connection.receivableEntity,
            payable: connection.payableEntity
          }}
        />
      )}

      <DeactivateAgentModal
        isOpen={isDeactivateModalOpen}
        onClose={() => {
          setIsDeactivateModalOpen(false);
          setAgentToDeactivate(null);
        }}
        onConfirm={handleConfirmDeactivation}
        agent={agentToDeactivate}
      />
    </>
  );
}
