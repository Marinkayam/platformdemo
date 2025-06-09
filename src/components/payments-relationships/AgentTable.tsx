
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AgentTableRow } from "./AgentTableRow";
import { Agent, SmartConnection } from "@/types/smartConnection";

interface AgentTableProps {
  connection: SmartConnection;
  onViewDetails: (agent: Agent) => void;
  onDeactivateAgent: (agent: Agent) => void;
}

export function AgentTable({ connection, onViewDetails, onDeactivateAgent }: AgentTableProps) {
  // Filter out disconnected Monto users
  const filteredAgents = connection.agents.filter(agent => 
    !(agent.type === "Monto" && agent.status === "Disconnected")
  );

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
            </TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAgents.map((agent) => (
            <AgentTableRow
              key={agent.id}
              agent={agent}
              connection={connection}
              onViewDetails={onViewDetails}
              onDeactivateAgent={onDeactivateAgent}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
