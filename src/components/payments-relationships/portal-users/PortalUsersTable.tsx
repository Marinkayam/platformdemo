
import React, { useState, useMemo } from 'react';
import { PortalUser } from '@/types/portalUser';
import { AddPortalUserModal } from './AddPortalUserModal';
import { View2FAModal } from './View2FAModal';
import { PortalUserDetailModal } from './PortalUserDetailModal';
import { toast } from "@/hooks/use-toast";
import { mockPortalUsersForTable } from '@/data/portalUsersForTable';
import { groupPortalUsers, PortalGroup } from './utils/groupPortalUsers';
import { PortalRow } from './components/PortalRow';

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
  const [expandedPortals, setExpandedPortals] = useState<Set<string>>(new Set());

  const portalUsers = propPortalUsers || mockPortalUsersForTable;

  const portalGroups = useMemo(() => {
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

  const togglePortalExpansion = (portalName: string) => {
    setExpandedPortals(prev => {
      const newSet = new Set(prev);
      if (newSet.has(portalName)) {
        newSet.delete(portalName);
      } else {
        newSet.add(portalName);
      }
      return newSet;
    });
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
      </div>
    );
  }

  return (
    <div className="rounded-xl border overflow-hidden bg-white">
      <div className="overflow-x-auto">
        {/* Table Header */}
        <div 
          className="grid grid-cols-7 gap-4 p-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700 text-sm"
          style={{ gridTemplateColumns: '3fr 2fr 1fr 2fr 1fr 2fr 1fr' }}
        >
          <div className="sticky left-0 bg-gray-50 z-20 border-r border-gray-200 min-w-[200px]">Portal</div>
          <div>Username</div>
          <div>Status</div>
          <div>User Type</div>
          <div className="hidden md:block">Linked Agents</div>
          <div className="hidden lg:block">Validation</div>
          <div>Actions</div>
        </div>

        {/* Portal Groups */}
        <div>
          {portalGroups.map((portalGroup) => (
            <PortalRow
              key={portalGroup.portalName}
              portalGroup={portalGroup}
              isExpanded={expandedPortals.has(portalGroup.portalName)}
              onToggleExpansion={() => togglePortalExpansion(portalGroup.portalName)}
              onEdit={handleEdit}
              onRemove={handleRemove}
              onView2FA={handleView2FA}
              copyToClipboard={copyToClipboard}
            />
          ))}
        </div>
      </div>

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
