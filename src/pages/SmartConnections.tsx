
import React from "react";
import { SmartConnectionsHeader } from "@/components/smart-connections/SmartConnectionsHeader";
import { SmartConnectionsFilters } from "@/components/smart-connections/SmartConnectionsFilters";
import { SmartConnectionsTable } from "@/components/smart-connections/SmartConnectionsTable";
import { TooltipProvider } from "@/components/ui/tooltip";
import { mockSmartConnections } from "@/data/smartConnections";
import { useSmartConnectionFiltering } from "@/hooks/useSmartConnectionFiltering";

export default function SmartConnections() {
  const {
    filters,
    filteredConnections,
    handleFilterChange,
    handleResetFilters
  } = useSmartConnectionFiltering(mockSmartConnections);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <SmartConnectionsHeader />
        
        <SmartConnectionsFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
        
        <SmartConnectionsTable connections={filteredConnections} />
      </div>
    </TooltipProvider>
  );
}
