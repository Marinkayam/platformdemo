
import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ViewCredentialsModal } from "./ViewCredentialsModal";
import { SmartConnection } from "@/types/smartConnection";

interface ExpandedAgentCardProps {
  connection: SmartConnection;
}

export function ExpandedAgentCard({ connection }: ExpandedAgentCardProps) {
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [isCredentialsModalOpen, setIsCredentialsModalOpen] = useState(false);

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

  const handleViewCredentials = (agent: any) => {
    setSelectedAgent(agent);
    setIsCredentialsModalOpen(true);
  };

  if (connection.agents.length === 0) {
    return (
      <div className="p-4 bg-white border-t border-gray-200">
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
      <div className="bg-white border-t border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200 bg-gray-50">
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
                View Credentials
              </TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {connection.agents.map((agent) => (
              <TableRow key={agent.id} className="hover:bg-gray-50/50 transition-colors">
                <TableCell className="px-6 py-3">
                  <div className="font-medium text-gray-900 text-base">
                    {agent.portalName}
                  </div>
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
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-blue-600 p-0 h-auto underline-offset-4 hover:underline text-sm"
                    onClick={() => handleViewCredentials(agent)}
                  >
                    🔗 View Credentials
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
                      <DropdownMenuItem className="text-red-600">Deactivate Agent</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedAgent && (
        <ViewCredentialsModal
          isOpen={isCredentialsModalOpen}
          onClose={() => {
            setIsCredentialsModalOpen(false);
            setSelectedAgent(null);
          }}
          agent={selectedAgent}
          connectionInfo={{
            receivable: connection.receivableEntity,
            payable: connection.payableEntity
          }}
        />
      )}
    </>
  );
}
