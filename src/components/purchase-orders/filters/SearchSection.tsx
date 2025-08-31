
import { Search, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
    <motion.div 
      className="flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search PO number..." 
          className="pl-9 pr-8 h-9 border rounded-md w-[160px] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:w-[220px] transition-all duration-300 ease-in-out text-[14px]"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-1 transition-colors"
            title="Clear search"
          >
            <X size={14} />
          </button>
        )}
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        className="h-9 bg-white flex items-center gap-1 hover:bg-gray-50 transition-colors"
        onClick={onResetFilters}
      >
        <RefreshCw className="h-3 w-3" />
        <span className="text-[14px]">Reset</span>
      </Button>
    </motion.div>
  );
}
