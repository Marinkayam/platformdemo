
import { Search, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { SmartConnectionFilters } from "@/types/smartConnection";
import { FilterDropdown } from "@/components/invoices/filters/FilterDropdown";
import { PaymentsRelationshipStatusBadge } from "@/components/payments-relationships/PaymentsRelationshipStatusBadge";
import { getPortalLogoUrl } from "@/lib/utils";
import { DesignFilterChip } from "@/components/ui/design-filter-chip";
import { motion, AnimatePresence } from "framer-motion";

interface PaymentsRelationshipsFiltersProps {
  filters: SmartConnectionFilters;
  onFilterChange: (newFilters: SmartConnectionFilters) => void;
  onClearFilters: () => void;
}

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
  { label: "Failed", value: "Failed" },
  { label: "Needs Review", value: "Needs Review" },
];

const receivableEntityOptions = [
  { label: "Apple Inc.", value: "Apple Inc." },
  { label: "Google LLC", value: "Google LLC" },
  { label: "Meta Platforms", value: "Meta Platforms" },
  { label: "Netflix Inc.", value: "Netflix Inc." },
  { label: "ACME Inc.", value: "ACME Inc." },
  { label: "TechSoft LLC", value: "TechSoft LLC" },
];

const payableOptions = [
  { label: "Microsoft Corp.", value: "Microsoft Corp." },
  { label: "Amazon Inc.", value: "Amazon Inc." },
  { label: "Tesla Inc.", value: "Tesla Inc." },
  { label: "Spotify AB", value: "Spotify AB" },
  { label: "Target Corp", value: "Target Corp" },
  { label: "Walmart Inc.", value: "Walmart Inc." },
];

const portalOptions = [
  { label: "SAP Ariba", value: "SAP Ariba" },
  { label: "Coupa", value: "Coupa" },
  { label: "Oracle Procurement", value: "Oracle Procurement" },
  { label: "Tradeshift", value: "Tradeshift" },
  { label: "Workday", value: "Workday" },
  { label: "Tipalti", value: "Tipalti" },
  { label: "Amazon Payee", value: "Amazon Payee" },
  { label: "Apple", value: "Apple" },
  { label: "AT&T", value: "AT&T" },
  { label: "Bill.com", value: "Bill.com" },
  { label: "SAP", value: "SAP" },
  { label: "Facturaxion", value: "Facturaxion" },
  { label: "Fieldglass", value: "Fieldglass" },
  { label: "iSupplier", value: "iSupplier" },
  { label: "KissFlow", value: "KissFlow" },
  { label: "Qualcomm", value: "Qualcomm" },
  { label: "Sainsburys", value: "Sainsburys" },
  { label: "Segment", value: "Segment" },
  { label: "Shopify", value: "Shopify" },
  { label: "StoreNext", value: "StoreNext" },
  { label: "Taulia", value: "Taulia" },
  { label: "Teradata", value: "Teradata" },
  { label: "Tungsten", value: "Tungsten" },
  { label: "Walmart", value: "Walmart" },
];

