import React from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { PaymentsRelationshipsHeader } from "@/components/payments-relationships/PaymentsRelationshipsHeader";
import { PaymentsRelationshipsFilters } from "@/components/payments-relationships/PaymentsRelationshipsFilters";
import { PaymentsRelationshipsTable } from "@/components/payments-relationships/PaymentsRelationshipsTable";
import { SmartConnectionsInsights } from "@/components/smart-connections/SmartConnectionsInsights";
import { TooltipProvider } from "@/components/ui/tooltip";
import { mockSmartConnections } from "@/data/smartConnections";
import { useSmartConnectionFiltering } from "@/hooks/useSmartConnectionFiltering";

export default function SmartConnections() {
  const {
    filters: smartConnectionFilters,
    filteredConnections,
    handleFilterChange: handleSmartConnectionFilterChange,
    handleResetFilters: handleResetSmartConnectionFilters
  } = useSmartConnectionFiltering(mockSmartConnections);

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageHeader 
            title="Smart Connections" 
            subtitle="Unify invoices, POs, and portal activity for clear tracking across buyers and platforms." 
          />
          <PaymentsRelationshipsHeader 
            activeTab="smart-connections"
            onAddPortalUser={() => {}}
          />
        </div>
        
        <PaymentsRelationshipsFilters
          filters={smartConnectionFilters}
          onFilterChange={handleSmartConnectionFilterChange}
          onClearFilters={handleResetSmartConnectionFilters}
        />
        
        <SmartConnectionsInsights />
        
        <PaymentsRelationshipsTable connections={filteredConnections} />
      </div>
    </TooltipProvider>
  );
}