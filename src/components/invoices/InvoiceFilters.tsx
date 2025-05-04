
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, RefreshCw, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FilterDropdownProps {
  label: string;
  value: string | string[];
  options: string[];
  onSelect: (value: string | string[]) => void;
  multiSelect?: boolean;
  searchable?: boolean;
}

function FilterDropdown({ 
  label, 
  value, 
  options, 
  onSelect, 
  multiSelect = false, 
  searchable = false 
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const values = Array.isArray(value) ? value : [value];
  const displayValue = Array.isArray(value) && value.length > 0 
    ? value.length > 1 ? `${value[0]} +${value.length - 1}` : value[0]
    : value;
  
  const filteredOptions = searchable && search 
    ? options.filter(option => option.toLowerCase().includes(search.toLowerCase())) 
    : options;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option: string) => {
    if (multiSelect) {
      const newValues = values.includes(option) 
        ? values.filter(v => v !== option) 
        : [...values, option];
      onSelect(newValues);
    } else {
      onSelect(option);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-2 border rounded-md px-3 h-9 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm text-gray-500 whitespace-nowrap">{label}:</span>
        <span className="text-sm font-medium truncate max-w-[100px]">
          {Array.isArray(value) 
            ? (value.length === 0 ? "All" : displayValue) 
            : (value === "All" ? "All" : value)
          }
        </span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-60 bg-white border rounded-md shadow-lg py-1 z-10">
          {searchable && (
            <div className="px-3 py-2 border-b">
              <input
                type="text"
                placeholder="Search..."
                className="w-full text-sm border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
          
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.map((option) => (
              <div
                key={option}
                className={`px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer transition-colors flex items-center justify-between
                  ${multiSelect && values.includes(option) ? 'bg-gray-50 font-medium' : ''}
                  ${!multiSelect && option === value ? 'bg-gray-50 font-medium' : ''}
                `}
                onClick={() => handleSelect(option)}
              >
                {option}
                {multiSelect && values.includes(option) && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface DateRangePickerProps {
  fromDate: string;
  toDate: string;
  onDateChange: (fromDate: string, toDate: string) => void;
}

function DateRangePicker({ fromDate, toDate, onDateChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  let displayValue = "All";
  if (fromDate && toDate) {
    displayValue = `${fromDate} - ${toDate}`;
  } else if (fromDate) {
    displayValue = `From ${fromDate}`;
  } else if (toDate) {
    displayValue = `Until ${toDate}`;
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-2 border rounded-md px-3 h-9 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm text-gray-500 whitespace-nowrap">Due Date:</span>
        <span className="text-sm font-medium truncate max-w-[100px]">{displayValue}</span>
        <ChevronDown size={16} className={`text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-72 bg-white border rounded-md shadow-lg p-3 z-10">
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-sm font-medium block mb-1">From</label>
              <input
                type="date"
                className="w-full border rounded-md px-2 py-1 text-sm"
                value={fromDate}
                onChange={(e) => onDateChange(e.target.value, toDate)}
              />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1">To</label>
              <input
                type="date"
                className="w-full border rounded-md px-2 py-1 text-sm"
                value={toDate}
                onChange={(e) => onDateChange(fromDate, e.target.value)}
              />
            </div>
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-1/2"
                onClick={() => {
                  onDateChange("", "");
                  setIsOpen(false);
                }}
              >
                Clear
              </Button>
              <Button 
                size="sm" 
                className="w-1/2"
                onClick={() => setIsOpen(false)}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface InvoiceFiltersProps {
  onFilterChange: (filters: InvoiceFilters) => void;
}

export interface InvoiceFilters {
  status: string[];
  total: string;
  dueDate: {
    from: string;
    to: string;
  };
  buyer: string[];
  portal: string[];
  transactionType: string;
  owner: string[];
  search: string;
}

const defaultFilters: InvoiceFilters = {
  status: [],
  total: "All",
  dueDate: {
    from: "",
    to: ""
  },
  buyer: [],
  portal: [],
  transactionType: "All",
  owner: [],
  search: ""
};

export function InvoiceFilters({ onFilterChange }: InvoiceFiltersProps) {
  const [filters, setFilters] = useState<InvoiceFilters>(defaultFilters);
  const [moreFiltersOpen, setMoreFiltersOpen] = useState(false);
  
  // Get all active filter values (non-default) for displaying as chips
  const getActiveFilters = () => {
    const active: { key: string; label: string; value: string }[] = [];
    
    if (filters.status.length > 0) {
      filters.status.forEach(status => {
        active.push({
          key: `status-${status}`,
          label: "Status",
          value: status
        });
      });
    }
    
    if (filters.buyer.length > 0) {
      filters.buyer.forEach(buyer => {
        active.push({
          key: `buyer-${buyer}`,
          label: "Buyer",
          value: buyer
        });
      });
    }
    
    if (filters.portal.length > 0) {
      filters.portal.forEach(portal => {
        active.push({
          key: `portal-${portal}`,
          label: "Portal",
          value: portal
        });
      });
    }
    
    if (filters.dueDate.from || filters.dueDate.to) {
      let dateValue = "";
      if (filters.dueDate.from && filters.dueDate.to) {
        dateValue = `${filters.dueDate.from} - ${filters.dueDate.to}`;
      } else if (filters.dueDate.from) {
        dateValue = `From ${filters.dueDate.from}`;
      } else if (filters.dueDate.to) {
        dateValue = `Until ${filters.dueDate.to}`;
      }
      
      active.push({
        key: "date-range",
        label: "Due Date",
        value: dateValue
      });
    }
    
    if (filters.transactionType !== "All") {
      active.push({
        key: "transaction-type",
        label: "Transaction Type",
        value: filters.transactionType
      });
    }
    
    if (filters.owner.length > 0) {
      filters.owner.forEach(owner => {
        active.push({
          key: `owner-${owner}`,
          label: "Owner",
          value: owner
        });
      });
    }
    
    return active;
  };

  const handleFilterChange = (key: keyof InvoiceFilters, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleRemoveFilter = (key: string, value: string) => {
    const newFilters = { ...filters };
    
    if (key.startsWith("status")) {
      newFilters.status = newFilters.status.filter(s => s !== value);
    } else if (key.startsWith("buyer")) {
      newFilters.buyer = newFilters.buyer.filter(b => b !== value);
    } else if (key.startsWith("portal")) {
      newFilters.portal = newFilters.portal.filter(p => p !== value);
    } else if (key === "date-range") {
      newFilters.dueDate = { from: "", to: "" };
    } else if (key === "transaction-type") {
      newFilters.transactionType = "All";
    } else if (key.startsWith("owner")) {
      newFilters.owner = newFilters.owner.filter(o => o !== value);
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
    toast({
      title: "Filters reset",
      description: "All filters have been reset to default values",
    });
  };

  const statusOptions = ["Pending Action", "Approved by Buyer", "Paid", "External Submission", "Settled", "Awaiting SC", "Excluded", "Overdue"];
  const totalOptions = ["All", "Under $1000", "$1000-$10000", "Over $10000"];
  const buyerOptions = ["Adidas", "Marvel", "Amazon", "Apple", "Samsung", "Golda", "Figma", "BMX", "Netflix", "Tesla", "Google", "Nike"];
  const portalOptions = ["Ariba", "Coupa", "Bill", "Tipalti"];
  const transactionOptions = ["All", "Invoice", "Credit Memo"];
  const ownerOptions = ["Elon", "Camila", "Lady Gaga", "Madona", "John", "Jane", "Robert", "Sarah"];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <FilterDropdown 
            label="Status" 
            value={filters.status} 
            options={statusOptions}
            onSelect={(value) => handleFilterChange("status", value)}
            multiSelect
            searchable
          />
          <DateRangePicker
            fromDate={filters.dueDate.from}
            toDate={filters.dueDate.to}
            onDateChange={(from, to) => handleFilterChange("dueDate", { from, to })}
          />
          <FilterDropdown 
            label="Buyer" 
            value={filters.buyer} 
            options={buyerOptions}
            onSelect={(value) => handleFilterChange("buyer", value)}
            multiSelect
            searchable
          />
          <FilterDropdown 
            label="Portal" 
            value={filters.portal} 
            options={portalOptions}
            onSelect={(value) => handleFilterChange("portal", value)}
            multiSelect
            searchable
          />
          
          <Collapsible 
            open={moreFiltersOpen} 
            onOpenChange={setMoreFiltersOpen}
            className="inline-flex"
          >
            <CollapsibleTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-9 bg-white flex items-center gap-1"
              >
                <Filter className="h-3.5 w-3.5" />
                <span className="text-[14px]">More Filters</span>
                <ChevronDown className={`h-3.5 w-3.5 transition-transform ${moreFiltersOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search invoices..." 
              className="pl-9 pr-4 h-9 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[14px]"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9 bg-white flex items-center gap-1"
            onClick={handleResetFilters}
          >
            <RefreshCw className="h-3 w-3" />
            <span className="text-[14px]">Clear All</span>
          </Button>
        </div>
      </div>
      
      <CollapsibleContent className="overflow-hidden">
        <div className="pt-2 pb-1 border-t flex flex-wrap items-center gap-2">
          <FilterDropdown 
            label="Transaction Type" 
            value={filters.transactionType} 
            options={transactionOptions}
            onSelect={(value) => handleFilterChange("transactionType", value)}
          />
          <FilterDropdown 
            label="Owner" 
            value={filters.owner} 
            options={ownerOptions}
            onSelect={(value) => handleFilterChange("owner", value)}
            multiSelect
            searchable
          />
        </div>
      </CollapsibleContent>
      
      {getActiveFilters().length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {getActiveFilters().map((filter) => (
            <Badge key={filter.key} variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-2 py-1">
              {filter.label}: {filter.value}
              <X 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={() => handleRemoveFilter(filter.key, filter.value)}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