export function PaymentsRelationshipsFilters({ filters, onFilterChange, onClearFilters }: PaymentsRelationshipsFiltersProps) {
  
  // Check if any filters are active
  const hasActiveFilters = 
    filters.status.length > 0 ||
    filters.receivableEntity.length > 0 ||
    filters.payable.length > 0 ||
    filters.portal.length > 0 ||
    filters.viewInactive ||
    filters.search !== "";
  
  const getActiveFilters = () => {
    const active = [];
    
    filters.status.forEach(status => {
      active.push({ key: `status-${status}`, label: "Status", value: status, type: 'status' });
    });
    
    filters.receivableEntity.forEach(entity => {
      active.push({ key: `receivable-${entity}`, label: "Receivable Entity", value: entity, type: 'receivableEntity' });
    });
    
    filters.payable.forEach(payable => {
      active.push({ key: `payable-${payable}`, label: "Payable", value: payable, type: 'payable' });
    });
    
    filters.portal.forEach(portal => {
      active.push({ key: `portal-${portal}`, label: "Portal", value: portal, type: 'portal' });
    });
    
    if (filters.viewInactive) {
      active.push({ key: 'view-inactive', label: "Filter", value: 'View Inactive', type: 'viewInactive' });
    }
    
    return active;
  };

  const handleRemoveFilter = (filterKey: string, type: string) => {
    if (type === 'status') {
      const value = filterKey.replace('status-', '');
      onFilterChange({ ...filters, status: filters.status.filter(s => s !== value) });
    } else if (type === 'receivableEntity') {
      const value = filterKey.replace('receivable-', '');
      onFilterChange({ ...filters, receivableEntity: filters.receivableEntity.filter(r => r !== value) });
    } else if (type === 'payable') {
      const value = filterKey.replace('payable-', '');
      onFilterChange({ ...filters, payable: filters.payable.filter(p => p !== value) });
    } else if (type === 'portal') {
      const value = filterKey.replace('portal-', '');
      onFilterChange({ ...filters, portal: filters.portal.filter(p => p !== value) });
    } else if (type === 'viewInactive') {
      onFilterChange({ ...filters, viewInactive: false });
    }
  };

  const activeFilters = getActiveFilters();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Status */}
          <FilterDropdown 
            label="Status" 
            value={filters.status} 
            options={statusOptions.map(opt => opt.value)}
            onSelect={(value) => onFilterChange({ 
              ...filters, 
              status: Array.isArray(value) ? value : [value] 
            })}
            multiSelect
          />
          
          {/* Receivable */}
          <FilterDropdown 
            label="Receivable" 
            value={filters.receivableEntity} 
            options={receivableEntityOptions.map(opt => opt.value)}
            onSelect={(value) => onFilterChange({ 
              ...filters, 
              receivableEntity: Array.isArray(value) ? value : [value] 
            })}
            multiSelect
            searchable
          />
          
          {/* Payable */}
          <FilterDropdown 
            label="Payable" 
            value={filters.payable} 
            options={payableOptions.map(opt => opt.value)}
            onSelect={(value) => onFilterChange({ 
              ...filters, 
              payable: Array.isArray(value) ? value : [value] 
            })}
            multiSelect
            searchable
          />
          
          {/* Portals */}
          <FilterDropdown 
            label="Portals" 
            value={filters.portal} 
            options={portalOptions.map(opt => opt.value)}
            onSelect={(value) => onFilterChange({ 
              ...filters, 
              portal: Array.isArray(value) ? value : [value] 
            })}
            multiSelect
            searchable
            renderOption={(option) => (
              <div className="flex items-center gap-2">
                <img 
                  src={getPortalLogoUrl(option)} 
                  alt={`${option} logo`}
                  className="w-5 h-5 object-contain rounded-full"
                  width={20}
                  height={20}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/portal-logos/placeholder.svg';
                  }}
                />
                <span>{option}</span>
              </div>
            )}
          />

          {/* View Inactive Connections toggle */}
          <div className="flex items-center space-x-2 h-9">
            <Switch
              id="view-inactive"
              checked={filters.viewInactive}
              onCheckedChange={(checked) => onFilterChange({ ...filters, viewInactive: checked })}
            />
            <label htmlFor="view-inactive" className="text-sm font-medium">
              View Inactive Connections
            </label>
          </div>
          
          {/* Search - Moved to after filters */}
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-9 pr-8 h-9 border rounded-md w-[200px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:w-[260px] transition-all duration-300 ease-in-out text-[14px]"
              value={filters.search}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            />
            {filters.search && (
              <button
                onClick={() => onFilterChange({ ...filters, search: "" })}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center transition-all z-10"
                title="Clear search"
                type="button"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Reset button on the right - only show when filters are active */}
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 flex items-center gap-1"
            onClick={onClearFilters}
          >
            <RefreshCw className="h-3 w-3" />
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
