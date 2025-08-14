import React, { useState, useMemo } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import { PaymentsRelationshipsHeader } from "@/components/payments-relationships/PaymentsRelationshipsHeader";
import { PaymentsRelationshipsTable } from "@/components/payments-relationships/PaymentsRelationshipsTable";
import { TooltipProvider } from "@/components/ui/tooltip";
import { mockSmartConnections } from "@/data/smartConnections";
import { useSmartConnectionFiltering } from "@/hooks/useSmartConnectionFiltering";
import { DataTableFacetedFilter, Option } from "@/components/dashboard/filters/DataTableFacetedFilter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Search } from "lucide-react";

export default function SmartConnections() {
  // Use original filtering logic but adapt for new UI
  const {
    filters: smartConnectionFilters,
    filteredConnections,
    handleFilterChange: handleSmartConnectionFilterChange,
    handleResetFilters: handleResetSmartConnectionFilters
  } = useSmartConnectionFiltering(mockSmartConnections);

  // Convert original filter data to new UI format
  const statusOptions: Option[] = useMemo(() => {
    // Use the updated status names
    const statusCategories = ['Connected', 'Connecting', 'Needs Attention', 'Inactive'];
    return statusCategories.map(category => ({
      label: category,
      value: category,
      count: mockSmartConnections.filter(conn => conn.status === category).length
    }));
  }, []);

  const entityOptions: Option[] = useMemo(() => {
    const entities = [...new Set(mockSmartConnections.map(conn => conn.receivableEntity))];
    return entities.map(entity => ({
      label: entity,
      value: entity,
      count: mockSmartConnections.filter(conn => conn.receivableEntity === entity).length
    }));
  }, []);

  const payableOptions: Option[] = useMemo(() => {
    const payables = [...new Set(mockSmartConnections.map(conn => conn.payableEntity))];
    return payables.map(payable => ({
      label: payable,
      value: payable,
      count: mockSmartConnections.filter(conn => conn.payableEntity === payable).length
    }));
  }, []);

  const portalOptions: Option[] = useMemo(() => {
    const portals = [...new Set(mockSmartConnections.flatMap(conn => conn.agents.map(agent => agent.portalName)))];
    return portals.map(portal => ({
      label: portal,
      value: portal,
      count: mockSmartConnections.filter(conn => conn.agents.some(agent => agent.portalName === portal)).length
    }));
  }, []);

  const activeStatusOptions: Option[] = useMemo(() => {
    return [
      {
        label: 'Active',
        value: 'Active',
        count: mockSmartConnections.filter(conn => conn.isActive).length
      },
      {
        label: 'Inactive',
        value: 'Inactive',
        count: mockSmartConnections.filter(conn => !conn.isActive).length
      }
    ];
  }, []);

  // Adapter functions to bridge old and new filter systems
  const handleStatusChange = (values: Set<string>) => {
    handleSmartConnectionFilterChange({
      ...smartConnectionFilters,
      status: Array.from(values)
    });
  };

  const handleEntityChange = (values: Set<string>) => {
    handleSmartConnectionFilterChange({
      ...smartConnectionFilters,
      receivableEntity: Array.from(values)
    });
  };

  const handlePayableChange = (values: Set<string>) => {
    handleSmartConnectionFilterChange({
      ...smartConnectionFilters,
      payable: Array.from(values)
    });
  };

  const handlePortalChange = (values: Set<string>) => {
    handleSmartConnectionFilterChange({
      ...smartConnectionFilters,
      portal: Array.from(values)
    });
  };

  const handleActiveStatusChange = (values: Set<string>) => {
    handleSmartConnectionFilterChange({
      ...smartConnectionFilters,
      activeStatus: Array.from(values)
    });
  };

  const handleSearchChange = (value: string) => {
    handleSmartConnectionFilterChange({
      ...smartConnectionFilters,
      search: value
    });
  };

  const handleReset = () => {
    handleResetSmartConnectionFilters();
  };

  const isFiltered = smartConnectionFilters.search || 
                   smartConnectionFilters.status.length > 0 || 
                   smartConnectionFilters.receivableEntity.length > 0 || 
                   smartConnectionFilters.payable.length > 0 || 
                   smartConnectionFilters.portal.length > 0 ||
                   smartConnectionFilters.activeStatus.length > 0;

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <PageHeader 
            title="Smart Connections" 
            subtitle="Configure and monitor portal connections for each buyer." 
          />
          <PaymentsRelationshipsHeader 
            activeTab="smart-connections"
            onAddPortalUser={() => {}}
          />
        </div>
        
        {/* New Filter System */}
        <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <DataTableFacetedFilter
              title="Status"
              options={statusOptions}
              selectedValues={new Set(smartConnectionFilters.status)}
              onSelectionChange={handleStatusChange}
            />

            {/* Receivable Entity Filter */}
            <DataTableFacetedFilter
              title="Receivable Entity"
              options={entityOptions}
              selectedValues={new Set(smartConnectionFilters.receivableEntity)}
              onSelectionChange={handleEntityChange}
            />

            {/* Payable Filter */}
            <DataTableFacetedFilter
              title="Payable"
              options={payableOptions}
              selectedValues={new Set(smartConnectionFilters.payable)}
              onSelectionChange={handlePayableChange}
            />

            {/* Portal Filter */}
            <DataTableFacetedFilter
              title="Portal"
              options={portalOptions}
              selectedValues={new Set(smartConnectionFilters.portal)}
              onSelectionChange={handlePortalChange}
            />

            {/* Active Status Filter */}
            <DataTableFacetedFilter
              title="Active Status"
              options={activeStatusOptions}
              selectedValues={new Set(smartConnectionFilters.activeStatus)}
              onSelectionChange={handleActiveStatusChange}
            />

            {/* Reset Button */}
            {isFiltered && (
              <Button
                variant="ghost"
                onClick={handleReset}
                className="h-8 px-2 lg:px-3"
              >
                Reset
                <X className="ml-2 h-4 w-4" />
              </Button>
            )}

            {/* Search Input - moved to right end */}
            <div className="relative w-64 ml-auto">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={smartConnectionFilters.search || ""}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="h-8 pl-8"
              />
            </div>
        </div>
        
        <PaymentsRelationshipsTable connections={filteredConnections} />
      </div>
    </TooltipProvider>
  );
}