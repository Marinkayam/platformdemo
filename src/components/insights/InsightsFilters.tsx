
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DesignFilterDropdown } from "@/components/ui/design-filter-dropdown";
import { InsightFilters } from "@/types/insights";
import { mockInsights } from "@/data/insights";

interface InsightsFiltersProps {
  filters: InsightFilters;
  onFilterChange: (key: keyof InsightFilters, value: any) => void;
  onClearFilters: () => void;
}

export function InsightsFilters({ filters, onFilterChange, onClearFilters }: InsightsFiltersProps) {
  const supplierOptions = Array.from(new Set(mockInsights.map(i => i.supplier)));
  const buyerOptions = Array.from(new Set(mockInsights.map(i => i.buyer)));
  const paymentScoreOptions = ['Excellent', 'Good', 'Fair', 'Poor'];

  const hasActiveFilters = filters.search || filters.supplier.length > 0 || filters.buyer.length > 0 || filters.paymentScore.length > 0;

  return (
    <div className="bg-white rounded-xl border p-6 space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search suppliers or buyers..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          <DesignFilterDropdown
            label="Supplier"
            options={supplierOptions}
            value={filters.supplier}
            onSelect={(values) => onFilterChange('supplier', values)}
            multiSelect={true}
          />
          
          <DesignFilterDropdown
            label="Buyer"
            options={buyerOptions}
            value={filters.buyer}
            onSelect={(values) => onFilterChange('buyer', values)}
            multiSelect={true}
          />
          
          <DesignFilterDropdown
            label="Payment Score"
            options={paymentScoreOptions}
            value={filters.paymentScore}
            onSelect={(values) => onFilterChange('paymentScore', values)}
            multiSelect={true}
          />
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="text-gray-600 hover:text-gray-900"
            >
              <X className="h-4 w-4 mr-1" />
              Clear filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
