import { Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { SmartConnectionFilters } from "@/types/smartConnection";
import { FilterDropdown } from "@/components/invoices/filters/FilterDropdown";
import { PaymentsRelationshipStatusBadge } from "@/components/payments-relationships/PaymentsRelationshipStatusBadge";

interface PaymentsRelationshipsFiltersProps {
  filters: SmartConnectionFilters;
  onFilterChange: (newFilters: SmartConnectionFilters) => void;
  onClearFilters: () => void;
}

const getPortalLogoUrl = (portalName: string): string => {
  const logoMap: { [key: string]: string } = {
    "SAP Ariba": "ariba.png",
    "Coupa": "coupa.png",
    "Oracle Procurement": "oracle.png",
    "Tipalti": "tipalti.png",
    "Amazon Payee": "Amazon Payee.png",
    "Apple": "apple.png",
    "AT&T": "AT&T.png",
    "Bill.com": "bill.png",
    "SAP": "default.png",
    "Facturaxion": "Facturaxion.png",
    "Fieldglass": "Fieldglass.png",
    "iSupplier": "iSupplier.png",
    "KissFlow": "KissFlow.png",
    "Qualcomm": "Qualcomm.png",
    "Sainsburys": "Sainsburys.png",
    "Segment": "Segment.png",
    "Shopify": "Shopify.png",
    "StoreNext": "StoreNext.png",
    "Taulia": "taulia.png",
    "Teradata": "Teradata.png",
    "Tungsten": "tungsten.png",
    "Walmart": "walmart.png",
  };
  // Use a more robust mapping for portals, handling potential variations or lack of direct match
  // This ensures a default image if no specific logo is found
  const fileName = logoMap[portalName] || portalName.toLowerCase().replace(/\s/g, '-') + '.png';
  return `/portal-logos/${fileName}`;
};

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
        <div className="flex flex-wrap items-center gap-2">
          <FilterDropdown 
            label="SC Status" 
            value={filters.status} 
            options={statusOptions.map(opt => opt.value)}
            onSelect={(value) => onFilterChange({ 
              ...filters, 
              status: Array.isArray(value) ? value : [value] 
            })}
            multiSelect
          />
          
          <FilterDropdown 
            label="Receivable Entity" 
            value={filters.receivableEntity} 
            options={receivableEntityOptions.map(opt => opt.value)}
            onSelect={(value) => onFilterChange({ 
              ...filters, 
              receivableEntity: Array.isArray(value) ? value : [value] 
            })}
            multiSelect
            searchable
          />
          
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
          
          <FilterDropdown 
            label="Portal" 
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
                  onError={(e) => {
                    e.currentTarget.onerror = null; // Prevent infinite loop
                    e.currentTarget.src = '/portal-logos/default.png'; // Fallback to a default image
                  }}
                />
                <span>{option}</span>
              </div>
            )}
          />

          <div className="flex items-center space-x-2">
            <Switch
              id="view-inactive"
              checked={filters.viewInactive}
              onCheckedChange={(checked) => onFilterChange({ ...filters, viewInactive: checked })}
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
              placeholder="Search..." 
              className="pl-9 pr-4 h-9 border rounded-md w-[160px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:w-[220px] transition-all duration-300 ease-in-out text-[14px]"
              value={filters.search}
              onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            />
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 flex items-center gap-1"
            onClick={onClearFilters}
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
              className="px-2 py-1 text-xs cursor-pointer hover:bg-purple-50 bg-purple-50 text-purple-700 border-purple-200"
              onClick={() => handleRemoveFilter(filter.key, filter.type)}
            >
              {filter.label}
              <span className="ml-1 text-purple-400">×</span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
