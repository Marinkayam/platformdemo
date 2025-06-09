import React, { useState } from 'react';
import { Building, Eye, Edit, Trash2 } from 'lucide-react';
import { AgentStatusBadge } from '@/components/ui/agent-status-badge';
import { AgentUserTypeBadge } from '@/components/ui/agent-user-type-badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';
import { PortalUser } from '@/types/portalUser';
import { AddPortalUserModal } from './AddPortalUserModal';
import { PortalUsersEmptyState } from './PortalUsersEmptyState';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

interface Column {
  key: keyof PortalUser | 'actions';
  label: string;
  sortable?: boolean;
  sticky?: boolean;
  render: (value: any, row: PortalUser) => React.ReactNode;
}

interface PortalUsersTableProps {
  portalUsers: PortalUser[];
  onEditPortalUser?: (user: PortalUser) => void;
  onRemovePortalUser?: (id: string) => void;
}

export function PortalUsersTable({
  portalUsers,
  onEditPortalUser,
  onRemovePortalUser,
}: PortalUsersTableProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<PortalUser | null>(null);

  const handleAddPortalUser = (userData: Partial<PortalUser>) => {
    console.log('Adding portal user:', userData);
    // In a real application, you'd send this to an API
  };

  const handleEditPortalUser = (userData: Partial<PortalUser>) => {
    console.log('Editing portal user:', userData);
    // In a real application, you'd send this to an API
  };

  const handleRemovePortalUser = (id: string) => {
    if (confirm('Are you sure you want to remove this portal user?\nThis may affect Smart Connections that depend on it.')) {
      console.log('Removing portal user:', id);
      // In a real application, you'd send this to an API
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

  const columns: Column[] = [
    {
      key: 'portal',
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
      key: 'username',
      label: 'Username',
      sortable: true,
      render: (username: string) => (
        <span className="font-mono text-sm">{username}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (status: PortalUser['status']) => <AgentStatusBadge status={status} />
    },
    {
      key: 'userType',
      label: 'User Type',
      sortable: true,
      render: (userType: PortalUser['userType'], portalUser: PortalUser) => (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <AgentUserTypeBadge type={userType} />
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
      key: 'linkedSmartConnections',
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
      key: 'lastUpdated',
      label: 'Last Updated',
      sortable: true,
      render: (lastUpdated: string) => (
        <span className="text-grey-600">
          {formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, portalUser: PortalUser) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setEditingUser(portalUser)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRemovePortalUser(portalUser.id)} className="text-error-main">
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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

      <div className="rounded-xl border overflow-hidden bg-white">
        <div className="relative w-full overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F6F7F9] border-b border-gray-200">
                {columns.map((column, index) => (
                  <TableHead
                    key={column.key as string || index}
                    className={column.sticky ? "sticky left-0 z-10 bg-[#F6F7F9] border-r border-gray-200" : ""}
                  >
                    {column.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {portalUsers.map((user) => (
                <TableRow key={user.id}>
                  {columns.map((column, index) => (
                    <TableCell key={column.key as string || index}>
                      {column.render ? column.render((user as any)[column.key], user) : (user as any)[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

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