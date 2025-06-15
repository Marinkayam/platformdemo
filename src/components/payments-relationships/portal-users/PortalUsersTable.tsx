
import React, { useState } from 'react';
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
      // In a real application, you'd send this to an API to update
    } else {
      console.log('Adding portal user:', userData);
      // In a real application, you'd send this to an API to create
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
        // In a real application, you'd send this to an API
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
    return <PortalUsersEmptyState onAddPortalUser={() => setIsAddModalOpen(true)} />;
  }

  return (
    <div className="rounded-xl border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-grey-50 hover:bg-grey-50">
            {columns.map(column => (
              <TableHead key={column.key} className={column.sticky ? "sticky left-0 bg-grey-50 z-10 border-r border-grey-200" : ""}>
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {portalUsers.map((portalUser) => (
            <TableRow key={portalUser.id} className="h-[65px] hover:bg-grey-50 cursor-pointer transition-colors" onClick={() => handleRowClick(portalUser)}>
              {columns.map(column => (
                <TableCell key={column.key} className={column.sticky ? "sticky left-0 bg-background-paper z-10 border-r border-grey-200" : ""}>
                  {column.render(portalUser[column.key as keyof PortalUser], portalUser)}
                </TableCell>
              ))}
            </TableRow>
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
