
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
      <div className="p-4 bg-gray-50 rounded-lg">
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
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200 bg-gray-50">
            <TableHead className="h-10 px-6 text-left align-middle font-medium text-gray-600 text-xs">
              Portal Name
            </TableHead>
            <TableHead className="h-10 px-6 text-left align-middle font-medium text-gray-600 text-xs">
              Supplier → Buyer
            </TableHead>
            <TableHead className="h-10 px-6 text-left align-middle font-medium text-gray-600 text-xs">
              Status
            </TableHead>
            <TableHead className="h-10 px-6 text-left align-middle font-medium text-gray-600 text-xs">
              User Type
            </TableHead>
            <TableHead className="h-10 px-6 text-right align-middle font-medium text-gray-600 text-xs">
              Actions
            </TableHead>
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
