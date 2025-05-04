
import { Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onResetFilters: () => void;
}

export function SearchSection({ 
  searchTerm, 
  onSearchChange, 
  onResetFilters 
}: SearchSectionProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search invoices..." 
          className="pl-9 pr-4 h-9 border rounded-md w-[160px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:w-[220px] transition-all duration-200 ease-in-out text-[14px]"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        className="h-9 bg-white flex items-center gap-1 hover:bg-gray-50 transition-colors"
        onClick={onResetFilters}
      >
        <RefreshCw className="h-3 w-3" />
        <span className="text-[14px]">Clear All</span>
      </Button>
    </div>
  );
}
