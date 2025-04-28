
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { InvoiceStatus } from "@/types/invoice";

interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  onSelect: (value: string) => void;
}

function FilterDropdown({ label, value, options, onSelect }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-1 border rounded-md px-3 py-1.5 bg-white cursor-pointer hover:bg-gray-50"
      >
        <span className="text-sm text-gray-500">{label}:</span>
        <span className="text-sm font-medium">{value}</span>
        <ChevronDown size={16} className="text-gray-400" />
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-48 bg-white border rounded-md shadow-lg py-1 z-10">
          {options.map((option) => (
            <div
              key={option}
              className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface InvoiceFiltersProps {
  onFilterChange: (filters: InvoiceFilters) => void;
}

export interface InvoiceFilters {
  status: string;
  total: string;
  dueDate: string;
  buyer: string;
  search: string;
}

export function InvoiceFilters({ onFilterChange }: InvoiceFiltersProps) {
  const [filters, setFilters] = useState<InvoiceFilters>({
    status: "All",
    total: "All",
    dueDate: "All",
    buyer: "All",
    search: ""
  });

  const handleFilterChange = (key: keyof InvoiceFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const statusOptions = ["All", "Pending Action", "Approved by Buyer", "Paid", "External Submission", "Settled", "Awaiting SC", "Excluded"];
  const totalOptions = ["All", "Under $1000", "$1000-$10000", "Over $10000"];
  const dueDateOptions = ["All", "Today", "This Week", "This Month", "Overdue"];
  const buyerOptions = ["All", "Adidas", "Marvel", "Amazon", "Apple", "Samsung", "Golda", "Figma", "BMX", "Netflix"];

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <FilterDropdown 
          label="Invoice Status" 
          value={filters.status} 
          options={statusOptions}
          onSelect={(value) => handleFilterChange("status", value)}
        />
        <FilterDropdown 
          label="Total" 
          value={filters.total} 
          options={totalOptions}
          onSelect={(value) => handleFilterChange("total", value)}
        />
        <FilterDropdown 
          label="Due Date" 
          value={filters.dueDate} 
          options={dueDateOptions}
          onSelect={(value) => handleFilterChange("dueDate", value)}
        />
        <FilterDropdown 
          label="Buyer Name" 
          value={filters.buyer} 
          options={buyerOptions}
          onSelect={(value) => handleFilterChange("buyer", value)}
        />
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search" 
            className="pl-9 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
