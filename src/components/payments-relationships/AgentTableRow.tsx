import { MoreVertical, FileLock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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

  return (
    <TableRow className="hover:bg-gray-100/50 transition-colors bg-white">
      <TableCell className="px-6 py-3">
        <div>
          <button
            onClick={() => onViewDetails(agent)}
            className="font-medium text-gray-900 text-base hover:text-blue-600 hover:underline transition-colors text-left"
          >
            {agent.portalName}
          </button>
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
        <Button 
          variant="link" 
          size="sm" 
          className="text-blue-600 p-0 h-auto underline-offset-4 hover:underline text-sm flex items-center gap-2"
          onClick={() => onViewDetails(agent)}
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
              onClick={() => onDeactivateAgent(agent)}
            >
              Deactivate Agent
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
