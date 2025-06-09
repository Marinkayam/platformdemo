import React, { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { SmartConnectionsHeader } from "@/components/smart-connections/SmartConnectionsHeader";
import { SmartConnectionsFilters } from "@/components/smart-connections/SmartConnectionsFilters";
import { SmartConnectionsTable } from "@/components/smart-connections/SmartConnectionsTable";
import { DesignTabs } from "@/components/ui/design-tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { mockSmartConnections } from "@/data/smartConnections";
import { mockPortalUsers } from "@/data/portalUsers";
import { useSmartConnectionFiltering } from "@/hooks/useSmartConnectionFiltering";
import { PortalUser } from "@/types/portalUser";
import { PortalUsersTable } from "@/components/smart-connections/portal-users";
import { PortalUsersEmptyState } from "@/components/smart-connections/portal-users/PortalUsersEmptyState";
import { AddPortalUserModal } from "@/components/smart-connections/portal-users/AddPortalUserModal";
import { ConfirmRemoveModal } from "@/components/smart-connections/portal-users/ConfirmRemoveModal";
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

  const {
    filters,
    filteredConnections,
    handleFilterChange,
    handleResetFilters
  } = useSmartConnectionFiltering(mockSmartConnections);

  const tabs = [
    { id: "payments-relationships", label: "Smart Connections", count: mockSmartConnections.length },
    { id: "portal-users", label: "Portal Users", count: mockPortalUsers.length }
  ];

  const handleConfirmRemove = () => {
    // Logic to remove the user
    console.log(`Removing user with ID: ${userToRemoveId}`);
    setIsConfirmRemoveModalOpen(false);
    setUserToRemoveId(null);
  };

  const handleAddModalSubmit = (userData: Partial<PortalUser>) => {
    console.log("Adding/editing user:", userData);
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
          <SmartConnectionsHeader 
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
            <SmartConnectionsFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
            />
            
            <SmartConnectionsTable connections={filteredConnections} />
          </>
        )}

        {activeTab === "portal-users" && (
          <PortalUsersTable portalUsers={mockPortalUsers} />
        )}
      </div>

      <AddPortalUserModal
        isOpen={isAddPortalUserModalOpen}
        onClose={() => setIsAddPortalUserModalOpen(false)}
        mode={"create"}
        onSave={handleAddModalSubmit}
      />

      <ConfirmRemoveModal
        isOpen={isConfirmRemoveModalOpen}
        onClose={() => setIsConfirmRemoveModalOpen(false)}
        onConfirm={handleConfirmRemove}
        itemName={MOCK_PORTAL_USERS_INITIAL.find(user => user.id === userToRemoveId)?.username || "this portal user"}
      />
    </TooltipProvider>
  );
}
