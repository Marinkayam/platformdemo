
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Agent, SmartConnection } from "@/types/smartConnection";
import { AgentIssueBanner } from "./AgentIssueBanner";
import { StatusBadge } from "@/components/ui/status-badge";

interface AgentTableRowProps {
  agent: Agent;
  connection: SmartConnection;
  onViewDetails: (agent: Agent) => void;
  onDeactivateAgent: (agent: Agent) => void;
}

export function AgentTableRow({ agent, connection, onViewDetails, onDeactivateAgent }: AgentTableRowProps) {
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

  const handleEditAgent = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Edit agent:', agent.id);
  };

  const handleDeactivateAgent = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeactivateAgent(agent);
  };

  return (
    <TableRow 
      className="hover:bg-gray-100/50 transition-colors bg-white cursor-pointer"
      onClick={() => onViewDetails(agent)}
    >
      <TableCell className="px-6 py-3">
        <div>
          <div className="font-medium text-gray-900 text-base">
            {agent.portalName}
          </div>
          <AgentIssueBanner agent={agent} />
        </div>
      </TableCell>
      <TableCell className="px-6 py-3">
        <div className="text-gray-600 text-sm">
          {connection.receivableEntity} → {connection.payableEntity}
        </div>
      </TableCell>
      <TableCell className="px-6 py-3">
        <StatusBadge status={agent.status} />
      </TableCell>
      <TableCell className="px-6 py-3">
        <Badge 
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${getUserTypeColor(agent.type)}`}
        >
          {agent.type === "Monto" ? "Monto User" : "Customer User"}
        </Badge>
      </TableCell>
      <TableCell className="px-6 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-200"
            onClick={handleEditAgent}
          >
            <Edit className="h-4 w-4 text-gray-600" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
            onClick={handleDeactivateAgent}
          >
            <Trash2 className="h-4 w-4 text-gray-600 hover:text-red-600" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
