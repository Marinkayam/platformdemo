import { useState } from "react";
import { ChevronDown, ChevronRight, Plus, AlertTriangle, ExternalLink } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/ui/status-badge";
import { TableActions, commonActions } from "@/components/ui/table-actions";
import { ExpandedAgentCard } from "./ExpandedAgentCard";
import { PaymentsRelationshipsTableFooter } from "./PaymentsRelationshipsTableFooter";
import { SmartConnection } from "@/types/smartConnection";
import { useNavigate } from "react-router-dom";
import { getConnectionIssues, getHighestSeverityIssue } from "@/utils/connectionIssues";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import React from "react";
import { AutoCreatedTag } from "@/components/ui/auto-created-tag";

interface SmartConnectionsTableProps {
  connections: SmartConnection[];
}

const getRandomCompanyName = () => {
  const companies = ["Monto LTD", "Monto INC", "Monto Corp", "Monto LLC"];
  return companies[Math.floor(Math.random() * companies.length)];
};

export function PaymentsRelationshipsTable({ connections }: SmartConnectionsTableProps) {
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
    if ((event.target as HTMLElement).closest('.actions-cell')) {
      return;
    }
    toggleRow(connectionId);
  };

  const handleAddAgent = (connectionId: string) => {
    navigate(`/payments-relationships/add-agent?connectionId=${connectionId}`);
  };

  const handleEditConnection = (connectionId: string) => {
    console.log('Edit connection:', connectionId);
  };

  const handleDeactivateConnection = (connectionId: string) => {
    console.log('Deactivate connection:', connectionId);
  };

  const getConnectionActions = (connection: SmartConnection) => [
    {
      label: "View Agents",
      icon: ExternalLink,
      onClick: () => toggleRow(connection.id),
      variant: "default" as const
    },
    {
      label: "Add Agent",
      icon: Plus,
      onClick: () => handleAddAgent(connection.id),
      variant: "default" as const
    },
    commonActions.edit(() => handleEditConnection(connection.id)),
    {
      label: "Deactivate",
      icon: AlertTriangle,
      onClick: () => handleDeactivateConnection(connection.id),
      variant: "destructive" as const
    }
  ];

  if (connections.length === 0) {
    return (
      <div className="rounded-xl border bg-white">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9]">
              <TableHead className="sticky left-0 z-10 bg-[#F6F7F9] border-r border-gray-200 w-[280px]">
                Smart Connection
              </TableHead>
              <TableHead className="w-[140px]">Status</TableHead>
              <TableHead className="w-[200px]">Issues</TableHead>
              <TableHead className="w-[120px]">Agents</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="h-[200px] text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="text-gray-400 text-4xl">📁</div>
                  <div className="space-y-2">
                    <p className="text-gray-900 font-semibold text-lg">No payments relationships found</p>
                    <p className="text-gray-500 text-sm">Add a new relationship to get started</p>
                  </div>
                  <Button className="mt-2">Add New Relationship</Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <PaymentsRelationshipsTableFooter totalConnections={0} />
      </div>
    );
  }

  return (
    <div className="rounded-xl border overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9] border-b border-gray-200">
              <TableHead className="sticky left-0 z-10 bg-[#F6F7F9] border-r border-gray-200 w-[280px] py-4">
                Smart Connection
              </TableHead>
              <TableHead className="w-[140px] py-4">Status</TableHead>
              <TableHead className="w-[200px] py-4">Issues</TableHead>
              <TableHead className="w-[120px] py-4">Agents</TableHead>
              <TableHead className="w-[120px] py-4"> </TableHead>
              <TableHead className="w-[100px] py-4"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100">
            {connections.map((connection) => {
              const issues = getConnectionIssues(connection);
              const highestIssue = getHighestSeverityIssue(issues);
              const isExpanded = expandedRows.has(connection.id);
              const isAutoCreated = ['Google LLC', 'Apple Inc.', 'IBM Corp', 'Monto INC'].includes(connection.receivableEntity);
              
              return (
                <React.Fragment key={connection.id}>
                  <TableRow 
                    className={`hover:bg-gray-50 cursor-pointer transition-colors bg-white group ${isAutoCreated ? 'auto-created-row' : ''}`}
                    onClick={(e) => handleRowClick(connection.id, e)}
                  >
                    <TableCell className="sticky left-0 z-10 bg-white border-r border-gray-100 group-hover:bg-gray-50 py-6">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 p-1">
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 text-gray-600 transition-transform duration-200" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-gray-600 transition-transform duration-200" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="font-semibold text-gray-900 text-base truncate">
                                  {connection.receivableEntity}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{connection.receivableEntity}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <div className="text-sm text-gray-500 mt-1">
                            {getRandomCompanyName()}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    
                    <TableCell className="py-6">
                      <StatusBadge status={connection.status} />
                    </TableCell>
                    
                    <TableCell className="py-6">
                      {highestIssue ? (
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0" />
                          <Badge 
                            variant="outline" 
                            className="text-red-700 border-red-200 bg-red-50 font-normal"
                          >
                            {highestIssue.message}
                          </Badge>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">No issues</span>
                      )}
                    </TableCell>
                    
                    <TableCell className="py-6">
                      {(() => {
                        // Filter agents same way as AgentTable to get accurate count
                        const activeAgents = connection.agents.filter(agent => 
                          !(agent.type === "Monto" && agent.status === "Disconnected")
                        );
                        
                        if (activeAgents.length === 0) {
                          return (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-primary hover:text-primary/80 p-0 h-auto font-normal"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddAgent(connection.id);
                              }}
                            >
                              +Add Agent
                            </Button>
                          );
                        }
                        
                        return (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-700 font-medium">
                              {activeAgents.length}
                            </span>
                            <span className="text-gray-500 text-sm">
                              agent{activeAgents.length !== 1 ? 's' : ''}
                            </span>
                          </div>
                        );
                      })()}
                    </TableCell>
                    
                    <TableCell className="py-6">
                      {isAutoCreated && (
                        <AutoCreatedTag />
                      )}
                    </TableCell>
                    
                    <TableCell className="py-6 actions-cell text-right pr-6">
                      <TableActions actions={getConnectionActions(connection)} />
                    </TableCell>
                  </TableRow>
                  
                  {isExpanded && (
                    <TableRow>
                      <TableCell colSpan={6} className="p-0 bg-gray-50">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-sm font-normal text-gray-900">Agents</h3>
                          </div>
                          <ExpandedAgentCard connection={connection} />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <PaymentsRelationshipsTableFooter totalConnections={connections.length} />
    </div>
  );
}
