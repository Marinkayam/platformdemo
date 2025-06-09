
import React, { useState } from 'react';
import { Building, Eye, Edit, Trash2 } from 'lucide-react';
import { AgentStatusBadge } from '@/components/ui/agent-status-badge';
import { AgentUserTypeBadge } from '@/components/ui/agent-user-type-badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { PortalUser } from '@/types/portalUser';
import { TableTemplate, commonActions } from '@/components/ui/table-template';
import { AddPortalUserModal } from './AddPortalUserModal';
import { PortalUsersEmptyState } from './PortalUsersEmptyState';

interface PortalUsersTableProps {
  portalUsers: PortalUser[];
}

export function PortalUsersTable({ portalUsers }: PortalUsersTableProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<PortalUser | null>(null);

  const handleAddPortalUser = (userData: Partial<PortalUser>) => {
    console.log('Adding portal user:', userData);
  };

  const handleEditPortalUser = (userData: Partial<PortalUser>) => {
    console.log('Editing portal user:', userData);
  };

  const handleRemovePortalUser = (id: string) => {
    if (confirm('Are you sure you want to remove this portal user?\nThis may affect Smart Connections that depend on it.')) {
      console.log('Removing portal user:', id);
    }
  };

  const getRowActions = (portalUser: PortalUser) => [
    {
      label: "Edit",
      icon: Edit,
      onClick: () => setEditingUser(portalUser)
    },
    {
      label: "Remove",
      icon: Trash2,
      onClick: () => handleRemovePortalUser(portalUser.id),
      variant: "destructive" as const
    }
  ];

  const columns = [
    {
      key: 'portal' as keyof PortalUser,
      label: 'Portal',
      sortable: true,
      sticky: true,
      render: (portal: string) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-primary-light flex items-center justify-center">
            <Building className="h-3 w-3 text-primary-main" />
          </div>
          <span className="font-medium">{portal}</span>
        </div>
      )
    },
    {
      key: 'username' as keyof PortalUser,
      label: 'Username',
      sortable: true,
      render: (username: string) => (
        <span className="font-mono text-sm">{username}</span>
      )
    },
    {
      key: 'status' as keyof PortalUser,
      label: 'Status',
      sortable: true,
      render: (status: string) => <AgentStatusBadge status={status} />
    },
    {
      key: 'userType' as keyof PortalUser,
      label: 'User Type',
      sortable: true,
      render: (userType: string, portalUser: PortalUser) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <AgentUserTypeBadge type={userType as "Monto" | "External"} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {userType === "Monto" 
                  ? "Monto-managed user. You can view credentials but not edit them."
                  : "Customer-managed user. You can edit and remove this user."
                }
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
    {
      key: 'linkedSmartConnections' as keyof PortalUser,
      label: 'Linked Smart Connections',
      sortable: true,
      render: (count: number, portalUser: PortalUser) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-help">
                {count > 0 ? `${count} Smart Connections` : '—'}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {count > 0 
                  ? `Smart Connections that use this portal user's agent(s)`
                  : "This user isn't linked to any Smart Connection yet."
                }
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
    {
      key: 'lastUpdated' as keyof PortalUser,
      label: 'Last Updated',
      sortable: true,
      render: (lastUpdated: string) => (
        <span className="text-grey-600">
          {formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}
        </span>
      )
    }
  ];

  if (portalUsers.length === 0) {
    return <PortalUsersEmptyState onAddPortalUser={() => setIsAddModalOpen(true)} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-grey-900">Portal Users</h3>
          <p className="text-sm text-grey-600">Manage portal credentials used by your Smart Connections</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          + Add Portal User
        </Button>
      </div>

      <TableTemplate
        data={portalUsers}
        columns={columns}
        getRowActions={getRowActions}
        emptyMessage="No portal users found."
      />

      <AddPortalUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        mode="create"
        onSave={handleAddPortalUser}
      />

      {editingUser && (
        <AddPortalUserModal
          isOpen={true}
          onClose={() => setEditingUser(null)}
          mode="edit"
          portalUser={editingUser}
          onSave={handleEditPortalUser}
        />
      )}
    </div>
  );
}

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