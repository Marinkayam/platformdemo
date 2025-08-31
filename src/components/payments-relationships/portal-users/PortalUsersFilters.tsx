
import React from "react";
import { Search, X } from "lucide-react";
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
     
    
    "Tipalti",
    
    "Bill.com"
  ];

  const statusOptions = [
    "Connected",
    "Validating", 
    "Disconnected"
  ];

  const userTypeOptions = [
    "Monto User",
    "Customer User"
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <DesignFilterDropdown
            label="Portal"
            value={filters.portal}
            options={portalOptions}
            onSelect={(value) => onFilterChange("portal", value)}
            multiSelect={true}
            searchable={true}
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

          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search agents..." 
              className="pl-9 pr-8 h-9 border rounded-md w-[200px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:w-[260px] transition-all duration-300 ease-in-out text-[14px]"
              value={filters.search}
              onChange={(e) => onFilterChange("search", e.target.value)}
            />
            {filters.search && (
              <button
                onClick={() => onFilterChange("search", "")}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center transition-all z-10"
                title="Clear search"
                type="button"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 flex items-center gap-1"
            onClick={onClearFilters}
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="text-[14px]">Reset</span>
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
