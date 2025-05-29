
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Invoice } from "@/types/invoice";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface InvoiceTableHeaderProps {
  sortField: keyof Invoice | null;
  sortDirection: 'asc' | 'desc';
  onSort: (field: keyof Invoice) => void;
  isPendingTab: boolean;
}

export function InvoiceTableHeader({
  sortField,
  sortDirection,
  onSort,
  isPendingTab
}: InvoiceTableHeaderProps) {
  const renderSortButton = (field: keyof Invoice, label: string) => {
    const isActive = sortField === field;
    const SortIcon = !isActive ? ArrowUpDown : sortDirection === 'asc' ? ArrowUp : ArrowDown;
    
    return (
      <button
        onClick={() => onSort(field)}
        className="flex items-center gap-2 hover:text-gray-900 transition-colors"
        aria-label={`Sort by ${label}`}
      >
        {label}
        <SortIcon className="h-4 w-4" />
      </button>
    );
  };

  return (
    <TableHeader>
      <TableRow className="bg-[#F6F7F9] hover:bg-[#F6F7F9]">
        <TableHead className="sticky left-0 z-10 bg-[#F6F7F9] border-r border-gray-200 flex-1">
          {renderSortButton('number', 'Invoice Number')}
        </TableHead>
        
        <TableHead className="flex-1">
          {renderSortButton('buyer', 'Buyer')}
        </TableHead>

        {isPendingTab ? (
          <TableHead className="flex-1">
            Rejected By
          </TableHead>
        ) : (
          <TableHead className="flex-1">
            {renderSortButton('dueDate', 'Due Date')}
          </TableHead>
        )}

        <TableHead className="flex-1">
          Status
        </TableHead>
        
        <TableHead className="flex-1">
          Portal
        </TableHead>
        
        <TableHead className="flex-1">
          {renderSortButton('total', 'Total')}
        </TableHead>

        {isPendingTab ? (
          <TableHead className="flex-1">
            Assignee
          </TableHead>
        ) : (
          <TableHead className="flex-1">
            {renderSortButton('owner', 'Owner')}
          </TableHead>
        )}

        <TableHead className="w-[80px] text-center">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
