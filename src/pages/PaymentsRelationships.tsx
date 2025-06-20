
import React, { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { PaymentsRelationshipsHeader } from "@/components/payments-relationships/PaymentsRelationshipsHeader";
import { PaymentsRelationshipsFilters } from "@/components/payments-relationships/PaymentsRelationshipsFilters";
import { PaymentsRelationshipsTable } from "@/components/payments-relationships/PaymentsRelationshipsTable";
import { DesignTabs } from "@/components/ui/design-tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { mockSmartConnections } from "@/data/smartConnections";
import { mockPortalUsers } from "@/data/portalUsers";
import { useSmartConnectionFiltering } from "@/hooks/useSmartConnectionFiltering";
import { PortalUser, PortalUserFilters, defaultPortalUserFilters } from "@/types/portalUser";
import { PortalUsersTable } from "@/components/payments-relationships/portal-users";
import { PortalUsersFilters } from "@/components/payments-relationships/portal-users/PortalUsersFilters";
import { AddPortalUserModal } from "@/components/payments-relationships/portal-users/AddPortalUserModal";
import { ConfirmRemoveModal } from "@/components/payments-relationships/portal-users/ConfirmRemoveModal";
import { usePortalUserFiltering } from "@/hooks/usePortalUserFiltering";

export default function PaymentsRelationships() {
  const [activeTab, setActiveTab] = useState("smart-connections");
  const [isAddPortalUserModalOpen, setIsAddPortalUserModalOpen] = useState(false);
  const [isConfirmRemoveModalOpen, setIsConfirmRemoveModalOpen] = useState(false);
  const [userToRemoveId, setUserToRemoveId] = useState<string | null>(null);
  const [portalUsers, setPortalUsers] = useState<PortalUser[]>(mockPortalUsers);

  const {
    filters: smartConnectionFilters,
    filteredConnections,
    handleFilterChange: handleSmartConnectionFilterChange,
    handleResetFilters: handleResetSmartConnectionFilters
  } = useSmartConnectionFiltering(mockSmartConnections);

  const {
    filters: portalUserFilters,
    filteredUsers,
    handleFilterChange: handlePortalUserFilterChange,
    handleResetFilters: handleResetPortalUserFilters
  } = usePortalUserFiltering(portalUsers);

  const tabs = [
    { id: "smart-connections", label: "Smart Connections", count: filteredConnections.length },
    { id: "portal-users", label: "Portal Users", count: filteredUsers.length }
  ];

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
      userType: userData.userType || 'Regular',
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
            title="Payments Relationships" 
            subtitle="Manage and monitor your payments relationships in real-time" 
          />
          <PaymentsRelationshipsHeader 
            activeTab={activeTab}
            onAddPortalUser={() => setIsAddPortalUserModalOpen(true)}
          />
        </div>
        
        <DesignTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {activeTab === "smart-connections" && (
          <>
            <PaymentsRelationshipsFilters
              filters={smartConnectionFilters}
              onFilterChange={handleSmartConnectionFilterChange}
              onClearFilters={handleResetSmartConnectionFilters}
            />
            
            <PaymentsRelationshipsTable connections={filteredConnections} />
          </>
        )}

        {activeTab === "portal-users" && (
          <>
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
          </>
        )}
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
        itemName={portalUsers.find(user => user.id === userToRemoveId)?.username || "this portal user"}
      />
    </TooltipProvider>
  );
}
