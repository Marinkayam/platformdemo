
import { MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SmartConnection } from "@/types/smartConnection";

interface ExpandedAgentCardProps {
  connection: SmartConnection;
}

export function ExpandedAgentCard({ connection }: ExpandedAgentCardProps) {
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

  const handleViewCredentials = (agentId: string) => {
    console.log("View credentials for agent:", agentId);
    // TODO: Implement view credentials modal/drawer
  };

  if (connection.agents.length === 0) {
    return (
      <Card className="mx-4 mb-4 p-4 bg-gray-100 rounded-xl border">
        <div className="text-center text-gray-600">
          <p>No agents configured for this connection</p>
          <Button variant="outline" size="sm" className="mt-2">
            Add Agent
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="mx-4 mb-4 p-4 bg-gray-100 rounded-xl border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium text-gray-900">Portal Name</TableHead>
            <TableHead className="font-medium text-gray-900">Supplier → Buyer</TableHead>
            <TableHead className="font-medium text-gray-900">Status</TableHead>
            <TableHead className="font-medium text-gray-900">View Credentials</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {connection.agents.map((agent) => (
            <TableRow key={agent.id} className="hover:bg-gray-100 px-6 py-3">
              <TableCell className="font-medium text-gray-900">
                {agent.portalName}
              </TableCell>
              <TableCell className="text-gray-600 text-sm">
                {connection.receivableEntity} → {connection.payableEntity}
              </TableCell>
              <TableCell>
                <Badge 
                  variant="outline"
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${getAgentStatusColor(agent.status)}`}
                >
                  {agent.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Button 
                  variant="link" 
                  size="sm" 
                  className="text-blue-600 p-0 h-auto underline-offset-4 hover:underline"
                  onClick={() => handleViewCredentials(agent.id)}
                >
                  🔗 View Credentials
                </Button>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
                    <DropdownMenuItem>Edit Agent</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Deactivate Agent</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
