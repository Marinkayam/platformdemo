
import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SmartConnectionStatusBadge } from "@/components/ui/smart-connection-status-badge";
import { AgentDetails } from "./AgentDetails";
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (connections.length === 0) {
    return (
      <div className="rounded-xl border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Receivable → Payable</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Agents</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="h-[200px] text-center">
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
            <TableHead>Receivable → Payable</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Agents</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y">
          {connections.map((connection, index) => (
            <TableRow 
              key={connection.id}
              className={`h-14 hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
            >
              <TableCell>
                <div>
                  <div className="font-medium text-gray-900">
                    {connection.receivableEntity} → {connection.payableEntity}
                  </div>
                  <div className="text-sm text-gray-500">
                    {connection.receivableErp} → {connection.payableErp}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <SmartConnectionStatusBadge status={connection.status} />
              </TableCell>
              <TableCell>
                <AgentDetails
                  agents={connection.agents}
                  isExpanded={expandedRows.has(connection.id)}
                  onToggle={() => toggleRow(connection.id)}
                />
              </TableCell>
              <TableCell className="text-gray-600">
                {formatDate(connection.lastUpdated)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Hide Agents</DropdownMenuItem>
                    <DropdownMenuItem>Edit Connection</DropdownMenuItem>
                    <DropdownMenuItem>View Credentials</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Delete Connection
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
