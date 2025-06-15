
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
import { PortalUser } from "@/types/portalUser";
import { PortalUsersTable } from "@/components/payments-relationships/portal-users";
import { PortalUsersEmptyState } from "@/components/payments-relationships/portal-users/PortalUsersEmptyState";
import { AddPortalUserModal } from "@/components/payments-relationships/portal-users/AddPortalUserModal";
import { ConfirmRemoveModal } from "@/components/payments-relationships/portal-users/ConfirmRemoveModal";
import { Badge } from "@/components/ui/badge";

// Mock data for Portal Users (for now)
const MOCK_PORTAL_USERS_INITIAL: PortalUser[] = [
  {
    id: "pu1",
    portal: "Coupa",
    username: "john.doe@coupa.com",
    status: "Connected",
    userType: "Monto",
    linkedSmartConnections: 2,
    lastUpdated: "2h ago",
    isReadOnly: false,
  },
  {
    id: "pu2",
    portal: "Ariba",
    username: "jane.smith@ariba.com",
    status: "Validating",
    userType: "External",
    linkedSmartConnections: 0,
    lastUpdated: "1d ago",
    isReadOnly: true,
  },
  {
    id: "pu3",
    portal: "Oracle",
    username: "mike.jones@oracle.com",
    status: "Disconnected",
    userType: "Monto",
    linkedSmartConnections: 1,
    lastUpdated: "3d ago",
    isReadOnly: false,
  },
];

export default function PaymentsRelationships() {
  const [activeTab, setActiveTab] = useState("payments-relationships");
  const [isAddPortalUserModalOpen, setIsAddPortalUserModalOpen] = useState(false);
  const [isConfirmRemoveModalOpen, setIsConfirmRemoveModalOpen] = useState(false);
  const [userToRemoveId, setUserToRemoveId] = useState<string | null>(null);
  const [portalUsers, setPortalUsers] = useState<PortalUser[]>(mockPortalUsers);

  const {
    filters,
    filteredConnections,
    handleFilterChange,
    handleResetFilters
  } = useSmartConnectionFiltering(mockSmartConnections);

  const tabs = [
    { id: "payments-relationships", label: "Payments Relationships", count: mockSmartConnections.length },
    { id: "portal-users", label: "Portal Users", count: portalUsers.length }
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
      id: `pu${Date.now()}`, // Generate a unique ID
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

        {activeTab === "payments-relationships" && (
          <>
            <PaymentsRelationshipsFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleResetFilters}
            />
            
            <PaymentsRelationshipsTable connections={filteredConnections} />
          </>
        )}

        {activeTab === "portal-users" && (
          // Pass correct prop expected by PortalUsersTable (should be "users")
          <PortalUsersTable 
            users={portalUsers} 
            onRemovePortalUser={(id) => {
              setUserToRemoveId(id);
              setIsConfirmRemoveModalOpen(true);
            }}
          />
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
