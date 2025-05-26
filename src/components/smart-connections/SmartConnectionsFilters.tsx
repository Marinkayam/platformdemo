
import { Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { SmartConnectionFilters } from "@/types/smartConnection";
import { FilterDropdown } from "@/components/invoices/filters/FilterDropdown";

interface SmartConnectionsFiltersProps {
  filters: SmartConnectionFilters;
  onFilterChange: (key: keyof SmartConnectionFilters, value: any) => void;
  onResetFilters: () => void;
}

const statusOptions = [
  { label: "Live", value: "Live" },
  { label: "In Process", value: "In Process" },
  { label: "Unavailable", value: "Unavailable" },
  { label: "Disconnected", value: "Disconnected" },
];

const receivableEntityOptions = [
  { label: "Apple Inc.", value: "Apple Inc." },
  { label: "Google LLC", value: "Google LLC" },
  { label: "Meta Platforms", value: "Meta Platforms" },
  { label: "Netflix Inc.", value: "Netflix Inc." },
];

const payableOptions = [
  { label: "Microsoft Corp.", value: "Microsoft Corp." },
  { label: "Amazon Inc.", value: "Amazon Inc." },
  { label: "Tesla Inc.", value: "Tesla Inc." },
  { label: "Spotify AB", value: "Spotify AB" },
];

const portalOptions = [
  { label: "SAP", value: "SAP" },
  { label: "NetSuite", value: "NetSuite" },
  { label: "Oracle", value: "Oracle" },
  { label: "Workday", value: "Workday" },
  { label: "Sage", value: "Sage" },
  { label: "QuickBooks", value: "QuickBooks" },
];

export function SmartConnectionsFilters({ 
  filters, 
  onFilterChange, 
  onResetFilters 
}: SmartConnectionsFiltersProps) {
  
  const getActiveFilters = () => {
    const active = [];
    
    filters.status.forEach(status => {
      active.push({ key: `status-${status}`, label: status, type: 'status' });
    });
    
    filters.receivableEntity.forEach(entity => {
      active.push({ key: `receivable-${entity}`, label: entity, type: 'receivableEntity' });
    });
    
    filters.payable.forEach(payable => {
      active.push({ key: `payable-${payable}`, label: payable, type: 'payable' });
    });
    
    filters.portal.forEach(portal => {
      active.push({ key: `portal-${portal}`, label: portal, type: 'portal' });
    });
    
    if (filters.viewInactive) {
      active.push({ key: 'view-inactive', label: 'View Inactive', type: 'viewInactive' });
    }
    
    return active;
  };

  const handleRemoveFilter = (filterKey: string, type: string) => {
    if (type === 'status') {
      const value = filterKey.replace('status-', '');
      onFilterChange('status', filters.status.filter(s => s !== value));
    } else if (type === 'receivableEntity') {
      const value = filterKey.replace('receivable-', '');
      onFilterChange('receivableEntity', filters.receivableEntity.filter(r => r !== value));
    } else if (type === 'payable') {
      const value = filterKey.replace('payable-', '');
      onFilterChange('payable', filters.payable.filter(p => p !== value));
    } else if (type === 'portal') {
      const value = filterKey.replace('portal-', '');
      onFilterChange('portal', filters.portal.filter(p => p !== value));
    } else if (type === 'viewInactive') {
      onFilterChange('viewInactive', false);
    }
  };

  const activeFilters = getActiveFilters();

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <FilterDropdown 
            label="SC Status" 
            value={filters.status} 
            options={statusOptions.map(opt => opt.value)}
            onSelect={(value) => onFilterChange("status", value)}
            multiSelect
          />
          
          <FilterDropdown 
            label="Receivable Entity" 
            value={filters.receivableEntity} 
            options={receivableEntityOptions.map(opt => opt.value)}
            onSelect={(value) => onFilterChange("receivableEntity", value)}
            multiSelect
            searchable
          />
          
          <FilterDropdown 
            label="Payable" 
            value={filters.payable} 
            options={payableOptions.map(opt => opt.value)}
            onSelect={(value) => onFilterChange("payable", value)}
            multiSelect
            searchable
          />
          
          <FilterDropdown 
            label="Portal" 
            value={filters.portal} 
            options={portalOptions.map(opt => opt.value)}
            onSelect={(value) => onFilterChange("portal", value)}
            multiSelect
            searchable
          />

          <div className="flex items-center space-x-2">
            <Switch
              id="view-inactive"
              checked={filters.viewInactive}
              onCheckedChange={(checked) => onFilterChange("viewInactive", checked)}
            />
            <label htmlFor="view-inactive" className="text-sm font-medium">
              View Inactive Connections
            </label>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search connections..." 
              className="pl-9 pr-4 h-9 border rounded-md w-[160px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:w-[220px] transition-all duration-300 ease-in-out text-[14px]"
              value={filters.search}
              onChange={(e) => onFilterChange("search", e.target.value)}
            />
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 flex items-center gap-1"
            onClick={onResetFilters}
          >
            <RefreshCw className="h-3 w-3" />
            <span className="text-[14px]">Reset All</span>
          </Button>
        </div>
      </div>
      
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge
              key={filter.key}
              variant="outline"
              className="px-2 py-1 text-xs cursor-pointer hover:bg-gray-50"
              onClick={() => handleRemoveFilter(filter.key, filter.type)}
            >
              {filter.label}
              <span className="ml-1 text-gray-400">×</span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
