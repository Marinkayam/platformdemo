import React, { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { SmartConnectionsHeader } from "@/components/smart-connections/SmartConnectionsHeader";
import { SmartConnectionsFilters } from "@/components/smart-connections/SmartConnectionsFilters";
import { SmartConnectionsTable } from "@/components/smart-connections/SmartConnectionsTable";
import { TooltipProvider } from "@/components/ui/tooltip";
import { mockSmartConnections } from "@/data/smartConnections";
import { useSmartConnectionFiltering } from "@/hooks/useSmartConnectionFiltering";
import { PortalUsersTable } from "@/components/smart-connections/portal-users/PortalUsersTable";
import { PortalUsersEmptyState } from "@/components/smart-connections/portal-users/PortalUsersEmptyState";
import { AddPortalUserModal } from "@/components/smart-connections/portal-users/AddPortalUserModal";
import { ConfirmRemoveModal } from "@/components/smart-connections/portal-users/ConfirmRemoveModal";
import { DesignTabs } from "@/components/ui/design-tabs";
import { Badge } from "@/components/ui/badge";

// Mock data for Portal Users (for now)
interface PortalUser {
  id: string;
  portal: string;
  username: string;
  password?: string;
  portalUrl?: string;
  status: string;
  userType: "Monto User" | "Customer User";
  linkedSmartConnections: string[];
  lastUpdated: string;
}

const MOCK_PORTAL_USERS_INITIAL: PortalUser[] = [
  {
    id: "pu1",
    portal: "Coupa",
    username: "john.doe@coupa.com",
    status: "ELIGIBLE",
    userType: "Monto User",
    linkedSmartConnections: ["SC1", "SC2"],
    lastUpdated: "2h ago",
  },
  {
    id: "pu2",
    portal: "Ariba",
    username: "jane.smith@ariba.com",
    status: "UNDER_CONSTRUCTION",
    userType: "Customer User",
    linkedSmartConnections: [],
    lastUpdated: "1d ago",
  },
  {
    id: "pu3",
    portal: "Oracle",
    username: "mike.jones@oracle.com",
    status: "INELIGIBLE",
    userType: "Monto User",
    linkedSmartConnections: ["SC3"],
    lastUpdated: "3d ago",
  },
];

export default function SmartConnections() {
  const [activeTab, setActiveTab] = useState("smart-connections");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addModalMode, setAddModalMode] = useState<"create" | "edit">("create");
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<PortalUser | undefined>(undefined);
  const [isConfirmRemoveModalOpen, setIsConfirmRemoveModalOpen] = useState(false);
  const [userToRemoveId, setUserToRemoveId] = useState<string | null>(null);

  const {
    filters,
    filteredConnections,
    handleFilterChange,
    handleResetFilters
  } = useSmartConnectionFiltering(mockSmartConnections);

  const [portalUsers, setPortalUsers] = useState<PortalUser[]>(MOCK_PORTAL_USERS_INITIAL);
  const hasPortalUsers = portalUsers.length > 0;

  const handleAddPortalUserClick = () => {
    setAddModalMode("create");
    setSelectedUserForEdit(undefined);
    setIsAddModalOpen(true);
  };

  const handleEditPortalUser = (user: PortalUser) => {
    setAddModalMode("edit");
    setSelectedUserForEdit(user);
    setIsAddModalOpen(true);
  };

  const handleRemovePortalUser = (id: string) => {
    setUserToRemoveId(id);
    setIsConfirmRemoveModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (userToRemoveId) {
      setPortalUsers(prevUsers => prevUsers.filter(user => user.id !== userToRemoveId));
      setIsConfirmRemoveModalOpen(false);
      setUserToRemoveId(null);
    }
  };

  const handleAddModalSubmit = (userData: any) => {
    if (addModalMode === "create") {
      const newUser: PortalUser = {
        ...userData,
        id: `pu${portalUsers.length + 1}`,
        status: "ELIGIBLE", // Default status for new users
        userType: userData.userType || "Customer User",
        linkedSmartConnections: [],
        lastUpdated: "Just now",
      };
      setPortalUsers(prevUsers => [...prevUsers, newUser]);
    } else if (addModalMode === "edit" && selectedUserForEdit) {
      setPortalUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === selectedUserForEdit.id
            ? { ...user, ...userData, lastUpdated: "Just now" }
            : user
        )
      );
    }
  };

  // Tabs data for DesignTabs
  const tabs = [
    { id: "smart-connections", label: "Smart Connections", count: filteredConnections.length },
    { id: "portal-users", label: "Portal Users", count: portalUsers.length },
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageHeader 
            title="Smart Connections" 
            subtitle="Sync and manage supplier connections across portals" 
          />
          <SmartConnectionsHeader />
        </div>
        
        <DesignTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
        />

        {activeTab === "smart-connections" && (
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
          <>
            {hasPortalUsers ? (
              <PortalUsersTable 
                portalUsers={portalUsers} 
                onEditPortalUser={handleEditPortalUser}
                onRemovePortalUser={handleRemovePortalUser}
              />
            ) : (
              <PortalUsersEmptyState onAddPortalUser={handleAddPortalUserClick} />
            )}
          </>
        )}
      </div>

      <AddPortalUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        mode={addModalMode}
        initialData={selectedUserForEdit}
        onSubmit={handleAddModalSubmit}
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
