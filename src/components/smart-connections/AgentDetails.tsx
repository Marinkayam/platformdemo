
import { ChevronDown, ChevronRight, MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Agent } from "@/types/smartConnection";

interface AgentDetailsProps {
  agents: Agent[];
  isExpanded: boolean;
  onToggle: () => void;
}

export function AgentDetails({ agents, isExpanded, onToggle }: AgentDetailsProps) {
  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case "Connected":
        return "bg-green-100 text-green-700 border-green-200";
      case "Disconnected":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "Error":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Monto":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "External":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
      >
        {isExpanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        {agents.length} agent{agents.length !== 1 ? 's' : ''}
      </button>
      
      {isExpanded && agents.length > 0 && (
        <Card className="mt-3 ml-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Portal Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Portal User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agents.map((agent) => (
                <TableRow key={agent.id}>
                  <TableCell className="font-medium">{agent.portalName}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={getTypeColor(agent.type)}
                    >
                      {agent.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={getAgentStatusColor(agent.status)}
                    >
                      {agent.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-blue-600">{agent.portalUser}</TableCell>
                  <TableCell>{agent.role}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="link" size="sm" className="text-blue-600 p-0 h-auto">
                        View Credentials
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Agent</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Remove Agent</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
