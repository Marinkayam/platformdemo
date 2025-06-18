
import React, { useState, useMemo } from 'react';
import { PortalUser } from '@/types/portalUser';
import { AddPortalUserModal } from './AddPortalUserModal';
import { PortalUsersEmptyState } from './PortalUsersEmptyState';
import { View2FAModal } from './View2FAModal';
import { PortalUserDetailModal } from './PortalUserDetailModal';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { mockPortalUsersForTable } from '@/data/portalUsersForTable';
import { getColumns } from './PortalUsersTable.columns';

interface PortalUsersTableProps {
  portalUsers?: PortalUser[];
  onEditPortalUser?: (user: PortalUser) => void;
  onRemovePortalUser?: (id: string) => void;
}

interface GroupedUsers {
  portal: string;
  users: PortalUser[];
}

export function PortalUsersTable({
  portalUsers: propPortalUsers,
  onEditPortalUser,
  onRemovePortalUser,
}: PortalUsersTableProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<PortalUser | null>(null);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [selected2FAUserId, setSelected2FAUserId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPortalUser, setSelectedPortalUser] = useState<PortalUser | null>(null);

  const portalUsers = propPortalUsers || mockPortalUsersForTable;

  // Group users by portal and sort
  const groupedUsers = useMemo(() => {
    const groups = portalUsers.reduce((acc, user) => {
      const portal = user.portal;
      if (!acc[portal]) {
        acc[portal] = [];
      }
      acc[portal].push(user);
      return acc;
    }, {} as Record<string, PortalUser[]>);

    // Sort portals alphabetically, then users within each group
    return Object.keys(groups)
      .sort()
      .map(portal => ({
        portal,
        users: groups[portal].sort((a, b) => {
          // Sort by status (Connected first), then by username
          if (a.status !== b.status) {
            const statusOrder = { 'Connected': 0, 'Validating': 1, 'Disconnected': 2 };
            return statusOrder[a.status] - statusOrder[b.status];
          }
          return a.username.localeCompare(b.username);
        })
      }));
  }, [portalUsers]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: `${text} copied!` });
  };

  const handleRowClick = (portalUser: PortalUser) => {
    setSelectedPortalUser(portalUser);
    setIsDetailModalOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedPortalUser(null);
  };

  const handleSavePortalUser = (userData: Partial<PortalUser>) => {
    if (editingUser) {
      console.log('Editing portal user:', userData);
    } else {
      console.log('Adding portal user:', userData);
    }
  };

  const handleEdit = (user: PortalUser) => {
    setEditingUser(user);
    setIsAddModalOpen(true);
  };

  const handleRemove = (id: string) => {
    if (onRemovePortalUser) {
      onRemovePortalUser(id);
    } else {
      if (confirm('Are you sure you want to remove this portal user?\nThis may affect Smart Connections that depend on it.')) {
        console.log('Removing portal user:', id);
      }
    }
  };

  const handleView2FA = (portalUserId: string) => {
    setSelected2FAUserId(portalUserId);
    setIs2FAModalOpen(true);
  };

  const close2FAModal = () => {
    setIs2FAModalOpen(false);
    setSelected2FAUserId(null);
  };

  const columns = getColumns({
    onEdit: handleEdit,
    onRemove: handleRemove,
    onView2FA: handleView2FA,
    copyToClipboard,
  });

  if (portalUsers.length === 0) {
    return (
      <div className="rounded-xl border bg-white">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-gray-400 text-4xl mb-4">👥</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No portal users match this filter</h3>
          <p className="text-gray-500 mb-6">Try changing your criteria.</p>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
          >
            Add Portal User
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-grey-50 hover:bg-grey-50">
            {columns.map(column => (
              <TableHead 
                key={column.key} 
                className={`
                  ${column.sticky ? "sticky left-0 bg-grey-50 z-10 border-r border-grey-200" : ""}
                  ${column.key === 'validation' ? 'hidden lg:table-cell' : ''}
                  ${column.key === 'linkedSmartConnections' ? 'hidden md:table-cell' : ''}
                  ${column.key === 'lastUpdated' ? 'hidden xl:table-cell' : ''}
                `}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {groupedUsers.map((group, groupIndex) => (
            <React.Fragment key={group.portal}>
              {groupIndex > 0 && (
                <TableRow className="border-t-2 border-grey-100">
                  <TableCell colSpan={columns.length} className="h-0 p-0" />
                </TableRow>
              )}
              {group.users.map((portalUser, userIndex) => (
                <TableRow 
                  key={portalUser.id} 
                  className={`
                    h-[65px] hover:bg-grey-50 cursor-pointer transition-colors
                    ${groupIndex > 0 && userIndex === 0 ? 'border-t-2 border-grey-200' : ''}
                  `}
                  onClick={() => handleRowClick(portalUser)}
                >
                  {columns.map(column => (
                    <TableCell 
                      key={column.key} 
                      className={`
                        ${column.sticky ? "sticky left-0 bg-background-paper z-10 border-r border-grey-200" : ""}
                        ${column.key === 'validation' ? 'hidden lg:table-cell' : ''}
                        ${column.key === 'linkedSmartConnections' ? 'hidden md:table-cell' : ''}
                        ${column.key === 'lastUpdated' ? 'hidden xl:table-cell' : ''}
                      `}
                    >
                      {column.render(portalUser[column.key as keyof PortalUser], portalUser)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>

      <AddPortalUserModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingUser(null);
        }}
        onSave={handleSavePortalUser}
        portalUser={editingUser || undefined}
        mode={editingUser ? 'edit' : 'create'}
      />
      {is2FAModalOpen && selected2FAUserId && (
        <View2FAModal
          isOpen={is2FAModalOpen}
          onClose={close2FAModal}
          portalUserId={selected2FAUserId}
        />
      )}
      {isDetailModalOpen && selectedPortalUser && (
        <PortalUserDetailModal
          isOpen={isDetailModalOpen}
          onClose={closeDetailModal}
          portalUser={selectedPortalUser}
          onEditPortalUser={(user) => {
            closeDetailModal();
            handleEdit(user);
          }}
        />
      )}
    </div>
  );
}
