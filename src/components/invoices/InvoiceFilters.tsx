
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

interface FilterDropdownProps {
  label: string;
  value: string;
  options?: string[];
}

function FilterDropdown({ label, value, options = [] }: FilterDropdownProps) {
  return (
    <div className="flex items-center gap-1 border rounded-md px-3 py-1.5 bg-white cursor-pointer hover:bg-gray-50">
      <span className="text-sm text-gray-500">{label}:</span>
      <span className="text-sm font-medium">{value}</span>
      <ChevronDown size={16} className="text-gray-400" />
    </div>
  );
}

export function InvoiceFilters() {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <FilterDropdown label="Invoice Status" value="All" />
        <FilterDropdown label="Total" value="All" />
        <FilterDropdown label="Due Date" value="All" />
        <FilterDropdown label="Buyer Name" value="All" />
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search" 
            className="pl-9 pr-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        
        <button className="p-2 rounded-md hover:bg-gray-100">
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="5" r="1" />
            <circle cx="12" cy="19" r="1" />
          </svg>
        </button>
      </div>
    </div>
  );
}
