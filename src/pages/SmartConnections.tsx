
import React, { useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { SmartConnectionsHeader } from "@/components/smart-connections/SmartConnectionsHeader";
import { SmartConnectionsFilters } from "@/components/smart-connections/SmartConnectionsFilters";
import { SmartConnectionsTable } from "@/components/smart-connections/SmartConnectionsTable";
import { PortalUsersTable } from "@/components/smart-connections/portal-users";
import { DesignTabs } from "@/components/ui/design-tabs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { mockSmartConnections } from "@/data/smartConnections";
import { mockPortalUsers } from "@/data/portalUsers";
import { useSmartConnectionFiltering } from "@/hooks/useSmartConnectionFiltering";

export default function SmartConnections() {
  const [activeTab, setActiveTab] = useState("smart-connections");
  const [isAddPortalUserModalOpen, setIsAddPortalUserModalOpen] = useState(false);

  const {
    filters,
    filteredConnections,
    handleFilterChange,
    handleResetFilters
  } = useSmartConnectionFiltering(mockSmartConnections);

  const tabs = [
    { id: "smart-connections", label: "Smart Connections", count: mockSmartConnections.length },
    { id: "portal-users", label: "Portal Users", count: mockPortalUsers.length }
  ];

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageHeader 
            title="Smart Connections" 
            subtitle="Sync and manage supplier connections across portals" 
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
          <PortalUsersTable portalUsers={mockPortalUsers} />
        )}
      </div>
    </TooltipProvider>
  );
}
