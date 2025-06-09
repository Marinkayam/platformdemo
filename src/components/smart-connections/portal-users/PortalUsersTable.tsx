import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SmartConnectionStatusBadge } from "@/components/ui/smart-connection-status-badge";

// Mock data for Portal Users (will be passed as props later)
interface PortalUser {
  id: string;
  portal: string;
  username: string;
  status: string;
  userType: "Monto User" | "Customer User";
  linkedSmartConnections: string[];
  lastUpdated: string;
}

interface PortalUsersTableProps {
  portalUsers: PortalUser[];
  onEditPortalUser?: (user: PortalUser) => void;
  onRemovePortalUser?: (id: string) => void;
}

// Utility to map agent status to Portal User status
const mapAgentStatusToPortalUserStatus: Record<string, "Live" | "In Process" | "Disconnected"> = {
  ELIGIBLE: "Live",
  UNDER_CONSTRUCTION: "In Process",
  INELIGIBLE: "Disconnected",
};

export function PortalUsersTable({
  portalUsers,
  onEditPortalUser,
  onRemovePortalUser,
}: PortalUsersTableProps) {
  // This is a comment to trigger re-compile
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Portal</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>User Type</TableHead>
          <TableHead>
            <Tooltip>
              <TooltipTrigger>Linked Smart Connections</TooltipTrigger>
              <TooltipContent>Smart Connections that use this portal user's agent(s)</TooltipContent>
            </Tooltip>
          </TableHead>
          <TableHead>Last Updated</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {portalUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.portal}</TableCell>
            <TableCell className="font-medium">
              {user.username.replace(/(.{2}).*(@.*)/, '$1***$2')}
            </TableCell>
            <TableCell>
              <SmartConnectionStatusBadge status={mapAgentStatusToPortalUserStatus[user.status]} className="text-xs" />
              {user.status === "INELIGIBLE" && (
                <Tooltip>
                  <TooltipTrigger className="ml-2 text-error-main text-xs cursor-help">!</TooltipTrigger>
                  <TooltipContent>Monto couldn't validate the credentials. You may need to update them.</TooltipContent>
                </Tooltip>
              )}
            </TableCell>
            <TableCell>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant={user.userType === "Monto User" ? "secondary" : "outline"}>
                    {user.userType}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  {user.userType === "Monto User"
                    ? "Monto-managed user. You can view credentials but not edit them."
                    : "Customer-managed user."
                  }
                </TooltipContent>
              </Tooltip>
            </TableCell>
            <TableCell>
              {user.linkedSmartConnections.length > 0 ? (
                <Tooltip>
                  <TooltipTrigger>{user.linkedSmartConnections.length} Smart Connections</TooltipTrigger>
                  <TooltipContent>
                    <ul className="list-disc list-inside">
                      {user.linkedSmartConnections.map((sc, index) => (
                        <li key={index}>{sc}</li>
                      ))}
                    </ul>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <Tooltip>
                  <TooltipTrigger>—</TooltipTrigger>
                  <TooltipContent>This user isn't linked to any Smart Connection yet.</TooltipContent>
                </Tooltip>
              )}
            </TableCell>
            <TableCell>{user.lastUpdated}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEditPortalUser?.(user)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onRemovePortalUser?.(user.id)} className="text-error-main">
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
} 