
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DesignFilterDropdown } from "@/components/ui/design-filter-dropdown";
import { Button } from "@/components/ui/button";
import { PortalUserFilters } from "@/types/portalUser";
import { DesignFilterChip } from "@/components/ui/design-filter-chip";
import { motion, AnimatePresence } from "framer-motion";

interface PortalUsersFiltersProps {
  filters: PortalUserFilters;
  onFilterChange: (key: keyof PortalUserFilters, value: any) => void;
  onClearFilters: () => void;
}

export function PortalUsersFilters({ filters, onFilterChange, onClearFilters }: PortalUsersFiltersProps) {
  const portalOptions = [
    "SAP Ariba",
    "Coupa", 
    "Oracle Procurement",
    "Tipalti",
    "Amazon Payee",
    "Bill.com"
  ];

  const statusOptions = [
    "Connected",
    "Validating", 
    "Disconnected"
  ];

  const userTypeOptions = [
    "Monto",
    "External"
  ];

  const getActiveFilters = () => {
    const active = [];
    
    filters.portal.forEach(portal => {
      active.push({ key: `portal-${portal}`, label: "Portal", value: portal, type: 'portal' });
    });
    
    filters.status.forEach(status => {
      active.push({ key: `status-${status}`, label: "Status", value: status, type: 'status' });
    });
    
    filters.userType.forEach(userType => {
      active.push({ key: `userType-${userType}`, label: "User Type", value: userType, type: 'userType' });
    });
    
    if (filters.search) {
      active.push({ key: 'search', label: "Search", value: filters.search, type: 'search' });
    }
    
    return active;
  };

  const handleRemoveFilter = (filterKey: string, type: string) => {
    if (type === 'portal') {
      const value = filterKey.replace('portal-', '');
      onFilterChange("portal", filters.portal.filter(p => p !== value));
    } else if (type === 'status') {
      const value = filterKey.replace('status-', '');
      onFilterChange("status", filters.status.filter(s => s !== value));
    } else if (type === 'userType') {
      const value = filterKey.replace('userType-', '');
      onFilterChange("userType", filters.userType.filter(u => u !== value));
    } else if (type === 'search') {
      onFilterChange("search", "");
    }
  };

  const activeFilters = getActiveFilters();
  const hasActiveFilters = filters.portal.length > 0 || filters.status.length > 0 || filters.userType.length > 0 || filters.search.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-4 flex-1">
          <DesignFilterDropdown
            label="Portal"
            value={filters.portal}
            options={portalOptions}
            onSelect={(value) => onFilterChange("portal", value)}
            multiSelect={true}
          />

          <DesignFilterDropdown
            label="Status"
            value={filters.status}
            options={statusOptions}
            onSelect={(value) => onFilterChange("status", value)}
            multiSelect={true}
          />

          <DesignFilterDropdown
            label="User Type"
            value={filters.userType}
            options={userTypeOptions}
            onSelect={(value) => onFilterChange("userType", value)}
            multiSelect={true}
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

      {activeFilters.length > 0 && (
        <motion.div 
          className="flex flex-wrap gap-2 pt-2"
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: activeFilters.length > 0 ? 1 : 0,
            height: activeFilters.length > 0 ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <AnimatePresence>
            {activeFilters.map((filter) => (
              <DesignFilterChip
                key={filter.key}
                label={filter.label}
                value={filter.value}
                onRemove={() => handleRemoveFilter(filter.key, filter.type)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
