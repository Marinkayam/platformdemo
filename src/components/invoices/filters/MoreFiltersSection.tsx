
import { ChevronDown, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterDropdown } from "./FilterDropdown";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

interface MoreFiltersSectionProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  transactionType: string;
  onTransactionTypeChange: (value: string) => void;
  owner: string[];
  onOwnerChange: (value: string[]) => void;
  transactionOptions: string[];
  ownerOptions: string[];
}

export function MoreFiltersSection({
  isOpen,
  onOpenChange,
  transactionType,
  onTransactionTypeChange,
  owner,
  onOwnerChange,
  transactionOptions,
  ownerOptions
}: MoreFiltersSectionProps) {
  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={onOpenChange}
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
          <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden">
        <div className="pt-2 pb-1 border-t flex flex-wrap items-center gap-2">
          <FilterDropdown 
            label="Transaction Type" 
            value={transactionType} 
            options={transactionOptions}
            onSelect={(value) => onTransactionTypeChange(value as string)}
          />
          <FilterDropdown 
            label="Owner" 
            value={owner} 
            options={ownerOptions}
            onSelect={(value) => onOwnerChange(value as string[])}
            multiSelect
            searchable
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
