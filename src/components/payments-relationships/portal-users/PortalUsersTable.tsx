import React, { useState, useMemo } from 'react';
import { PortalUser } from '@/types/portalUser';
import { AddPortalUserModal } from './AddPortalUserModal';
import { View2FAModal } from './View2FAModal';
import { PortalUserDetailModal } from './PortalUserDetailModal';
import { PortalUsersTableFooter } from './PortalUsersTableFooter';
import { ScanAgentsPagination } from '@/components/scan-agents/components/ScanAgentsPagination';
import { PortalUsersTableHeader } from './PortalUsersTableHeader';
import { PortalUsersTableBody } from './PortalUsersTableBody';
import { PortalUsersFilteredEmptyState } from './PortalUsersFilteredEmptyState';
import { toast } from "@/hooks/use-toast";
import { mockPortalUsersForTable } from '@/data/portalUsersForTable';
import { groupPortalUsers } from './utils/portalAggregation';
import { useSortedPortalUsers } from '@/hooks/useSortedPortalUsers';
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { Table } from "@/components/ui/table";

interface PortalUsersTableProps {
  portalUsers?: PortalUser[];
  onEditPortalUser?: (user: PortalUser) => void;
  onRemovePortalUser?: (id: string) => void;
  isLoading?: boolean;
}

export function PortalUsersTable({
  portalUsers: propPortalUsers,
  onEditPortalUser,
  onRemovePortalUser,
  isLoading = false,
}: PortalUsersTableProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<PortalUser | null>(null);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [selected2FAUserId, setSelected2FAUserId] = useState<string | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedPortalUser, setSelectedPortalUser] = useState<PortalUser | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const portalUsers = propPortalUsers || mockPortalUsersForTable;
  
  // Add sorting functionality
  const {
    sortedPortalUsers,
    sortField,
    sortDirection,
    handleSort,
  } = useSortedPortalUsers(portalUsers);

  // Calculate pagination
  const totalPages = Math.ceil(sortedPortalUsers.length / pageSize);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedPortalUsers.slice(startIndex, startIndex + pageSize);
  }, [sortedPortalUsers, currentPage, pageSize]);

  // Group and sort portal users - get the properly sorted allPortals array
  const { allPortals } = useMemo(() => {
    return groupPortalUsers(paginatedUsers);
  }, [paginatedUsers]);

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

  const toggleGroup = (portalName: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(portalName)) {
      newExpanded.delete(portalName);
    } else {
      newExpanded.add(portalName);
    }
    setExpandedGroups(newExpanded);
  };

  if (portalUsers.length === 0) {
    return <PortalUsersFilteredEmptyState onAddPortalUser={() => setIsAddModalOpen(true)} />;
  }

  return (
    <div className="rounded-xl border overflow-hidden bg-white">
      <div className="max-h-[600px] overflow-y-auto">
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-[#F6F7F9]">
          <PortalUsersTableHeader 
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
        </div>
        {isLoading ? (
          <TableSkeleton rows={8} columns={6} />
        ) : (
          <PortalUsersTableBody
            allPortals={allPortals}
            expandedGroups={expandedGroups}
            onToggleGroup={toggleGroup}
            onEdit={handleEdit}
            onRemove={handleRemove}
            onView2FA={handleView2FA}
            onRowClick={handleRowClick}
            copyToClipboard={copyToClipboard}
          />
        )}
      </div>

      <ScanAgentsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        pageSize={pageSize}
        totalItems={sortedPortalUsers.length}
        agents={sortedPortalUsers}
      />

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
            // Just update the user data, don't open edit modal
            console.log('Updated user:', user);
            // In a real app, this would update the user in the list/state
          }}
          onDeletePortalUser={(userId) => {
            closeDetailModal();
            handleRemove(userId);
          }}
        />
      )}
    </div>
  );
}
