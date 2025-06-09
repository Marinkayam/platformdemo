import { useState } from "react";
import { ChevronDown, ChevronRight, MoreVertical, AlertTriangle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SmartConnectionStatusBadge } from "./SmartConnectionStatusBadge";
import { ExpandedAgentCard } from "./ExpandedAgentCard";
import { SmartConnectionsTableFooter } from "./SmartConnectionsTableFooter";
import { SmartConnection } from "@/types/smartConnection";
import { useNavigate } from "react-router-dom";
import { getConnectionIssues, getHighestSeverityIssue } from "@/utils/connectionIssues";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
            <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9]">
              <TableHead className="sticky left-0 z-10 bg-[#F6F7F9] border-r border-gray-200 flex-1">
                SC
              </TableHead>
              <TableHead className="flex-1">Connection Status</TableHead>
              <TableHead className="flex-1">Issues</TableHead>
              <TableHead className="flex-1">Agents</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} className="h-[200px] text-center">
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
    <div className="rounded-xl border overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9]">
              <TableHead className="sticky left-0 z-10 bg-[#F6F7F9] border-r border-gray-200 flex-1">
                SC
              </TableHead>
              <TableHead className="flex-1">Connection Status</TableHead>
              <TableHead className="flex-1">Issues</TableHead>
              <TableHead className="flex-1">Agents</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100">
            {connections.map((connection) => {
              const issues = getConnectionIssues(connection);
              const highestIssue = getHighestSeverityIssue(issues);
              
              return (
                <>
                  <TableRow 
                    key={connection.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors bg-white"
                    onClick={(e) => handleRowClick(connection.id, e)}
                  >
                    <TableCell className="sticky left-0 z-10 bg-white border-r border-gray-100">
                      <div className="font-semibold text-gray-900">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="truncate cursor-help">{connection.receivableEntity}</span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{connection.receivableEntity}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {getRandomCompanyName()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <SmartConnectionStatusBadge status={connection.status} />
                    </TableCell>
                    <TableCell>
                      {highestIssue && (
                        <div className="flex items-center gap-2 text-left">
                          <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                          <Badge 
                            variant="outline" 
                            className="text-red-700 border-red-300 bg-transparent truncate"
                          >
                            {highestIssue.message}
                          </Badge>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {expandedRows.has(connection.id) ? (
                            <ChevronDown className="h-4 w-4 text-gray-600 transition-transform" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-600 transition-transform" />
                          )}
                          <span className="text-gray-600">
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
                      <TableCell colSpan={4} className="p-0">
                        <ExpandedAgentCard connection={connection} />
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <SmartConnectionsTableFooter totalConnections={connections.length} />
    </div>
  );
}
