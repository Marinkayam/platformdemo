import React, { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { PaymentsRelationshipsHeader } from "@/components/payments-relationships/PaymentsRelationshipsHeader";
import { TooltipProvider } from "@/components/ui/tooltip";
import { mockPortalUsers } from "@/data/portalUsers";
import { PortalUser } from "@/types/portalUser";
import { PortalUsersTable } from "@/components/payments-relationships/portal-users";
import { PortalUsersFilters } from "@/components/payments-relationships/portal-users/PortalUsersFilters";
import { AddPortalUserModal } from "@/components/payments-relationships/portal-users/AddPortalUserModal";
import { ConfirmRemoveModal } from "@/components/payments-relationships/portal-users/ConfirmRemoveModal";
import { usePortalUserFiltering } from "@/hooks/usePortalUserFiltering";

export default function ScanAgents() {
  const [isAddPortalUserModalOpen, setIsAddPortalUserModalOpen] = useState(false);
  const [isConfirmRemoveModalOpen, setIsConfirmRemoveModalOpen] = useState(false);
  const [userToRemoveId, setUserToRemoveId] = useState<string | null>(null);
  const [portalUsers, setPortalUsers] = useState<PortalUser[]>(
    mockPortalUsers.filter(u => !['Coupa','Amazon Payee','Oracle Procurement'].includes(u.portal))
  );

  const {
    filters: portalUserFilters,
    filteredUsers,
    handleFilterChange: handlePortalUserFilterChange,
    handleResetFilters: handleResetPortalUserFilters
  } = usePortalUserFiltering(portalUsers);

  const handleConfirmRemove = () => {
    if (userToRemoveId) {
      setPortalUsers(prev => prev.filter(user => user.id !== userToRemoveId));
      setIsConfirmRemoveModalOpen(false);
      setUserToRemoveId(null);
    }
  };

  const handleAddModalSubmit = (userData: Partial<PortalUser>) => {
    const newUser: PortalUser = {
      id: `pu${Date.now()}`,
      portal: userData.portal || '',
      username: userData.username || '',
      status: userData.status || 'Validating',
      userType: userData.userType || 'External',
      linkedSmartConnections: userData.linkedSmartConnections || 0,
      lastUpdated: new Date().toISOString(),
      isReadOnly: false,
      twoFAMethod: userData.twoFAMethod,
      phoneNumber: userData.phoneNumber,
      verificationEmail: userData.verificationEmail,
      issue: userData.issue
    };

    setPortalUsers(prev => [...prev, newUser]);
    setIsAddPortalUserModalOpen(false);
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageHeader 
            title="Scan Agents" 
            subtitle="Portal Agents automatically scan portals, sync invoice and PO data, and keep your records up to date—no manual effort needed." 
          />
          <PaymentsRelationshipsHeader 
            activeTab="scan-agents"
            onAddPortalUser={() => setIsAddPortalUserModalOpen(true)}
          />
        </div>
        
        <PortalUsersFilters
          filters={portalUserFilters}
          onFilterChange={handlePortalUserFilterChange}
          onClearFilters={handleResetPortalUserFilters}
        />
        
        <PortalUsersTable 
          portalUsers={filteredUsers} 
          onRemovePortalUser={(id) => {
            setUserToRemoveId(id);
            setIsConfirmRemoveModalOpen(true);
          }}
        />
      </div>

      <AddPortalUserModal
        isOpen={isAddPortalUserModalOpen}
        onClose={() => setIsAddPortalUserModalOpen(false)}
        mode="create"
        onSave={handleAddModalSubmit}
      />

      <ConfirmRemoveModal
        isOpen={isConfirmRemoveModalOpen}
        onClose={() => setIsConfirmRemoveModalOpen(false)}
        onConfirm={handleConfirmRemove}
        itemName={portalUsers.find(user => user.id === userToRemoveId)?.username || "this scan agent"}
      />
    </TooltipProvider>
  );
}