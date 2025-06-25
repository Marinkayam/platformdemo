
import React, { useState, useMemo } from 'react';
import { PortalUser } from '@/types/portalUser';
import { AddPortalUserModal } from './AddPortalUserModal';
import { PortalUsersEmptyState } from './PortalUsersEmptyState';
import { View2FAModal } from './View2FAModal';
import { PortalUserDetailModal } from './PortalUserDetailModal';
import { PortalUsersTableFooter } from './PortalUsersTableFooter';
import { PortalGroupHeader } from './PortalGroupHeader';
import { PortalRowGroup } from './PortalRowGroup';
import { UserRow } from './UserRow';
import { toast } from "@/hooks/use-toast";
import { mockPortalUsersForTable } from '@/data/portalUsersForTable';
import { groupPortalUsers } from './utils/portalAggregation';
import { PortalColumn } from './columns/PortalColumn';
import { UsernameColumn } from './columns/UsernameColumn';
import { UserTypeColumn } from './columns/UserTypeColumn';
import { LinkedAgentsColumn } from './columns/LinkedAgentsColumn';
import { ValidationColumn } from './columns/ValidationColumn';
import { ActionsColumn } from './columns/ActionsColumn';
import { StatusBadge } from '@/components/ui/status-badge';

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
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const portalUsers = propPortalUsers || mockPortalUsersForTable;

  // Group and sort portal users - get the properly sorted allPortals array
  const { allPortals } = useMemo(() => {
    return groupPortalUsers(portalUsers);
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
        <PortalUsersTableFooter totalUsers={0} />
      </div>
    );
  }

  return (
    <div className="rounded-xl border overflow-hidden bg-white">
      {/* Table Header */}
      <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-grey-50 border-b border-gray-200">
        <div className="text-sm font-semibold text-gray-700">Portal</div>
        <div className="text-sm font-semibold text-gray-700">Username</div>
        <div className="text-sm font-semibold text-gray-700">Status</div>
        <div className="text-sm font-semibold text-gray-700">User Type</div>
        <div className="text-sm font-semibold text-gray-700">Linked Agents</div>
        <div className="text-sm font-semibold text-gray-700">Validation</div>
      </div>

      {/* Table Body - Now rendering in the correct sorted order */}
      <div className="divide-y divide-gray-100">
        {allPortals.map((portalDisplay) => (
          <div key={portalDisplay.portal}>
            {portalDisplay.displayType === 'individual' ? (
              // Individual Portal Row
              portalDisplay.users.map((user) => (
                <div 
                  key={user.id}
                  className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleRowClick(user)}
                >
                  <div className="flex items-center">
                    <PortalColumn portal={user.portal} />
                  </div>
                  <div className="flex items-center">
                    <UsernameColumn username={user.username} onCopy={copyToClipboard} />
                  </div>
                  <div className="flex items-center">
                    <StatusBadge status={user.status} />
                  </div>
                  <div className="flex items-center">
                    <UserTypeColumn userType={user.userType} />
                  </div>
                  <div className="flex items-center">
                    <LinkedAgentsColumn count={user.linkedSmartConnections} />
                  </div>
                  <div className="flex items-center">
                    <ValidationColumn portalUser={user} />
                    <div className="ml-auto">
                      <ActionsColumn
                        portalUser={user}
                        onEdit={handleEdit}
                        onRemove={handleRemove}
                        onView2FA={handleView2FA}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Grouped Portal Row
              portalDisplay.portalGroup && (
                <>
                  <PortalGroupHeader
                    portalGroup={portalDisplay.portalGroup}
                    isExpanded={expandedGroups.has(portalDisplay.portal)}
                    onToggle={() => toggleGroup(portalDisplay.portal)}
                  />
                  <PortalRowGroup
                    users={portalDisplay.users}
                    isExpanded={expandedGroups.has(portalDisplay.portal)}
                    onEdit={handleEdit}
                    onRemove={handleRemove}
                    onView2FA={handleView2FA}
                    copyToClipboard={copyToClipboard}
                    onUserClick={handleRowClick}
                  />
                </>
              )
            )}
          </div>
        ))}
      </div>

      <PortalUsersTableFooter totalUsers={portalUsers.length} />

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
