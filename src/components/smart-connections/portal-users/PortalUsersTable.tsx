
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
