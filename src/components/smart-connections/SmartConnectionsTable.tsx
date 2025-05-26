
import { useState } from "react";
import { ChevronDown, ChevronRight, MoreVertical } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SmartConnectionStatusBadge } from "@/components/ui/smart-connection-status-badge";
import { ExpandedAgentCard } from "./ExpandedAgentCard";
import { SmartConnection } from "@/types/smartConnection";

interface SmartConnectionsTableProps {
  connections: SmartConnection[];
}

export function SmartConnectionsTable({ connections }: SmartConnectionsTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

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
    // Don't expand if clicking on the kebab menu
    if ((event.target as HTMLElement).closest('.kebab-menu')) {
      return;
    }
    toggleRow(connectionId);
  };

  if (connections.length === 0) {
    return (
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium text-gray-900">Receivable</TableHead>
              <TableHead className="font-medium text-gray-900">Connection Status</TableHead>
              <TableHead className="font-medium text-gray-900">Agents</TableHead>
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
      </div>
    );
  }

  return (
    <div className="rounded-xl border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium text-gray-900">Receivable</TableHead>
            <TableHead className="font-medium text-gray-900">Connection Status</TableHead>
            <TableHead className="font-medium text-gray-900">Agents</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y">
          {connections.map((connection, index) => (
            <>
              <TableRow 
                key={connection.id}
                className={`h-14 hover:bg-gray-100 cursor-pointer transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                onClick={(e) => handleRowClick(connection.id, e)}
              >
                <TableCell>
                  <div className="font-medium text-gray-900 text-base" style={{ fontFamily: 'Inter' }}>
                    {connection.receivableEntity}
                  </div>
                </TableCell>
                <TableCell>
                  <SmartConnectionStatusBadge status={connection.status} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {expandedRows.has(connection.id) ? (
                        <ChevronDown className="h-4 w-4 text-gray-600 transition-transform" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-gray-600 transition-transform" />
                      )}
                      <span className="text-gray-600 text-base" style={{ fontFamily: 'Inter' }}>
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
                          <DropdownMenuItem>Add Agent</DropdownMenuItem>
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
    </div>
  );
}
