
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DesignFilterDropdown } from "@/components/ui/design-filter-dropdown";
import { Button } from "@/components/ui/button";
import { PortalUserFilters } from "@/types/portalUser";

interface PortalUsersFiltersProps {
  filters: PortalUserFilters;
  onFilterChange: (key: keyof PortalUserFilters, value: any) => void;
  onClearFilters: () => void;
}

export function PortalUsersFilters({ filters, onFilterChange, onClearFilters }: PortalUsersFiltersProps) {
  const portalOptions = [
    { value: "SAP Ariba", label: "SAP Ariba" },
    { value: "Coupa", label: "Coupa" },
    { value: "Oracle Procurement", label: "Oracle Procurement" },
    { value: "Tipalti", label: "Tipalti" },
    { value: "Amazon Payee", label: "Amazon Payee" },
    { value: "Bill.com", label: "Bill.com" },
  ];

  const statusOptions = [
    { value: "Connected", label: "Connected" },
    { value: "Validating", label: "Validating" },
    { value: "Disconnected", label: "Disconnected" },
  ];

  const userTypeOptions = [
    { value: "Monto", label: "Monto User" },
    { value: "External", label: "Customer User" },
  ];

  const hasActiveFilters = filters.portal.length > 0 || filters.status.length > 0 || filters.userType.length > 0 || filters.search.length > 0;

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white rounded-lg border">
      <div className="flex items-center gap-4 flex-1">
        <DesignFilterDropdown
          label="Portal"
          value={filters.portal}
          options={portalOptions}
          onChange={(value) => onFilterChange("portal", value)}
          placeholder="All"
        />

        <DesignFilterDropdown
          label="Status"
          value={filters.status}
          options={statusOptions}
          onChange={(value) => onFilterChange("status", value)}
          placeholder="All"
        />

        <DesignFilterDropdown
          label="User Type"
          value={filters.userType}
          options={userTypeOptions}
          onChange={(value) => onFilterChange("userType", value)}
          placeholder="All"
        />

        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by username..."
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {hasActiveFilters && (
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="text-sm"
        >
          Clear Filters
        </Button>
      )}
    </div>
  );
}
