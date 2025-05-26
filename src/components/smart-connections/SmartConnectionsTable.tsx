
import { useState } from "react";
import { ChevronDown, ChevronRight, MoreVertical } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SmartConnectionStatusBadge } from "@/components/ui/smart-connection-status-badge";
import { ExpandedAgentCard } from "./ExpandedAgentCard";
import { SmartConnectionsTableFooter } from "./SmartConnectionsTableFooter";
import { SmartConnection } from "@/types/smartConnection";
import { useNavigate } from "react-router-dom";

interface SmartConnectionsTableProps {
  connections: SmartConnection[];
}

const getRandomCompanyName = () => {
  const companies = ["Monto LTD", "Monto INC", "Monto Corp", "Monto LLC"];
  return companies[Math.floor(Math.random() * companies.length)];
};

export function SmartConnectionsTable({ connections }: SmartConnectionsTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const toggleRow = (connectionId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(connectionId)) {
      newExpanded.delete(connectionId);
    } else {
      newExpanded.add(connectionId);
    }
    setExpandedRows(newExpanded);
  };

  const handleRowClick = (connectionId: string, event: React.MouseEvent) => {
    if ((event.target as HTMLElement).closest('.kebab-menu')) {
      return;
    }
    toggleRow(connectionId);
  };

  const handleAddAgent = (connectionId: string) => {
    navigate(`/smart-connections/add-agent?connectionId=${connectionId}`);
  };

  if (connections.length === 0) {
    return (
      <div className="rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200 bg-white">
              <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-600 text-sm">
                SC
              </TableHead>
              <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-600 text-sm">
                Connection Status
              </TableHead>
              <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-600 text-sm">
                Agents
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3} className="h-[200px] text-center">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="text-gray-400 text-lg">📁</div>
                  <div>
                    <p className="text-gray-600 font-medium">No smart connections found</p>
                    <p className="text-gray-400 text-sm">Add a new connection to get started</p>
                  </div>
                  <Button>Add a New Connection</Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <SmartConnectionsTableFooter totalConnections={0} />
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-white overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200 bg-white">
            <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-600 text-sm">
              SC
            </TableHead>
            <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-600 text-sm">
              Connection Status
            </TableHead>
            <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-600 text-sm">
              Agents
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-200">
          {connections.map((connection, index) => (
            <>
              <TableRow 
                key={connection.id}
                className={`h-14 hover:bg-gray-50 cursor-pointer transition-colors ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
                onClick={(e) => handleRowClick(connection.id, e)}
              >
                <TableCell className="px-4 py-3">
                  <div className="font-medium text-gray-900 text-base">
                    {connection.receivableEntity}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {getRandomCompanyName()}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <SmartConnectionStatusBadge status={connection.status} />
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {expandedRows.has(connection.id) ? (
                        <ChevronDown className="h-4 w-4 text-gray-600 transition-transform" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-600 transition-transform" />
                      )}
                      <span className="text-gray-600 text-base">
                        {connection.agents.length} agent{connection.agents.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="kebab-menu">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border shadow-lg z-50">
                          <DropdownMenuItem>Edit SC</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleAddAgent(connection.id)}>
                            Add Agent
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Deactivate
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              {expandedRows.has(connection.id) && (
                <TableRow>
                  <TableCell colSpan={3} className="p-0">
                    <ExpandedAgentCard connection={connection} />
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
      </Table>
      <SmartConnectionsTableFooter totalConnections={connections.length} />
    </div>
  );
}
